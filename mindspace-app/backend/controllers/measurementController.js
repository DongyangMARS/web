const Measurement = require("../models/Measurement");
const User = require("../models/User");
const { spawn } = require("child_process"); // Python 스크립트 실행을 위해 Node.js 내장 모듈 사용
const path = require("path"); // 파일 경로 처리를 위해 Node.js 내장 모듈 사용
const fs = require("fs"); // 파일 시스템 접근을 위해 Node.js 내장 모듈 사용

// --- 측정 세션 시작 및 설문조사 결과 저장 (첫 번째 단계) ---
exports.startMeasurementSession = async (req, res) => {
  try {
    const { userId, surveyResults } = req.body;

    if (!userId || !surveyResults) {
      return res
        .status(400)
        .json({ message: "사용자 ID와 설문조사 결과는 필수" });
    }

    // surveyResults 내부 필드 유효성 검사
    const { pssScore, bdiScore, baiScore } = surveyResults;
    if (
      typeof pssScore !== "number" ||
      typeof bdiScore !== "number" ||
      typeof baiScore !== "number"
    ) {
      return res.status(400).json({
        message: "설문조사 점수(pssScore, bdiScore, baiScore)는 숫자",
      });
    }

    // 새 Measurement 도큐먼트 생성 (emotion은 '분석 대기 중' 등으로 설정)
    const newMeasurement = new Measurement({
      userId: userId,
      survey: {
        pssScore,
        bdiScore,
        baiScore,
      },
      emotion: "분석 대기 중", // 초기 감정 상태 (임시)
      brain: {}, // 초기에는 빈 객체
      face: {}, // 초기에는 빈 객체
    });

    await newMeasurement.save();

    // 사용자 컬렉션 업데이트 (마지막 측정 시간 및 측정 횟수 증가)
    await User.findByIdAndUpdate(
      userId,
      {
        lastMeasurementAt: new Date(),
        $inc: { measurementCount: 1 }, // 측정횟수 1 증가
      },
      { new: true }
    );

    // 클라이언트에게 생성된 measurementId를 반환하여 이후 업데이트에 사용하도록 합니다.
    res.status(201).json({
      message: "측정이 시작되고 설문조사 결과가 저장되었습니다.",
      measurementId: newMeasurement._id,
      emotion: newMeasurement.emotion,
    });
  } catch (error) {
    console.error("측정 세션 시작/설문조사 결과 저장 중 오류 발생:", error);
    res.status(500).json({
      message: "측정 세션 시작 및 설문조사 결과 저장에 실패했습니다.",
      error: error.message,
    });
  }
};

exports.faceMeasurementSession = async (req, res) => {
  try {
    const { measurementId } = req.params;

    const videoFile = req.file;

    // 2. 필수 데이터 유효성 검사
    if (!videoFile) {
      // 파일이 누락된 경우, 오류 응답
      return res.status(400).json({ message: "영상 파일은 필수입니다." });
    }

    // 3. Python 스크립트 경로 설정
    // __dirname은 현재 파일(measurementController.js)의 디렉토리입니다.
    // path.join을 사용하여 'my-vr-therapy-api/python_scripts/face.py' 경로를 만듭니다.
    const pythonScriptPath = path.join(
      __dirname,
      "..",
      "python_scripts",
      "face.py"
    );

    // multer가 임시로 저장한 영상 파일의 실제 서버 경로
    const videoFilePath = videoFile.path;

    let faceAnalysisResult = {}; // Python 스크립트의 분석 결과를 저장할 변수
    let pythonOutput = ""; // Python 스크립트의 표준 출력(stdout)을 받을 변수
    let pythonError = ""; // Python 스크립트의 표준 에러(stderr)를 받을 변수

    // 4. Python 스크립트를 자식 프로세스로 실행
    // spawn('python', [스크립트경로, 인자1, 인자2, ...]) 형태
    // 이 명령어는 터미널에서 `python face_emotion_analyzer.py "임시저장된_영상파일경로.mp4"` 를 실행하는 것과 같습니다.
    // mac = python3 , window = python
    const pythonProcess = spawn("python", [pythonScriptPath, videoFilePath]);

    // 5. Python 스크립트의 출력(stdout)과 에러(stderr) 받기
    // Python 스크립트가 print()로 출력하는 내용이 이 'data' 이벤트로 넘어옵니다.
    pythonProcess.stdout.on("data", (data) => {
      pythonOutput += data.toString();
    });

    // Python 스크립트에서 에러가 발생하면 이 'data' 이벤트로 넘어옵니다.
    pythonProcess.stderr.on("data", (data) => {
      pythonError += data.toString();
      console.error(`Python 스크립트 에러: ${data.toString()}`); // 서버 콘솔에 에러 출력
    });

    // 6. Python 스크립트 프로세스 종료 시 처리
    // Python 스크립트가 실행을 마치면 'close' 이벤트가 발생합니다.
    pythonProcess.on("close", async (code) => {
      // 7. 사용이 끝난 임시 영상 파일 삭제
      fs.unlink(videoFilePath, (err) => {
        if (err) console.error("임시 영상 파일 삭제 실패:", err); // 삭제 실패 시 에러 로깅
      });

      if (code !== 0) {
        // Python 스크립트가 0이 아닌 종료 코드 (오류)로 종료된 경우
        console.error(`Python 스크립트 비정상 종료. 종료 코드: ${code}`);
        console.error(`Python 오류 출력: ${pythonError}`);
        return res.status(500).json({
          message: "안면 인식 분석 중 오류가 발생했습니다.",
          error:
            pythonError ||
            "알 수 없는 Python 스크립트 오류 (종료 코드 " + code + ")",
        });
      }

      try {
        // 여러 줄 중 JSON만 추출
        const jsonLine = pythonOutput
          .split("\n")
          .find(
            (line) => line.trim().startsWith("{") && line.trim().endsWith("}")
          );
        if (!jsonLine)
          throw new Error("Python 출력에서 JSON을 찾을 수 없습니다.");

        faceAnalysisResult = JSON.parse(jsonLine);

        console.log("감정측정결과: " + JSON.stringify(faceAnalysisResult));

        // 9. Measurement 문서 찾기 및 'face' 필드 업데이트
        const updatedMeasurement = await Measurement.findOneAndUpdate(
          { _id: measurementId },
          { $set: { face: faceAnalysisResult } },
          { new: true, runValidators: true }
        );

        if (!updatedMeasurement) {
          return res.status(404).json({
            message:
              "해당 Measurement ID 또는 사용자 ID에 대한 기록을 찾을 수 없습니다.",
          });
        }

        res.status(200).json({
          message: "안면 인식 데이터가 성공적으로 업데이트되고 분석되었습니다.",
          faceAnalysis: faceAnalysisResult,
        });
      } catch (parseError) {
        // Python 출력 파싱 또는 DB 업데이트 중 오류 발생 시
        console.error("Python 출력 파싱 또는 DB 업데이트 오류:", parseError);
        console.error("Python 원본 출력:", pythonOutput);
        res.status(500).json({
          message: "안면 인식 분석 결과 처리 중 오류가 발생했습니다.",
          error: parseError.message,
        });
      }
    });
  } catch (error) {
    // Express 라우트 처리 중 발생한 일반적인 오류 (예: 파일 업로드 자체의 문제)
    console.error("안면 인식 데이터 업데이트 API 처리 중 오류 발생:", error);
    res.status(500).json({
      message: "안면 인식 데이터 업데이트 API 처리 실패.",
      error: error.message,
    });
  }
};

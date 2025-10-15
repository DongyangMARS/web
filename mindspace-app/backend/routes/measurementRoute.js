const express = require("express");
const router = express.Router(); // Express 라우터 인스턴스 생성
const multer = require("multer"); // multer 미들웨어 불러오기
const path = require("path"); // Node.js 내장 모듈 (경로 처리에 필요)
const fs = require("fs"); // Node.js 내장 모듈 (폴더 생성에 필요)

const measurementController = require("../controllers/measurementController");

// --- multer 설정: 파일 저장 경로 및 이름 정의 ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 파일을 임시로 저장할 디렉토리 설정
    // path.join(__dirname, '..', 'uploads')는 'routes' 폴더의 상위 폴더인 'backend' 안에 'uploads' 폴더를 가리킵니다.
    const uploadDir = path.join(__dirname, "..", "uploads");

    // 이 'uploads' 폴더가 없으면 자동으로 생성합니다. (재귀적으로 생성)
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir); // 파일을 저장할 디렉토리를 multer에게 알려줍니다.
  },
  filename: function (req, file, cb) {
    // 저장될 파일의 이름 설정 (중복되지 않도록 고유하게 만듭니다)
    // file.fieldname: 프론트엔드에서 FormData.append('이름', 파일) 했을 때의 '이름' (여기서는 'video'가 될 것입니다)
    // Date.now(): 현재 시간을 밀리초로 나타낸 고유한 숫자
    // path.extname(file.originalname): 원본 파일의 확장자 (예: .mp4, .jpg)
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// multer 인스턴스 생성: 위에서 설정한 저장 방식과 파일 크기 제한을 적용합니다.
const upload = multer({
  storage: storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 최대 20MB 파일 허용 (15초 영상에 적합하도록 설정, 필요에 따라 조정 가능)
});
// --- multer 설정 끝 --
console.log(
  "faceMeasurementSession:",
  measurementController.faceMeasurementSession
);

router.post("/survey", measurementController.startMeasurementSession);
router.post(
  "/:measurementId/face",
  upload.single("video"),
  measurementController.faceMeasurementSession
); //

module.exports = router; // 이 라우터 인스턴스를 외부로 내보냅니다.

import os
import cv2
import numpy as np
# from keras.models import load_model
from tensorflow.keras.models import load_model
import sys      # <--- 추가: 명령줄 인자를 받기 위함
import json     # <--- 추가: 결과를 JSON 형식으로 표준 출력하기 위함

# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' # <--- 이 줄을 추가해야 합니다!
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2' 


# --- 표준 에러 출력 리디렉션 (추가) ---
# 모든 표준 에러 출력을 /dev/null (출력되지 않는 곳)으로 보냅니다.
# 이렇게 하면 Express 서버가 stderr에서 경고 메시지를 받지 않게 됩니다.
# 실제 프로덕션 환경에서는 로깅 설정을 더 신중하게 해야 할 수 있습니다.
# sys.stderr = open(os.devnull, 'w') # <--- 이 두 줄을 추가!



# CNN 모델 & HaarCascade 경로 설정
# 현재 스크립트 파일 기준으로 상대 경로를 지정합니다.
# 이 스크립트가 `python_scripts` 폴더에 있고, `cnn` 폴더가 그 안에 있다고 가정합니다.
modelPath = os.path.join(os.path.dirname(__file__), "cnn", "emotion_model.h5")
cascadePath = os.path.join(os.path.dirname(__file__), "cnn", "haarcascade_frontalface_default.xml")

# 모델 & 얼굴 분류기 로딩 (스크립트 실행 시 1회만)
# 로딩 실패 시 바로 종료되도록 예외 처리 추가
try:
    model = load_model(modelPath)
    faceClassifier = cv2.CascadeClassifier(cascadePath)
    classLabels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']
except Exception as e:
    # 모델 로딩 실패 시 에러를 표준 에러로 출력하고 스크립트 종료
    print(json.dumps({"error": f"모델 또는 분류기 로딩 실패: {str(e)}", "detail": "emotion_model.h5 또는 haarcascade_frontalface_default.xml 파일 경로를 확인하세요."}), file=sys.stderr)
    sys.exit(1) # 오류로 인해 스크립트 종료

def analyzeVideo(videoPath):
    """
    영상 파일을 받아서 프레임별로 얼굴 감정 예측 후 전체 평균 벡터와 에러 메시지를 반환
    """
    cap = cv2.VideoCapture(videoPath)
    if not cap.isOpened():
        # 비디오 파일을 열 수 없으면 None과 함께 에러 메시지 반환
        return None, f"비디오 파일을 열 수 없습니다: {videoPath}"

    accumulatedPreds = []

    while True:
        ret, frame = cap.read()
        if not ret: # 프레임을 더 이상 읽을 수 없으면 (비디오 끝)
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = faceClassifier.detectMultiScale(gray, 1.3, 5)

        for (x, y, w, h) in faces:
            roiGray = gray[y:y+h, x:x+w]
            # ROI 크기 유효성 검사 (0x0 크기 방지)
            if roiGray.shape[0] == 0 or roiGray.shape[1] == 0:
                continue

            roiGray = cv2.resize(roiGray, (48, 48))
            
            # ROI에 유효한 픽셀이 있는지 확인 (모두 0인 경우 방지)
            if roiGray.sum() != 0: 
                roi = roiGray.astype("float32") / 255.0
                roi = np.expand_dims(roi, axis=-1)
                roi = np.expand_dims(roi, axis=0)  # (1, 48, 48, 1)
                
                preds = model.predict(roi, verbose=0)[0]
                accumulatedPreds.append(preds)

    cap.release() # 비디오 캡처 객체 해제

    if accumulatedPreds:
        avgPreds = np.mean(accumulatedPreds, axis=0)
        # 성공 시 평균 예측값 리스트와 함께 에러 메시지는 None으로 반환
        return avgPreds.tolist(), None 
    else:
        # 영상에서 얼굴이 감지되지 않았을 경우 None과 함께 메시지 반환
        return None, "영상에서 얼굴이 감지되지 않았습니다."


# --- 스크립트가 직접 실행될 때 (Express에서 호출될 때) 이 부분이 실행됩니다. ---
if __name__ == "__main__":
    # 명령줄 인자(sys.argv)를 통해 Express로부터 비디오 파일 경로를 받습니다.
    # 예: python face_emotion_analyzer.py "path/to/your/video.mp4"
    if len(sys.argv) < 2:
        # 비디오 파일 경로 인자가 없으면 오류 메시지 출력 후 종료
        print(json.dumps({"error": "비디오 파일 경로가 필요합니다. 사용법: python script.py <video_path>"}), file=sys.stderr)
        sys.exit(1) # 오류로 인해 스크립트 종료

    videoPath = sys.argv[1] # 첫 번째 명령줄 인자가 비디오 파일 경로

    # analyzeVideo 함수 호출하여 분석 수행
    avg_preds_list, error_message = analyzeVideo(videoPath)

    if error_message:
        # analyzeVideo 함수에서 에러 메시지가 반환된 경우 (비디오 열기 실패, 얼굴 미감지 등)
        print(json.dumps({"error": error_message}), file=sys.stderr)
        sys.exit(1) # 오류로 인해 스크립트 종료
    elif avg_preds_list:
        # 성공적으로 분석 결과를 받은 경우
        # 7개 감정의 평균 확률을 JSON 객체로 만듭니다. (Key: 감정 이름, Value: 확률)
        outputDict = {
            classLabels[i].lower(): float(avg_preds_list[i]) for i in range(len(classLabels))
        }
        
        # 최종 결과를 JSON 문자열로 변환하여 표준 출력(콘솔)으로 내보냅니다.
        # Express 서버는 이 출력(텍스트)을 읽어서 파싱하게 됩니다.
        print(json.dumps(outputDict))
        sys.exit(0) # 정상 종료
    else:
        # 예상치 못한 상황 (avg_preds_list도 None이고 error_message도 없는 경우)
        print(json.dumps({"error": "알 수 없는 오류로 비디오 분석에 실패했습니다."}), file=sys.stderr)
        sys.exit(1) # 오류로 인해 스크립트 종료
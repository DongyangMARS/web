import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import axios from "axios";
import { EMOTION_COLORS } from "../common/constants";

export default function CameraComponent({ onEmotionDetected, onRecordStart }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showEnd, setShowEnd] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false); // 분석 중 상태 추가

  const recordVideo = async () => {
    if (!cameraRef.current || isRecording || isAnalyzing) return;

    if (onRecordStart) onRecordStart();

    setCountdown(15);
    setIsRecording(true);

    // 카운트다운 타이머
    let timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setShowEnd(true);
          setTimeout(() => {
            setShowEnd(false);
            setCountdown(null);
            setIsRecording(false);
            setIsAnalyzing(true); // 분석 중 상태로 전환
          }, 3000);
        }
        return prev - 1;
      });
    }, 1000);

    try {
      console.log("녹화 시작...");
      const videoRecordPromise = cameraRef.current.recordAsync({
        quality: "360p",
        maxDuration: 15,
        mute: true,
      });

      if (videoRecordPromise) {
        const data = await videoRecordPromise;
        console.log("녹화 완료! 영상 파일 경로:", data.uri);

        setIsAnalyzing(true); // 업로드 시작 시 분석 중으로 전환

        try {
          const formData = new FormData();
          formData.append("video", {
            uri: data.uri,
            name: "recorded_video.mp4",
            type: "video/mp4",
          });

          const mearsurementId = "6875e9d2f651c4be1ecc73c3";

          const response = await axios.post(
            `http://172.30.1.60:5001/api/measurements/${mearsurementId}/face`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log("업로드 성공:", response.data);

          if (response.data) {
            const emotions = Object.entries(response.data.faceAnalysis).map(
              ([name, value]) => {
                const label = name.charAt(0).toUpperCase() + name.slice(1);
                return {
                  name: label,
                  percentage: Math.round(value * 100),
                  color: EMOTION_COLORS[label] || "#333",
                };
              }
            );
            onEmotionDetected(emotions);
          }
        } catch (uploadErr) {
          Alert.alert("얼굴 분석 실패", "다시 시도해주세요.");
        } finally {
          setIsAnalyzing(false); // 분석 끝나면 원래대로
        }
      }
    } catch (e) {
      console.error("녹화 중 에러 발생:", e);
      setIsAnalyzing(false);
    }
  };

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text>카메라 권한이 필요합니다.</Text>
        <Button onPress={requestPermission} title="권한 요청" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          mode="video"
          facing="front"
        />
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={[
              styles.recordButton,
              isRecording && styles.recordButtonRecording,
              isAnalyzing && styles.recordButtonAnalyzing,
            ]}
            onPress={recordVideo}
            disabled={isRecording || countdown !== null || isAnalyzing}
          >
            <Text style={styles.buttonText}>
              {isAnalyzing
                ? "분석 중"
                : showEnd
                ? "녹화 종료"
                : countdown !== null
                ? `녹화 중 (${countdown}초)`
                : "녹화 시작"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  videoPreview: {
    width: "100%",
    height: "100%",
  },
  previewText: { color: "white" },
  cameraContainer: { flex: 1 }, // 남은 공간 차지
  camera: { flex: 1 },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  controlsContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  recordButton: {
    width: 120,
    height: 50,
    borderRadius: 25,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  recordButtonRecording: { backgroundColor: "red" },
  recordButtonAnalyzing: { backgroundColor: "#9D9D9D" }, // 분석 중일 때 회색
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

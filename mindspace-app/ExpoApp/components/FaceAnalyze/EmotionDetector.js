import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import CameraComponent from "./CameraComponent";
import EmotionAnalysisComponent from "./EmotionAnalysis";

export default function EmotionDetector() {
  const [emotions, setEmotions] = useState([]);

  // 감정 감지 콜백 함수
  const handleEmotionDetected = (newEmotions) => {
    setEmotions(newEmotions);
  };

  // 녹화 시작 시 감정 초기화
  const handleRecordStart = () => {
    setEmotions([]);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      {/* 전체화면 카메라 */}
      <View style={styles.fullScreenCamera}>
        <CameraComponent
          onEmotionDetected={handleEmotionDetected}
          onRecordStart={handleRecordStart}
        />

        {/* 감정 분석 오버레이 */}
        <View style={styles.emotionOverlay}>
          <EmotionAnalysisComponent emotions={emotions} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  fullScreenCamera: {
    flex: 1,
    position: "relative",
    flexDirection: "row",
  },
  emotionOverlay: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -220 }], // 중앙 정렬을 위한 조정
    width: 240,
    zIndex: 10,
  },
});

import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import axios from "axios";

const ScoreResult = ({ userId, pssScore, baiScore, bdiScore, onComplete }) => {
  useEffect(() => {
    const sendSurveyResult = async () => {
      try {
        if (!userId || typeof pssScore !== "number" || typeof baiScore !== "number" || typeof bdiScore !== "number") {
          Alert.alert("입력 오류", "사용자 ID와 점수는 모두 숫자여야 합니다.");
          return;
        }

        const response = await axios.post("https://your-server-url.com/api/measurements", {
          userId: userId,
          surveyResults: {
            pssScore: pssScore,
            bdiScore: bdiScore,
            baiScore: baiScore,
          },
        });

        if (response.status === 201) {
          const { measurementId, emotion } = response.data;
          Alert.alert("성공", `감정 측정 세션이 시작되었습니다.\n감정: ${emotion}`);
          if (onComplete) onComplete(measurementId); // 다음 단계로 넘길 수 있게
        } else {
          Alert.alert("서버 응답 오류", "예상치 못한 응답입니다.");
        }
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400) {
            Alert.alert("요청 오류", data.message || "필수 값 누락");
          } else if (status === 500) {
            Alert.alert("서버 오류", data.message || "서버 내부 에러 발생");
          } else {
            Alert.alert("에러", "알 수 없는 오류 발생");
          }
        } else {
          Alert.alert("네트워크 오류", "서버에 연결할 수 없습니다.");
        }
      }
    };

    sendSurveyResult();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>결과 저장 중...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default ScoreResult;
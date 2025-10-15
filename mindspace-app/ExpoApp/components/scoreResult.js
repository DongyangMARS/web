import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import axios from "axios";

const ScoreResult = ({
  userId,
  pssScore,
  baiScore,
  bdiScore,
  setSurveyStep,
}) => {
  useEffect(() => {
    if (!userId) {
      Alert.alert("400 Bad Request", "사용자 ID와 설문조사 결과는 필수");
      return;
    }

    if (
      typeof pssScore !== "number" ||
      typeof baiScore !== "number" ||
      typeof bdiScore !== "number"
    ) {
      Alert.alert(
        "400 Bad Request",
        "설문조사 점수(pssScore, bdiScore, baiScore)는 숫자"
      );
      return;
    }

    const payload = {
      userId: "6875e9d2f651c4be1ecc73c3",
      surveyResults: {
        pssScore,
        bdiScore,
        baiScore,
      },
    };

    axios
      .post("http://172.30.1.62:5001/api/measurements/survey", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSurveyStep(5);
        console.log("서버 응답 데이터:", response.data);
        const { message, measurementId, emotion } = response.data;

        if (
          (message === "측정이 시작되고 설문조사 결과가 저장되었습니다." ||
            message ===
              "측정 세션이 시작되고 설문조사 결과가 저장되었습니다.") &&
          measurementId &&
          emotion
        ) {
          // Alert.alert(`emotion: ${emotion}`);
          // if (setSurveyStep) {
          //   setSurveyStep(5);
          // }
        } else {
          Alert.alert("서버 응답", "예상치 못한 응답입니다.");
        }
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;

          if (
            status === 400 &&
            data.message === "사용자 ID와 설문조사 결과는 필수"
          ) {
            Alert.alert("400 Bad Request", "사용자 ID와 설문조사 결과는 필수");
          } else if (
            status === 400 &&
            data.message ===
              "설문조사 점수(pssScore, bdiScore, baiScore)는 숫자"
          ) {
            Alert.alert(
              "400 Bad Request",
              "설문조사 점수(pssScore, bdiScore, baiScore)는 숫자"
            );
          } else if (
            status === 500 &&
            data.message ===
              "측정 세션 시작 및 설문조사 결과 저장에 실패했습니다." &&
            data.error
          ) {
            Alert.alert(
              "500 Server Error",
              `측정 세션 시작 및 설문조사 결과 저장에 실패했습니다.\n\n에러: ${data.error}`
            );
          } else {
            Alert.alert(
              `오류 ${status}`,
              data.message || "알 수 없는 오류입니다."
            );
          }
        } else {
          Alert.alert("요청 실패", "서버에 연결할 수 없습니다.");
        }
      });
  }, [userId, pssScore, baiScore, bdiScore]);

  const total = pssScore + baiScore + bdiScore;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>자가진단 점수 전송 중...</Text>
      <Text style={styles.text}>총합 점수: {total}</Text>
    </View>
  );
};

export default ScoreResult;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },
});

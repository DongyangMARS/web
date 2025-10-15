import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function Survey_result({
  pssScore,
  baiScore,
  bdiScore,
  setSaveScore,
}) {
  const formSubmit = () => {
    Alert.alert("홈으로");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* 설명 영역 */}
      <View style={styles.BDI_survey_info_area}>
        <Text style={styles.titleLarge}>자가진단 결과</Text>
        <Text style={styles.descWhite}>
          PSS (스트레스 척도 검사), BAI (불안 척도 검사), BDI (정신 척도 검사)
        </Text>
      </View>

      {/* 스트레스 (PSS) 영역 */}
      <View style={styles.section}>
        <View style={[styles.leftBox, { paddingLeft: "10%" }]}>
          <Text style={styles.emoji}>😡</Text>
          <View style={styles.texts}>
            <Text style={styles.title}>스트레스 (PSS)</Text>
            <Text style={styles.desc}>
              지난 한 달간 스트레스를 얼마나 느꼈는지를 평가합니다.
            </Text>
          </View>
        </View>
        <View style={[styles.rightBox, { paddingRight: "15%" }]}>
          <Text style={styles.score}>
            <Text style={styles.leftScore}>{pssScore}점</Text>
            <Text style={styles.rightScore}> / 40점</Text>
          </Text>
        </View>
      </View>

      {/* 불안 (BAI) 영역 */}
      <View style={styles.section}>
        <View style={[styles.leftBox, { paddingLeft: "10%" }]}>
          <Text style={styles.emoji}>😰</Text>
          <View style={styles.texts}>
            <Text style={styles.title}>불안 (BAI)</Text>
            <Text style={styles.desc}>
              신체적, 정서적 불안 수준을 평가합니다.
            </Text>
          </View>
        </View>
        <View style={[styles.rightBox, { paddingRight: "15%" }]}>
          <Text style={styles.score}>
            <Text style={styles.leftScore}>{baiScore}점</Text>
            <Text style={styles.rightScore}> / 63점</Text>
          </Text>
        </View>
      </View>

      {/* 정신 (BDI) 영역 */}
      <View style={styles.section}>
        <View style={[styles.leftBox, { paddingLeft: "10%" }]}>
          <Text style={styles.emoji}>🧠</Text>
          <View style={styles.texts}>
            <Text style={styles.title}>정신 (BDI)</Text>
            <Text style={styles.desc}>
              슬픔, 무기력, 수면장애 등 우울 증상의 강도를 평가합니다.
            </Text>
          </View>
        </View>
        <View style={[styles.rightBox, { paddingRight: "15%" }]}>
          <Text style={styles.score}>
            <Text style={styles.leftScore}>{bdiScore}점</Text>
            <Text style={styles.rightScore}> / 63점</Text>
          </Text>
        </View>
      </View>

      {/* 완료 버튼 */}
      <View style={styles.submit_area}>
        <TouchableOpacity onPress={formSubmit} style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>홈으로</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  BDI_survey_info_area: {
    backgroundColor: "#1D3162",
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  titleLarge: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  descWhite: {
    color: "#FFFFFF",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  section: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 230,
  },
  leftBox: {
    width: "60%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  rightBox: {
    width: "40%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  emoji: {
    fontSize: 50,
    marginRight: 10,
  },
  texts: {
    flexDirection: "column",
    flexShrink: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333333",
  },
  desc: {
    fontSize: 20,
    color: "#333333",
  },
  score: {
    fontSize: 32,
    fontWeight: "bold",
  },
  leftScore: {
    color: "#9B111E",
  },
  rightScore: {
    color: "#1D3162",
  },
  submit_area: {
    padding: 20,
    alignItems: "center",
  },
  submitBtn: {
    backgroundColor: "#1D3162",
    width: 120,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  submitBtnText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "500",
  },
});

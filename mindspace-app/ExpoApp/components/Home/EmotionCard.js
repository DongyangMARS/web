// EmotionCard.js
// 설문 기반 감정 점수 카드 컴포넌트. 점수, 변화 추이, 아이콘 표시
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import * as Progress from "react-native-progress";
import { AntDesign } from "@expo/vector-icons";

// data: {type, currentScore, prevScore, trend, color}
const EmotionCard = ({ data }) => {
  // 점수 퍼센트 계산
  const progress = data.currentScore / 100;
  // 점수 변화량 계산
  const scoreDiff = data.currentScore - data.prevScore;
  let trendIconName;
  let trendIconColor;
  let diffText;

  // 변화량에 따라 아이콘/색상/텍스트 결정
  if (scoreDiff > 0) {
    trendIconName = "arrowup";
    trendIconColor = "red";
    diffText = `${scoreDiff}`;
  } else if (scoreDiff < 0) {
    trendIconName = "arrowdown";
    trendIconColor = "blue";
    diffText = `${scoreDiff * -1}`;
  } else {
    trendIconName = "minus";
    trendIconColor = "gray";
    diffText = `0`;
  }

  return (
    <View style={styles.emotionCard}>
      {/* 감정 종류 */}
      <Text style={styles.emotionCardTitle}>{data.type}</Text>
      {/* 원형 프로그레스바로 점수 시각화 */}
      <Progress.Circle
        progress={progress}
        size={80}
        showsText={false}
        color={data.color}
        unfilledColor="#E0E0E0"
        thickness={5}
        borderWidth={0}
      >
        {/* 중앙 점수 및 변화량 */}
        <View style={styles.circleContent}>
          <Text style={styles.circleScoreText}>{data.currentScore}</Text>
          <View style={styles.trendContainer}>
            <AntDesign name={trendIconName} size={20} color={trendIconColor} />
            <Text style={[styles.trendDiffText, { color: trendIconColor }]}>
              {diffText}
            </Text>
          </View>
        </View>
      </Progress.Circle>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const isLandscape = screenWidth > screenHeight;
const containerPaddingHorizontal = isLandscape ? 40 : 20;
const leftSidebarWidth = isLandscape ? screenWidth * 0.25 : 0;

const styles = StyleSheet.create({
  emotionCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginVertical: 5,
    width: isLandscape
      ? (screenWidth -
          leftSidebarWidth -
          containerPaddingHorizontal * 2 -
          20 * 2 -
          30) /
        3
      : `32%`,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  emotionCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  circleContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  circleScoreText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  trendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  trendDiffText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default EmotionCard;

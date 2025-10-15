// FacialEmotionResultCard.js
// 얼굴 감정 분석 결과를 시각적으로 보여주는 카드 컴포넌트
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { EMOTION_COLORS } from "../common/constants";

// data: {dominant, breakdown: [{emotion, percentage}]}
const FacialEmotionResultCard = ({ data, isLandscape, screenWidth }) => {
  return (
    <View style={styles.facialEmotionResultCard}>
      {/* 현재 지배적 감정 */}
      <Text style={styles.facialCardTitle}>Current Emotion</Text>
      <Text
        style={[
          styles.facialMainEmotionText,
          {
            color:
              EMOTION_COLORS[data.dominant.emotion] || EMOTION_COLORS.Neutral,
          },
        ]}
      >
        {data.dominant.emotion}
      </Text>
      <Text style={styles.facialMainEmotionPercentage}>
        {data.dominant.percentage}%
      </Text>

      {/* 감정별 퍼센트 바 시각화 */}
      <View style={styles.facialProgressBarContainer}>
        {data.breakdown.map((item, index) => (
          <View key={index} style={styles.facialProgressBarItem}>
            <Text style={styles.facialProgressBarLabel}>{item.emotion}:</Text>
            <Progress.Bar
              progress={item.percentage / 100}
              width={isLandscape ? 200 : screenWidth * 0.4}
              height={8}
              color={EMOTION_COLORS[item.emotion] || "#E0E0E0"}
              unfilledColor="#F0F0F0"
              borderRadius={4}
              borderWidth={0}
            />
            <Text style={styles.facialProgressBarPercentage}>
              {item.percentage}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  facialEmotionResultCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  facialCardTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  facialMainEmotionText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 0,
  },
  facialMainEmotionPercentage: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  facialProgressBarContainer: {
    width: "100%",
  },
  facialProgressBarItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  facialProgressBarLabel: {
    fontSize: 14,
    color: "#333",
    flex: 0.3,
  },
  facialProgressBarPercentage: {
    fontSize: 14,
    color: "#333",
    marginLeft: 5,
    width: 40,
    textAlign: "right",
  },
});

export default FacialEmotionResultCard;

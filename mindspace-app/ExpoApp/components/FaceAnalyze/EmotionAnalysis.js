import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EmotionAnalysis({ emotions = [] }) {
  // 현재 가장 높은 감정을 찾습니다
  const mainEmotion =
    emotions.length > 0
      ? emotions.reduce((prev, current) =>
          prev.percentage > current.percentage ? prev : current
        ).name
      : "No Data";

  // 메인 감정의 색상을 가져옵니다
  const mainEmotionColor =
    emotions.find((e) => e.name === mainEmotion)?.color || "#333";

  return (
    <View style={styles.container}>
      {/* 상단 요약: 현재 가장 지배적인 감정 강조 */}
      <View style={styles.dominantEmotionDisplay}>
        <Text style={styles.dominantEmotionLabel}>Current Emotion</Text>
        <Text style={[styles.dominantEmotionText, { color: mainEmotionColor }]}>
          {mainEmotion}
        </Text>
        <Text
          style={[
            styles.dominantEmotionPercentage,
            { color: mainEmotionColor },
          ]}
        >
          {emotions.find((e) => e.name === mainEmotion)?.percentage || 0}%
        </Text>
      </View>

      {/* 모든 감정 리스트 (스크롤 없음) */}
      <View style={styles.emotionList}>
        {emotions.map((emotion) => (
          <View key={emotion.name} style={styles.emotionItem}>
            <View style={styles.emotionTextRow}>
              <Text style={styles.emotionName}>{emotion.name}</Text>
              <Text style={styles.emotionPercentage}>
                {emotion.percentage}%
              </Text>
            </View>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${emotion.percentage}%`,
                    backgroundColor: emotion.color,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      {/* 감정 데이터가 없을 때 표시 */}
      {emotions.length === 0 && (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>감정 데이터를 분석 중...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  dominantEmotionDisplay: {
    alignItems: "center",
    marginBottom: 20,
  },
  dominantEmotionLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  dominantEmotionText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dominantEmotionPercentage: {
    fontSize: 24,
    color: "#555",
    fontWeight: "bold",
  },
  emotionList: {
    // ScrollView 제거하고 일반 View로 변경
  },
  emotionItem: {
    marginBottom: 12,
  },
  emotionTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  emotionName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  emotionPercentage: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "rgba(224, 224, 224, 0.7)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

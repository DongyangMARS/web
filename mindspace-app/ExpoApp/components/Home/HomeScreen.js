// HomeScreen.js
// 홈 화면: 인사, 설문 감정 카드, 얼굴 감정 분석 결과 표시
import { View, Text, StyleSheet, Dimensions } from "react-native";
import EmotionCard from "./EmotionCard";
import FacialEmotionResultCard from "./FacialEmotionResultCard";

const HomeScreen = ({
  userName,
  surveyBasedEmotionScores,
  recentFacialEmotionDataForHome,
  handleDummyFeatureClick,
  isLandscape,
  screenWidth,
}) => {
  return (
    <View style={styles.contentContainer}>
      {/* 사용자 인사 */}
      <Text style={styles.greeting}>안녕하세요 {userName}님</Text>

      {/* 최근 감정 추이 (설문 기반) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>최근 감정 추이 (설문)</Text>
        <View style={styles.emotionCardsContainer}>
          {surveyBasedEmotionScores.map((data, index) => (
            <EmotionCard key={index} data={data} />
          ))}
        </View>
      </View>

      {/* 최근 얼굴 감정 분석 결과 (바 형태로) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>최근 얼굴 감정 분석 결과</Text>
        <FacialEmotionResultCard
          data={recentFacialEmotionDataForHome}
          isLandscape={isLandscape}
          screenWidth={screenWidth}
        />
      </View>

      <View style={{ height: 50 }} />
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const isLandscape = screenWidth > screenHeight;
const containerPaddingHorizontal = isLandscape ? 40 : 20;
const leftSidebarWidth = isLandscape ? screenWidth * 0.25 : 0;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: containerPaddingHorizontal,
    paddingVertical: 60,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  section: {
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#555",
  },
  emotionCardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: "#6200EE",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;

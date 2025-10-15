import { useEffect, useState } from "react";
import { View, ScrollView, Dimensions, Alert, StyleSheet } from "react-native";
import HomeScreen from "../Home/HomeScreen";
import HistoryScreen from "../History/HistoryScreen";
import EmotionDetector from "../FaceAnalyze/EmotionDetector";
import Sidebar from "./Sidebar";
import { EMOTION_COLORS } from "../common/constants";
import PSS_survey from "../../PSS_survey";
import BAI_survey from "../../BAI_survey";
import BDI_survey from "../../BDI_survey";
import ScoreResult from "../scoreResult";
import Survey_result from "../../Survey_result";
import MindWaveMobile from "react-native-mindwave-mobile";

const screenWidth = Dimensions.get("window").width;
const containerPaddingHorizontal = 40;
const leftSidebarWidth = screenWidth * 0.2;

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("홈");
  const userName = "사용자";
  const currentOverallEmotion = { emotion: "중립", percentage: 95 };
  const [surveyStep, setSurveyStep] = useState(1);

  const mwm = new MindWaveMobile();

  mwm.scan();
  mwm.onFoundDevice((device) => {
    console.log(device);
  });

  // 점수 총합 데이터
  const [pssScore, setPssScore] = useState(0);
  const [baiScore, setBaiScore] = useState(0);
  const [bdiScore, setBdiScore] = useState(0);

  useEffect(() => {
    console.log("전체 점수", pssScore, baiScore, bdiScore);

    const total = pssScore + baiScore + bdiScore;
    console.log("총합 점수:", total);
  }, [pssScore, baiScore, bdiScore]);

  // 설문 기반 감정 점수 더미 데이터
  const surveyBasedEmotionScores = [
    {
      type: "불안",
      currentScore: 15,
      prevScore: 12,
      trend: "up",
      color: "#FF6347",
    },
    {
      type: "우울",
      currentScore: 8,
      prevScore: 10,
      trend: "down",
      color: "#4682B4",
    },
    {
      type: "스트레스",
      currentScore: 20,
      prevScore: 20,
      trend: "same",
      color: "#DAA520",
    },
  ];

  // 최근 얼굴 감정 분석 결과 더미 데이터
  const recentFacialEmotionDataForHome = {
    breakdown: [
      { emotion: "Angry", percentage: 7 },
      { emotion: "Disgust", percentage: 1 },
      { emotion: "Fear", percentage: 14 },
      { emotion: "Happy", percentage: 20 },
      { emotion: "Sad", percentage: 13 },
      { emotion: "Surprise", percentage: 55 },
      { emotion: "Neutral", percentage: 5 },
    ],
    get dominant() {
      return this.breakdown.reduce((prev, current) =>
        prev.percentage > current.percentage ? prev : current
      );
    },
  };

  const recentFacialEmotionDistribution = [
    {
      name: "중립",
      population: 60,
      color: EMOTION_COLORS.Neutral,
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "행복",
      population: 20,
      color: EMOTION_COLORS.Happy,
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "슬픔",
      population: 10,
      color: EMOTION_COLORS.Sad,
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "놀라움",
      population: 10,
      color: EMOTION_COLORS.Surprise,
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "분노",
      population: 5,
      color: EMOTION_COLORS.Angry,
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "혐오",
      population: 5,
      color: EMOTION_COLORS.Disgust,
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "두려움",
      population: 0,
      color: EMOTION_COLORS.Fear,
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];
  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: "6", strokeWidth: "0" },
    fillShadowGradientFromOpacity: 0, // 시작 지점 투명도
    fillShadowGradientToOpacity: 0, // 끝 지점 투명도
  };

  // 1. 설문 점수 추이 데이터 (LineChart용)
  const surveyLineChartData = {
    labels: [
      "7월 1일",
      "7월 2일",
      "7월 3일",
      "7월 4일",
      "7월 5일",
      "7월 6일",
      "7월 7일",
      "7월 8일",
      "7월 9일",
      "7월 10일",
    ],
    datasets: [
      {
        name: "불안",
        data: [25, 30, 35, 55, 70, 85, 90, 88, 40, 20],
        color: (opacity = 1) => `#FF6347`,
      },
      {
        name: "우울",
        data: [10, 12, 15, 20, 35, 50, 60, 55, 30, 15],
        color: (opacity = 1) => `#4682B4`,
      },
      {
        name: "스트레스",
        data: [30, 35, 40, 65, 80, 95, 90, 85, 30, 15],
        color: (opacity = 1) => `#DAA520`,
      },
    ],
  };

  // 2. 감정 측정 추이 데이터 (LineChart용)
  const facialEmotionLineChartData = {
    labels: [
      "7월 1일",
      "7월 2일",
      "7월 3일",
      "7월 4일",
      "7월 5일",
      "7월 6일",
      "7월 7일",
      "7월 8일",
      "7월 9일",
      "7월 10일",
    ],
    datasets: [
      {
        name: "Happy",
        data: [30, 25, 20, 10, 5, 5, 8, 10, 60, 55],
        color: (opacity = 1) =>
          EMOTION_COLORS.Happy.replace(", 1)", `, ${opacity})`),
      },
      {
        name: "Sad",
        data: [5, 5, 8, 10, 15, 25, 30, 25, 10, 5],
        color: (opacity = 1) =>
          EMOTION_COLORS.Sad.replace(", 1)", `, ${opacity})`),
      },
      {
        name: "Surprise",
        data: [2, 1, 2, 3, 10, 5, 3, 2, 15, 5],
        color: (opacity = 1) =>
          EMOTION_COLORS.Surprise.replace(", 1)", `, ${opacity})`),
      },
      {
        name: "Angry",
        data: [1, 2, 1, 5, 8, 12, 10, 5, 2, 1],
        color: (opacity = 1) =>
          EMOTION_COLORS.Angry.replace(", 1)", `, ${opacity})`),
      },
      {
        name: "Disgust",
        data: [1, 1, 2, 1, 2, 3, 2, 1, 1, 1],
        color: (opacity = 1) =>
          EMOTION_COLORS.Disgust.replace(", 1)", `, ${opacity})`),
      },
      {
        name: "Fear",
        data: [3, 4, 5, 10, 15, 20, 18, 12, 5, 3],
        color: (opacity = 1) =>
          EMOTION_COLORS.Fear.replace(", 1)", `, ${opacity})`),
      },
      {
        name: "Neutral",
        data: [58, 62, 62, 56, 45, 30, 29, 40, 7, 20],
        color: (opacity = 1) =>
          EMOTION_COLORS.Neutral.replace(", 1)", `, ${opacity})`),
      },
    ],
  };

  const handleDummyFeatureClick = (featureName) => {
    Alert.alert(
      "기능 없음",
      `"${featureName}" 기능은 현재 구현되지 않았습니다.`
    );
  };
  if (activeTab === "감정 측정") {
    return (
      <View style={{ flex: 1 }}>
        <EmotionDetector />
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleDummyFeatureClick={handleDummyFeatureClick}
          overlay
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleDummyFeatureClick={handleDummyFeatureClick}
      />
      <View style={styles.viewContainer}>
        {activeTab === "홈" && (
          <ScrollView>
            <HomeScreen
              userName={userName}
              surveyBasedEmotionScores={surveyBasedEmotionScores}
              recentFacialEmotionDataForHome={recentFacialEmotionDataForHome}
              handleDummyFeatureClick={handleDummyFeatureClick}
              isLandscape={true}
              screenWidth={screenWidth}
            />
          </ScrollView>
        )}
        {activeTab === "기록" && (
          <ScrollView>
            <HistoryScreen
              surveyLineChartData={surveyLineChartData}
              facialEmotionLineChartData={facialEmotionLineChartData}
              chartConfig={chartConfig}
              screenWidth={screenWidth}
              leftSidebarWidth={leftSidebarWidth}
              containerPaddingHorizontal={containerPaddingHorizontal}
            />
          </ScrollView>
        )}
        {activeTab === "감정테스트" && (
          <ScrollView>
            {surveyStep === 1 && (
              <PSS_survey
                setSurveyStep={setSurveyStep}
                setSaveScore={setPssScore}
              />
            )}
            {surveyStep === 2 && (
              <BAI_survey
                setSurveyStep={setSurveyStep}
                setSaveScore={setBaiScore}
              />
            )}
            {surveyStep === 3 && (
              <BDI_survey
                setSurveyStep={setSurveyStep}
                setSaveScore={setBdiScore}
              />
            )}
            {surveyStep === 4 && (
              <ScoreResult
                userId={"6878e61c3aeadb20048d1332"}
                pssScore={pssScore}
                baiScore={baiScore}
                bdiScore={bdiScore}
                setSurveyStep={setSurveyStep}
              />
            )}
            {surveyStep === 5 && (
              <Survey_result
                setSurveyStep={setSurveyStep}
                setSaveScore={setBdiScore}
                pssScore={pssScore}
                baiScore={baiScore}
                bdiScore={bdiScore}
              />
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F0F2F5",
  },
  viewContainer: {
    flex: 1,
  },
});

export default LandingPage;

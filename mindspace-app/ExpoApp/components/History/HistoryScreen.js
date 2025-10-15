// HistoryScreen.js
import React, { useState, useRef, useEffect } from "react"; // useRef, useEffect 추가
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const HistoryScreen = ({
  surveyLineChartData,
  facialEmotionLineChartData,
  chartConfig,
  screenWidth,
  leftSidebarWidth,
  containerPaddingHorizontal,
}) => {
  const [visibleSurvey, setVisibleSurvey] = useState(
    surveyLineChartData.datasets.reduce(
      (acc, ds) => ({ ...acc, [ds.name]: true }),
      {}
    )
  );
  const [visibleFacial, setVisibleFacial] = useState(
    facialEmotionLineChartData.datasets.reduce(
      (acc, ds) => ({ ...acc, [ds.name]: true }),
      {}
    )
  );

  // 🚨 핵심: ScrollView를 제어하기 위한 ref 생성
  const surveyScrollRef = useRef(null);
  const facialScrollRef = useRef(null);

  // 🚨 핵심: 탭에 들어갔을 때 (컴포넌트 렌더링 후) 스크롤을 맨 끝으로 이동
  useEffect(() => {
    // 1초 정도의 지연을 주어 렌더링이 확실히 끝난 후 스크롤 실행
    const timer = setTimeout(() => {
      // 설문조사 차트가 7개를 초과하면 스크롤
      if (surveyLineChartData.labels.length > 7) {
        surveyScrollRef.current?.scrollToEnd({ animated: false });
      }
      // 얼굴 감정 차트가 7개를 초과하면 스크롤
      if (facialEmotionLineChartData.labels.length > 7) {
        facialScrollRef.current?.scrollToEnd({ animated: false });
      }
    }, 100); // 레이아웃이 그려질 시간을 확보하기 위해 약간의 딜레이를 줍니다.

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때 한 번만 실행

  const toggleLegend = (name, isSurvey) => {
    if (isSurvey) {
      setVisibleSurvey((prev) => ({ ...prev, [name]: !prev[name] }));
    } else {
      setVisibleFacial((prev) => ({ ...prev, [name]: !prev[name] }));
    }
  };

  const prepareChartDataForDisplay = (originalData) => {
    const labels = [...originalData.labels];
    const datasets = originalData.datasets.map((ds) => ({
      ...ds,
      data: [...ds.data],
    }));
    const dataPoints = labels.length;
    if (dataPoints < 7) {
      const paddingCount = 7 - dataPoints;
      const paddingLabels = Array(paddingCount).fill("");
      labels.push(...paddingLabels);
      datasets.forEach((ds) => {
        const paddingData = Array(paddingCount).fill(null);
        ds.data.push(...paddingData);
      });
    }
    return { labels, datasets };
  };

  const legendWidth = 100;
  const chartScrollViewWidth =
    screenWidth -
    leftSidebarWidth -
    containerPaddingHorizontal * 2 -
    40 -
    legendWidth;

  const getChartContentWidth = (originalData, containerWidth) => {
    const dataPoints = originalData.labels.length;
    if (dataPoints <= 7) {
      return containerWidth;
    } else {
      const singleDataPointWidth = containerWidth / 7;
      return singleDataPointWidth * dataPoints;
    }
  };

  const getVisibleData = (original, visible) => {
    const filtered = original.datasets.filter((ds) => visible[ds.name]);
    const scaleEnforcer = {
      data: Array(original.labels.length).fill(100),
      withDots: false,
      color: () => "transparent",
      strokeWidth: 0,
    };
    return {
      labels: original.labels,
      datasets: [...filtered, scaleEnforcer],
    };
  };

  const renderLegend = (datasets, visible, isSurvey) => (
    <View style={styles.legendContainer}>
      {datasets.map((ds) => (
        <TouchableOpacity
          key={ds.name}
          style={styles.legendItem}
          onPress={() => toggleLegend(ds.name, isSurvey)}
        >
          <View
            style={[
              styles.legendColorBox,
              { backgroundColor: ds.color(1) },
              !visible[ds.name] && { opacity: 0.3 },
            ]}
          />
          <Text
            style={[
              styles.legendText,
              { color: visible[ds.name] ? "#333" : "#aaa" },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {ds.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.pageTitle}>감정 기록 및 추이</Text>

      {/* 설문 점수 추이 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>설문 점수 추이</Text>
        <View style={styles.chartWrapper}>
          <ScrollView
            ref={surveyScrollRef} // ref 연결
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ width: chartScrollViewWidth }}
          >
            <LineChart
              data={getVisibleData(
                prepareChartDataForDisplay(surveyLineChartData),
                visibleSurvey
              )}
              width={getChartContentWidth(
                surveyLineChartData,
                chartScrollViewWidth
              )}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chartStyle}
              fromZero
              segments={5}
            />
          </ScrollView>
          {renderLegend(surveyLineChartData.datasets, visibleSurvey, true)}
        </View>
      </View>

      {/* 얼굴 감정 추이 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>감정 측정 추이</Text>
        <View style={styles.chartWrapper}>
          <ScrollView
            ref={facialScrollRef} // ref 연결
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ width: chartScrollViewWidth }}
          >
            <LineChart
              data={getVisibleData(
                prepareChartDataForDisplay(facialEmotionLineChartData),
                visibleFacial
              )}
              width={getChartContentWidth(
                facialEmotionLineChartData,
                chartScrollViewWidth
              )}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chartStyle}
              fromZero
              segments={5}
            />
          </ScrollView>
          {renderLegend(
            facialEmotionLineChartData.datasets,
            visibleFacial,
            false
          )}
        </View>
      </View>
      <View style={{ height: 50 }} />
    </View>
  );
};

// 스타일시트는 이전과 동일합니다.
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const isLandscape = screenWidth > screenHeight;
const containerPaddingHorizontal = isLandscape ? 40 : 20;
const leftSidebarWidth = isLandscape ? screenWidth * 0.25 : 0;
const legendWidth = 100;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: containerPaddingHorizontal,
    paddingVertical: 60,
  },
  pageTitle: {
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
  chartWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  chartStyle: {
    borderRadius: 16,
  },
  legendContainer: {
    width: legendWidth,
    paddingLeft: 15,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  legendColorBox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    fontWeight: "500",
    flexShrink: 1,
  },
});

export default HistoryScreen;

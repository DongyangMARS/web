import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 사이드바 컴포넌트: 네비게이션 역할, 탭 전환 및 비활성화 기능 제공
const Sidebar = ({
  activeTab, // 현재 활성화된 탭 이름
  setActiveTab, // 탭 변경 함수
  handleDummyFeatureClick, // 비활성화된 기능 클릭 시 호출 함수
  overlay, // 오버레이 스타일 적용 여부
}) => {
  return (
    // 사이드바 전체 컨테이너, overlay prop에 따라 스타일 다름
    <View style={[styles.sidebar, overlay && styles.overlaySidebar]}>
      {/* 앱 로고 및 이름 영역 */}
      {/* <View style={styles.sidebarHeader}>
        <Ionicons name="sparkles" size={30} color="#6200EE" />
        <Text style={styles.appName}>Emotion AI</Text>
      </View> */}
      {/* 홈 탭 버튼 */}
      <TouchableOpacity
        style={[styles.navItem, activeTab === "홈" && styles.activeNavItem]}
        onPress={() => setActiveTab("홈")}
      >
        <Ionicons
          name="home-outline"
          size={24}
          color={activeTab === "홈" ? "#6200EE" : "#333"}
        />
        <Text
          style={[styles.navText, activeTab === "홈" && styles.activeNavText]}
        >
          홈
        </Text>
      </TouchableOpacity>
      {/* 감정 측정 탭 버튼 */}
      <TouchableOpacity
        style={[
          styles.navItem,
          activeTab === "감정 측정" && styles.activeNavItem,
        ]}
        onPress={() => setActiveTab("감정 측정")}
      >
        <Ionicons
          name="camera-outline"
          size={24}
          color={activeTab === "감정 측정" ? "#6200EE" : "#333"}
        />
        <Text
          style={[
            styles.navText,
            activeTab === "감정 측정" && styles.activeNavText,
          ]}
        >
          감정 측정
        </Text>
      </TouchableOpacity>
      {/* 감정 테스트(비활성화) 탭 버튼 */}
      <TouchableOpacity
        style={[
          styles.navItem,
          activeTab === "감정테스트" && styles.activeNavItem,
        ]}
        onPress={() => setActiveTab("감정테스트")}
      >
        <Ionicons
          name="stats-chart-outline"
          size={24}
          color={activeTab === "감정테스트" ? "#6200EE" : "#333"}
        />
        <Text
          style={[
            styles.navText,
            activeTab === "감정테스트" && styles.activeNavText,
          ]}
        >
          감정 테스트
        </Text>
      </TouchableOpacity>
      {/* 기록 탭 버튼 */}
      <TouchableOpacity
        style={[styles.navItem, activeTab === "기록" && styles.activeNavItem]}
        onPress={() => setActiveTab("기록")}
      >
        <Ionicons
          name="stats-chart-outline"
          size={24}
          color={activeTab === "기록" ? "#6200EE" : "#333"}
        />
        <Text
          style={[styles.navText, activeTab === "기록" && styles.activeNavText]}
        >
          기록
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: "20%", // 사이드바 너비 (화면 비율)
    backgroundColor: "#FFFFFF",
    paddingVertical: 130, // 상하 패딩 (로고와 메뉴 간격)
    paddingHorizontal: 20,
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
    alignItems: "flex-start",
  },
  overlaySidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // 오버레이 시 반투명 배경
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
  },
  sidebarHeader: {
    flexDirection: "row", // 로고와 텍스트 가로 배치
    alignItems: "center",
    marginBottom: 40, // 메뉴와의 간격
  },
  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10, // 로고와 텍스트 간격
  },
  navItem: {
    flexDirection: "row", // 아이콘과 텍스트 가로 배치
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
  },
  activeNavItem: {
    backgroundColor: "#E6E6FA", // 활성화 시 배경색
  },
  disabledNavItem: {
    opacity: 0.6, // 비활성화 시 투명도
  },
  navText: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "500",
    color: "#333",
  },
  activeNavText: {
    color: "#6200EE",
    fontWeight: "bold",
  },
  disabledNavText: {
    color: "#999",
  },
});

export default Sidebar;

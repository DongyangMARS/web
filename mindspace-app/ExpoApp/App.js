import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
/* BAI, BDI, PSS 설문조사 import */
import BAI_survey from "./BAI_survey";
import BDI_survey from "./BDI_survey";
import PSS_survey from "./PSS_survey";
import LandingPage from "./components/Landing/LandingPage";

export default function App() {
  return (
    // <View style={styles.container}>
    //   <PSS_survey/>
    // </View>
    <LandingPage />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

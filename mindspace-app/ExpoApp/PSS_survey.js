import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function PSS_survey({ setSurveyStep, setSaveScore }) {
  const [a1, setA1] = useState(null);
  const [a2, setA2] = useState(null);
  const [a3, setA3] = useState(null);
  const [a4, setA4] = useState(null);
  const [a5, setA5] = useState(null);
  const [a6, setA6] = useState(null);
  const [a7, setA7] = useState(null);
  const [a8, setA8] = useState(null);
  const [a9, setA9] = useState(null);
  const [a10, setA10] = useState(null);

  const formSubmit = () => {
    const answers = [ a1, a2, a3, a4, a5, a6, a7, a8, a9, a10 ];
    if (answers.some((a) => a === null)) {
      Alert.alert("알림", "모든 문항에 체크해 주세요.");
      return;
    }
    const sum = answers.reduce((acc, cur) => acc + cur, 0);
    Alert.alert("PSS 자가진단 완료", `총점: ${sum}점`);
    setSaveScore(sum); 
    setSurveyStep(2); 
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.PSS_survey_info_area}>
          <Text style={styles.title}>PSS (스트레스 척도 검사)</Text>
          <Text style={styles.desc}>각 항목에서 당신에게 가장 잘 해당되는 문장을 선택하세요.</Text>
          <Text style={styles.desc}>지난 1개월간의 느낀 스트레스 빈도 상태 기준으로 합니다.</Text>
          <Text style={styles.desc}>[총 10 문항] 각 문항은 0 ~ 4점입니다. (0: 전혀 아님, 4: 매우 자주)</Text>
        </View>

        <Question number={1} text="예기치 못한 일 때문에 얼마나 자주 스트레스를 느꼈나요?" selected={a1} setSelected={setA1} />
        <Question number={2} text="중요한 일들을 통제하지 못하고 있다고 얼마나 자주 느꼈나요?" selected={a2} setSelected={setA2} />
        <Question number={3} text="긴장되거나 스트레스를 느낀 상황에서 짜증을 얼마나 자주 느꼈나요?" selected={a3} setSelected={setA3} />
        <Question number={4} text="당신이 중요한 일을 해결할 수 없을 것 같다고 얼마나 자주 느꼈나요?" selected={a4} setSelected={setA4} />
        <Question number={5} text="모든 일이 내 뜻대로 풀리지 않고 있다고 얼마나 자주 느꼈나요?" selected={a5} setSelected={setA5} />
        <Question number={6} text="어려운 일들이 누적되어 얼마나 자주 압도당한다고 느꼈나요?" selected={a6} setSelected={setA6} />
        <Question number={7} text="일상의 중요한 일들을 통제하지 못하고 있다고 얼마나 자주 느꼈나요?" selected={a7} setSelected={setA7} />
        <Question number={8} text="상황을 통제할 수 없어서 화가 난 적이 얼마나 자주 있었나요?" selected={a8} setSelected={setA8} />
        <Question number={9} text="갑작스러운 상황 변화로 얼마나 자주 당황했나요?" selected={a9} setSelected={setA9} />
        <Question number={10} text="모든 일이 내가 원하지 않는 방향으로 진행되고 있다고 얼마나 자주 느꼈나요?" selected={a10} setSelected={setA10} />

        <View style={styles.submit_area}>
          <TouchableOpacity onPress={formSubmit} style={styles.submitBtn}>
            <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "medium" }}>다음</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

function Question({ number, text, selected, setSelected }) {
  return (
    <View style={styles.questionBlock}>
      <Text style={styles.questionTitle}>{number}. {text}</Text>
      <View style={styles.checkListRow}>
        <Text style={[styles.checkListLabel, { color: "#1D3162" }]}>전혀 아님</Text>
        <View style={styles.options}>
          <TouchableOpacity onPress={() => setSelected(0)} style={[ styles.radio, selected === 0 && styles.blueChecked]} />
          <TouchableOpacity onPress={() => setSelected(1)} style={[ styles.radioSmall, selected === 1 && styles.blueChecked]} />
          <TouchableOpacity onPress={() => setSelected(2)} style={[ styles.radioSmall_center, selected === 2 && styles.grayChecked]} />
          <TouchableOpacity onPress={() => setSelected(3)} style={[ styles.radioSmall, styles.red, selected === 3 && styles.redChecked ]} />
          <TouchableOpacity onPress={() => setSelected(4)} style={[ styles.radio, styles.red, selected === 4 && styles.redChecked ]} />
        </View>
        <Text style={[styles.checkListLabel, { color: "#9B111E" }]}>매우 자주</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  PSS_survey_info_area: {
    backgroundColor: "#1D3162",
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: "center"
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20
  },

  desc: {
    color: "#FFFFFF",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10
  },

  questionBlock: {
    paddingVertical: 40,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    width: "100%"
  },

  questionTitle: {
    fontSize: 24,
    marginBottom: 35,
    textAlign: "center",
    fontWeight: "medium"
  },

  checkListRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 30
  },

  checkListLabel: {
    fontSize: 24,
    width: 150,
    textAlign: "center",
    padding: 20
  },

  options: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  },

  radio: {
    width: 65,
    height: 65,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#1D3162",
    backgroundColor: "#FFFFFF"
  },

  radioSmall: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#1D3162",
    backgroundColor: "#FFFFFF"
  },

  radioSmall_center: {
    width: 40,
    height: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#1D3162",
    backgroundColor: "#FFFFFF"
  },

  red: {
    borderColor: "#9B111E"
  },

  blueChecked: {
    backgroundColor: "#1D3162"
  },

  redChecked: {
    backgroundColor: "#9B111E",
    borderColor: "#9B111E"
  },

  grayChecked: {
    backgroundColor: "#444444",
    borderColor: "#444444"
  },

  submit_area: {
    padding: 20,
    alignItems: "center"
  },

  submitBtn: {
    backgroundColor: "#1D3162",
    width: 120,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
});
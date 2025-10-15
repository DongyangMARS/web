import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function BAI_survey({ setSurveyStep, setSaveScore }) {
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
  const [a11, setA11] = useState(null);
  const [a12, setA12] = useState(null);
  const [a13, setA13] = useState(null);
  const [a14, setA14] = useState(null);
  const [a15, setA15] = useState(null);
  const [a16, setA16] = useState(null);
  const [a17, setA17] = useState(null);
  const [a18, setA18] = useState(null);
  const [a19, setA19] = useState(null);
  const [a20, setA20] = useState(null);
  const [a21, setA21] = useState(null);

  {
    /* Alert창 */
  }
  const formSubmit = () => {
    const answers = [
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13,
      a14,
      a15,
      a16,
      a17,
      a18,
      a19,
      a20,
      a21,
    ];
    if (answers.some((a) => a === null)) {
      Alert.alert("알림", "모든 문항에 체크해 주세요.");
      return;
    }
    const sum = answers.reduce((acc, cur) => acc + cur, 0);
    Alert.alert(" BAI 자가진단 완료", `총점: ${sum}점`);
    setSaveScore(sum); // 점수 저장
    setSurveyStep(3); // 설문 완료 후 다음 단계로 이동
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* BAI (불안 척도 검사) 파란 배경 영역 */}
        <View style={styles.BAI_survey_info_area}>
          <Text style={styles.title}>BAI (불안 척도 검사)</Text>
          <Text style={styles.desc}>
            지난 1주 동안 얼마나 자주 아래의 증상을 경험했는지를 기준으로
            응답하세요.
          </Text>
          <Text style={styles.desc}>
            [총 21 문항] 각 문항은 0 ~ 3점입니다. (0: 전혀 아님, 3: 매우 심함)
          </Text>
        </View>

        {/* 문항 */}
        <Question
          number={1}
          text="얼굴이 화끈거리거나 빨개짐"
          selected={a1}
          setSelected={setA1}
        />
        <Question
          number={2}
          text="몸이 떨림"
          selected={a2}
          setSelected={setA2}
        />
        <Question
          number={3}
          text="다리가 후들거림"
          selected={a3}
          setSelected={setA3}
        />
        <Question
          number={4}
          text="기절할 것 같은 느낌"
          selected={a4}
          setSelected={setA4}
        />
        <Question
          number={5}
          text="놀람이 많아짐"
          selected={a5}
          setSelected={setA5}
        />
        <Question
          number={6}
          text="어지러움 또는 비틀거림"
          selected={a6}
          setSelected={setA6}
        />
        <Question
          number={7}
          text="심장이 빠르게 뜀"
          selected={a7}
          setSelected={setA7}
        />
        <Question number={8} text="긴장됨" selected={a8} setSelected={setA8} />
        <Question
          number={9}
          text="무기력함 또는 약해짐"
          selected={a9}
          setSelected={setA9}
        />
        <Question
          number={10}
          text="신경이 예민해짐"
          selected={a10}
          setSelected={setA10}
        />
        <Question
          number={11}
          text="숨이 가빠짐"
          selected={a11}
          setSelected={setA11}
        />
        <Question
          number={12}
          text="손이 떨림"
          selected={a12}
          setSelected={setA12}
        />
        <Question
          number={13}
          text="두려움"
          selected={a13}
          setSelected={setA13}
        />
        <Question
          number={14}
          text="가슴 통증 또는 불쾌감"
          selected={a14}
          setSelected={setA14}
        />
        <Question
          number={15}
          text="질식할 것 같은 느낌"
          selected={a15}
          setSelected={setA15}
        />
        <Question
          number={16}
          text="쓰러질 것 같은 느낌"
          selected={a16}
          setSelected={setA16}
        />
        <Question
          number={17}
          text="공포감"
          selected={a17}
          setSelected={setA17}
        />
        <Question
          number={18}
          text="위장 불쾌감"
          selected={a18}
          setSelected={setA18}
        />
        <Question
          number={19}
          text="손발이 저림"
          selected={a19}
          setSelected={setA19}
        />
        <Question
          number={20}
          text="몸이 붕 뜨는 느낌"
          selected={a20}
          setSelected={setA20}
        />
        <Question
          number={21}
          text="얼굴이 창백해짐"
          selected={a21}
          setSelected={setA21}
        />

        {/* '완료' 버튼 영역 */}
        <View style={styles.submit_area}>
          <TouchableOpacity onPress={formSubmit} style={styles.submitBtn}>
            <Text
              style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "medium" }}
            >
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

{
  /* Select 영역 */
}
function Question({ number, text, selected, setSelected }) {
  return (
    <View style={styles.questionBlock}>
      <Text style={styles.questionTitle}>
        {number}. {text}
      </Text>
      <View style={styles.checkListRow}>
        <Text style={[styles.checkListLabel, { color: "#1D3162" }]}>
          전혀 아님
        </Text>
        <View style={styles.options}>
          <TouchableOpacity
            onPress={() => setSelected(0)}
            style={[styles.radio, selected === 0 && styles.blueChecked]}
          />
          <TouchableOpacity
            onPress={() => setSelected(1)}
            style={[styles.radioSmall, selected === 1 && styles.blueChecked]}
          />
          <TouchableOpacity
            onPress={() => setSelected(2)}
            style={[
              styles.radioSmall,
              styles.red,
              selected === 2 && styles.redChecked,
            ]}
          />
          <TouchableOpacity
            onPress={() => setSelected(3)}
            style={[
              styles.radio,
              styles.red,
              selected === 3 && styles.redChecked,
            ]}
          />
        </View>
        <Text style={[styles.checkListLabel, { color: "#9B111E" }]}>
          매우 심함
        </Text>
      </View>
    </View>
  );
}

{
  /* CSS */
}
const styles = StyleSheet.create({
  BAI_survey_info_area: {
    backgroundColor: "#1D3162",
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },

  desc: {
    color: "#FFFFFF",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },

  questionBlock: {
    paddingVertical: 40,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    width: "100%",
  },

  questionTitle: {
    fontSize: 24,
    marginBottom: 35,
    textAlign: "center",
    fontWeight: "medium",
  },

  checkListRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 30,
  },

  checkListLabel: {
    fontSize: 24,
    width: 150,
    textAlign: "center",
    padding: 20,
  },

  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 350,
  },

  radio: {
    width: 65,
    height: 65,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#1D3162",
    backgroundColor: "#FFFFFF",
  },

  radioSmall: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#1D3162",
    backgroundColor: "#FFFFFF",
  },

  red: {
    borderColor: "#9B111E",
  },

  blueChecked: {
    backgroundColor: "#1D3162",
  },

  redChecked: {
    backgroundColor: "#9B111E",
    borderColor: "#9B111E",
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
});

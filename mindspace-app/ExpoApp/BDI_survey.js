import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function BDI_survey({setSurveyStep, setSaveScore}) {
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

  const formSubmit = () => {
    const answers = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21];
    if (answers.some((a) => a === null)) {
      Alert.alert('알림', '모든 문항에 체크해 주세요.');
      return;
    }
    const sum = answers.reduce((acc, cur) => acc + cur, 0);
    Alert.alert('BDI 자가진단 완료', `총점: ${sum}점`);
    setSaveScore(sum);
    setSurveyStep(4); 
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.BDI_survey_info_area}>
          <Text style={styles.title}>BDI (정신 척도 검사)</Text>
          <Text style={styles.desc}> 각 항목에서 당신에게 가장 잘 해당되는 문장을 선택하세요.</Text>
          <Text style={styles.desc}> 최근 2주 동안의 상태를 기준으로 합니다.</Text>
          <Text style={styles.desc}>[총 21 문항] 각 문항은 0 ~ 3점입니다. (0: 없음, 3: 매우 심함)</Text>
        </View>

        <Question number={1} text="슬픔" selected={a1} setSelected={setA1} />
        <Question number={2} text="미래에 대한 비관" selected={a2} setSelected={setA2} />
        <Question number={3} text="실패감" selected={a3} setSelected={setA3} />
        <Question number={4} text="즐거움 상실" selected={a4} setSelected={setA4} />
        <Question number={5} text="죄책감" selected={a5} setSelected={setA5} />
        <Question number={6} text="벌을 받아야 한다는 느낌" selected={a6} setSelected={setA6} />
        <Question number={7} text="자신에 대한 실망" selected={a7} setSelected={setA7} />
        <Question number={8} text="자기혐오" selected={a8} setSelected={setA8} />
        <Question number={9} text="자기비난" selected={a9} setSelected={setA9} />
        <Question number={10} text="자살 생각" selected={a10} setSelected={setA10} />
        <Question number={11} text="울음" selected={a11} setSelected={setA11} />
        <Question number={12} text="초조함" selected={a12} setSelected={setA12} />
        <Question number={13} text="다른 사람에 대한 관심 감소" selected={a13} setSelected={setA13} />
        <Question number={14} text="결정 내리기 어려움" selected={a14} setSelected={setA14} />
        <Question number={15} text="외모 변화 인식" selected={a15} setSelected={setA15} />
        <Question number={16} text="일할 의욕 감소" selected={a16} setSelected={setA16} />
        <Question number={17} text="수면 문제" selected={a17} setSelected={setA17} />
        <Question number={18} text="피로감" selected={a18} setSelected={setA18} />
        <Question number={19} text="식욕 변화" selected={a19} setSelected={setA19} />
        <Question number={20} text="체중 변화" selected={a20} setSelected={setA20} />
        <Question number={21} text="건강 걱정" selected={a21} setSelected={setA21} />

        <View style={styles.submit_area}>
          <TouchableOpacity onPress={formSubmit} style={styles.submitBtn}>
            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'medium' }}>완료</Text>
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
        <Text style={[styles.checkListLabel, { color: '#1D3162' }]}>없음</Text>
        <View style={styles.options}>
          <TouchableOpacity onPress={() => setSelected(0)} style={[styles.radio, selected === 0 && styles.blueChecked]} />
          <TouchableOpacity onPress={() => setSelected(1)} style={[styles.radioSmall, selected === 1 && styles.blueChecked]} />
          <TouchableOpacity onPress={() => setSelected(2)} style={[styles.radioSmall, styles.red, selected === 2 && styles.redChecked]} />
          <TouchableOpacity onPress={() => setSelected(3)} style={[styles.radio, styles.red, selected === 3 && styles.redChecked]} />
        </View>
        <Text style={[styles.checkListLabel, { color: '#9B111E' }]}>매우 심함</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  BDI_survey_info_area: {
    backgroundColor: '#1D3162',
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center'
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20
  },

  desc: {
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10
  },

  questionBlock: {
    paddingVertical: 40,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    width: '100%'
  },

  questionTitle: {
    fontSize: 24,
    marginBottom: 35,
    textAlign: 'center',
    fontWeight: 'medium'
  },

  checkListRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 30 // 항목 간 간격 (최신 RN 버전에서만 지원)
  },

  checkListLabel: {
    fontSize: 24,
    width: 150,
    textAlign: 'center',
    padding: 20
  },

  options: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20 // 라디오 버튼 간 간격
  },

  radio: {
    width: 65,
    height: 65,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#1D3162',
    backgroundColor: '#FFFFFF'
  },

  radioSmall: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#1D3162',
    backgroundColor: '#FFFFFF'
  },

  red: {
    borderColor: '#9B111E'
  },

  blueChecked: {
    backgroundColor: '#1D3162'
  },

  redChecked: {
    backgroundColor: '#9B111E',
    borderColor: '#9B111E'
  },

  submit_area: {
    padding: 20,
    alignItems: 'center'
  },

  submitBtn: {
    backgroundColor: '#1D3162',
    width: 120,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
});
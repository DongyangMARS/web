const questions = [
  // BAI - 불안 척도
  {
    type: 'BAI',
    number: 1,
    text: '최근 얼굴이 화끈거리거나 빨개지는 느낌을 경험한 적이 있나요?',
  },
  {
    type: 'BAI',
    number: 2,
    text: '최근 몸이 떨리는 느낌을 자주 경험했나요?',
  },
  {
    type: 'BAI',
    number: 3,
    text: '가슴이 두근거리거나 심장이 빠르게 뛰는 느낌을 자주 느끼셨나요?',
  },

  // BDI-II - 우울 척도
  {
    type: 'BDI',
    number: 4,
    text: '최근 기분이 우울하거나 슬프다고 느낀 적이 있나요?',
  },
  {
    type: 'BDI',
    number: 5,
    text: '앞으로의 미래에 대해 희망이 없다고 느낀 적이 있나요?',
  },
  {
    type: 'BDI',
    number: 6,
    text: '최근 나 자신이 싫거나 혐오스럽다고 느낀 적이 있나요?',
  },

  // PSS - 스트레스 척도
  {
    type: 'PSS',
    number: 7,
    text: '최근 예기치 못한 일 때문에 스트레스를 받은 적이 얼마나 자주 있었나요?',
  },
  {
    type: 'PSS',
    number: 8,
    text: '긴장되거나 스트레스 상황에서 짜증이 나는 경우가 얼마나 자주 있었나요?',
  },
  {
    type: 'PSS',
    number: 9,
    text: '갑작스러운 상황 변화로 인해 당황한 적이 얼마나 자주 있었나요?',
  },
];

export default questions;

// src/utils/calculateResults.js

export function calculateResults(answers) {
  const scores = {
    BAI: 0,
    BDI: 0,
    PSS: 0,
  };

  answers.forEach(({ type, score }) => {
    if (scores[type] !== undefined) {
      scores[type] += score;
    }
  });

  const interpret = (type, score) => {
    if (type === 'BAI') {
      if (score <= 7) return '정상 또는 매우 낮은 불안';
      if (score <= 15) return '경미한 불안';
      if (score <= 25) return '중간 수준 불안';
      return '심한 불안';
    }
    if (type === 'BDI') {
      if (score <= 13) return '정상 또는 낮은 우울감';
      if (score <= 19) return '경미한 우울감';
      if (score <= 29) return '중간 수준 우울감';
      return '심한 우울감';
    }
    if (type === 'PSS') {
      if (score <= 13) return '낮은 스트레스';
      if (score <= 26) return '중간 수준 스트레스';
      return '높은 스트레스';
    }
  };

  return {
    BAI: { score: scores.BAI, result: interpret('BAI', scores.BAI) },
    BDI: { score: scores.BDI, result: interpret('BDI', scores.BDI) },
    PSS: { score: scores.PSS, result: interpret('PSS', scores.PSS) },
  };
}

const mongoose = require('mongoose'); // Mongoose 라이브러리 불러오기

// 설문조사 결과
const surveySchema = new mongoose.Schema({
    pssScore: { type: Number, required: true }, // PSS (스트레스) 점수
    bdiScore: { type: Number, required: true }, // BDI-II (우울) 점수
    baiScore: { type: Number, required: true }, // BAI (불안) 점수
}, { _id: false });

// 감정 분석 모델
const measurementSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    // 측정 일시
    measuredAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    survey: {
        type: surveySchema,
    },
    brain: {
        type: Object,
        default: {},
    },
    face: {
        type: Object,
        default: {},
    },
    // 감정 분석 결과: 
    emotion: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const Measurement = mongoose.model('Measurement', measurementSchema);

module.exports = Measurement;
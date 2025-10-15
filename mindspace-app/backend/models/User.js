const mongoose = require('mongoose'); // Mongoose 라이브러리

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // 마지막 심리 측정 일시
    lastMeasurementAt: {
        type: Date,
    },
    // 총 심리 측정 횟수: 기본값 0
    measurementCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


// 스키마를 사용하여 'User' 모델을 생성합니다.
// 'User' 모델은 'users'라는 이름의 컬렉션에 매핑됩니다.
const User = mongoose.model('User', userSchema);

module.exports = User; // 다른 파일에서 이 모델을 사용할 수 있도록 내보냅니다.

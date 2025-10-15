const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB 연결 성공: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB 연결 오류: ${error.message}`);
        process.exit(1); // 프로세스 종료
    }
};

module.exports = connectDB;
const express = require('express');
const dotenv = require('dotenv'); // 환경 변수를 .env 파일에서 로드하기 위해
const cors = require('cors');     // 다른 출처에서의 요청을 허용하기 위해
const connectDB = require('./config/db'); // DB 연결 함수 불러오기

const authRoutes = require('./routes/authRoute');
const measurementRoutes = require('./routes/measurementRoute');

dotenv.config(); // .env 파일의 환경 변수를 로드합니다.

// express 애플리케이션 객체(app)를 생성합니다.
const app = express();

// 미들웨어 설정
// 모든 요청에 대해 실행될 미들웨어를 등록합니다.
// JSON 형식의 요청 본문(body)을 파싱하기 위한 미들웨어
// 클라이언트(예: React Native 앱)에서 JSON 데이터를 POST/PUT 요청으로 보낼 때,
// 이 미들웨어가 해당 데이터를 파싱하여 req.body 객체에 넣어줍니다.
app.use(express.json());

// CORS (Cross-Origin Resource Sharing) 설정
// 다른 도메인(예: React Native 앱이 실행되는 개발 서버)에서 서버로 요청을 보낼 수 있도록 허용합니다.
// 개발 단계에서는 보통 모든 출처를 허용하는 app.use(cors())를 사용합니다.
// 프로덕션에서는 특정 도메인만 허용하도록 설정을 강화해야 합니다.
app.use(cors());

connectDB(); // MongoDB 연결 함수 호출

app.use('/api/auth', authRoutes);
app.use('/api/measurements', measurementRoutes);

// 기본 라우트 (서버 작동 확인용)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 포트를 5001로 지정 (기존의 .env 설정은 무시)
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
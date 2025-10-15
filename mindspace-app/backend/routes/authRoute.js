// routes/authRoutes.js
const express = require('express');
const router = express.Router(); // Express 라우터 인스턴스 생성

// authController에서 정의한 함수들을 불러옵니다.
const authController = require('../controllers/authController');

// ----------------------------------------------------
// 사용자 인증 관련 라우트 정의
// POST 요청이 '/register' 경로로 오면 authController.registerUser 함수를 실행합니다.
// 최종 URL은 server.js에서 연결할 때 결정됩니다 (예: /api/auth/register).
router.post('/register', authController.registerUser);

// POST 요청이 '/login' 경로로 오면 authController.loginUser 함수를 실행합니다.
// 최종 URL은 server.js에서 연결할 때 결정됩니다 (예: /api/auth/login).
router.post('/login', authController.loginUser);
// ----------------------------------------------------

module.exports = router; // 이 라우터 인스턴스를 외부로 내보냅니다.
const User = require('../models/User');

// 회원가입
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body; // 요청 본문에서 이름, 이메일, 비밀번호 추출

        if (!name || !email || !password) {
            return res.status(400).json({ message: '이름, 이메일, 비밀번호는 필수입니다.' });
        }

        // 이메일 중복 확인
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: '이미 등록된 이메일입니다.' });
        }

        const newUser = new User({
            name,
            email,
            password,
        });

        await newUser.save(); // MongoDB에 저장

        res.status(201).json({
            message: '회원가입이 성공적으로 완료되었습니다.',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        })
    } catch (error) {
        console.error('회원가입 오류:', error);
        res.status(500).json({ message: '회원가입 중 서버 오류가 발생했습니다.', error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: '이메일과 비밀번호를 입력해주세요' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
        }

        // 비밀번호 일치 확인 (평문 비밀번호와 비교)
        // 비밀번호 비교처럼 보안이 중요한 곳에서는 항상 ===를 사용하는 것이 좋습니다.
        // ===: 값과 타입이 모두 같아야함
        const isMatch = (password == user.password);
        if (!isMatch) {
            return res.status(400).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
        }

        res.status(200).json({
            message: '로그인 성공',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                lastMeasurementAt: user.lastMeasurementAt,
                measurementCount: user.measurementCount,
            }
        })

    } catch (error) {
        console.error('로그인 오류:', error);
        res.status(500).json({ message: '로그인 중 서버 오류가 발생했습니다.', error: error.message });

    }
};


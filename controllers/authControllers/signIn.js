const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { jwtIssuance } = require('../../lib/jwtMiddleware');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    res.status(400).end('이메일과 비밀번호를 입력해주세요');

  try {
    const exUser = await User.findOne({ where: { email } });

    if (exUser) {
      const result = await bcrypt.compare(password, exUser.password);
      if (result) {
        const { id, email, nick } = exUser;
        const token = jwtIssuance(id, email, nick);

        res
          .status(200)
          .cookie('accessToken', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7,
          })
          .json({ message: '로그인에 성공했습니다.' });
      } else {
        res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
      }
    } else {
      res.status(400).json({ message: '가입되지 않은 회원입니다.' });
    }
  } catch (err) {
    next(err);
  }
};

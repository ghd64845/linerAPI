const bcrypt = require('bcrypt');
const { User } = require('../../models');

module.exports = async (req, res, next) => {
  const { email, password, nick } = req.body;
  if (!email || !password || !nick)
    res.status(400).end('필수 값을 입력해주세요.');

  try {
    const hash = await bcrypt.hash(password, 12);
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { nick, password: hash },
    });

    if (!created) {
      res.status(400).json({ message: '이미 가입된 회원입니다. ' });
    } else {
      res.status(201).json({ message: '가입이 완료되었습니다.' });
    }
  } catch (err) {
    next(err);
  }
};

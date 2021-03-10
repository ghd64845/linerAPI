const jwt = require('jsonwebtoken');

const jwtMiddleware = {
  jwtIssuance: (userId, email, nick) => {
    const { JWT_SECRET } = process.env;
    const accessToken = jwt.sign({ userId, email, nick }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return accessToken;
  },
  jwtAuthorization: (req, res, next) => {
    const { JWT_SECRET } = process.env;
    const token = req.cookies['accessToken'];

    if (!token) next();
    try {
      const { userId, email, nick, exp } = jwt.verify(token, JWT_SECRET);

      req.user = {
        userId,
        email,
        nick,
      };

      const now = Math.floor(Date.now() / 1000);
      if (exp - now < 60 * 60 * 24 * 3.5) {
        const refreshToken = jwtIssuance(userId, email, nick);
        res.cookie('accessToken', refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'none',
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
      }
      return next();
    } catch (err) {
      err = new Error('The token does not exist');
      err.status = 401;
      next(err);
    }
  },
};

module.exports = jwtMiddleware;

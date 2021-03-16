module.exports = (req, res, next) => {
  if (req.user) {
    const { userId, email, nick } = req.user;
    res.status(200).json({ userInfo: { userId, email, nick } });
  } else {
    const err = new Error('The token does not exist');
    err.status = 401;
    next(err);
  }
};

module.exports = (req, res, next) => {
  const { userId, email, nick } = req.user;
  res.status(200).json({ userInfo: { userId, email, nick } });
};

const { User, Theme, Color } = require('../../models');

module.exports = async (req, res, next) => {
  const { id } = req.user;
  const { themeId } = req.body;
  try {
    await User.update({ themeId }, { where: { id } });
    res.status(200).json('200 OK');
  } catch (err) {
    next(err);
  }
};

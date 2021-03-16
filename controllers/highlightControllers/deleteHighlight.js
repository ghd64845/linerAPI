const { Highlight } = require('../../models');

module.exports = async (req, res, next) => {
  const { id } = req.user;
  const { highlightId } = req.body;
  try {
    await Highlight.destroy({ where: { id: highlightId, userId: id } });
    res.status(200).json('200 OK');
  } catch (err) {
    next(err);
  }
};

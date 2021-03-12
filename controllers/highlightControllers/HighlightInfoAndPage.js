const { Highlight, Page } = require('../../models');

module.exports = async (req, res, next) => {
  const { id } = req.user;
  try {
    const pages = await Page.findAll({
      where: { userId: id },
      attributes: [['id', 'pageId'], 'pageUrl'],
      include: {
        model: Highlight,
        attributes: [
          ['id', 'highlightId'],
          'userId',
          'pageId',
          'colorHex',
          'text',
        ],
      },
    });
    res.json(pages);
  } catch (err) {
    next(err);
  }
};

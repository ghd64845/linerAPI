const { Highlight, Page } = require('../../models');
const highlight = require('../../models/highlight');

module.exports = async (req, res, next) => {
  const { id } = req.user;
  try {
    const pages = await Page.findAll({
      where: { userId: id },
      attributes: [['id', 'pageId'], 'pageUrl'],
      include: [
        {
          model: Highlight,
          attributes: [
            ['id', 'highlightId'],
            'userId',
            'pageId',
            'colorHex',
            'text',
          ],
          order: [['updatedAt', 'DESC']],
        },
      ],
      order: [[Highlight, 'updatedAt', 'DESC']],
    });

    res.status(200).json(pages);
  } catch (err) {
    next(err);
  }
};

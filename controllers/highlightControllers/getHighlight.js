const { Highlight, Page } = require('../../models');

module.exports = async (req, res, next) => {
  const { id } = req.user;
  const { pageId, pageUrl } = req.body;

  try {
    let pageInfo;
    if (!pageId) {
      pageInfo = await Page.findOne({
        where: { pageUrl },
        attributes: [['id', 'highlightId']],
      });
    }

    const highlightInfo = await Highlight.findAll({
      where: pageId
        ? { pageId, userId: id }
        : { pageId: pageInfo.dataValues.highlightId, userId: id },
      attributes: [
        ['id', 'highlightId'],
        'userId',
        'pageId',
        'colorHex',
        'text',
      ],
      order: [['updatedAt', 'DESC']],
    });

    res.status(200).json(highlightInfo);
  } catch (err) {
    next(err);
  }
};

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
      where: pageId ? { pageId } : { pageId: pageInfo.dataValues.highlightId },
      attributes: [
        ['id', 'highlightId'],
        'userId',
        'pageId',
        'colorHex',
        'text',
      ],
    });
    res.status(200).json(highlightInfo);
  } catch (err) {
    next(err);
  }
};

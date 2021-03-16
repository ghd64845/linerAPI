const { Highlight, Page } = require('../../models');

module.exports = async (req, res, next) => {
  const { id } = req.user;
  const { pageUrl, colorHex, text } = req.body;
  try {
    const [page] = await Page.findOrCreate({
      where: { pageUrl, userId: id },
    });

    const insertHighlight = await Highlight.create({
      userId: page.userId,
      pageId: page.id,
      colorHex,
      text,
    });

    const result = await Highlight.findOne({
      where: { id: insertHighlight.id },
      attributes: [
        ['id', 'highlightId'],
        'userId',
        'pageId',
        'colorHex',
        'text',
      ],
    });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

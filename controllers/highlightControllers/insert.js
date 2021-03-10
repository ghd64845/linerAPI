const { Highlight, Page } = require('../../models');

module.exports = async (req, res, next) => {
  const { id } = req.user;
  const { pageUrl, colorHex, text } = req.body;
  try {
    const [page] = await Page.findOrCreate({ where: { pageUrl } });

    const insertHighlight = await Highlight.create({
      userId: id,
      pageId: page.id,
      colorHex,
      text,
    });

    const result = {
      highlightId: insertHighlight.id,
      userId: insertHighlight.userId,
      pageId: insertHighlight.pageId,
      colorHex: insertHighlight.colorHex,
      text: insertHighlight.text,
    };

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

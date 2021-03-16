const { Highlight, pa } = require('../../models');

module.exports = async (req, res, next) => {
  const { id } = req.user;
  const { highlightId, colorHex, text } = req.body;

  try {
    if (!text && !colorHex) res.status(400).json({ message: 'Error' });
    await Highlight.update(
      { colorHex, text },
      { where: { id: highlightId, userId: id } },
    );
    const checkHighlight = await Highlight.findOne({
      where: { id: highlightId },
      attributes: [
        ['id', 'highlightId'],
        'userId',
        'pageId',
        'colorHex',
        'text',
      ],
    });

    await res.status(200).json(checkHighlight);
  } catch (err) {
    next(err);
  }
};

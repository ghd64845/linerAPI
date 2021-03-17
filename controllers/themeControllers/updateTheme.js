const { User, Color, Highlight, Theme, Page } = require('../../models');

module.exports = async (req, res, next) => {
  const { id } = req.user;
  const { themeId } = req.body;
  try {
    const currentTheme = await User.findOne({
      where: { id },
      attributes: ['themeId'],
    });

    const highlightInfo = await Highlight.findAll({
      where: { userId: id },
    });

    const colorList = await Color.findAll();

    const colorObject = colorList.reduce((acc, curr) => {
      if (!acc[curr.themeId]) {
        acc[curr.themeId] = [];
      }
      acc[curr.themeId].push(curr.colorHex);
      return acc;
    }, {});
    const colorIndex = highlightInfo.map((item, i) => {
      console.log(item.colorHex);
      return colorObject[currentTheme.themeId].indexOf(item.colorHex);
    });

    await User.update({ themeId }, { where: { id } });

    const colorHexArray = highlightInfo.map((el, i) => {
      el.colorHex = colorObject[themeId][colorIndex[i]];
      return {
        id: el.id,
        userId: el.userId,
        pageId: el.pageId,
        colorHex: el.colorHex,
        text: el.text,
        createdAt: el.createdAt,
        updatedAt: el.updatedAt,
      };
    });

    await Highlight.bulkCreate(colorHexArray, {
      updateOnDuplicate: ['id', 'colorHex'],
    });
    res.status(200).json(colorHexArray);
  } catch (err) {
    next(err);
  }
};

const express = require('express');
const themeControllers = require('../controllers/themeControllers');
const { jwtAuthorization } = require('../lib/jwtMiddleware');

const router = express.Router();

router.patch('/updatetheme', jwtAuthorization, themeControllers.updateTheme);

module.exports = router;

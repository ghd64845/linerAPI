const express = require('express');
const highlightControllers = require('../controllers/highlightControllers');
const { jwtAuthorization } = require('../lib/jwtMiddleware');

const router = express.Router();

router.post('/insert', jwtAuthorization, highlightControllers.insert);

module.exports = router;
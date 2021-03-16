const express = require('express');
const highlightControllers = require('../controllers/highlightControllers');
const { jwtAuthorization } = require('../lib/jwtMiddleware');

const router = express.Router();

router.post('/insert', jwtAuthorization, highlightControllers.insert);
router.patch('/update', jwtAuthorization, highlightControllers.update);
router.post(
  '/gethighlight',
  jwtAuthorization,
  highlightControllers.getHighlight,
);
router.get(
  '/highlightinfo',
  jwtAuthorization,
  highlightControllers.highlightInfoAndPage,
);
router.delete(
  '/deletehighlight',
  jwtAuthorization,
  highlightControllers.deleteHighlight,
);

module.exports = router;

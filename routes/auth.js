const express = require('express');
const authControllers = require('../controllers/authControllers');
const { jwtAuthorization } = require('../lib/jwtMiddleware');

const router = express.Router();

router.post('/signup', authControllers.signUp);
router.post('/signin', authControllers.signIn);
router.get('/userinfo', jwtAuthorization, authControllers.userInfo);

module.exports = router;

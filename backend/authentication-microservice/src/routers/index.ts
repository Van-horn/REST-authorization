const express = require('express');
const { body } = require('express-validator');

const userController = require('../controllers/user-controller');
const accessTokenMiddleware = require('../middlewares/accessTokenMiddleware');
const refreshTokenMiddleware = require('../middlewares/refreshTokenMiddleware');

const router = express.Router();
router.post(
  '/registration',
  body('email').isEmail(),
  body('login').isLength({ min: 4, max: 10 }),
  body('password').isLength({ min: 4, max: 10 }),
  userController.registration
);
router.patch('/login', userController.login);
router.patch(
  '/logout',
  accessTokenMiddleware,
  refreshTokenMiddleware,
  userController.logout
);
router.patch('/refresh', refreshTokenMiddleware, userController.refresh);
router.patch('/forgotPassword', userController.forgotPassword);


module.exports = router;

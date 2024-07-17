const express = require('express');

const tokensController = require('../controllers/tokens-controller');

const router = express.Router();

router.post('/generateTokens', tokensController.generateTokens);
router.get(
  '/validAccessToken',
  tokensController.validAccessToken
);
router.get('/validRefreshToken',  tokensController.validRefreshToken);


module.exports = router;

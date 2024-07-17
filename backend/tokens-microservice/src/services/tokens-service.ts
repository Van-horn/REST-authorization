const jwt = require('jsonwebtoken');

import { ITokens } from "../controllers/tokens-controller";

class TokensService {
  generateTokens(payload:any):ITokens {
    try {
      const accessToken = jwt.sign(payload,process.env.JWT_ACCESS, {
      expiresIn: '10m',
      
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
    } catch (error) {
      throw(error)
    }
    
  }
  validAccessToken(accessToken:string):boolean {
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS);
      return !!userData;
    } catch (error) {
      return false
    }
  }
  validRefreshToken(refreshToken:string):boolean {
    try {
      const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH);
      return !!userData;
    } catch (error) {
      return false
    }
  }
}

module.exports = new TokensService();

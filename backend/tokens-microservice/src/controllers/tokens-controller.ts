const tokensService = require("../services/tokens-service")
import { Request, Response, NextFunction } from 'express';

export interface ITokens{
    accessToken:string,
    refreshToken:string
}
interface ITokenHeaders{
    authorization: string
}

class TokensController {
  generateTokens(req:Request<any>,res:Response<ITokens>,next:NextFunction) {
  try {
    const tokens = tokensService.generateTokens(req.body)
    return res.json(tokens)
  } catch (error) {
    next(error)
  }
   
  
  }
  validAccessToken(req:Request<any,any,any,any,ITokenHeaders>,res:Response<boolean>,next:NextFunction) {
    try {
     if(!req.headers.authorization) return res.json(false)
     const result = tokensService.validAccessToken(req.headers.authorization.split(" ")[1])
     return res.json(result)
    } catch (error) {
      next(error)

    }
  }
  validRefreshToken(req:Request<any,any,any,any,ITokenHeaders>,res:Response<boolean>,next:NextFunction) {
    try {
      if(!req.headers.authorization) return res.json(false)
      const result = tokensService.validRefreshToken(req.headers.authorization.split(" ")[1])
      return res.json(result)
    } catch (error) {
      next(error)
    }
  }
  
 



}

module.exports = new TokensController();

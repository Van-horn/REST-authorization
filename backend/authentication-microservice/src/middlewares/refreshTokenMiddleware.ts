import { AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';

const ApiError = require('../exceptions/ApiError');
const tokensInstance = require("../axios/tokensInstance")

module.exports =async (req:Request<any>, res:Response<NextFunction>, next:NextFunction) => {
  try {
    const refreshToken:string = req.cookies?.refreshToken;
    if (!refreshToken) throw ApiError.UnAthorizedError();
    
    const {data}:AxiosResponse<boolean> =await tokensInstance.get( "/validRefreshToken",
  {
    headers: {
      'Authorization': `Bearer ${refreshToken}`
    }
  });

  if (!data) throw ApiError.UnAthorizedError();

  return next();
  } catch (error) {
    next(error);
  }
};

import { AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';

const ApiError = require('../exceptions/ApiError');
const tokensInstance = require("../axios/tokensInstance");

interface ITokenHeaders{
    authorization?: string
}

module.exports =async (req:Request<any,any,any,any,ITokenHeaders>, res:Response<NextFunction>, next:NextFunction) => {
  try {
    const accessToken:string = (req.headers?.authorization as string)?.split(' ')[1]
    if (!accessToken) throw ApiError.UnAthorizedError();
    
    const {data}:AxiosResponse<boolean> =await tokensInstance.get("/validAccessToken",
      { headers: {
      'Authorization': `Bearer ${accessToken}`
    }}
  );
    if (!data) throw ApiError.UnAthorizedError();
    return next();
  } catch (error) {
    next(error);
  }
};

import { Request, Response, NextFunction } from 'express';

const userService = require('../services/user-service');
import IUserDto from '../types/dto/IUserDto';
const ApiError = require('../exceptions/ApiError');

namespace IUserController{
  export interface IUserEmail {
    email:string;
  }
  export interface IUserId {
    userId:number;
  }
}

class UserController {
  async userByEmail(req:Request<IUserController.IUserEmail>, res:Response<IUserDto>, next:NextFunction) {
    try {
      console.log(req.body)
      if(!req.body) throw ApiError.BadRequest("There are not all data")

      const userDto = await userService.userByEmail(req.body);
      return res.json(userDto);
    } catch (error) {
      next(error);
    }
  }
  async userById(req:Request<IUserController.IUserId>, res:Response<IUserDto>, next:NextFunction) {
    try {
      if(!req.body) throw ApiError.BadRequest("There are not all data")
        console.log(req.body)
      const userDto = await userService.userById(req.body);
      return res.json(userDto);
    } catch (error) {
      next(error);
    }
  }
  async userToken(req:Request<IUserController.IUserId>, res:Response<string>, next:NextFunction){
    try {
      if(!req.body) throw ApiError.BadRequest("There are not all data")

      const refreshToken = await userService.userToken(req.body);
      return res.json(refreshToken);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();

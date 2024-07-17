import { Request, Response, NextFunction } from 'express';

import IUserDto from '../types/dto/IUserDto';
const ApiError = require('../exceptions/ApiError');
const userService = require('../services/user-service');

namespace IUserController{
  export interface IUserId{
    userId:number;
  }
  export interface IUserRegistration{
    email:string;
    password:string;
    login:string;
    refreshToken:string;
  }
  export interface IUserLogin{
    userId:number;
    refreshToken:string;
  }
   export interface IUserRefresh{
    userId:number;
    refreshToken:string;
  }
    export interface IUserFPassword{
    userId:number;
    password:string;
    refreshToken:string;
  }
}

class UserController {
  async registration(req:Request<IUserController.IUserRegistration>, res:Response<IUserDto>, next:NextFunction) {
    try {
      if (!req.body) throw ApiError.BadRequest("There are not all data");

      const userDto = await userService.registration(req.body);
      return res.json(userDto);
    } catch (error) {
      next(error);
    }
  }
  async login(req:Request<IUserController.IUserLogin>, res:Response<boolean>, next:NextFunction) {
    try {
      if (!req.body) throw ApiError.BadRequest("There are not all data");

      const result = await userService.login(req.body);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async logout(req:Request<IUserController.IUserId>, res:Response<boolean>, next:NextFunction) {
    try {
      if (!req.body) throw ApiError.BadRequest("There are not all data");

      const result =  await userService.logout(req.body);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async refresh(req:Request<IUserController.IUserRefresh>, res:Response<boolean>, next:NextFunction) {
    try {
      if (!req.body) throw ApiError.BadRequest("There are not all data");

      const result = await userService.refresh(req.body);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req:Request<IUserController.IUserFPassword>, res:Response<boolean>, next:NextFunction) {
    try {
      if (!req.body) throw ApiError.BadRequest("There are not all data");

      const result = await userService.forgotPassword(req.body);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new UserController();

const { validationResult } = require('express-validator');
import { Request, Response, NextFunction } from 'express';

import IUserDto from '../types/dto/IUserDto';
const userService = require('../services/user-service');
const ApiError = require('../exceptions/ApiError');

namespace IUserController{
 export interface IUserId{
    userId:string;
  }
  export interface IUserRegistration{
    email:string;
    password:string;
    login:string;

  }
  export interface IUserLogin{
    email:string;
    password:string;
  }
   export interface IUserRefresh{
    userId:number;
  }
    export interface IUserFPassword{
    password:string;
    email:string;
  }
}

class UserController {
  async registration(req:Request<IUserController.IUserRegistration>, res:Response<Omit<IUserDto,"refreshToken">>, next:NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) throw ApiError.BadRequest('Incorrect data', errors.array());
      
      const UserDto = await userService.registration(req.body);
      res.cookie('refreshToken', UserDto.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      });
      delete UserDto.refreshToken;
      return res.json(UserDto);
    } catch (error) {
      next(error);
    }
  }
  async login(req:Request<IUserController.IUserLogin>, res:Response<Omit<IUserDto,"refreshToken">>, next:NextFunction) {
    try {
      if (!req.body) throw ApiError.BadRequest('There is not all data');

      const UserDto = await userService.login(req.body);
      res.cookie('refreshToken', UserDto.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,

      });
      
      delete UserDto.refreshToken;
      return res.json(UserDto);
    } catch (error) {
      next(error);
    }
  }
  async logout(req:Request<IUserController.IUserId>, res:Response<boolean>, next:NextFunction) {
    try {
      if (!req.body) throw ApiError.BadRequest('There is not all data');

      await userService.logout(req.body);
      res.clearCookie('refreshToken');
      return res.json(true)
    } catch (error) {
      next(error);
    }
  }
  async refresh(req:Request<IUserController.IUserRefresh>, res:Response<Omit<IUserDto,"refreshToken">>, next:NextFunction) {
    try {
      if (!req.body) throw ApiError.BadRequest('There is not all data');

      const UserDto = await userService.refresh({...req.body,refreshToken:req.cookies.refreshToken});
      res.cookie('refreshToken', UserDto.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      delete UserDto.refreshToken;
     return res.json(UserDto);
    } catch (error) {
      next(error);
    }
  }
  async forgotPassword(req:Request<IUserController.IUserFPassword>, res:Response<Omit<IUserDto,"refreshToken">>, next:NextFunction) {
    try {
      if (!req.body) throw ApiError.BadRequest('There is not all data');
      
      const UserDto = await userService.forgotPassword(req.body);
      res.cookie('refreshToken', UserDto.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      delete UserDto.refreshToken;
      return res.json(UserDto);
    } catch (error) {
      next(error);
    }
  }
  
}

module.exports = new UserController();

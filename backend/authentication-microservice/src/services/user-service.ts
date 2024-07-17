const bcrypt = require('bcrypt');
import { AxiosResponse } from 'axios';

import IUserDto from '../types/dto/IUserDto';
const tokensInstance = require("../axios/tokensInstance")
const masterServerInstance = require("../axios/masterServerInstance")
const slaveServerInstance = require("../axios/slaveServerInstance")

const UserDto = require('../dto/User-dto')
const ApiError = require('../exceptions/ApiError');

namespace IUserService{
  export interface ITokens{
    accessToken:string,
    refreshToken:string
}
  export interface IUserPassword{
    password:string;
  }
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
    refreshToken:string;
  }
    export interface IUserFPassword{
    password:string;
    email:string;
  }
}


class UserService {
  async registration({email,password,login}:IUserService.IUserRegistration):Promise<IUserDto> {
    try {
      if (!email || !password || !login) throw ApiError.BadRequest('There are not all data');
      
       const candidate:AxiosResponse<IUserDto & IUserService.IUserPassword> = await slaveServerInstance.post("/user/userByEmail",{email});

       if (candidate.data) throw ApiError.BadRequest('Пользователь уже существует');
      
      const hashPassword = await bcrypt.hash(password, 3);

      const {data:{accessToken,refreshToken}}:AxiosResponse<IUserService.ITokens> =await tokensInstance.post("/generateTokens",{});

      const {data}:AxiosResponse<Omit<IUserDto,"accessToken"|"refreshToken">> = await masterServerInstance.post("/user/registration",{ 
        email,
        login,
        refreshToken,
        password: hashPassword,
      });  
     
      return new UserDto({ ...data,accessToken,refreshToken});
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }:IUserService.IUserLogin):Promise<IUserDto> {
    try {
      if (!email || !password) throw ApiError.BadRequest('There is not all data');
      
      const dbUser:AxiosResponse<IUserDto & IUserService.IUserPassword> = await slaveServerInstance.post("/user/userByEmail",{email});

      if (!dbUser.data) throw ApiError.BadRequest('Пользователь не найден');
      
      const isPasswordEquals = await bcrypt.compare(
        password,
       dbUser.data.password
      );
      if (!isPasswordEquals) throw ApiError.BadRequest('Неверный пароль');
      
      const {data:{refreshToken,accessToken}}:AxiosResponse<IUserService.ITokens> =await tokensInstance.post("/generateTokens",{});
      await masterServerInstance.patch("/user/refresh",{userId:dbUser.data.userId,refreshToken})
      
      return new UserDto({...dbUser.data,accessToken,refreshToken});
    } catch (error) {
      throw error;
    }
  }
  async logout({userId}:IUserService.IUserId):Promise<boolean> {
    try {
      if (!userId) throw ApiError.BadRequest('There is not all data');
      await masterServerInstance.patch("/user/logout",{userId})
      return true
    } catch (error) {
      throw error;
    }
  }
  async refresh({userId,refreshToken}:IUserService.IUserRefresh):Promise<IUserDto> {
    try {
      if (!userId || !refreshToken) throw ApiError.BadRequest('There is not all data');
      
      const dbToken:AxiosResponse<string> = await slaveServerInstance.post('/user/userToken',{userId});
      if (dbToken.data !== refreshToken) throw ApiError.UnAthorizedError();
      
      const dbUser:AxiosResponse<IUserDto & IUserService.IUserPassword> =await slaveServerInstance.post('/user/userById',{userId});
      const tokens:AxiosResponse<IUserService.ITokens> = await tokensInstance.post("/generateTokens",{});
      await masterServerInstance.patch('/user/refresh',{userId,refreshToken:tokens.data.refreshToken})
      return new UserDto({...dbUser.data,refreshToken:tokens.data.refreshToken,accessToken:tokens.data.accessToken})
    } catch (error) {
      throw error;
    }
  }
  async forgotPassword({ email, password }:IUserService.IUserFPassword):Promise<IUserDto>  {
    try {
     if (!email || !password) throw ApiError.BadRequest('There is not all data');

      const dbUser:AxiosResponse<IUserDto & IUserService.IUserPassword> = await slaveServerInstance.post("/user/userByEmail",{email});
      if (!dbUser.data) throw ApiError.BadRequest('Пользователь не найден');

      const tokens:AxiosResponse<IUserService.ITokens> = await tokensInstance.post("/generateTokens",{});

      const hashPassword = await bcrypt.hash(password, 3);

      await masterServerInstance.patch('/user/forgotPassword',{userId:dbUser.data.userId,password:hashPassword,refreshToken:tokens.data.refreshToken})

      return new UserDto({...dbUser.data, refreshToken:tokens.data.refreshToken,accessToken:tokens.data.accessToken})
    } catch (error) {
      throw error;
    }
  }
 
}

module.exports = new UserService();         
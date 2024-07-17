import IUserDto from "../types/dto/IUserDto";
const {
  UsersSchema,
  TokensSchema,
} = require('../DB_DATA/models');
const ApiError = require('../exceptions/ApiError');
const UserDto = require("../dto/User-dto");

namespace IUserService{
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

class UserService {
  async registration({ email, password, login, refreshToken }:IUserService.IUserRegistration) : Promise<IUserDto>{
    try {
      if(!email || !password || !login || !refreshToken) throw ApiError.BadRequest("There are not all data")

      const {dataValues} = await UsersSchema.create({email, password, login});
      await TokensSchema.create({userId:dataValues.userId, refreshToken});
      return new UserDto({...dataValues});
    } catch (error) {
      throw error;
    }
  }
  async login({ userId, refreshToken }:IUserService.IUserLogin):Promise<boolean> {
    try {
      if (!userId || !refreshToken) throw ApiError.BadRequest("There are not all data");

      await TokensSchema.upsert({refreshToken},{where:{userId}})
      return true
    } catch (error) {
      throw error;
    }
  }
  async logout({userId}:IUserService.IUserId):Promise<boolean> {
    try {
      if (!userId) throw ApiError.BadRequest("There are not all data");
      
      await TokensSchema.destroy({where:{userId}});
      return true
    } catch (error) {
      throw error;
    }
  }
  async refresh({userId,refreshToken}:IUserService.IUserRefresh):Promise<boolean> {
    try {
      if (!userId || !refreshToken) throw ApiError.BadRequest("There are not all data");
      
      await TokensSchema.update({refreshToken}, {where:{userId}});

      return true
    } catch (error) {
      throw error;
    }
  }
  async forgotPassword({ userId, password,refreshToken }:IUserService.IUserFPassword):Promise<boolean>  {
    try {
      if (!userId || !password || !refreshToken) throw ApiError.BadRequest("There are not all data");

      await UsersSchema.update({ password}, { where:{ userId }});
      await TokensSchema.update({refreshToken},{where:{userId}})
     
      return true
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new UserService();

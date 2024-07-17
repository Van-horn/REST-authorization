import IUserDto from "../types/dto/IUserDto";
const UserDto = require("../dto/User-dto")
const {
  UsersSchema,
  TokensSchema,
} = require('../DB_DATA/models');
const ApiError = require('../exceptions/ApiError');

namespace IUserService{
  export interface IUserEmail {
    email:string;
  }
  export interface IUserId {
    userId:number;
  }
}

class UserService {
  async userByEmail({ email}:IUserService.IUserEmail):Promise<IUserDto> {
    try {
      if(!email) throw ApiError.BadRequest("There are not all data")

      const user =await UsersSchema.findOne({where:{email}})  

      if(!user) return user

      return new UserDto(user);
    } catch (error) {
      throw error;
    }
  }
  async userById({ userId}:IUserService.IUserId):Promise<IUserDto> {
    try {
      if (!userId) throw ApiError.BadRequest("There are not all data");

      const user =await UsersSchema.findByPk(userId) 

      if(!user) return user  

      return new UserDto(user);
    } catch (error) {
      throw error;
    }
  }
  async userToken({userId}:IUserService.IUserId):Promise<string>{
    try {
      if (!userId) throw ApiError.BadRequest("There are not all data");
  
      const refreshToken = await TokensSchema.findByPk(userId);

      if (!refreshToken) throw ApiError.BadRequest("There are not all data");

      return refreshToken.refreshToken;
    } catch (error) {
      throw error
    }
  }

}

module.exports = new UserService();

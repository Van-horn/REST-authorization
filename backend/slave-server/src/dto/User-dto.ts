import IUserDto from "../types/dto/IUserDto";

module.exports = class UserDto implements IUserDto {
 userId :number;
 email:string;
 login:string;
 createdAt:string
 password:string;
 
  constructor(model:any) {
    this.userId = model.userId;
    this.email = model.email;
    this.login = model.login;
    this.password=model.password;
    this.createdAt = model.createdAt
  }
};

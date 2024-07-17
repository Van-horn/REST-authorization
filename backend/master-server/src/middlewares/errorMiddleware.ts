import { Request, Response, NextFunction } from 'express';

const ApiError = require('../exceptions/ApiError');

module.exports = (err:any, req:Request, res:Response, next:NextFunction) => {
  console.log(err)
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка' });
};

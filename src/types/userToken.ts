import { Types } from "mongoose";

export interface IUserToken  {
    _id: Types.ObjectId,
    nombre: String,
    email: String,
    password: String
  }
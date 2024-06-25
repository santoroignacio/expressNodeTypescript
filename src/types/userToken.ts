import { Types } from "mongoose";

export interface IUserToken  {
    _id: Types.ObjectId,
    nombre: String,
    email: String,
    password: String
  }

 declare module 'express-session' {
    interface SessionData {
      userSessionData: {  
      _id: Types.ObjectId,
      nombre: String,
      email: String,
      token: unknown
      }
    }
  }
  
  
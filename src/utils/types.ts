import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export interface SignupRequest extends Request{
    body:{
        name: string,
        email: string,
        password: string,
    }
}

export interface SigninRequest extends Request{
    body: {
        email: string,
        password: string,
    }
}

export interface AuthRes extends Response {}

export interface MiddlewareNext extends NextFunction {}


// ---------Scema Types
export interface UserSchemaType {
    _id: string;
    name: string;
    email: string;
    password: string;
  }

  export interface ExpenseSchemaType {
    _id: string;
    value: number;
    createdAt: string; 
    updatedAt: string;
    userId: typeof mongoose.Types.ObjectId;
    type: string;
    description: string;
  }
import { Request, Response, NextFunction } from "express";

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
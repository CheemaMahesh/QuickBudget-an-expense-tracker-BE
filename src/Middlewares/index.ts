import { SignupRequest, AuthRes, MiddlewareNext, SigninRequest } from "../utils/types";
import { z } from "zod";
import { invalidFormat, invalidSignUpDetails, invalidSignInDetails } from '../utils/constants';
import { User } from "../Models/schemas";
import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenObject extends JwtPayload{
    _id: string;
}

export const validateSignupData = async (req: SignupRequest, res: AuthRes, next: MiddlewareNext) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({
                message: invalidFormat,
                details: invalidSignUpDetails,
                success: false,
            });
            return;
        }

        const validatingObject = z.object({
            name: z.string().min(1).max(100),
            email: z.string().min(5).max(100).email(),
            password: z.string().min(6).max(100),
        });

        const validatedRes = validatingObject.safeParse(req.body);

        if (!validatedRes.success) {
            res.status(400).json({
                message: invalidFormat,
                details: validatedRes.error.format(),
                success: false,
            });
            return;
        }

        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser.email) {
            res.status(400).json({
                message: `User with email:${email} already exists!`,
                success: false,
            });
            return;
        }

        next();

    } catch (err) {
        console.log("Sothing went wrong in signup controller", err);
        res.status(500).json({
            message: "Somthing went Wrong! please try again! SUP-Mid",
            success: false,
        })
    }
}

export const validateSinginData = async (req: SigninRequest, res: AuthRes, next: MiddlewareNext) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                message: invalidFormat,
                details: invalidSignInDetails,
                success: false,
            });
            return;
        }

        const validatingObject = z.object({
            email: z.string().min(5).max(100).email(),
            password: z.string().min(6).max(100),
        });

        const validatedRes = validatingObject.safeParse(req.body);

        if (!validatedRes.success) {
            res.status(400).json({
                message: invalidFormat,
                details: validatedRes.error.format(),
                success: false,
            });
            return;
        }

        next();

    } catch (err) {
        console.log("Sothing went wrong in signup controller", err);
        res.status(500).json({
            message: "Somthing went Wrong! please try again! SIN-Mid",
            success: false,
        })
    }
}

export const IsValidUser = async(req: Request, res: AuthRes, next: MiddlewareNext) => {
    try{

        const { token } = req.headers;
        if(!token){
            res.status(401).json({
                message: "Unauthorized User!",
                success: false,
            })
        };

        if (typeof token !== 'string') {
            res.status(401).json({
                message: "Invalid token format!",
                success: false,
            });
            return;
        }
        const decodedToken = jwt.verify(token, String(process.env.JWT_SECRET));
        if (typeof decodedToken === 'string') {
            res.status(401).json({
                message: "Invalid token format!",
                success: false,
            });
            return;
        }
        const tokenObject: TokenObject = decodedToken as TokenObject;

        if(!tokenObject?._id){
            res.status(401).json({
                message: "Unauthorized User!",
                success: false,
            })
        }

        req.body._id = tokenObject._id;
        next();

    }catch(err){
        console.log("Somthing went wrong int IsValidUser Mware!", err);
        res.status(500).json({
            message:"Somthing went wrong, please try again!",
            success: true,
        })
    }
};
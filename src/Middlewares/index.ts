import { SignupRequest, AuthRes, MiddlewareNext, SigninRequest } from "../utils/types";
import { z } from "zod";
import { invalidFormat, invalidSignUpDetails, invalidSignInDetails } from '../utils/constants';
import { User } from "../models/schemas";

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
import { Router } from "express";
import { validateSignupData, validateSinginData } from '../Middlewares/index';
import { signupUser, signinUser, } from '../Controllers/user';

export const authRouter = Router();

authRouter.post('/signup', validateSignupData, signupUser);
authRouter.post('/signin', validateSinginData, signinUser);

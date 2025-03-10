import { Router } from "express";
import { validateSignupData, validateSinginData, IsValidUser } from '../Middlewares/index';
import { signupUser, signinUser, } from '../Controllers/user';

export const authRouter = Router();

authRouter.post('/signup', validateSignupData, signupUser);
authRouter.post('/signin', validateSinginData, signinUser);

authRouter.post('/create-expense', IsValidUser, () => {});
authRouter.get('/all-expeses', IsValidUser, () => {});
authRouter.put('/update-expense', IsValidUser, () => {});
authRouter.delete('/delete-expense', IsValidUser, () => {});

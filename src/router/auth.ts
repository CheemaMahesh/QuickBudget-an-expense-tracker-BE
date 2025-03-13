import { Router } from "express";
import { validateSignupData, validateSinginData, IsValidUser } from '../Middlewares/index';
import { signupUser, signinUser, } from '../Controllers/user';
import { createAnExpense, updateAnExpense } from '../Controllers/expense';
export const authRouter = Router();

authRouter.post('/signup', validateSignupData, signupUser);
authRouter.post('/signin', validateSinginData, signinUser);

authRouter.post('/create-expense', IsValidUser, createAnExpense);
authRouter.get('/all-expeses', IsValidUser, () => {});
authRouter.put('/update-expense', IsValidUser, updateAnExpense);
authRouter.delete('/delete-expense', IsValidUser, () => {});

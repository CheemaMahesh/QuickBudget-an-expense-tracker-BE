import { AuthRes } from '../utils/types';
import { z } from 'zod';
import { Request } from 'express';
import { Expense, User } from '../Models/schemas';

export const createAnExpense = async (req: Request, res: AuthRes) => {
    try{
    const { userId, value, type, description } = req.body;
    const requiredValue = z.object({
            value: z.number().gte(0),
            type: z.string(),
    });
    const successRequiredDetails = requiredValue.safeParse({ value, type });
    if (!successRequiredDetails.success) {
        res.status(400).json({
            message: "Value is In-Valid",
            success: false,
        });
        return;
    }
   const result =  await Expense.create({
        value: value,
        createdAt: new Date().toISOString(),
        userId: userId,
        type: type,
        description: description,
    });
    if (!result._id) {
        res.status(500).json({
            message: "Unable to Add Expense",
            success: false,
        });
        return;
    }
     await User.findByIdAndUpdate(userId, { $push: { expenses: result._id, _destroy: false, } });
    res.status(200).json({
        message: "Your Exprense Has been Successfully Saved",
        success: true,
    });
    } catch(err){
        console.log("Error in CreateExpenseController", err);
    }   
}

export const updateAnExpense = async (req: Request, res: AuthRes) => {
    try{
        const { value, id, type } = req.body;
    const successRequiredDetails = z.number().gte(0).safeParse(value);
    if(!successRequiredDetails.success) {
        res.status(400).json({
            message: "Invalid Value Format",
            success: false,
        });
        return;
    }
    if (!type) {
        await Expense.findByIdAndUpdate(id, {value: value, updatedAt: new Date().toISOString()});
    } else {
        await Expense.findByIdAndUpdate(id, {value: value, updatedAt: new Date().toISOString(), type: type });
    }
    res.status(200).json({
        message: "Your Expesnse has been updated!",
        success: true,
    })
    } catch(err) {
        console.log("Error in update and expense controller", err);
    }
};
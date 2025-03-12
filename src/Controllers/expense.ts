// import { AuthRes, UserSchemaType } from '../utils/types';
// import { z } from 'zod';

// const createAnExpense = async (req, res: AuthRes) => {
//     try{
//     const { userId, value, type, description } = req.body;
//     const requiredValue = z.object({
//             value: z.number().gte(0),
//             type: z.string(),
//     });
//     const successRequiredDetails = requiredValue.safeParse({ value, type });
//     if (!successRequiredDetails.success) {
//         res.status(400).json({
//             message: "Value is In-Valid",
//             success: false,
//         });
//         return;
//     }
//    const result =  await ExpenseModel.create({
//         value: value,
//         createdAt: new Date().toISOString(),
//         userId: userId,
//         type: type,
//         description: description,
//     });
//     if (!result._id) {
//         res.status(500).json({
//             message: "Unable to Add Expense",
//             success: false,
//         });
//         return;
//     }
//      await UserModel.findByIdAndUpdate(userId, { $push: { expenses: result._id, _destroy: false, } });
//     res.status(200).json({
//         message: "Your Exprense Has been Successfully Saved",
//         success: true,
//     });
//     } catch(err){
//         console.log("Error in CreateExpenseController", err);
//     }   
// }
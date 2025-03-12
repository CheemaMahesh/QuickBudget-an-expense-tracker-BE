import { Schema, model } from "mongoose";
import { UserSchemaType, ExpenseSchemaType } from "../utils/types";

const useSchema = new Schema<UserSchemaType>({
    name: { type: String, required: true},
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true}
});


const expense = new Schema<ExpenseSchemaType>({
    value: { type: Number, required: true },
    createdAt: String,
    updatedAt: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String, required: true }, //CREDIT or DEBIT
    description: String,
});

export const User = model<UserSchemaType>("User", useSchema);
export const Expense = model<ExpenseSchemaType>("Expense", expense);
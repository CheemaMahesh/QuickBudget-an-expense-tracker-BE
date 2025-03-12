import { Schema, model } from "mongoose";
import { UserSchemaType } from "../utils/types";

const useSchema = new Schema<UserSchemaType>({
    name: { type: String, required: true},
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true}
});


const expense = new Schema({
    value: { type: Number, require: true },
    createdAt: String,
    UpdatedAt: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String, require: true }, //CREDIT or DEBIT
    description: String,
});

export const User = model<UserSchemaType>("User", useSchema);
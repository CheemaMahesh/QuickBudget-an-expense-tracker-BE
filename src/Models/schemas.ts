import { Schema, model } from "mongoose";
import { UserSchemaType } from "../utils/types";

const useSchema = new Schema<UserSchemaType>({
    name: { type: String, required: true},
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true}
});

export const User = model<UserSchemaType>("User", useSchema);
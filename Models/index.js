const mongoose = require("mongoose");
const { string } = require("zod");


const user = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    createdAt: String,
    expense: [
        {
            expenseId: { type: mongoose.Schema.Types.ObjectId, ref: "Expese" },
        }
    ],
});

const expense = new mongoose.Schema({
    value: { type: Number, require: true },
    createdAt: String,
    UpdatedAt: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const UserModel = mongoose.model('User', user);
const ExpenseModel = mongoose.model('Expese', expense);

module.exports = {
    UserModel: UserModel,
    ExpenseModel: ExpenseModel,
}

const mongoose = require("mongoose");
const { string } = require("zod");


const user = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    createdAt: String,
    expense: [
        {
            expenseId: mongoose.Schema.Types.ObjectId,
            createdAt: String,
            updatedAt: String,
            _destroy: Boolean,
            deletedAt: String,
        }
    ],
});

const expense = new mongoose.Schema({
    value: { type: Number, require: true },
    createdAt: String,
    UpdatedAt: String,
    _destroy: Boolean,
    deletedAt: String,
    userId: mongoose.Schema.Types.ObjectId,
});

const UserModel = mongoose.model('User', user);
const ExpenseModel = mongoose.model('Expese', expense);

module.exports = {
    UserModel: UserModel,
    ExpenseModel: ExpenseModel,
}

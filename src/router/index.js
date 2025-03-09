const express = require("express");
const { isFormatValidSignUp, isFormatValidForSignIn, auth } = require("../Middlewares");
const { signupUser, signinUser, createAnExpense, getAllExpenses, updateAnExpense, deleteAnExpese } = require("../Controllers");

const router = express.Router();

// Todo
// 1. signup
    router.post('/signup', isFormatValidSignUp, signupUser);

// 2. signin
    router.post('/signin', isFormatValidForSignIn, signinUser);

// 3. Create an Expense
    router.post('/create-expense', auth, createAnExpense);

// 7. Get List of Expense
    router.get('/all-expeses', auth, getAllExpenses);

// 4. Update an Expense
    router.put('/update-expense', auth, updateAnExpense);

// 6. Delete an Expese
    router.delete('/delete-expense', auth, deleteAnExpese);




module.exports = router;
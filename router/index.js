const express = require("express");
const { isFormatValidSignUp, isFormatValidForSignIn } = require("../Middlewares");
const { signupUser, signinUser } = require("../Controllers");

const router = express.Router();

// Todo
// 1. signup
    router.post('/signup', isFormatValidSignUp, signupUser);

// 2. signin
    router.post('/signin', isFormatValidForSignIn, signinUser);
// 3. Create an Expense
// 4. Update an Expense
// 5. Get an Expense
// 6. Delete an Expese
// 7. Get List of Expense
// 8. Get filter

// dummmy
router.get('/', (req, res) => {
    res.send("Hello mahi")
})


module.exports = router;
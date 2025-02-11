const express = require("express");
const { isFormatValid } = require("../Middlewares");
const { signupUser } = require("../Controllers");

const router = express.Router();

// Todo
// 1. signup
    router.post('/signup', isFormatValid, signupUser);
// 2. signin
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
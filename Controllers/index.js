const bcrypt = require("bcrypt");
const { UserModel } = require("../Models");
// Todo
// 1. signup
const signupUser = async (req, res) => {
   try{
    const hashedPassword = await bcrypt.hash(req.body.password, 4);
    await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
    });
    res.status(202).json({
        message: "Your are signed up!",
    })
   } catch(err) {
    console.log("failure in signup controller", err);
   }
}
// 2. signin
// 3. Create an Expense
// 4. Update an Expense
// 5. Get an Expense
// 6. Delete an Expese
// 7. Get List of Expense
// 8. Get filter

module.exports = {
    signupUser: signupUser,
}
const bcrypt = require("bcrypt");
const { UserModel } = require("../Models");
const jwt = require("jsonwebtoken");

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
        success: true,
    })
   } catch(err) {
    console.log("failure in signup controller", err);
   }
}

// 2. signin
const signinUser = async (req, res) => {
        try{
            const currentUser = await UserModel.findOne({ email: req.body.email });
            if(!currentUser) {
                res.status(400).json({
                    message: "User Does not exists",
                    success: false,
                });
                return;
            };
            
            const comparedUser = bcrypt.compare(req.body.password, currentUser.password);
            if (comparedUser) {
                const token = jwt.sign({ id: currentUser._id.toString() }, process.env.JWT_SECRET);
                res.status(200).json({
                    message: "Your are SignedIn",
                    success: true,
                    token: token,
                })
            }
        }catch(err){
            console.log("Failure in signinUser Controller", err);
        }
        
};
// 3. Create an Expense
// 4. Update an Expense
// 5. Get an Expense
// 6. Delete an Expese
// 7. Get List of Expense
// 8. Get filter

module.exports = {
    signupUser: signupUser,
    signinUser: signinUser,
}
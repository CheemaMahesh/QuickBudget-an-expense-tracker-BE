const bcrypt = require("bcrypt");
const { UserModel, ExpenseModel } = require("../Models");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

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
const createAnExpense = async (req, res) => {
        try{
        const userId = req.body.userId;
        const requiredValue = z.number().gte(0);
        const successRequiredDetails = requiredValue.safeParse(req.body.value);
        if (!successRequiredDetails.success) {
            res.status(400).json({
                message: "Value is In-Valid",
                success: false,
            });
            return;
        }
       const result =  await ExpenseModel.create({
            value: req.body.value,
            createdAt: new Date().toISOString(),
            userId: userId,
            _destroy: false,
        });
        console.log("result", result);
        if (!result._id) {
            res.status(500).json({
                message: "Unable to Add Expense",
                success: false,
            });
            return;
        }
        const ressss = await UserModel.findByIdAndUpdate(userId, { $push: { expenses: result._id, _destroy: false, } });
        res.status(200).json({
            message: "Your Exprense Has been Successfully Saved",
            success: true,
        });
        } catch(err){
            console.log("Error in CreateExpenseController", err);
        }   
}

// 7. Get List of Expense
    const getAllExpenses = async (req, res) => {
        try{
            const { userId } = req.body;
        const allExpeses = await ExpenseModel.find({ userId: userId })
        res.status(200).json({
            message: "Here is Your Expenses",
            successs: true,
            exprenses: allExpeses?.map((item) => ({
                value: item.value,
                createdAt: item.createdAt,
                id: item._id,
            })),
            total: allExpeses?.reduce((a, b) => a + b.value, 0),
        })
        } catch(err) {
            console.log("error in get all expense controller", err);
        }
    };

// 4. Update an Expense
    const updateAnExpense = async (req, res) => {
        try{
            const { value, id } = req.body;
        const successRequiredDetails = z.number().gte(0).safeParse(value);
        if(!successRequiredDetails.success) {
            res.status(400).json({
                message: "Invalid Value Format",
                success: false,
            });
            return;
        }
        await ExpenseModel.findByIdAndUpdate(id, {value: value, updatedAt: new Date().toISOString()});
        res.status(200).json({
            message: "Your Expesnse has been updated!",
            success: true,
        })
        } catch(err) {
            console.log("Error in update and expense controller", err);
        }
    };

// 6. Delete an Expese
    const deleteAnExpese = async (req, res) => {
            try{
                const { id }  = req.body;
            await ExpenseModel.findByIdAndDelete(id);
            res.status(200).json({
                message: "Your Expense has been deleted",
                success: true,
            })
            } catch(err) {
                console.log("error in delete an expense controller", err);
            }
    };

// 7. Get filter -- to be developed
    // const filterbyDate = async (req, res) => {
    //     const { date, id } = req.body;
    // };

module.exports = {
    signupUser: signupUser,
    signinUser: signinUser,
    createAnExpense: createAnExpense,
    getAllExpenses: getAllExpenses,
    updateAnExpense: updateAnExpense,
    deleteAnExpese: deleteAnExpese,
    // filterbyDate: filterbyDate,
}
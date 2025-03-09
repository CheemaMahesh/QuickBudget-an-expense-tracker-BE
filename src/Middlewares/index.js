const { z } = require("zod");
const jwt = require("jsonwebtoken");

const isFormatValidSignUp = async (req, res, next) => {
try{
    const requiredDetails = z.object({
        name: z.string().min(3).max(40),
        email: z.string().min(5).max(50).email(),
        password: z.string().min(6).max(35),
    });
    const successRequiredDetails = requiredDetails.safeParse(req.body);
    // Return error message if the format is incorrect
    if (!successRequiredDetails.success) {
        res.status(400).json({
            message: "Format is incorrect",
            success: false,
        })
        return;
    }
    next();
} catch (err) {
    console.log("something went wrong in isFormatValidsignup middlware!", err);
}
}

const isFormatValidForSignIn = async (req, res, next) => {
   try{
    const requiredDetails = z.object({
        email: z.string().min(3).max(40).email(),
        password: z.string().min(5).max(50),
        });
    const successRequiredDetails = requiredDetails.safeParse(req.body);
    if (!successRequiredDetails.success){
        res.status(400).json({
            message: "Invalid Body Format",
            success: false,
        });
        return;
    }
    next();
   } catch(err) {
    console.log("something went wrong in isFormatValidSignin middlware!", err);
   }
}

const auth = (req, res, next) => {
    try{
        const token = req.headers.token;

        if(!token) {
            res.status(404).json({
                message: "Unotherized Request, Token is missing",
                success: false,
            });
            return;
        }

        const exiUser = jwt.verify(token, process.env.JWT_SECRET);
        if(!exiUser){
            res.status(404).json({
                message: "Unotherized Request",
                success: false,
            });
            return;
        }
        req.body.userId = exiUser.id;
        next();
    } catch(err){
        console.log("error in auth", err);
    }
}

module.exports = {
    isFormatValidSignUp: isFormatValidSignUp,
    isFormatValidForSignIn: isFormatValidForSignIn,
    auth: auth,
};

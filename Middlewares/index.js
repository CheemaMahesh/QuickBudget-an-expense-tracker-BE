const { z } = require("zod");
// TODO ceate an auth middlware
// TODO create validate all required details

const isFormatValid = async (req, res, next) => {
try{
    const requiredDetails = z.object({
        name: z.string().min(3).max(40),
        email: z.string().min(5).max(50).email(),
        password: z.string().min(6).max(35),
    });
console.log("req.body", req.body);
    const successRequiredDetails = requiredDetails.safeParse(req.body);
console.log("successRequiredDetails", successRequiredDetails)
    // Return error message if the format is incorrect
    if (!successRequiredDetails.success) {
        res.status(400).json({
            message: "Format is incorrect",
            // details: successRequiredDetails.error,
        })
        return;
    }
    next();
} catch (err) {
    console.log("something went wrong in isFormatValid middlware!", err);
}

}

module.exports = {
    isFormatValid: isFormatValid,
};

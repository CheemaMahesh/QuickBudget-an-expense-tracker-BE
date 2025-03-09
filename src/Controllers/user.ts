import { SigninRequest, SignupRequest, AuthRes, UserSchemaType } from '../utils/types';
import { User } from '../Models/schemas';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { invalidUserLogin } from '../utils/constants';

export const signupUser = async (req: SignupRequest, res: AuthRes) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 4);
        await User.create({
            name, email, password: hashedPassword
        });

        res.status(200).json({
            message: "You are succesfull signed up!",
            success: true,
        });

    } catch (err) {
        console.log("Sothing went wrong in signup controller", err);
        res.status(500).json({
            message: "Somthing went Wrong! please try again! SUP-Con",
            success: false,
        })
    }
}


export const signinUser = async (req: SigninRequest, res: AuthRes) => {
    try {
        const { email, password } = req.body;

        const existingUser: UserSchemaType | null = await User.findOne({ email });

        if (!existingUser) {
            res.status(400).json({
                message: invalidUserLogin,
                success: false,
            });
            return;
        };

        const currentPassword = await bcrypt.compare(existingUser.password, password);

        if (!currentPassword) {
            if (!existingUser.email) {
                res.status(400).json({
                    message: invalidUserLogin,
                    success: false,
                });
                return;
            };
        }

        const token = jwt.sign({ _id: existingUser._id.toString() }, String(process.env.JWT_SECRET));

        res.status(200).json({
            message: "You are logedin successfully",
            token,
            success: true,
        })

    } catch (err) {
        console.log("Sothing went wrong in signin controller", err);
        res.status(500).json({
            message: "Somthing went Wrong! please try again! SUP-Con",
            success: false,
        })
    }
}
import { User } from '../Models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export async function signUp(req, res) {
    try {
        const { name, email, password } = req.body;
        const userAvailable = await User.findOne({ email });
        if (userAvailable) {
            res.status(409).json({ message: "User already exist.You can login" })
        }

        const hashPassword = await bcrypt.hash(password, 10);


        const user = new User({
            name,
            email,
            password: hashPassword,
        })

        await user.save();

        res.status(201).json({
            message: "SignUp Successfully",
            success: true,
        })

    } catch (error) {
        res.status(500).json({ message: "Error", success: false })
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const userAvailable = await User.findOne({ email });
        if (!userAvailable) {
            res.status(403).json({ message: "User not registered.Please SignUp" })
        }

        const isPassEqual = await bcrypt.compare(password, userAvailable.password);

        if (!isPassEqual) {
            res.status(403).json({ message: "Auth failed or password is wrong" })
        }

        const jwtToken = jwt.sign(
            { email: userAvailable.email, _id: userAvailable._id },
            JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200).json({
            message: "Login Success",
            success: true,
            jwtToken,
            email,
            name: userAvailable.name,
        })

    } catch (error) {
        res.status(500).json({ message: "Error", success: false });
    }
}
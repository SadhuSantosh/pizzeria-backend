import express from "express";
import bcrypt from "bcrypt";
import { addUser, getUserbyUsername, sendMail, getUserbyUniqueID, setValidUser, getForgotPasswordUser, resetPassword } from "../helper.js";
import jwt from 'jsonwebtoken';


const router = express.Router();
const passwordPattern = /(?=.*[A-Z]+)(?=.*[a-z]+)(?=.*[0-9]+)(?=.*[!@#$*]).{8,}/g;

router.route("/signup")
    .post(async (req, res) => {
        const { firstname, lastname, DOB, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const isUserExists = await getUserbyUsername(email);
        const hashedPassword = await bcrypt.hash(password, salt);
        const isStrongPassword = password.match(passwordPattern);
        const isValidUser = false;
        const uniqueString = salt.replaceAll('/', '').replaceAll('.', '') + 'p';
        isUserExists && isUserExists.userType === "U"
            ?
            res.status(400).send({ message: `A user with this email already exists` })
            :
            (isStrongPassword
                ?
                (await addUser({ firstname, lastname, DOB, email, password: hashedPassword, isValidUser, uniqueString: uniqueString, userType: "U" }) && sendMail(firstname, email, uniqueString, res, "user", "verification"))
                :
                res.status(400).send(
                    {
                        message: "password is not strong, it should contain minimum of 8 characters including a capital letter, small letter, special character and a number. Ex:Password@123"
                    })
            )
    })

router.route("/verification/:uniqueId")
    .get(async (req, res) => {
        const { uniqueId } = req.params;
        const user = await getUserbyUniqueID(uniqueId);
        if (user) {
            await setValidUser(uniqueId);
            res.send("Thank you for confirmation, now you can login to the site");
        }
        else {
            res.send("User not found");
        }

    })

router.route("/login")
    .post(async (req, res) => {
        const { email, password } = req.body;
        const user = await getUserbyUsername(email);
        let isPasswordMatched;
        if (user) {
            isPasswordMatched = await bcrypt.compare(password, user.password);
        }

        !user
            ?
            res.status(401).send({ message: `Invalid Credentials` })
            :
            !user.isValidUser
                ?
                res.status(401).send({ message: `Invalid Credentials` })
                :
                (isPasswordMatched
                    ?
                    res.send({ message: `Successful login`, token: jwt.sign({ id: user._id }, process.env.SECRET_KEY) })
                    :
                    res.status(401).send(
                        {
                            message: "Invalid Credentials"
                        })
                )
    })

router.route("/forgot-password")
    .post(async (req, res) => {
        const { email } = req.body;
        const user = await getForgotPasswordUser(email, "U");
        user && user.userType === "U"
            ?
            sendMail(user.firstName, email, user.uniqueString, res, "user", "forgotPassword")
            :
            res.status(400).send({ message: `The user with this email doesn't exists, please check your email once.` })
    })

router.route("/reset-password/:uniqueId")
    .post(async (req, res) => {
        const { uniqueId } = req.params;
        const { newPassword } = req.body;
        const user = await getUserbyUniqueID(uniqueId);
        const isStrongPassword = newPassword.match(passwordPattern);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        let isPasswordMatched;
        if (user) {
            isPasswordMatched = await bcrypt.compare(newPassword, user.password);
        }
        if (user) {
            !isStrongPassword
                ?
                res.status(400).send(
                    {
                        message: "password is not strong, it should contain minimum of 8 characters including a capital letter, small letter, special character and a number. Ex:Password@123"
                    })
                :
                isPasswordMatched
                    ?
                    res.send({ message: "New password should not be any of past passwords." })
                    :
                    await resetPassword(user.uniqueString, hashedPassword) &&
                    res.send("Your password has changed successfully.");
        }
        else {
            res.send("User not found");
        }

    })

export const userRouter = router;
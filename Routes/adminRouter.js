import express from "express";
import bcrypt from "bcrypt";
import { addUser, getUserbyUsername, sendMail, getUserbyUniqueID, setValidUser } from "../helper.js";
import jwt from 'jsonwebtoken';


const router = express.Router();
const passwordPattern = /(?=.*[A-Z]+)(?=.*[a-z]+)(?=.*[0-9]+)(?=.*[!@#$*]).{8,}/g;

router.route("/signup")
    .post(async (req, res) => {
        const { firstName, lastName, DOB, email, password, adminKey } = req.body;
        const salt = await bcrypt.genSalt(10);
        const isUserExists = await getUserbyUsername(email);
        const hashedPassword = await bcrypt.hash(password, salt);
        const isStrongPassword = password.match(passwordPattern);
        const isValidUser = false;

    adminKey === process.env.ADMIN_KEY || adminKey === null || adminKey === undefined
        ? 
          isUserExists && isUserExists.userType=== "A"
            ?
            res.status(400).send({ message: `The user with this email already exists` })
            :
            (isStrongPassword
                ?
                (await addUser({ firstName, lastName, DOB, email, password: hashedPassword, isValidUser, uniqueString: salt+"p", userType:"A" }) && sendMail(firstName, email, salt+"p", res, "admin"))
                :
                res.status(400).send(
                    {
                        message: "password is not strong, it should contain minimum of 8 characters including a capital letter, small letter, special character and a number. Ex:Password@123"
                    })
            )
        :
        res.status(400).send({message: "Invalid admin key !!"})
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
            res.status(400).send({ message: `Invalid Credentials` })
            :
            !user.isValidUser
                ?
                res.status(400).send({ message: `Invalid Credentials` })
                :
                (isPasswordMatched
                    ?
                    res.send({ message: `Successful login`, token: jwt.sign({ id: user._id }, process.env.SECRET_KEY) })
                    :
                    res.status(400).send(
                        {
                            message: "Invalid Credentials"
                        })
                )
    })

export const adminRouter = router;
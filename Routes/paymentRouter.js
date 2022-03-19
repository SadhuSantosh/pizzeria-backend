import express from "express";
const router = express.Router();
import { auth } from "../middleware/auth.js";
import Razorpay from "razorpay";

const razorpayInstance = new Razorpay({
    key_id: "rzp_test_ofJulQLWmYSsJC",
    key_secret: "Qeqi7jbsozqLeevvQfsWZNJn",
})

router.route("/order")
    .post(auth, async (req, res) => {
        const { amount } = req.body;
        try {
            const response =await razorpayInstance.orders.create({
                "amount": +amount * 100,
                "currency": "INR",
                "receipt": process.env.RAZORPAY_SECRET_KEY_RECEIPT,
                "payment_capture":1
            })
            res.send(response);
        }
        catch (error) {
            console.log(error);
            res.send({
                status:"failure",
                message:"Something went wrong"
            })
        }
    })


    // router.route("/verification")
    // .post(async (req, res) => {
    //     const SECRET=process.env.RAZORPAY_WEBHOOK_SECRET;
    //     res.status(200).send({ status: "ok" });   
    //  })
    

export const paymentRouter = router;
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
        console.log(req.body);
        try {
            const response = razorpayInstance.orders.create({
                "amount": +amount * 100,
                "currency": "INR",
                "receipt": process.env.RAZORPAY_SECRET_KEY_RECEIPT,
            })
            res.send(response)
        }
        catch (error) {
            console.log(error);
        }
        res.send(response);
    })


export const paymentRouter = router;
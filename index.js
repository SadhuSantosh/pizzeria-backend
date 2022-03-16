import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./Routes/userRouter.js";
import { adminRouter } from "./Routes/adminRouter.js";
import {paymentRouter} from "./Routes/paymentRouter.js"
import {auth} from "./middleware/auth.js";
import { getPizzaData } from "./helper.js";


dotenv.config();

const app = express();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 9000;

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("mongo db connected !");
    return client;
}
export const client =await createConnection();

app.use(express.json());
app.use(cors());

app.listen(PORT, ()=> console.log("App is started on "+ PORT));

app.get("/", (request, response)=>{
    response.send("Hello Welcome to pizzeria !!");
})

app.use("/user",userRouter);
app.use("/admin",adminRouter);
// app.use("/payment",paymentRouter);

app.get("/pizza-data", auth ,async (req,res)=>{
    let data =await getPizzaData();
    res.send(data);
})




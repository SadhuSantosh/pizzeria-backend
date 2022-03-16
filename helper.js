import { client } from "./index.js";
import nodemailer from "nodemailer";


async function getPizzaData() {
    return await client
        .db("pizzaApp")
        .collection("pizzaData")
        .find({})
        .toArray();
}

async function addUser(data) {
    return await client
        .db("pizzaApp")
        .collection("user")
        .insertOne(data);
}

async function getUserbyUsername(email) {
    return await client
        .db("pizzaApp")
        .collection("user")
        .findOne({ email: email });
}

async function getUserbyUniqueID(uniqueId) {
    return await client
        .db("pizzaApp")
        .collection("user")
        .findOne({ uniqueString: uniqueId });
}

async function setValidUser(uniqueId) {
    return await client
        .db("pizzaApp")
        .collection("user")
        .updateOne({ uniqueString: uniqueId }, { $set: { isValidUser: true } })
}

async function getForgotPasswordUser(email, usertype) {
    return await client
        .db("pizzaApp")
        .collection("user")
        .findOne({ email: email, userType: usertype })
}

async function resetPassword(uniqueId,newPassword) {
    return await client
    .db("pizzaApp")
    .collection("user")
    .updateOne({ uniqueString: uniqueId }, { $set: { password: newPassword } })
}

const sendMail = (firstName, email, uniqueString, res, usertype, emailType) => {
    var Transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    var mailOptions;
    let sender = "Pizzeria";
    mailOptions = {
        from: sender,
        to: email,
        subject: emailType === "verification" ? `${usertype} email confirmation for pizzeria 🍕 !!` : `${usertype} password reset for pizzeria 🍕 !!`,
        html: emailType === "verification" ? `<div style="font-family: Arial, Helvetica, sans-serif;">
         <h2>Pizzeria 🍕</h2>  
         Hi ${firstName},
         <br/><br/>
         We are happy that you signed up for Pizzeria. To start exploring the Pizzeria site, please confirm your email address.
         <br/><br/>
         <a href="http://localhost:3000/${usertype}/verification/${uniqueString}" style="
           background-color:teal;
           color: white;
           padding: 10px 20px;
           text-decoration: none;
           display: inline-block;
           font-family: Arial, Helvetica, sans-serif;
           cursor: pointer;
           border-radius: 25px;" >Verify now !!</a>
         <br/><br/>
         Welcome to Pizzera family !
         <br/>
         The Pizzeria team
         </div>`
            :
            `<div style="font-family: Arial, Helvetica, sans-serif; text-align: center">
               <h2>Pizzeria 🍕</h2> 
            <div style="width:400px; margin:auto; background: whitesmoke; padding: 20px 30px; border-radius: 5px">
        <h3> Reset your password</h3>
         Hi ${firstName},
         <br/><br/>
         We're sending you this mail because you requested a password reset. Click on this below linkto create a new password.
         <br/><br/>
         <a href="http://localhost:9000/${usertype}/reset-password/${uniqueString}" style="
           background-color:#ff3f55;
           color: white;
           padding: 10px 20px;
           text-decoration: none;
           display: inline-block;
           font-family: Arial, Helvetica, sans-serif;
           cursor: pointer;
           border-radius: 25px;" >set a new password</a>
         <br/><br/>
         If you didn't request a password reset, you can ignore this mail. Your password will not  be chnaged.
        <br/><br/>
        <h4> The Pizzeria team</h4>
         </div>
</div>`
    };
    Transport.sendMail(mailOptions, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            emailType==="verification" 
            ?
             res.send({ message: `A verification link has sent to ${email}, please check your mail and verify for registration.` })
            :
             res.send({message: `A password reset link has sent to ${email}.`})
        }
    });
}


export { addUser, getUserbyUsername, sendMail, getUserbyUniqueID, setValidUser, getForgotPasswordUser, resetPassword, getPizzaData };
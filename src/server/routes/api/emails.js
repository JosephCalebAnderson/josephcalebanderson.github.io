const express = require("express");
const nodemailer = require("nodemailer");
const emailRouter = express.Router();

module.exports = emailRouter;

// Sending email verification Helpful links: 
/*
https://stackoverflow.com/questions/57317531/mern-stack-email-confirmation
https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
https://nodemailer.com/message/
*/
// If this causes issues, make sure to paste "npm install nodemailer"
emailRouter.post("/", async (req,res) => {
    //let { newUser } = req.body
    let transporter = nodemailer.createTransport({
        service:'outlook',
        auth: {
            user: 'bigscreenbook@outlook.com',
            pass: 'MagicIsSick'
        }
    });
    // Create the content of our email
    let mailOptions = {
        from: '"BigScreenBook" <bigscreenbook@outlook.com>',
        bcc: req.body.emails,
        subject: req.body.subject,
        text: req.body.message
    };
    // Send the email to the customers.
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return
            console.log(error);
        }
        res.json(info);
    });
});
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const JWT_SECERT = require('../utils/JWT_SECRET');

const sendEmail = async (email, token) => {
    const subject = "Email Verification";
    console.log("token  in send email : ", token);
    // const encodedToken = encodeURIComponent(token);

    const payload = { userId: token };
    const encodedToken = jwt.sign(payload,JWT_SECERT,{ expiresIn : '1h'});
    console.log("encoded token : ", encodedToken);
    const text = `Please click on the link to verify your email : http://localhost:3000/auth/verify/${encodedToken}`;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "tanishqasharma797@gmail.com",
                pass: "vfed zkvl muxs ctes",
            },
        });

        const mailOptions = {
            from: "",
            to: email,
            subject: subject,
            text: text,
        };

        const result = await transporter.sendMail(mailOptions);
        // console.log("result : ",result);
        return result;
    }
    catch (err) {
        console.log("error in node mailer : send Email , ", err);
        return err;
    }
};

module.exports = {
    sendEmail,
}
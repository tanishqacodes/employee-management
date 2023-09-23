var bcrypt = require("bcrypt");
var User = require("../models/User.model");
var AuthenticationMiddleware = require('../middleware/Authentication.middleware');
const { sendEmail } = require("../utils/emailVerification.utils");
const UserModel = require("../models/User.model");

const AuthController = {
    loginUser: async (req, res) => {
        var { email, password } = req.body;
        let ifUserFounded = await User.findOne({ email: email });
        console.log("Usser : ", ifUserFounded);

        if (!ifUserFounded) {     //null === false => true
            return res.send("User not found");
        }

        // email verification
        if(!ifUserFounded.isEmailVerified){
            return res.status(401).send("Please verify your email..");
        }
        // hashed password , password
        let isPasswordMatched = await bcrypt.compare(password, ifUserFounded.password);

        if (!isPasswordMatched) {
            return res.send("Password incorrect");
        }
        const token = AuthenticationMiddleware.generateToken(ifUserFounded);
        return res.send({
            status: "success",
            data: ifUserFounded,
            token: token
        });
    },

    registerUser: async (req, res) => {
        var { email, employeeName, phoneNumber, dob, password, username } = req.body;

        // check if user already exists !!!
        let ifUserFounded = await User.findOne({ email: email });
        console.log("Usser : ", ifUserFounded);

        if (ifUserFounded) {     //null === false => true
            return res.send("User already exists");
        }

        // hashing => 10 by default (salt)
        let hashedPassword = await bcrypt.hash(password, 10);

        // instance creation => key : value pair
        let user = new User({
            email: email,
            employeeName: employeeName,
            phoneNumber: phoneNumber,
            dob: dob,
            password: hashedPassword,
            userName: username
        });
        // save into variable
        let dataSaved = await user.save();

        if (dataSaved) {
            const token = AuthenticationMiddleware.generateToken({
                email: email,
            });

            const isMailSent = await sendEmail(email, token);
            if (!isMailSent) {
                return res.send("Email is not send");
            }

            return res.send("User registered successfully , please verify your email");
        }
        else {
            return res.send("Something went wrong user is not registered due to error...");
        }
    },

    verifyEmail: async (req, res) => {
        const encodedToken = req.params;
        const decodedToken = await AuthenticationMiddleware.verifyEmailToken(encodedToken);
        // console.log("decode in verify emial : ",decodedToken);
        if (decodedToken) {
            let ifUserFounded = await UserModel.findOne({
                email: decodedToken.email,
            });
            console.log("user : ",ifUserFounded);
            if (!ifUserFounded) {
                return res.status(400).send("User not found...");
            } 
            ifUserFounded.isEmailVerified = true;
            let isUserSaved = await ifUserFounded.save();
            if (!isUserSaved) {
                return res.status(500).send("Something went wrong");
            } 
            return res.status(200).send("Email verified successfully");
        }
        return res.status(500).send("Something went wrong");
    } 
}
module.exports = AuthController;
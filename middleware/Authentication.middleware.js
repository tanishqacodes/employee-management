const jwt = require("jsonwebtoken");
const JWT_SECERT = "fdyugfiwokdmcngfoidjskndbwiuodpklxngfcdertyuioplgvbgfcvbytrdcnjytfcvhtrdcvbjuytrdxcvbhgtfrdcvgtrdxbnhytfrdckmnbvcfdrtyuijknbvcfdrtyuijk";

const AuthenticationMiddleware = {
    autheticate: (req, res, next)=>{

        try {
            let token = req.headers.authorization.split(" ")[1];
            let decoded = jwt.verify(token,JWT_SECERT);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).send("Unauthorized...");
        }
    },

    generateToken: (user) => {
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                employeeName: user.employeeName,
                phoneNumber: user.phoneNumber,
                dob: user.dob,
                userName: user.userName,
            },
            JWT_SECERT,
            {
                expiresIn: "6h",
            }

        )

        return token;
    }
}

module.exports = AuthenticationMiddleware;
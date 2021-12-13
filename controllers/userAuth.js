// Import dependencies
const { User } = require("./../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userAuth = {};

// User Sign In
userAuth.signin = async (req, res) => {
    const data = req.body;

    try {
        const user = await User.findOne({ email : data.email }) || await User.findOne({ account_number : data.account_number });
        if (!user) return res.status(400).send({ message: "Invalid Email Or Password" });
        const isValidPassword = await bcrypt.compare(data.password, user.password);
        if (!isValidPassword) return res.status(400).send({ message: "Invalid Email Or Password "});

        const token = jwt.sign({ user_id: user._id }, JWT_SECRET_KEY, { expiresIn: 60*5 });

        res.status(200).send({
            message: `Hello ${user.fullName}! \n Welcome To Your Dashboard Of Central Bank Of Genesys (CBG)`,
            data : {
                token
            }
        })
    } catch (error) {
        res.status(400).send({ message : "Unable To SignIn User", err: error })
    }
}


module.exports = userAuth;
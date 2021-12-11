// Import dependencies
const { Admin } = require("./../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const adminAuth = {};


// Admin Sign Up
adminAuth.signup = async (req, res) => {
    const data = req.body;

    // Validation
    const errors = validationResult(req);

    if(!errors.isEmpty()) res.status(400).send({ errors: errors.array() })

    try {
        // hash passwords
        const salt = 15;
        let adminAccess = false;
        const passwordHash = await bcrypt.hash(data.password, salt);
        if (data.role.toLowerCase().indexOf("manager") > 0 || data.role.toLowerCase().indexOf("chief") > 0) adminAccess = true;
        const admin = await new Admin({
            email : data.email,
            firstName : data.firstName,
            lastName : data.lastName,
            fullName : data.firstName+" "+data.lastName,
            password : passwordHash,
            phone : data.phone,
            address : data.address,
            role : data.role,
            adminAccess : adminAccess
        }).save();

        // create token
        const token = jwt.sign(
            { admin_id : admin._id },
            JWT_SECRET_KEY
        );

        res.status(200).send({
            message : "New Admin Created Successfully!",
            data : {
                token,
                admin_id : admin._id,
                email : admin.email,
                fullName : admin.fullName,
                role : admin.role,
                adminAccess : admin.adminAccess
            }
        })
    } catch (error) {
        if (error.keyPattern) res.status(400).send({ message : "Admin Already Exists", err : error });
        else res.status(400).send({ message : "Could Not Add Admin", err : error });
    }
}


// Admin Sign In
adminAuth.signin = async (req, res) => {
    const data = req.body;

    try {
        const admin = await Admin.findOne({ email : data.email });
        if (!admin) return res.status(400).send({ message: "Invalid Email Or Password" });
        const isValidPassword = await bcrypt.compare(data.password, admin.password);
        if (!isValidPassword) return res.status(400).send({ message: "Invalid Email Or Password "});

        const token = jwt.sign({ admin_id: admin._id }, JWT_SECRET_KEY);

        res.status(200).send({
            message: `Hello ${admin.fullName}! \n Welcome To The Admin Site Of Central Bank Of Genesys (CBG)`,
            data : {
                token
            }
        })
    } catch (error) {
        res.status(400).send({ message : "Unable To SignIn Admin", err: error })
    }
}

module.exports = adminAuth;
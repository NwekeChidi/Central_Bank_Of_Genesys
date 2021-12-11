// Import dependencies
const { Admin } = require("./../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const adminAuth = {};


// Admin Sign Up
adminAuth.signup = async (req, res) => {
    const data = req.body;

    try {
        // hash passwords
        const salt = 15;
        let adminAccess = false;
        const passwordHash = await bcrypt.hash(data.password, salt);
        if (data.role.toLowerCase().indexOf("manager") > 0) adminAccess = true;
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
                fullName : admin.email,
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
// adminAuth.signin = 

module.exports = adminAuth;
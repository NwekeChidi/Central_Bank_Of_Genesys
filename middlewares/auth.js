// Import dependencies
const { Admin } = require("../models/admin");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

exports.adminAuth = () => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) throw new Error("Token Not Found!");
            const decoded = jwt.decode(token);

            
            if (!decoded) throw new Error("Admin Authorization Failed!");
            const admin = await Admin.findById(decoded.admin_id);
            if (!admin) throw new Error("Admin Not Registered");

            req.ADMIN_ID = admin._id;
            
            next();
        } catch (error) {
            next(error);
        }
    }
}

exports.userAuth = () => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) throw new Error("Token Not Found!");
            const decoded = jwt.decode(token);

            
            if (!decoded) throw new Error("User Authorization Failed!");
            const user = await User.findById(decoded.user_id);
            
            if (!user) throw new Error("User Not Registered");

            req.USER_ID = user._id;
            
            next();
        } catch (error) {
            next(error);
        }
    }
}

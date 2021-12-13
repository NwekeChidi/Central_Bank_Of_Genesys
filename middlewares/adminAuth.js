// Import dependencies
const { Admin } = require("../models/admin");
const jwt = require("jsonwebtoken");

module.exports = () => {
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
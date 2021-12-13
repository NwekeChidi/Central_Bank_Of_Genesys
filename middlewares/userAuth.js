// Import dependencies
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = () => {
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
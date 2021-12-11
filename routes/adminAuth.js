// Import Dependencies
const router = require("express").Router();
const AuthController = require("./../controllers/adminAuth");
const { check } = require("express-validator");

// Admin Routers
router.post("/signup", [
    check("email", "Please Provide A Valid Email!").isEmail(),
    check("password", "Password Must Be At Least 6 Characters!").isLength({
        min: 6
    })
], AuthController.signup);
router.post("/signin", AuthController.signin);


module.exports = router;
// Import Dependencies
const router = require("express").Router();
const AdminController = require("./../controllers/admin");
const auth = require("../middlewares/auth");
const AuthController = require("./../authentication/adminAuth");
const { check } = require("express-validator");

// Auth Routes
router.post("/signup", [
    check("email", "Please Provide A Valid Email!").isEmail(),
    check("password", "Password Must Be At Least 6 Characters!").isLength({
        min: 6
    })
], AuthController.signup);
router.post("/signin", AuthController.signin);

// Admin Routes
router.post("/create_user", auth.adminAuth(), AdminController.createUser);
router.delete("/delete_user/:user_id", auth.adminAuth(), AdminController.deleteUser);
router.patch("/reverse/:transfer_id", auth.adminAuth(), AdminController.reverse);
router.patch("/disable_user/:user_id", auth.adminAuth(), AdminController.disableUser);
router.put("/disable_card/:user_id", auth.adminAuth(), AdminController.disableCard);
router.delete("/remove_admin/:admin_id", auth.adminAuth(), AdminController.removeAdmin);
router.patch("/reactivate_user/:user_id", auth.adminAuth(), AdminController.reactivateUser);

module.exports = router;
// Import Dependencies
const router = require("express").Router();
const AdminController = require("./../controllers/admin");
const adminAuth = require("./../middlewares/adminAuth");
//const { check } = require("express-validator");

// Admin Routers
router.post("/create_user", adminAuth(), AdminController.createUser);
//router.post("/signin", AuthController.signin);


module.exports = router;
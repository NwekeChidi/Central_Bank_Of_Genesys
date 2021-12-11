// Import Dependencies
const router = require("express").Router();
const AuthController = require("./../controllers/adminAuth")

// Admin Routers
router.post("/signup", AuthController.signup);

module.exports = router;
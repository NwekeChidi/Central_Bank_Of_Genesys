// Import Dependencies
const router = require("express").Router();
const AuthController = require("./../controllers/userAuth");

// Admin Routers
router.post("/signin", AuthController.signin);


module.exports = router;
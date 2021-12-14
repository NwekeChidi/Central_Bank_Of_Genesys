// Import Dependencies
const router = require("express").Router();
const UserController = require("./../controllers/user");
const userAuth = require("./../middlewares/userAuth");

// Admin Routers
router.patch("/base_transactions", userAuth(), UserController.base_transactions);
// router.delete("/delete_user/:user_id", adminAuth(), AdminController.deleteUser);



module.exports = router;
// Import Dependencies
const router = require("express").Router();
const AdminController = require("./../controllers/admin");
const adminAuth = require("./../middlewares/adminAuth");

// Admin Routers
router.post("/create_user", adminAuth(), AdminController.createUser);
router.delete("/delete_user/:user_id", adminAuth(), AdminController.deleteUser);



module.exports = router;
// Import Dependencies
const router = require("express").Router();
const UserController = require("./../controllers/user");
const auth = require("./../middlewares/auth");
const AuthController = require("../authentication/userAuth");

// Auth Routes
router.post("/signin", AuthController.signin);

// User Routes
router.patch("/base_transactions", auth.userAuth(), UserController.base_transactions);
router.patch("/transfer", auth.userAuth(), UserController.transfer);
router.get("/history", auth.userAuth(), UserController.getTransactions);
router.patch("/get_card", auth.userAuth(), UserController.getCard);
router.put("/disable", auth.userAuth(), UserController.disableCard);



module.exports = router;
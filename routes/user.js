// Import Dependencies
const router = require("express").Router();
const UserController = require("./../controllers/user");
const userAuth = require("./../middlewares/userAuth");

// User Routes
router.patch("/base_transactions", userAuth(), UserController.base_transactions);
router.patch("/transfer", userAuth(), UserController.transfer);
router.get("/history", userAuth(), UserController.getTransactions);
router.patch("/get_card", userAuth(), UserController.getCard)



module.exports = router;
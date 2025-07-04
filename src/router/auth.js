const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controllers/authController");
const  isAuthenticated  = require("../middleware/isAuthenticated");

const authController = require("../controllers/authController");

router.route("/create-user").post(authController.createUser);
router.route("/login").post(authController.login);
// Test route to check if authController is imported correctly
console.log('authController:', authController);
console.log('authController.login:', authController.login);
console.log('typeof authController.login:', typeof authController.login);
router.route("/register").post(authController.createUser);
// router.route("/login").post(authController.login);

module.exports = router;
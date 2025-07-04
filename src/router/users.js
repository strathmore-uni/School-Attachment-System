const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");
const  isAuthenticated = require("../middleware/isAuthenticated");

console.log("usersController", usersController);
console.log("isAuthenticated", isAuthenticated);
console.log("type of isAuthenticated", typeof isAuthenticated);
console.log("Raw import:", require("../middleware/isAuthenticated"));
// Test route
// /users/get-users
router.route("/get-users").get(usersController.getUsers);
router.route("/get-user-byId/:id").get(usersController.getUserById);
router
  .route("/get-current-user")
  .get(isAuthenticated.isAuthenticated, usersController.getCurrentUser);

module.exports = router;

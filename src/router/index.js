const router = require("express").Router();
const users = require("./users");
const auth = require("./auth");
const reports = require("./reports");
const supervisor = require("./supervisor");
const profile = require("./profile");
const students = require("./students");
const admin = require("./admin");

router.use("/users", users);
router.use("/auth", auth);
router.use("/reports", reports);
router.use("/supervisor", supervisor);
router.use("/profile", profile);
router.use("/students", students);
router.use("/admin", admin);
router.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

module.exports = router;
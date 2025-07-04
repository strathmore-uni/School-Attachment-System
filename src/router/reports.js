const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/reportsController");

// Define routes
router.post("/reports", reportsController.submitReport);
router.get("/reports/:studentId", reportsController.getStudentReports);
router.get("/reports/:reportId", reportsController.getReportById);
 router.put("/reports/:reportId/review", reportsController.reviewReport);

module.exports = router;
// This code sets up the routes for handling reports in the application.
// It includes routes for submitting a report, fetching reports by student ID, fetching a specific report
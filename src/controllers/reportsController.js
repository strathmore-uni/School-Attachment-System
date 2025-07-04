const pool = require('../config/db'); // Adjust path if needed
const ErrorHandler = require('../utils/ErrorHandler');
const SuccessHandler = require('../utils/SuccessHandler');
const jwt = require('jsonwebtoken'); 
const dotenv = require('dotenv'); 
dotenv.config();

// Submit a report
const submitReport = async (req, res) => {
  const {  report_title, content, week_number, activities, achievements, challenges, key_learnings, next_week_plans, student_id } = req.body;
const user_id = req.user.id; // Assuming user ID is stored in req.user after authentication 
  try {
    const result = await pool.query(`
      INSERT INTO reports (user_id, title, content, week_number, activities, achievements, challenges, key_learnings, next_week_plans, student_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `, [user_id, title, content, week_number, activities, achievements, challenges, key_learnings, next_week_plans, student_id]);

   /*  res.status(201).json({
      success: true,
      message: 'Report submitted successfully',
      data: result.rows[0],
    }); */
    return SuccessHandler('Report submitted successfully', 201, res, result.rows[0]);
    console.log("Submitting report:", req.body);
  } catch (error) {
    console.error('Error submitting report:', error.message);
    console.log("Insert returned:", result.rows[0]);
    return ErrorHandler('Failed to submit report', 500, res);
  }
};

// Get reports by student
const getStudentReports = async (req, res) => {
  const { studentId } = req.params;

  try {
    const result = await pool.query(`
      SELECT * FROM reports WHERE student_id = $1 ORDER BY submitted_at DESC;
    `, [studentId]);

    return SuccessHandler('Fetched student reports successfully', 200, res, result.rows);
  } catch (error) {
    console.error('Error fetching student reports:', error.message);
    return ErrorHandler('Failed to fetch reports', 500, res);
  }
};

// Get a specific report
const getReportById = async (req, res) => {
  const { reportId } = req.params;

  try {
    const result = await pool.query(`SELECT * FROM reports WHERE id = $1;`, [reportId]);

    if (result.rows.length === 0) {
     /*  return res.status(404).json({ success: false, message: 'Report not found' }); */
        return ErrorHandler('Report not found', 404, res);
    }

    return SuccessHandler('Fetched report successfully', 200, res, result.rows[0]);
  } catch (error) {
    console.error('Error fetching report:', error.message);
    return ErrorHandler('Failed to fetch report', 500, res);
  }
};

// Supervisor reviews a report
// const ErrorHandler = require('../utils/ErrorHandler'); // Adjust path if needed
const reviewReport = async (req, res) => {
  const { reportId } = req.params;
  const { reviewed_by, comments, status } = req.body;

  try {
    const result = await pool.query(`
      UPDATE reports
      SET reviewed_by = $1, comments = $2, status = $3, reviewed_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *;
    `, [reviewed_by, comments, status, reportId]);

    return SuccessHandler('Report reviewed successfully', 200, res, result.rows[0]);
  } catch (error) {
    console.error('Error reviewing report:', error.message);
    return ErrorHandler('Failed to review report', 500, res);
  }
}; 

module.exports = {
  submitReport,
  getStudentReports,
  getReportById,
  reviewReport,
};
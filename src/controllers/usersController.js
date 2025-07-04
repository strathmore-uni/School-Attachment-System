const pool = require("../config/db");
const ErrorHandler = require("../utils/ErrorHandler");
const SuccessHandler = require("../utils/SuccessHandler");

const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return SuccessHandler("Users fetched successfully", 200, res, result);
  } catch (error) {
    console.error("Error while fetching users");
    return ErrorHandler("Error while fetching users", 500, res);
  }
};

const getUserById = async (req, res) => {
  // /users/get-user-byId/:id
  const userId = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId.id]);
    if (result.rows.length === 0) {
      return ErrorHandler("User not found", 404, res);
    }
    return SuccessHandler("User fetched successfully", 200, res, result.rows[0]);
  } catch (error) {
    console.error("Error while fetching user by ID", error);
    return ErrorHandler("Error while fetching user by ID", 500, res);
  }
};

const getCurrentUser = async (req, res) => {
  // Assuming you have user ID in req.user.id after authentication
  const userId = req.user.id;

  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (result.rows.length === 0) {
      return ErrorHandler("User not found", 404, res);
    }
    return SuccessHandler("User fetched successfully", 200, res, result.rows[0]);
  } catch (error) {
    console.error("Error while fetching current user", error);
    return ErrorHandler("Error while fetching current user", 500, res);
  }
};

module.exports = {
  getUsers,
  getUserById,
  getCurrentUser
};
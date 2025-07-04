const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const ErrorHandler = require("../utils/ErrorHandler.js");

const isAuthenticated = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.headers["authorization"]?.split(" ")[1];
    
    if (!token) {
      return ErrorHandler("No token provided", 401, res);
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Query the appropriate table based on user role
    let result;
    let user;
    
    try {
      if (decoded.role === "school_supervisor") {
        result = await pool.query(
          "SELECT id, role, name, email FROM school_supervisor WHERE id = $1",
          [decoded.userId]
        );
      } else if (decoded.role === "student") {
        result = await pool.query(
          "SELECT id, role, name, email FROM students WHERE id = $1",
          [decoded.userId]
        );
      } else if (decoded.role === "host_supervisor") {
        result = await pool.query(
          "SELECT id, role, name, email FROM host_supervisor WHERE id = $1",
          [decoded.userId]
        );
      } else if (decoded.role === "admin") {
        result = await pool.query(
          "SELECT id, role, name, email FROM admin WHERE id = $1",
          [decoded.userId]
        );
      } else {
        result = await pool.query(
          "SELECT id, role, name, email FROM users WHERE id = $1",
          [decoded.userId]
        );
      }
      
      user = result.rows[0];
      
    } catch (dbError) {
      console.error("Database error in authentication:", dbError);
      return ErrorHandler("Authentication failed", 500, res);
    }

    // Check if user exists in database
    if (!user) {
      return ErrorHandler("User not found or access denied", 401, res);
    }

    // Verify that the role in token matches the role in database
    if (user.role !== decoded.role) {
      return ErrorHandler("Invalid token credentials", 401, res);
    }

    // Attach user information to request object
    req.user = {
      id: user.id,
      userId: user.id, // For backward compatibility
      email: user.email,
      name: user.name,
      role: user.role
    };
    
    next();
    
  } catch (error) {
    console.error("Authentication error:", error);
    
    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return ErrorHandler("Invalid token", 401, res);
    } else if (error.name === "TokenExpiredError") {
      return ErrorHandler("Token expired", 401, res);
    } else if (error.name === "NotBeforeError") {
      return ErrorHandler("Token not active", 401, res);
    }
    
    return ErrorHandler("Failed to authenticate token", 401, res);
  }
};

// Role-based authorization middleware
const requireRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      // First ensure user is authenticated
      await new Promise((resolve, reject) => {
        isAuthenticated(req, res, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      // Check if user has required role
      if (!req.user) {
        return ErrorHandler("Authentication required", 401, res);
      }

      if (!allowedRoles.includes(req.user.role)) {
        return ErrorHandler("Insufficient permissions", 403, res);
      }

      next();
    } catch (error) {
      // Error already handled by isAuthenticated
      return;
    }
  };
};

// Specific role middleware functions
const isAdmin = async (req, res, next) => {
  return requireRole(["admin"])(req, res, next);
};

const isStudent = async (req, res, next) => {
  return requireRole(["student"])(req, res, next);
};

const isSchoolSupervisor = async (req, res, next) => {
  return requireRole(["school_supervisor"])(req, res, next);
};

const isHostSupervisor = async (req, res, next) => {
  return requireRole(["host_supervisor"])(req, res, next);
};

// Combined role middleware
const isSupervisor = async (req, res, next) => {
  return requireRole(["school_supervisor", "host_supervisor"])(req, res, next);
};

const isAdminOrSupervisor = async (req, res, next) => {
  return requireRole(["admin", "school_supervisor", "host_supervisor"])(req, res, next);
};

const isNotStudent = async (req, res, next) => {
  return requireRole(["admin", "school_supervisor", "host_supervisor"])(req, res, next);
};

module.exports = {
  isAuthenticated,
  requireRole,
  isAdmin,
  isStudent,
  isSchoolSupervisor,
  isHostSupervisor,
  isSupervisor,
  isAdminOrSupervisor,
  isNotStudent
};

// This middleware checks if the user is authenticated by verifying the JWT token.
// It queries the appropriate database table based on the user's role:
// - school_supervisor -> school_supervisor table
// - student -> students table  
// - host_supervisor -> host_supervisor table
// - admin -> admin table
// - others -> users table
// If the token is valid and user exists, it attaches user info to the request object.
// Additional role-based middleware functions are provided for fine-grained authorization.
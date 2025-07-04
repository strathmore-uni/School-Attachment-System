const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const ErrorHandler = require("../utils/ErrorHandler");
const SuccessHandler = require("../utils/SuccessHandler");
const jwt = require("jsonwebtoken"); // Ensure you have this package installed
// const dotenv = require("dotenv");
// dotenv.config();
// const { default: isAuthenticated } = require("../middleware/isAuthenticated");
const createUser = async (req, res) => {
  const { role, name, password, email } = req.body;
  try {
    // input validation
    if (!role || !name || !password || !email) {
      return ErrorHandler("Please provide all required fields", 400, res);
    }
    // harsh pasword before storing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let result;
    if (role === "host_supervisor") {
      result = await pool.query(
        "INSERT INTO host_supervisor (role, name, password, email) VALUES ($1 ,$2, $3, $4) RETURNING *",
        [role, name, hashedPassword, email]
      );
      // Handle host_supervisor specific logic
    }
    // let result;
    if (role === "admin") {
       result = await pool.query(
        "INSERT INTO admin (role, name, password, email) VALUES ($1 ,$2, $3, $4) RETURNING *",
        [role, name, password, email]
      );
    } else {
      result = await pool.query(
        "INSERT INTO users (role, name, password, email) VALUES ($1 ,$2, $3, $4) RETURNING *",
        [role, name, password, email]
      );
    }
    // Remove password from response
    const user = result.rows[0];
    delete user.password;
    return SuccessHandler("User created Successfully", 200, res, user);//
  } catch (error) {
    console.error("Error while creating user", error);
  }
    // Handle duplicate email error
    if (error.code === "23505") {
      return ErrorHandler("Email already exists", 400, res);
    }
    return ErrorHandler("Error while creating user", 500, res);
  };
  const login = async (req, res) => { 

    const { role, email, password } = req.body;

    if (!email || !password || !role ) {
      return ErrorHandler("Please provide email/password, role", 401, res);
    }
    try {
      let result;
      // Query appropriate table based on role
      if (role === "school_supervisor") {
        result = await pool.query(
          "SELECT * FROM school_supervisor WHERE email = $1 AND password = $2",
          [email, password]
        );
      } else if (role === "student") {
        result = await pool.query(
          "SELECT * FROM students WHERE email = $1 AND password = $2",
          [email, password]
        );
      } else if (role === "host_supervisor") {
        result = await pool.query(
          "SELECT * FROM host_supervisor WHERE email = $1 AND password = $2",
          [email, password]
        );
      } else if (role === "admin") {
        result = await pool.query(
          "SELECT * FROM admin WHERE email = $1 AND password = $2",
          [email, password]
        );
      } else {
        result = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );
      }
      const user = result.rows[0];

      if (!user) {
        return ErrorHandler("No such user", 401, res);
      }

      // Compare password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch || user.role !== role) {
        return ErrorHandler("Invalid credentials", 401, res);
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "4h" }
      );

      // Remove password from user object
      const userResponse = { ...user };
      delete userResponse.password;
      return SuccessHandler("User logged in successfully", 200, res, {
        user: userResponse,
        token,
      });
    } catch (error) {
      console.error("Login error", error);
      return ErrorHandler("error while logging in", 500, res);
    }
  };
  // const { role, email, password } = req.body;
/* 
   if (!email || !password || !role) {
     return ErrorHandler("Please provide email/password, role", 401, res);
  }
  try {
    let result;
    // Query appropritiate table based on role
    if(role === "school_supervisor") {
      result = await pool.query(
        "SELECT * FROM school_supervisor WHERE email = $1 AND password = $2",
        [email, password]
      );
        } else if (role === "student") {
      result = await pool.query(
        "SELECT * FROM students WHERE email = $1 AND password = $2",
        [email, password]
      );if (role === "student") {
      result = await pool.query(
        "SELECT * FROM students WHERE email = $1 AND password = $2",
        [email, password]
      );
    } else if (role === "host_supervisor") {
      result = await pool.query(
        "SELECT * FROM host_supervisor WHERE email = $1",
        [email]
      );
  } else if (role === "admin") {
    result = await pool.query(
      "SELECT * FROM admin WHERE email = $1",
      [email]
    );
  } else {
    result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
  }
    const user = result.rows[0];

    if (!user) {
      return ErrorHandler("No such user", 401, res);
    }
    
    console.log(password, user.password);
    const isMatch = password === user.password && user.role === role;
    if (!isMatch) {
      return ErrorHandler("Invalid credentials", 401, res);
    } 
        // Generate JWT token
const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
       process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    // Remove password from user object
    const userResponse = { ...user };
    delete userResponse.password;
    return SuccessHandler("User logged in successfully", 200, res, {
      user: userResponse,
      token,
    });

    // return SuccessHandler("User logged in successfully", 200, res, user);
  } catch (error) {
    console.error("Login error", error);
    return ErrorHandler("error while logging in", 500, res);
  }
};

 */

module.exports = {
  createUser,
  login,
};
  
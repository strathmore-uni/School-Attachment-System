const { body, param, query, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User validation rules
const validateUserRegistration = [
  body('username')
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage('Username can only contain letters, numbers, dots, underscores, and hyphens'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  
  body('role')
    .isIn(['student', 'school_supervisor', 'host_supervisor', 'administrator'])
    .withMessage('Invalid role specified'),
  
  body('firstName')
    .isLength({ min: 2, max: 100 })
    .withMessage('First name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  
  body('lastName')
    .isLength({ min: 2, max: 100 })
    .withMessage('Last name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  
  body('phone')
    .optional()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Please provide a valid phone number'),
  
  handleValidationErrors
];

const validateUserLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

// Student validation rules
const validateStudentRegistration = [
  body('studentId')
    .isLength({ min: 3, max: 20 })
    .withMessage('Student ID must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Student ID can only contain letters and numbers'),
  
  body('course')
    .isLength({ min: 5, max: 255 })
    .withMessage('Course name must be between 5 and 255 characters'),
  
  body('yearOfStudy')
    .isInt({ min: 1, max: 6 })
    .withMessage('Year of study must be between 1 and 6'),
  
  body('gpa')
    .optional()
    .isFloat({ min: 0, max: 4 })
    .withMessage('GPA must be between 0 and 4'),
  
  handleValidationErrors
];

// Organization validation rules
const validateOrganization = [
  body('name')
    .isLength({ min: 2, max: 255 })
    .withMessage('Organization name must be between 2 and 255 characters'),
  
  body('industry')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Industry must be less than 100 characters'),
  
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),
  
  body('contactEmail')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid contact email')
    .normalizeEmail(),
  
  body('contactPhone')
    .optional()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Please provide a valid contact phone number'),
  
  body('capacity')
    .optional()
    .isInt({ min: 1, max: 1000 })
    .withMessage('Capacity must be between 1 and 1000'),
  
  handleValidationErrors
];

// Application validation rules
const validateApplication = [
  body('positionId')
    .isUUID()
    .withMessage('Invalid position ID'),
  
  body('coverLetter')
    .isLength({ min: 50, max: 2000 })
    .withMessage('Cover letter must be between 50 and 2000 characters'),
  
  body('resumeUrl')
    .optional()
    .isURL()
    .withMessage('Please provide a valid resume URL'),
  
  handleValidationErrors
];

// Report validation rules
const validateReport = [
  body('title')
    .isLength({ min: 5, max: 255 })
    .withMessage('Report title must be between 5 and 255 characters'),
  
  body('content')
    .isLength({ min: 100, max: 10000 })
    .withMessage('Report content must be between 100 and 10000 characters'),
  
  body('weekNumber')
    .optional()
    .isInt({ min: 1, max: 52 })
    .withMessage('Week number must be between 1 and 52'),
  
  handleValidationErrors
];

// Evaluation validation rules
const validateEvaluation = [
  body('evaluationType')
    .isIn(['weekly', 'monthly', 'midterm', 'final'])
    .withMessage('Invalid evaluation type'),
  
  body('technicalSkills')
    .isInt({ min: 1, max: 5 })
    .withMessage('Technical skills rating must be between 1 and 5'),
  
  body('communicationSkills')
    .isInt({ min: 1, max: 5 })
    .withMessage('Communication skills rating must be between 1 and 5'),
  
  body('teamwork')
    .isInt({ min: 1, max: 5 })
    .withMessage('Teamwork rating must be between 1 and 5'),
  
  body('punctuality')
    .isInt({ min: 1, max: 5 })
    .withMessage('Punctuality rating must be between 1 and 5'),
  
  body('initiative')
    .isInt({ min: 1, max: 5 })
    .withMessage('Initiative rating must be between 1 and 5'),
  
  body('comments')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Comments must be less than 1000 characters'),
  
  handleValidationErrors
];

// Common validation rules
const validateUUID = (field) => [
  param(field)
    .isUUID()
    .withMessage(`Invalid ${field}`),
  handleValidationErrors
];

const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateStudentRegistration,
  validateOrganization,
  validateApplication,
  validateReport,
  validateEvaluation,
  validateUUID,
  validatePagination,
  handleValidationErrors
};
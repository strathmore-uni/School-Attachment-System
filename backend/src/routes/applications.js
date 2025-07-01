const express = require('express');
const Application = require('../models/Application');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { validateApplication, validateUUID, validatePagination } = require('../middleware/validation');
const logger = require('../utils/logger');

const router = express.Router();

// @route   POST /api/v1/applications
// @desc    Create a new application
// @access  Private (Students only)
router.post('/', authenticateToken, authorizeRoles('student'), validateApplication, async (req, res) => {
  try {
    const { positionId, coverLetter, resumeUrl, additionalDocuments } = req.body;
    
    // Get student ID from user
    const Student = require('../models/Student');
    const student = await Student.findByUserId(req.user.id);
    
    if (!student) {
      return res.status(400).json({
        success: false,
        message: 'Student profile not found'
      });
    }
    
    // Check if student already applied for this position
    const existingApplications = await Application.findByStudentId(student.id, { positionId });
    const existingApplication = existingApplications.find(app => 
      app.position_id === positionId && 
      ['pending', 'under_review', 'approved'].includes(app.status)
    );
    
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this position'
      });
    }
    
    const application = await Application.create({
      studentId: student.id,
      positionId,
      coverLetter,
      resumeUrl,
      additionalDocuments
    });
    
    logger.info(`New application created by student ${student.student_id} for position ${positionId}`);
    
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: { application }
    });
  } catch (error) {
    logger.error('Create application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create application'
    });
  }
});

// @route   GET /api/v1/applications
// @desc    Get applications (filtered by role)
// @access  Private
router.get('/', authenticateToken, validatePagination, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, organizationId } = req.query;
    const offset = (page - 1) * limit;
    
    let filters = { limit: parseInt(limit), offset };
    
    if (status) filters.status = status;
    if (organizationId) filters.organizationId = organizationId;
    
    let applications;
    
    if (req.user.role === 'student') {
      // Students can only see their own applications
      const Student = require('../models/Student');
      const student = await Student.findByUserId(req.user.id);
      
      if (!student) {
        return res.status(400).json({
          success: false,
          message: 'Student profile not found'
        });
      }
      
      applications = await Application.findByStudentId(student.id, filters);
    } else {
      // Administrators and supervisors can see all applications
      applications = await Application.findAll(filters);
    }
    
    // Get total count for pagination
    const stats = await Application.getApplicationStats(
      req.user.role === 'student' ? { studentId: student?.id } : {}
    );
    
    res.json({
      success: true,
      data: {
        applications,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: parseInt(stats.total_applications),
          pages: Math.ceil(stats.total_applications / limit)
        },
        stats
      }
    });
  } catch (error) {
    logger.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get applications'
    });
  }
});

// @route   GET /api/v1/applications/:id
// @desc    Get application by ID
// @access  Private
router.get('/:id', authenticateToken, validateUUID('id'), async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    // Check permissions
    if (req.user.role === 'student') {
      const Student = require('../models/Student');
      const student = await Student.findByUserId(req.user.id);
      
      if (!student || application.student_id !== student.id) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    }
    
    res.json({
      success: true,
      data: { application }
    });
  } catch (error) {
    logger.error('Get application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get application'
    });
  }
});

// @route   PUT /api/v1/applications/:id/status
// @desc    Update application status
// @access  Private (Administrators and supervisors only)
router.put('/:id/status', 
  authenticateToken, 
  authorizeRoles('administrator', 'school_supervisor'), 
  validateUUID('id'),
  async (req, res) => {
    try {
      const { status, reviewNotes } = req.body;
      
      if (!['pending', 'under_review', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status'
        });
      }
      
      const application = await Application.updateStatus(
        req.params.id,
        status,
        req.user.id,
        reviewNotes
      );
      
      if (!application) {
        return res.status(404).json({
          success: false,
          message: 'Application not found'
        });
      }
      
      logger.info(`Application ${req.params.id} status updated to ${status} by ${req.user.email}`);
      
      res.json({
        success: true,
        message: 'Application status updated successfully',
        data: { application }
      });
    } catch (error) {
      logger.error('Update application status error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update application status'
      });
    }
  }
);

// @route   PUT /api/v1/applications/:id/withdraw
// @desc    Withdraw application
// @access  Private (Students only)
router.put('/:id/withdraw', 
  authenticateToken, 
  authorizeRoles('student'), 
  validateUUID('id'),
  async (req, res) => {
    try {
      const Student = require('../models/Student');
      const student = await Student.findByUserId(req.user.id);
      
      if (!student) {
        return res.status(400).json({
          success: false,
          message: 'Student profile not found'
        });
      }
      
      const application = await Application.withdraw(req.params.id, student.id);
      
      if (!application) {
        return res.status(404).json({
          success: false,
          message: 'Application not found or cannot be withdrawn'
        });
      }
      
      logger.info(`Application ${req.params.id} withdrawn by student ${student.student_id}`);
      
      res.json({
        success: true,
        message: 'Application withdrawn successfully',
        data: { application }
      });
    } catch (error) {
      logger.error('Withdraw application error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to withdraw application'
      });
    }
  }
);

// @route   GET /api/v1/applications/stats
// @desc    Get application statistics
// @access  Private
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    let filters = {};
    
    if (req.user.role === 'student') {
      const Student = require('../models/Student');
      const student = await Student.findByUserId(req.user.id);
      
      if (student) {
        filters.studentId = student.id;
      }
    }
    
    const stats = await Application.getApplicationStats(filters);
    
    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    logger.error('Get application stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get application statistics'
    });
  }
});

module.exports = router;
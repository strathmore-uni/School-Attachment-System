const express = require('express');
const router = express.Router();
const { 
  isSupervisor,
  isSchoolSupervisor,
  isHostSupervisor,
  requireRole 
} = require('../middleware/isAuthenticated');

// Any supervisor can access
router.get('/dashboard', isSupervisor, (req, res) => {
  res.json({ 
    success: true,
    message: 'Supervisor dashboard',
    role: req.user.role,
    supervisorData: {
      studentsAssigned: 15,
      reportsToReview: 5
    }
  });
});

// Only school supervisors
router.get('/school-reports', isSchoolSupervisor, (req, res) => {
  res.json({ 
    success: true,
    schoolReports: [
      { school: 'Strathmore University', students: 50, status: 'active' }
    ]
  });
});

// Only host supervisors
router.get('/host-reports', isHostSupervisor, (req, res) => {
  res.json({ 
    success: true,
    hostReports: [
      { host: 'XYZ Company', students: 10, status: 'active' }
    ]
  });
});

module.exports = router;
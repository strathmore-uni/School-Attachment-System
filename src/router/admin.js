const express = require('express');
const router = express.Router();
const { 
  isAdmin, 
  isAdminOrSupervisor,
  requireRole 
} = require('../middleware/isAuthenticated');

// Only admins can access
router.get('/dashboard', isAdmin, (req, res) => {
  res.json({ 
    success: true,
    message: 'Admin dashboard data',
    adminData: {
      totalUsers: 150,
      totalStudents: 100,
      totalSupervisors: 20
    }
  });
});

// Admin or supervisors can access
router.get('/reports', isAdminOrSupervisor, (req, res) => {
  res.json({ 
    success: true,
    reports: [
      { id: 1, title: 'Monthly Report', date: '2024-01-01' },
      { id: 2, title: 'User Activity', date: '2024-01-15' }
    ]
  });
});

// Custom role access
router.get('/system-settings', requireRole(['admin']), (req, res) => {
  res.json({ 
    success: true,
    settings: {
      maintenanceMode: false,
      registrationOpen: true
    }
  });
});

module.exports = router;

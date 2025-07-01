const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const studentRoutes = require('./students');
const organizationRoutes = require('./organizations');
const applicationRoutes = require('./applications');
const attachmentRoutes = require('./attachments');
const reportRoutes = require('./reports');
const evaluationRoutes = require('./evaluations');
const attendanceRoutes = require('./attendance');
const notificationRoutes = require('./notifications');
const analyticsRoutes = require('./analytics');

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Route definitions
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/students', studentRoutes);
router.use('/organizations', organizationRoutes);
router.use('/applications', applicationRoutes);
router.use('/attachments', attachmentRoutes);
router.use('/reports', reportRoutes);
router.use('/evaluations', evaluationRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/notifications', notificationRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;
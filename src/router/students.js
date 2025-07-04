const express = require('express');
const router = express.Router();
const { isStudent, isAuthenticated } = require('../middleware/isAuthenticated');

// Only students can access
router.get('/dashboard', isStudent, (req, res) => {
  res.json({ 
    success: true,
    message: 'Student dashboard',
    studentData: {
      courses: ['Math', 'Science', 'English'],
      grades: { Math: 'A', Science: 'B+', English: 'A-' }
    }
  });
});

router.get('/assignments', isStudent, (req, res) => {
  res.json({ 
    success: true,
    assignments: [
      { id: 1, title: 'Math Homework', dueDate: '2024-01-20', status: 'pending' },
      { id: 2, title: 'Science Project', dueDate: '2024-01-25', status: 'completed' }
    ]
  });
});

module.exports = router;
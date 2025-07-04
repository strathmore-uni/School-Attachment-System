const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/isAuthenticated');

// Protected route - requires authentication
router.get('/profile', isAuthenticated, (req, res) => {
  // req.user is available here after authentication
  res.json({ 
    success: true,
    user: req.user 
  });
});

router.put('/profile', isAuthenticated, (req, res) => {
  const { name, email } = req.body;
  // Update user profile logic here
  res.json({ 
    success: true,
    message: 'Profile updated',
    userId: req.user.id 
  });
});

module.exports = router;
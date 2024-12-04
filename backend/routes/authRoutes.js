const express = require('express');
const { signup, signin } = require('../controllers/authController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

// Example of protected routes
router.get('/manager-route', isAuthenticated, authorizeRoles('Manager'), (req, res) => {
  res.send('This route is only for Managers');
});

router.get('/hr-route', isAuthenticated, authorizeRoles('HR'), (req, res) => {
  res.send('This route is only for HR');
});

router.get('/security-route', isAuthenticated, authorizeRoles('Security'), (req, res) => {
  res.send('This route is only for Security');
});

module.exports = router;

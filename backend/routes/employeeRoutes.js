// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Route to get all employees
router.get('/employees', employeeController.getEmployees);

// Route to add a new employee
router.post('/employees', employeeController.addEmployee);

module.exports = router;

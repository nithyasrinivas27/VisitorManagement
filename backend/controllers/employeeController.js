// controllers/employeeController.js
const Employee = require('../models/employee');

// Fetch all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new employee
exports.addEmployee = async (req, res) => {
  try {
    const { name, email } = req.body;
    const employee = new Employee({ name, email });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

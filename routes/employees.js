// routes/employees.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Route to get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get an employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new employee
router.post('/', async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    role: req.body.role,
    department: req.body.department
  });
  try {
    const newEmployee = await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to update an employee by ID
router.put('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      employee.name = req.body.name || employee.name;
      employee.role = req.body.role || employee.role;
      employee.department = req.body.department || employee.department;
      const updatedEmployee = await employee.save();
      res.json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete an employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      await employee.remove();
      res.json({ message: 'Employee deleted successfully' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

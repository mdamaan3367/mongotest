// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  role: String,
  department: String
});

module.exports = mongoose.model('Employee', employeeSchema);

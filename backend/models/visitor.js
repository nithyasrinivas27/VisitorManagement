// models/Visitor.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VisitorSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  contactNumber: { type: Number, required: true },
  purpose: { type: String, required: true },
  proofId: { type: String, required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }, 
  photo: { type: String }, 
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Visitor', VisitorSchema);

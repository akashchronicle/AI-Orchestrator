const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  request: String,
  status: String,
  result: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema); 
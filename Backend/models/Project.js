const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ['In Progress', 'Completed', 'Pending'], default: 'Pending' }
});

module.exports = mongoose.model('Project', projectSchema);
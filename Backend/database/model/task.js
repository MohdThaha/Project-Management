const mongoose = require('mongoose');

const memberSchema = new Schema({
  memberName: { type: String },
}, { _id: false });

const labelSchema = new Schema({
  labelName: { type: String },
  color: { type: String },
}, { _id: false });

const checklistSchema = new Schema({
  checklistName: { type: String },
  status: { type: String },
}, { _id: false });

const TaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  assignedTo: [memberSchema],
  label:[labelSchema],

  bucket: { type: String, required: true },
  progress: { type: String, required: true },
  priority: { type: String, required: true },
  startDate: { type: String, required: true },
  dueDate: { type: String, required: true },
  notes: { type: String, required: true }, //description

  checklist: [checklistSchema], // Sub task
  comments: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: String, required: true },
  
});

module.exports = mongoose.model('Task', TaskSchema);

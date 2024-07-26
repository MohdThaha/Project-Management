const mongoose = require('mongoose');

const bucketSchema = new Schema({
  bucketName: { type: String },
  bucketStatus: { type: String },
}, { _id: false });

const memberSchema = new Schema({
  memberName: { type: String }
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  bucket: [bucketSchema],
  members: [memberSchema],
  createdAt: { type: String, required: true },
  createdBy: { type: String, required: true },
  privacy: { type: String, required: true },
  group: { type: String, required: true }


});

module.exports = mongoose.model('Project', ProjectSchema);

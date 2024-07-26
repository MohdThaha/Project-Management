const mongoose = require('mongoose');

const taskSchema = new Schema({
    taskName: { type: String },
    taskStatus: { type: String },
  }, { _id: false });

const BucketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  task: [taskSchema],
  bucketStatus: { type: String, required: true }, 
});

module.exports = mongoose.model('Bucket', BucketSchema);

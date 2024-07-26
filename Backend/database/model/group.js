const mongoose = require('mongoose');

const memberSchema = new Schema({
    memberName: { type: String },
  }, { _id: false });

const GroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  members: [memberSchema],
  bucketStatus: { type: String, required: true }, 
});

module.exports = mongoose.model('Group', GroupSchema);


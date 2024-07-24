const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new Schema({
  organizationName: { type: String },
  organizationId: { type: String },
  userName: { type: String },
  userNum: { type: String },
  useremail: { type: String },
  password: { type: String },
  role: { type: String },
    
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['Admin', 'Manager', 'Developer'], required: true },
//   attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }],
//   projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
// });

// module.exports = mongoose.model('User', UserSchema);

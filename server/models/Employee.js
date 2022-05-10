const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Firstname: {
    type: String,
    required: true,
  },
  Lastname: {
    type: String,
    required: true,
  },
  EmpId: {
    type: Number,
    required: true,
  },
  City: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Employee", userSchema);

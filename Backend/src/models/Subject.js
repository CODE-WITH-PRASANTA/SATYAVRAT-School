const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  subjectType: {
    type: String,
    enum: ["regular", "optional"],
    default: "regular",
  },
}, { timestamps: true });

module.exports = mongoose.model("Subject", subjectSchema);
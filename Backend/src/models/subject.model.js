const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    subjectName: { type: String, required: true },
    className: { type: String, required: true },
    teacher: { type: String },
    description: { type: String },
    image: { type: String }, // stored filename
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
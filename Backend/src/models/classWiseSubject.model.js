const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["regular", "optional"],
    default: "regular",
  },
});

const classWiseSubjectSchema = new mongoose.Schema(
  {
    classId: { type: String, required: true },
    subjects: [subjectSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ClassWiseSubject",
  classWiseSubjectSchema
);
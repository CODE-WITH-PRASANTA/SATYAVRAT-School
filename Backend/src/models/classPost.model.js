const mongoose = require("mongoose");

const classPostSchema = new mongoose.Schema(
  {
    classTitle: {
      type: String,
      required: true,
      trim: true,
    },

    classDescription: {
      type: String,
      required: true,
    },

    yearStart: {
      type: Number,
      required: true,
    },

    yearEnd: {
      type: Number,
      required: true,
    },

    uploadImage: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    teacherPhone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClassPost", classPostSchema);
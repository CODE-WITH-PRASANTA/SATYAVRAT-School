const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      trim: true,
    },

    sectionName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ================= PREVENT DUPLICATE ================= */
classSchema.index(
  { className: 1, sectionName: 1 },
  { unique: true }
);

module.exports = mongoose.model("Class", classSchema);
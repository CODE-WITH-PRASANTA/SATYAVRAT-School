const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    guardianName: {
      type: String,
      required: true,
    },

    guardianOccupation: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
    },

    guardianPhone: {
      type: String,
      required: true,
    },

    notifyProgress: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admission", admissionSchema);
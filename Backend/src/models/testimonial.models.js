const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    parentName: {
      type: String,
      required: true,
      trim: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default: "",
    },

    date: {
      type: Date,
    },

    category: {
      type: String,
      enum: [
        "Education",
        "Activities",
        "Painting",
        "Games",
      ],
      default: "Education",
    },

    author: {
      type: String,
      default: "Admin",
    },

    comments: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    buttonText: {
      type: String,
      default: "Read More",
    },

    link: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 1,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "News",
  newsSchema
);
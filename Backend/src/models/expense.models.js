const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    head: {
      type: String,
      required: true,
      trim: true,
    },

    accountType: {
      type: String,
      default: "",
    },

    accountName: {
      type: String,
      default: "",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    invoice: {
      type: String,
      default: "",
    },

    date: {
      type: Date,
      required: true,
    },

    paymentMode: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    createdBy: {
      type: String,
      default: "Admin",
    },

    approvedBy: {
      type: String,
      default: "-",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    head: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
    },
    invoice: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
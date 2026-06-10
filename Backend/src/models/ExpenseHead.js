const mongoose = require("mongoose");

const expenseHeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const ExpenseHead = mongoose.model("ExpenseHeads", expenseHeadSchema);

module.exports = ExpenseHead;
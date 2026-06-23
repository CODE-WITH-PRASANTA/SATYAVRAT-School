const Expense = require("../models/expense.models");
const Wallet = require("../models/walletTransaction.model");


// ================= GET ALL =================
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    console.log("GET EXPENSE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= GET SINGLE =================
exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json(expense);
  } catch (error) {
    console.log("GET SINGLE EXPENSE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= CREATE =================
exports.createExpense = async (req, res) => {
  try {
    const newExpense = await Expense.create(req.body);

    // ==========================
    // CREATE WALLET DEBIT
    // ==========================
    await Wallet.create({
      type: "debit",
      amount: Number(newExpense.amount || 0),
      source: "expense",
      referenceId: newExpense._id,
      description: `Expense paid: ${newExpense.name} (${newExpense.invoice || "no invoice"})`,
      createdBy: newExpense.createdBy || "Admin",
    });

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: newExpense,
    });
  } catch (error) {
    console.log("CREATE EXPENSE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= UPDATE =================
exports.updateExpense = async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } catch (error) {
    console.log("UPDATE EXPENSE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= DELETE =================
exports.deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.log("DELETE EXPENSE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const ExpenseHead = require("../models/expenseHead.models");


// ================= GET ALL =================
exports.getExpenseHeads = async (req, res) => {
  try {
    const data = await ExpenseHead.find().sort({ createdAt: -1 });

    res.status(200).json(data);
  } catch (error) {
    console.log("GET ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= GET SINGLE =================
exports.getExpenseHead = async (req, res) => {
  try {
    const data = await ExpenseHead.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Expense Head not found",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.log("GET SINGLE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= CREATE =================
exports.createExpenseHead = async (req, res) => {
  try {
    const newData = await ExpenseHead.create(req.body);

    res.status(201).json({
      success: true,
      message: "Expense Head created successfully",
      data: newData,
    });
  } catch (error) {
    console.log("CREATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= UPDATE =================
exports.updateExpenseHead = async (req, res) => {
  try {
    const updated = await ExpenseHead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Expense Head not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense Head updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= DELETE =================
exports.deleteExpenseHead = async (req, res) => {
  try {
    const deleted = await ExpenseHead.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Expense Head not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense Head deleted successfully",
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
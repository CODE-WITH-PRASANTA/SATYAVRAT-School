const ExpenseHead = require("../models/ExpenseHead");
const mongoose = require("mongoose");

console.log("MODEL NAME:", ExpenseHead.modelName);
// CREATE
const createExpenseHead = async (req, res) => {
  try {
    const { name, description } = req.body;

    // ✅ Validation
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Name is required" });
    }

    const data = await ExpenseHead.create({
      name: name.trim(),
      description,
    });

    res.status(201).json(data);

  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
const getExpenseHeads = async (req, res) => {
  try {
    const data = await ExpenseHead.find().sort({ createdAt: -1 });
    res.json(data);

  } catch (error) {
    console.error("GET ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
const updateExpenseHead = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check valid Mongo ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const updated = await ExpenseHead.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(updated);

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteExpenseHead = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check valid Mongo ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const deleted = await ExpenseHead.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createExpenseHead,
  getExpenseHeads,
  updateExpenseHead,
  deleteExpenseHead,
};
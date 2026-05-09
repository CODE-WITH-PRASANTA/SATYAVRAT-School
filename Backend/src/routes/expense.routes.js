const express = require("express");

const router = express.Router();

const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expense.controller");


// GET ALL
router.get("/", getExpenses);

// GET SINGLE
router.get("/:id", getExpense);

// CREATE
router.post("/", createExpense);

// UPDATE
router.put("/:id", updateExpense);

// DELETE
router.delete("/:id", deleteExpense);

module.exports = router;
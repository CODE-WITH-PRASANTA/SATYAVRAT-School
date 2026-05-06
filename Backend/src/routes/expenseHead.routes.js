const express = require("express");

const router = express.Router();

const {
  getExpenseHeads,
  getExpenseHead,
  createExpenseHead,
  updateExpenseHead,
  deleteExpenseHead,
} = require("../controllers/expenseHead.controller");


// GET ALL
router.get("/", getExpenseHeads);

// GET SINGLE
router.get("/:id", getExpenseHead);

// CREATE
router.post("/", createExpenseHead);

// UPDATE
router.put("/:id", updateExpenseHead);

// DELETE
router.delete("/:id", deleteExpenseHead);

module.exports = router;
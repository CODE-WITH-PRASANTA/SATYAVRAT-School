const express = require("express");

const {
  createExpenseHead,
  getExpenseHeads,
  updateExpenseHead,
  deleteExpenseHead,
} = require("../controllers/expenseHeadController");

const router = express.Router();

router.post("/", createExpenseHead);
router.get("/", getExpenseHeads);
router.put("/:id", updateExpenseHead);
router.delete("/:id", deleteExpenseHead);

module.exports = router;
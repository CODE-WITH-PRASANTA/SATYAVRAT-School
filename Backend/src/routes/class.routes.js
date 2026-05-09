const express = require("express");

const router = express.Router();

const {
  createClass,
  getClasses,
  updateClass,
  deleteClass,
} = require("../controllers/class.controller");

/* ================= CREATE CLASS ================= */
router.post("/", createClass);

/* ================= GET ALL CLASSES ================= */
router.get("/", getClasses);

/* ================= UPDATE CLASS ================= */
router.put("/:id", updateClass);

/* ================= DELETE CLASS ================= */
router.delete("/:id", deleteClass);

module.exports = router;
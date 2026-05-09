const express = require("express");

const {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
} = require("../controllers/subject.controller");

const router = express.Router();

/* ================= GET ALL ================= */
router.get("/", getSubjects);

/* ================= CREATE ================= */
router.post("/", createSubject);

/* ================= UPDATE ================= */
router.put("/:id", updateSubject);

/* ================= DELETE ================= */
router.delete("/:id", deleteSubject);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
  deleteClass,
} = require("../controllers/classWiseSubject.controller");

router.post("/", createSubject);
router.get("/", getSubjects);
router.put("/update", updateSubject);
router.put("/delete", deleteSubject);
router.delete("/:classId", deleteClass);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacher.controller");

// ✅ IMPORT THIS (YOUR FILE)
const {
  upload,
  convertToWebp,
} = require("../middlewares/upload");

// ROUTES
router.get("/", getTeachers);

// ✅ ADD convertToWebp AFTER upload
router.post("/", upload.single("image"), convertToWebp, createTeacher);
router.put("/:id", upload.single("image"), convertToWebp, updateTeacher);

router.delete("/:id", deleteTeacher);

module.exports = router;
const express = require("express");

const {
  upload,
  convertToWebp,
} = require("../middlewares/upload");

const {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
} = require("../controllers/subject.controller"); // ✅ FIXED NAME

const router = express.Router();

router.get("/", getSubjects);

router.post(
  "/",
  upload.single("image"),
  convertToWebp,
  createSubject
);

router.put(
  "/:id",
  upload.single("image"),
  convertToWebp,
  updateSubject
);

router.delete("/:id", deleteSubject);

module.exports = router;
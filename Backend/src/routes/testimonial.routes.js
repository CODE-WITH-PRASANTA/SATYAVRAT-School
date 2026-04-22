const express = require("express");
const router = express.Router();

const {
  createTestimonial,
  getTestimonials,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial.controller");

// ✅ FIX HERE
const { upload, convertToWebp } = require("../middlewares/upload");

// ROUTES
router.get("/", getTestimonials);
router.post("/", upload.single("image"), convertToWebp, createTestimonial);
router.put("/:id", upload.single("image"), convertToWebp, updateTestimonial);
router.delete("/:id", deleteTestimonial);

module.exports = router;

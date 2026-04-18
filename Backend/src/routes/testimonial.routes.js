// src/routes/testimonial.routes.js

const express = require("express");
const router = express.Router();

const {
  createTestimonial,
  getTestimonials,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial.controller");

const { upload, convertToWebp } = require("../middlewares/upload");

/* ROUTES */

// 👉 THIS FIXES YOUR 404
router.get("/testimonials", getTestimonials);

router.post(
  "/testimonials",
  upload.single("image"),
  convertToWebp,
  createTestimonial
);

router.put(
  "/testimonials/:id",
  upload.single("image"),
  convertToWebp,
  updateTestimonial
);

router.delete("/testimonials/:id", deleteTestimonial);

module.exports = router;
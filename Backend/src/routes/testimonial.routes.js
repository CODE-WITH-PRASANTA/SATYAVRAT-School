const express = require("express");
const router = express.Router();

const {
  createTestimonial,
  getTestimonials,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial.controller");

router.get("/", getTestimonials);
router.post("/", createTestimonial);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);

module.exports = router;
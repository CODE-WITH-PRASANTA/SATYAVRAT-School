const express = require("express");
const router = express.Router();

// ✅ IMPORT CONTROLLERS
const {
  createTestimonial,
  getTestimonials,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial.controller");

// ✅ IMPORT MULTER MIDDLEWARE
const upload = require("../middlewares/upload");

// ================= ROUTES =================

// GET ALL
router.get("/", getTestimonials);

// CREATE (WITH IMAGE UPLOAD)
router.post("/", upload.single("image"), createTestimonial);

// UPDATE (WITH OPTIONAL IMAGE UPDATE)
router.put("/:id", upload.single("image"), updateTestimonial);

// DELETE
router.delete("/:id", deleteTestimonial);

module.exports = router;
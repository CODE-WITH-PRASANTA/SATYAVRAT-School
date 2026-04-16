const express = require("express");
const router = express.Router();

const {
  getEnquiries,
  createEnquiry,
  deleteEnquiry,
  updateFeedback,
} = require("../controllers/coldlead.controllers");

/* ================= ROUTES ================= */

// GET all leads
router.get("/", getEnquiries);

// CREATE lead (optional - for form submission)
router.post("/", createEnquiry);

// DELETE lead
router.delete("/:id", deleteEnquiry);

// UPDATE feedback
router.put("/:id/feedback", updateFeedback);

module.exports = router;
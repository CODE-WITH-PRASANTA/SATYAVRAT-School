const Enquiry = require("../models/coldlead.models");

/* ================= GET ALL ================= */
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: enquiries,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= CREATE (optional form) ================= */
exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);

    await enquiry.save();

    res.status(201).json({
      success: true,
      message: "Enquiry created",
      data: enquiry,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    await enquiry.deleteOne();

    res.json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE FEEDBACK ================= */
exports.updateFeedback = async (req, res) => {
  try {
    const { feedback } = req.body;

    if (!feedback || !feedback.trim()) {
      return res.status(400).json({
        success: false,
        message: "Feedback is required",
      });
    }

    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    enquiry.feedback = feedback;

    await enquiry.save();

    res.json({
      success: true,
      message: "Feedback updated successfully",
      data: enquiry,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
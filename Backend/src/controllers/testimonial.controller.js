const Testimonial = require("../models/testimonial.models");

// CREATE
exports.createTestimonial = async (req, res) => {
  try {
    const { parentName, reviewText, rating } = req.body;

    const image = req.file ? req.file.path : "";

    const data = await Testimonial.create({
      parentName,
      reviewText,
      rating,
      image,
    });

    res.status(201).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      parentName: req.body.parentName,
      reviewText: req.body.reviewText,
      rating: req.body.rating,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await Testimonial.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const Testimonial = require("../models/testimonial.models");

/* CREATE */
const createTestimonial = async (req, res) => {
  try {
    const { parentName, reviewText, rating, status } = req.body;

    if (!parentName || !reviewText) {
      return res.status(400).json({ message: "All fields required" });
    }

    const testimonial = await Testimonial.create({
      parentName,
      reviewText,
      rating,
      status,
    });

    res.status(201).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL */
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE */
const updateTestimonial = async (req, res) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE */
const deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTestimonial,
  getTestimonials,
  updateTestimonial,
  deleteTestimonial,
};
const Testimonial = require("../models/testimonial.models");

/* CREATE */
const createTestimonial = async (req, res) => {
  try {
    const { parentName, reviewText, rating } = req.body;

    if (!parentName || !reviewText) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ✅ IMAGE HANDLE
    const image = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : "";

    const testimonial = await Testimonial.create({
      parentName,
      reviewText,
      rating,
      image,
    });

    res.status(201).json({
      success: true,
      data: testimonial,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET */
const getTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE */
const updateTestimonial = async (req, res) => {
  try {
    const { parentName, reviewText, rating } = req.body;

    let updateData = {
      parentName,
      reviewText,
      rating,
    };

    // ✅ UPDATE IMAGE IF NEW FILE
    if (req.file) {
      updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
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
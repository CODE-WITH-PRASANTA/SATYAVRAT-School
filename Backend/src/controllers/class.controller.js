const Class = require("../models/class.model");

// CREATE
exports.createClass = async (req, res) => {
  try {
    const { className, sectionName } = req.body;

    if (!className || !sectionName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newClass = await Class.create({ className, sectionName });

    res.status(201).json({
      success: true,
      data: newClass,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: classes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
exports.updateClass = async (req, res) => {
  try {
    const updated = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
exports.deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Class deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const Admission = require("../models/admission.models");


// GET ALL
exports.getAdmissions = async (req, res) => {
  try {
    const data = await Admission.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET SINGLE
exports.getAdmission = async (req, res) => {
  try {
    const data = await Admission.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// CREATE
exports.createAdmission = async (req, res) => {
  try {
    const newAdmission = await Admission.create(req.body);

    res.status(201).json({
      success: true,
      message: "Admission created successfully",
      data: newAdmission
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE
exports.updateAdmission = async (req, res) => {
  try {
    const updated = await Admission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.json({
      success: true,
      message: "Admission updated successfully",
      data: updated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE
exports.deleteAdmission = async (req, res) => {
  try {
    const deleted = await Admission.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.json({
      success: true,
      message: "Admission deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
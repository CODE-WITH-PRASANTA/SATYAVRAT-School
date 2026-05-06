const Subject = require("../models/subject.model");

/* CREATE */
const createSubject = async (req, res) => {
  try {
    const data = {
      subjectName: req.body.subjectName,
      className: req.body.className,
      teacher: req.body.teacher,
      description: req.body.description,
      image: req.body.image || "", // ✅ IMPORTANT FIX
    };

    const subject = await Subject.create(data);

    res.status(201).json({
      success: true,
      data: subject,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET */
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: subjects,
    });
  } catch (error) {
    console.error("GET ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* UPDATE */
const updateSubject = async (req, res) => {
  try {
    const updateData = {
      subjectName: req.body.subjectName,
      className: req.body.className,
      teacher: req.body.teacher,
      description: req.body.description,
    };

    if (req.body.image) {
      updateData.image = req.body.image; // ✅ FIXED
    }

    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      data: subject,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* DELETE */
const deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
};
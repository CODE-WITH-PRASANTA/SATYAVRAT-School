const Subject = require("../models/subject.model");

/* ======================================================
   CREATE SUBJECT
====================================================== */
const createSubject = async (req, res) => {
  try {

    const {
      classId,
      subjectName,
      subjectType,
    } = req.body;

    /* ================= VALIDATION ================= */

    if (!classId || !subjectName) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    /* ================= CREATE ================= */

    const subject = await Subject.create({
      classId,
      subjectName,
      subjectType,
    });

    return res.status(201).json({
      success: true,
      data: subject,
    });

  } catch (error) {

    console.log("CREATE SUBJECT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   GET SUBJECTS
====================================================== */
const getSubjects = async (req, res) => {
  try {

    const subjects = await Subject.find()
      .populate("classId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: subjects,
    });

  } catch (error) {

    console.log("GET SUBJECT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   UPDATE SUBJECT
====================================================== */
const updateSubject = async (req, res) => {
  try {

    const updated = await Subject.findByIdAndUpdate(
      req.params.id,
      {
        subjectName: req.body.subjectName,
        subjectType: req.body.subjectType,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      data: updated,
    });

  } catch (error) {

    console.log("UPDATE SUBJECT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   DELETE SUBJECT
====================================================== */
const deleteSubject = async (req, res) => {
  try {

    await Subject.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });

  } catch (error) {

    console.log("DELETE SUBJECT ERROR:", error);

    return res.status(500).json({
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
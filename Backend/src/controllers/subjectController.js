const Subject = require("../models/Subject");

// CREATE SUBJECT (multiple classes)
exports.createSubject = async (req, res) => {
  try {
    const { classIds, subjectName, subjectType } = req.body;

    const data = await Subject.insertMany(
      classIds.map((id) => ({
        classId: id,
        subjectName,
        subjectType,
      }))
    );

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL SUBJECTS WITH CLASS NAME
exports.getSubjects = async (req, res) => {
  try {
    const data = await Subject.find()
      .populate("classId", "className sectionName");

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateSubject = async (req, res) => {
  try {
    const data = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
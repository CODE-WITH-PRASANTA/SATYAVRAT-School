const ClassWiseSubject = require("../models/classWiseSubject.model");

/* CREATE SUBJECT */
exports.createSubject = async (req, res) => {
  try {
    const { classId, name, type } = req.body;

    let existing = await ClassWiseSubject.findOne({ classId });

    if (existing) {
      existing.subjects.push({ name, type });
      await existing.save();
      return res.json({ success: true, data: existing });
    }

    const newDoc = await ClassWiseSubject.create({
      classId,
      subjects: [{ name, type }],
    });

    res.json({ success: true, data: newDoc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET ALL */
exports.getSubjects = async (req, res) => {
  try {
    const data = await ClassWiseSubject.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* UPDATE SUBJECT */
exports.updateSubject = async (req, res) => {
  try {
    const { classId, oldName, newName, type } = req.body;

    const doc = await ClassWiseSubject.findOne({ classId });

    if (!doc) return res.status(404).json({ msg: "Class not found" });

    const subject = doc.subjects.find((s) => s.name === oldName);

    if (!subject) return res.status(404).json({ msg: "Subject not found" });

    subject.name = newName;
    subject.type = type;

    await doc.save();

    res.json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* DELETE SUBJECT */
exports.deleteSubject = async (req, res) => {
  try {
    const { classId, name } = req.body;

    const doc = await ClassWiseSubject.findOne({ classId });

    if (!doc) return res.status(404).json({ msg: "Class not found" });

    doc.subjects = doc.subjects.filter((s) => s.name !== name);

    await doc.save();

    res.json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* DELETE CLASS */
exports.deleteClass = async (req, res) => {
  try {
    const { classId } = req.params;

    await ClassWiseSubject.findOneAndDelete({ classId });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
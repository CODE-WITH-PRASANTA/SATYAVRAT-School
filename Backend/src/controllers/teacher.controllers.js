const Teacher = require("../models/teacher.models");
const { deleteImageFile } = require("../middlewares/upload");

/* ================= GET ALL ================= */
exports.getTeachers = async (req, res) => {
  try {
    const data = await Teacher.find().sort({ order: 1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= CREATE ================= */
exports.createTeacher = async (req, res) => {
  try {
    const teacher = new Teacher({
      name: req.body.name,
      role: req.body.role,
      description: req.body.description,
      phone: req.body.phone,
      status: req.body.status,
      image: req.body.image, // ✅ correct
    });

    await teacher.save();

    res.status(201).json({
      success: true,
      message: "Teacher created",
      data: teacher,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ================= */
exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Not found" });
    }

    /* DELETE OLD IMAGE */
    if (req.body.image && teacher.image) {
      deleteImageFile(teacher.image); // ✅ FIXED
    }

    teacher.name = req.body.name || teacher.name;
    teacher.role = req.body.role || teacher.role;
    teacher.description = req.body.description || teacher.description;
    teacher.phone = req.body.phone || teacher.phone;
    teacher.status = req.body.status || teacher.status;

    /* UPDATE IMAGE */
    if (req.body.image) {
      teacher.image = req.body.image; // ✅ FIXED
    }

    await teacher.save();

    res.json({
      success: true,
      message: "Teacher updated",
      data: teacher,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Not found" });
    }

    if (teacher.image) {
      deleteImageFile(teacher.image); // ✅ FIXED
    }

    await teacher.deleteOne();

    res.json({
      success: true,
      message: "Teacher deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
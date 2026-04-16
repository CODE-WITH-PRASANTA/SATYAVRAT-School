const Teacher = require("../models/teacher.models");
const { deleteImageFile } = require("../middlewares/testimonial.middlewares");

/* GET */
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ order: 1 });

    res.json({
      success: true,
      data: teachers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* CREATE */
exports.createTeacher = async (req, res) => {
  try {
    const teacher = new Teacher({
      ...req.body,
      image: req.file ? req.file.path : "", // ✅ FIXED
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

/* UPDATE */
exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // ✅ DELETE OLD IMAGE USING YOUR FUNCTION
    if (req.file && teacher.image) {
      deleteImageFile(teacher.image);
    }

    // update fields
    Object.assign(teacher, req.body);

    // update image
    if (req.file) {
      teacher.image = req.file.path; // ✅ FIXED
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

/* DELETE */
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // ✅ DELETE IMAGE
    if (teacher.image) {
      deleteImageFile(teacher.image);
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
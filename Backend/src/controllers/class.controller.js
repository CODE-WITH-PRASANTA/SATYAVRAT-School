const Class = require("../models/class.model");

/* ======================================================
   CREATE CLASS
====================================================== */
exports.createClass = async (req, res) => {
  try {
    const { className, sectionName } = req.body;

    /* ===== VALIDATION ===== */
    if (!className || !sectionName) {
      return res.status(400).json({
        success: false,
        message: "Class name and section are required",
      });
    }

    /* ===== CHECK EXIST ===== */
    const alreadyExists = await Class.findOne({
      className: className.trim(),
      sectionName: sectionName.trim(),
    });

    if (alreadyExists) {
      return res.status(409).json({
        success: false,
        message: "Class already exists",
      });
    }

    /* ===== CREATE ===== */
    const newClass = await Class.create({
      className: className.trim(),
      sectionName: sectionName.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });

  } catch (error) {
    console.error("CREATE CLASS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

/* ======================================================
   GET ALL CLASSES
====================================================== */
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find().sort({
      className: 1,
      sectionName: 1,
    });

    return res.status(200).json({
      success: true,
      count: classes.length,
      data: classes,
    });

  } catch (error) {
    console.error("GET CLASSES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

/* ======================================================
   UPDATE CLASS
====================================================== */
exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { className, sectionName } = req.body;

    /* ===== VALIDATION ===== */
    if (!className || !sectionName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    /* ===== UPDATE ===== */
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      {
        className: className.trim(),
        sectionName: sectionName.trim(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: updatedClass,
    });

  } catch (error) {
    console.error("UPDATE CLASS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

/* ======================================================
   DELETE CLASS
====================================================== */
exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedClass = await Class.findByIdAndDelete(id);

    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Class deleted successfully",
    });

  } catch (error) {
    console.error("DELETE CLASS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
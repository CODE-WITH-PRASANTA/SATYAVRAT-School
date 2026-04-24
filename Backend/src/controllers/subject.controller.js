const Subject = require("../models/subject.model");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// CREATE
exports.createSubject = async (req, res) => {
  try {
    let imageName = "";

    if (req.file) {
      imageName = Date.now() + ".webp";

      await sharp(req.file.buffer)
        .webp({ quality: 80 })
        .toFile(path.join("uploads", imageName));
    }

    const subject = await Subject.create({
      ...req.body,
      image: imageName,
    });

    res.status(201).json({ success: true, data: subject });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL
exports.getSubjects = async (req, res) => {
  try {
    const data = await Subject.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// UPDATE
exports.updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({ message: "Not found" });
    }

    let imageName = subject.image;

    if (req.file) {
      // delete old image
      if (subject.image) {
        fs.unlinkSync(path.join("uploads", subject.image));
      }

      imageName = Date.now() + ".webp";

      await sharp(req.file.buffer)
        .webp({ quality: 80 })
        .toFile(path.join("uploads", imageName));
    }

    const updated = await Subject.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: imageName },
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// DELETE
exports.deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (subject?.image) {
      fs.unlinkSync(path.join("uploads", subject.image));
    }

    await Subject.findByIdAndDelete(req.params.id);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
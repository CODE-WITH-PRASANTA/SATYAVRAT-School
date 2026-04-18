const Gallery = require("../models/gallery.models");
const { deleteImageFile } = require("../middlewares/upload");

/* ================= GET ================= */
exports.getGallery = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ order: 1 });

    res.json({
      success: true,
      data: images,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= CREATE ================= */
exports.createGallery = async (req, res) => {
  try {
    const newImage = new Gallery({
      image: req.file ? req.file.path : "",
    });

    await newImage.save();

    res.status(201).json({
      success: true,
      message: "Image uploaded",
      data: newImage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ================= */
exports.updateGallery = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // delete old image
    if (req.file && image.image) {
      deleteImageFile(image.image);
    }

    if (req.file) {
      image.image = req.file.path;
    }

    await image.save();

    res.json({
      success: true,
      message: "Image updated",
      data: image,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
exports.deleteGallery = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    if (image.image) {
      deleteImageFile(image.image);
    }

    await image.deleteOne();

    res.json({
      success: true,
      message: "Image deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const News = require("../models/newsposting.models");
const fs = require("fs");
const path = require("path");

/* CREATE */
const createNews = async (req, res) => {
  try {
    const folder = req.body.folder || "news"; // dynamic folder

    const imagePath = req.file
      ? `/uploads/${folder}/${req.file.filename}`
      : "";

    const newNews = new News({
      ...req.body,
      image: imagePath,
    });

    const saved = await newNews.save();

    res.status(201).json({
      success: true,
      data: saved,
    });
  } catch (err) {
    console.error("❌ CREATE ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* GET ALL */
const getNews = async (req, res) => {
  try {
    const data = await News.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("❌ FETCH ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* UPDATE */
const updateNews = async (req, res) => {
  try {
    const existing = await News.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    let imagePath = existing.image;

    if (req.file) {
      const folder = req.body.folder || "news";

      imagePath = `/uploads/${folder}/${req.file.filename}`;

      /* DELETE OLD IMAGE */
      if (existing.image) {
        const oldPath = path.join(__dirname, "../../", existing.image);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    const updateData = {
      ...req.body,
      image: imagePath,
    };

    const updated = await News.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (err) {
    console.error("❌ UPDATE ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* DELETE */
const deleteNews = async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    /* DELETE IMAGE FILE */
    if (deleted.image) {
      const filePath = path.join(__dirname, "../../", deleted.image);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    console.error("❌ DELETE ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* TOGGLE STATUS */
const toggleStatus = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    news.status = news.status === "Active" ? "Inactive" : "Active";

    await news.save();

    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (err) {
    console.error("❌ STATUS ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createNews,
  getNews,
  updateNews,
  deleteNews,
  toggleStatus,
};
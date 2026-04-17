// src/middlewares/upload.js

const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

/* TEMP STORAGE */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/temp";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* WEBP CONVERSION */
const convertToWebp = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const inputPath = req.file.path;

    // ✅ FIXED (NO news folder)
    const outputDir = "uploads";

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filename = Date.now() + ".webp";
    const outputPath = path.join(outputDir, filename);

    await sharp(inputPath)
      .resize({ width: 800 })
      .webp({ quality: 80 })
      .toFile(outputPath);

    // delete temp
    fs.unlinkSync(inputPath);

    req.file.filename = filename;

    next();
  } catch (err) {
    console.error("❌ Image Processing Error:", err);
    res.status(500).json({ message: "Image processing failed" });
  }
};

module.exports = { upload, convertToWebp };
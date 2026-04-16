const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

/* TEMP STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/temp";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* WEBP CONVERSION */
const convertToWebp = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const inputPath = req.file.path;
    const outputDir = "uploads/news";

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filename = Date.now() + ".webp";
    const outputPath = path.join(outputDir, filename);

    await sharp(inputPath)
      .resize({ width: 800 })
      .webp({ quality: 80 })
      .toFile(outputPath);

    /* DELETE TEMP FILE */
    if (fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
    }

    /* IMPORTANT FIX */
    req.file.filename = filename;

    next();
  } catch (err) {
    console.error("❌ Image Processing Error:", err);
    return res.status(500).json({
      success: false,
      message: "Image processing failed",
    });
  }
};

module.exports = { upload, convertToWebp };
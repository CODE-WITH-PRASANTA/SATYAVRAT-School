const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

/* ================= HELPERS ================= */
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

/* ================= ROUTE → FOLDER MAP ================= */
const routeFolderMap = {
  "/gallery": "uploads/gallery",
  "/news": "uploads/news",
  "/events": "uploads/events",
  "/classes": "uploads/classes",
  "/testimonials": "uploads/testimonials",
  "/teachers": "uploads/teachers",
  "/admissions": "uploads/admissions",
  "/subjects": "uploads/subjects",
};

/* ================= GET UPLOAD PATH ================= */
const getUploadPath = (req) => {
  let uploadPath = "uploads/common";

  const url = req.originalUrl.toLowerCase();

  for (const route in routeFolderMap) {
    if (url.includes(route)) {
      uploadPath = routeFolderMap[route];
      break;
    }
  }

  ensureDir(uploadPath);
  return uploadPath;
};

/* ================= MULTER CONFIG ================= */
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpg, png, webp) allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

/* ================= GENERATE FILE NAME ================= */
const generateFileName = () => {
  return `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
};

/* ================= SHARP CONVERTER ================= */
const convertToWebp = async (req, res, next) => {
  try {
    if (!req.file && !req.files) return next();

    const uploadPath = getUploadPath(req);

    /* ===== SINGLE FILE ===== */
    if (req.file) {
      const filename = generateFileName();
      const outputPath = path.join(uploadPath, filename);

      await sharp(req.file.buffer)
        .resize(1200, 1200, { fit: "inside" })
        .webp({ quality: 80 })
        .toFile(outputPath);

      const relativePath = "/" + outputPath.replace(/\\/g, "/");

      req.file.path = relativePath;
      req.body[req.file.fieldname] = relativePath;
    }

    /* ===== MULTIPLE FILES ===== */
    if (req.files) {
      for (const field in req.files) {
        req.body[field] = [];

        for (const file of req.files[field]) {
          const filename = generateFileName();
          const outputPath = path.join(uploadPath, filename);

          await sharp(file.buffer)
            .resize(1200, 1200, { fit: "inside" })
            .webp({ quality: 80 })
            .toFile(outputPath);

          const relativePath = "/" + outputPath.replace(/\\/g, "/");

          file.path = relativePath;
          req.body[field].push(relativePath);
        }
      }
    }

    next();
  } catch (err) {
    console.error("SHARP ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= DELETE IMAGE ================= */
const deleteImageFile = (imagePath) => {
  try {
    if (!imagePath) return;

    const cleanPath = imagePath.startsWith("/")
      ? imagePath.slice(1)
      : imagePath;

    const fullPath = path.join(process.cwd(), cleanPath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log("🗑 Deleted:", fullPath);
    }
  } catch (err) {
    console.error("DELETE ERROR:", err.message);
  }
};

module.exports = {
  upload,
  convertToWebp,
  deleteImageFile,
};
/* =========================================================
   UPLOAD MIDDLEWARE WITH WEBP CONVERSION
   FILE: middleware/upload.js
========================================================= */

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

/* =========================================================
   CREATE DIRECTORY IF NOT EXISTS
========================================================= */

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

/* =========================================================
   ROUTE TO FOLDER MAPPING
========================================================= */

const routeFolderMap = {
  "/gallery": "uploads/gallery",
  "/news": "uploads/news",
  "/events": "uploads/events",
  "/classes": "uploads/classes",
  "/testimonials": "uploads/testimonials",

  "/class-post": "uploads/class-post",
  "/teachers": "uploads/teachers",
  "/subjects": "uploads/subjects",
  "/blogs": "uploads/blogs",
  "/banner": "uploads/banner",

  /* ================= STUDENTS ================= */
  "/students": "uploads/students",

  /* ================= ADMISSION ================= */
  "/admissions": "uploads/admissions",

  /* ================= STUDENT LEAVE ================= */
  "/student-leave": "uploads/student-leave",

  /* ================= CLASS POST ================= */
  "/class-post": "uploads/class-post",
};

/* =========================================================
   GET DYNAMIC UPLOAD PATH
========================================================= */

const getUploadPath = (req) => {
  let uploadPath = "uploads/common";

  const currentUrl = req.originalUrl.toLowerCase();

  for (const route in routeFolderMap) {
    if (currentUrl.includes(route)) {
      uploadPath = routeFolderMap[route];
      break;
    }
  }

  ensureDir(uploadPath);

  return uploadPath;
};

/* =========================================================
   MULTER MEMORY STORAGE
========================================================= */

const storage = multer.memoryStorage();

/* =========================================================
   FILE FILTER
========================================================= */

const fileFilter = (req, file, cb) => {
  try {
    const route = req.originalUrl.toLowerCase();

    const mime = file.mimetype;

    const isImage = mime.startsWith("image/");
    const isPDF = mime === "application/pdf";

    const isDOC =
      mime === "application/msword" ||
      mime ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    /* =====================================================
       STUDENT MODULE VALIDATION
    ===================================================== */

    if (route.includes("/students")) {
      const field = file.fieldname;

      /* ================= IMAGE ONLY ================= */

      const imageFields = [
        "studentPhoto",
        "fatherPhoto",
        "motherPhoto",
        "guardianPhoto",
      ];

      /* ================= PDF ONLY ================= */

      const pdfFields = [
        "reportCard",
        "tc",
        "samagraId",
        "nidaCard",
        "previousMarksheet",
        "dobCertificate",
        "incomeCertificate",
        "pip",
      ];

      /* ================= PDF OR IMAGE ================= */

      const mixedFields = ["aadhaarStudent", "aadhaarParent"];

      /* ================= IMAGE VALIDATION ================= */

      if (imageFields.includes(field)) {
        if (!isImage) {
          return cb(new Error(`${field} must be image`));
        }

        return cb(null, true);
      }

      /* ================= PDF VALIDATION ================= */

      if (pdfFields.includes(field)) {
        if (!isPDF) {
          return cb(new Error(`${field} must be PDF`));
        }

        return cb(null, true);
      }

      /* ================= PDF OR IMAGE ================= */

      if (mixedFields.includes(field)) {
        if (!isImage && !isPDF) {
          return cb(new Error(`${field} must be PDF or image`));
        }

        return cb(null, true);
      }
    }

    /* =====================================================
       DEFAULT VALIDATION
    ===================================================== */

    if (isImage || isPDF || isDOC) {
      cb(null, true);
    } else {
      cb(new Error("Only images, PDF, DOC, DOCX files are allowed"));
    }
  } catch (error) {
    cb(error);
  }
};

/* =========================================================
   MULTER CONFIGURATION
========================================================= */

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

/* =========================================================
   GENERATE FILE NAME
========================================================= */

const generateFileName = (fieldname, ext = ".webp") => {
  return `${fieldname}_${Date.now()}${ext}`;
};

/* =========================================================
   PROCESS FILE
========================================================= */

const processFile = async (file, uploadPath) => {
  const isImage = file.mimetype.startsWith("image/");

  /* =====================================================
     IMAGE -> WEBP
  ===================================================== */

  if (isImage) {
    const filename = generateFileName(file.fieldname, ".webp");

    const outputPath = path.join(process.cwd(), uploadPath, filename);

    await sharp(file.buffer)
      .resize({
        width: 1200,
        height: 1200,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
      })
      .toFile(outputPath);

    return `/${uploadPath}/${filename}`.replace(/\\/g, "/");
  }

  /* =====================================================
     PDF / DOC FILES
  ===================================================== */

  const ext = path.extname(file.originalname).toLowerCase();

  const filename = generateFileName(file.fieldname, ext);

  const outputPath = path.join(process.cwd(), uploadPath, filename);

  fs.writeFileSync(outputPath, file.buffer);

  return `/${uploadPath}/${filename}`.replace(/\\/g, "/");
};

/* =========================================================
   CONVERT TO WEBP
========================================================= */

const convertToWebp = async (req, res, next) => {
  try {
    if (!req.file && !req.files) {
      return next();
    }

    const uploadPath = getUploadPath(req);

    /* =====================================================
       SINGLE FILE
    ===================================================== */

    if (req.file) {
      const savedPath = await processFile(req.file, uploadPath);

      req.file.path = savedPath;

      req.body[req.file.fieldname] = savedPath;
    }

    /* =====================================================
       MULTIPLE FILES
    ===================================================== */

    if (req.files) {
      for (const fieldName in req.files) {
        req.body[fieldName] = [];

        for (const file of req.files[fieldName]) {
          const savedPath = await processFile(file, uploadPath);

          file.path = savedPath;

          req.body[fieldName].push(savedPath);
        }
      }
    }

    next();
  } catch (error) {
    console.error("WEBP CONVERSION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "File upload failed",
      error: error.message,
    });
  }
};

/* =========================================================
   DELETE FILE
========================================================= */

const deleteImageFile = (filePath) => {
  try {
    if (!filePath) return;

    let cleanPath = filePath;

    if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.substring(1);
    }

    const fullPath = path.join(process.cwd(), cleanPath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);

      console.log("FILE DELETED:", fullPath);
    }
  } catch (error) {
    console.error("DELETE FILE ERROR:", error.message);
  }
};

/* =========================================================
   EXPORTS
========================================================= */

module.exports = {
  upload,
  convertToWebp,
  deleteImageFile,
};

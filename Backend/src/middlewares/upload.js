/* =========================================================
   UPLOAD MIDDLEWARE WITH WEBP CONVERSION
   FILE: src/middlewares/upload.js
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
   "/testimonials": "uploads/testimonials" ,
    "/teachers": "uploads/teachers",
    "/admissions": "uploads/admissions",
    "/banner":"uploads/banner", 
    
    
  "/class-post": "uploads/class-post",
  "/testimonials": "uploads/testimonials",
  "/teachers": "uploads/teachers",
  "/admissions": "uploads/admissions",
  "/subjects": "uploads/subjects",
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
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed"
      ),
      false
    );
  }
};

/* =========================================================
   MULTER CONFIGURATION
========================================================= */

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

/* =========================================================
   GENERATE FILE NAME
========================================================= */

const generateFileName = () => {
  const uniqueName = `${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}`;

  return `${uniqueName}.webp`;
};

/* =========================================================
   CONVERT IMAGE TO WEBP
========================================================= */

const convertToWebp = async (req, res, next) => {
  try {
    if (!req.file && !req.files) {
      return next();
    }

    const uploadPath = getUploadPath(req);

    /* =====================================================
       SINGLE IMAGE
    ===================================================== */

    if (req.file) {
      const filename = generateFileName();

      const outputPath = path.join(
        process.cwd(),
        uploadPath,
        filename
      );

      await sharp(req.file.buffer)
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

      const imagePath = `/${uploadPath}/${filename}`.replace(
        /\\/g,
        "/"
      );

      req.file.filename = filename;

      req.file.path = imagePath;

      req.body[req.file.fieldname] = imagePath;
    }

    /* =====================================================
       MULTIPLE IMAGES
    ===================================================== */

    if (req.files) {
      for (const fieldName in req.files) {
        req.body[fieldName] = [];

        for (const file of req.files[fieldName]) {
          const filename = generateFileName();

          const outputPath = path.join(
            process.cwd(),
            uploadPath,
            filename
          );

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

          const imagePath = `/${uploadPath}/${filename}`.replace(
            /\\/g,
            "/"
          );

          file.filename = filename;

          file.path = imagePath;

          req.body[fieldName].push(imagePath);
        }
      }
    }

    next();
  } catch (error) {
    console.error("WEBP CONVERSION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Image processing failed",
      error: error.message,
    });
  }
};

/* =========================================================
   DELETE IMAGE FILE
========================================================= */

const deleteImageFile = (imagePath) => {
  try {
    if (!imagePath) return;

    let cleanPath = imagePath;

    if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.substring(1);
    }

    const fullPath = path.join(
      process.cwd(),
      cleanPath
    );

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);

      console.log("IMAGE DELETED:", fullPath);
    }
  } catch (error) {
    console.error(
      "DELETE IMAGE ERROR:",
      error.message
    );
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
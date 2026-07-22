const express = require("express");
const router = express.Router();

// Assuming upload middleware exists in your middleware folder
const { upload, convertToWebp } = require("../middlewares/upload");

const {
  createAdmission,
  getAllAdmissions,
  getSingleAdmission,
  updateAdmission,
  deleteAdmission,
} = require("../controllers/newadmi.controllers");

// Configure all acceptable file upload fields from the frontend
const uploadFields = upload.fields([
  { name: "studentPhoto", maxCount: 1 },
  { name: "fatherPhoto", maxCount: 1 },
  { name: "motherPhoto", maxCount: 1 },

  { name: "casteCertificate", maxCount: 1 },
  { name: "incomeCertificate", maxCount: 1 },
  { name: "residentCertificate", maxCount: 1 },
  { name: "birthCertificate", maxCount: 1 },

  { name: "admissionInchargeSignature", maxCount: 1 },
  { name: "principalSignature", maxCount: 1 },
]);

/*
=========================================
CREATE ADMISSION
POST /api/newadmi/create
=========================================
*/
// convertToWebp is required here — multer's memoryStorage() alone only
// buffers files in RAM. convertToWebp is what actually writes each file
// to disk and sets req.body[fieldName] to the saved path. Without it,
// every uploaded photo/document is silently discarded.
router.post("/create", uploadFields, convertToWebp, createAdmission);

/*
=========================================
GET ALL ADMISSIONS
GET /api/newadmi
=========================================
*/
router.get("/", getAllAdmissions);

/*
=========================================
GET SINGLE ADMISSION
GET /api/newadmi/:id
=========================================
*/
router.get("/:id", getSingleAdmission);

/*
=========================================
UPDATE ADMISSION
PUT /api/newadmi/update/:id
=========================================
*/
router.put("/update/:id", uploadFields, convertToWebp, updateAdmission);

/*
=========================================
DELETE ADMISSION
DELETE /api/newadmi/delete/:id
=========================================
*/
router.delete("/delete/:id", deleteAdmission);

module.exports = router;
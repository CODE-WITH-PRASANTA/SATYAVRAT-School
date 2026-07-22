const NewAdmission = require("../models/newadmi.models");

// Helper function to extract file path from Multer upload object
const getFilePath = (files, fieldName) => {
  if (
    files &&
    files[fieldName] &&
    files[fieldName].length > 0
  ) {
    return files[fieldName][0].path;
  }

  return null;
};

/*
=========================================
CREATE ADMISSION
POST /api/admission/create
=========================================
*/
exports.createAdmission = async (req, res) => {
  try {
   const fileData = {
  studentPhoto: getFilePath(req.files, "studentPhoto"),
  fatherPhoto: getFilePath(req.files, "fatherPhoto"),
  motherPhoto: getFilePath(req.files, "motherPhoto"),

  casteCertificate: getFilePath(req.files, "casteCertificate"),
  incomeCertificate: getFilePath(req.files, "incomeCertificate"),
  residentCertificate: getFilePath(req.files, "residentCertificate"),
  birthCertificate: getFilePath(req.files, "birthCertificate"),

  admissionInchargeSignature: getFilePath(req.files, "admissionInchargeSignature"),
  principalSignature: getFilePath(req.files, "principalSignature"),
};

    const newAdmission = new NewAdmission({
      ...req.body,
      ...fileData,
    });

    const savedAdmission = await newAdmission.save();

    return res.status(201).json({
      success: true,
      message: "Student admission submitted successfully!",
      data: savedAdmission,
    });
  } catch (error) {
    console.error("CREATE ADMISSION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to submit admission",
    });
  }
};

/*
=========================================
GET ALL ADMISSIONS
GET /api/admission
=========================================
*/
exports.getAllAdmissions = async (req, res) => {
  try {
    const admissions = await NewAdmission.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: admissions.length,
      data: admissions,
    });
  } catch (error) {
    console.error("GET ADMISSIONS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admissions",
    });
  }
};

/*
=========================================
GET SINGLE ADMISSION BY ID
GET /api/admission/:id
=========================================
*/
exports.getSingleAdmission = async (req, res) => {
  try {
    const admission = await NewAdmission.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission record not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: admission,
    });
  } catch (error) {
    console.error("GET SINGLE ADMISSION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admission details",
    });
  }
};

/*
=========================================
UPDATE ADMISSION BY ID
PUT /api/admission/update/:id
=========================================
*/
exports.updateAdmission = async (req, res) => {
  try {
    const updateFields = { ...req.body };

    // Attach new uploaded file paths if provided
   const fileFields = [
  "studentPhoto",
  "fatherPhoto",
  "motherPhoto",

  "casteCertificate",
  "incomeCertificate",
  "residentCertificate",
  "birthCertificate",

  "admissionInchargeSignature",
  "principalSignature",
];

    fileFields.forEach((field) => {
      const filePath = getFilePath(req.files, field);
      if (filePath) {
        updateFields[field] = filePath;
      }
    });

    const updatedAdmission = await NewAdmission.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedAdmission) {
      return res.status(404).json({
        success: false,
        message: "Admission record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admission record updated successfully",
      data: updatedAdmission,
    });
  } catch (error) {
    console.error("UPDATE ADMISSION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update admission record",
    });
  }
};

/*
=========================================
DELETE ADMISSION
DELETE /api/admission/delete/:id
=========================================
*/
exports.deleteAdmission = async (req, res) => {
  try {
    const deletedAdmission = await NewAdmission.findByIdAndDelete(req.params.id);
    if (!deletedAdmission) {
      return res.status(404).json({
        success: false,
        message: "Admission record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admission record deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ADMISSION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete admission record",
    });
  }
};
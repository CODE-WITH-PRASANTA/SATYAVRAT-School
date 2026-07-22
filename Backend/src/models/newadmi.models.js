const mongoose = require("mongoose");

const newAdmissionSchema = new mongoose.Schema(
  {
    /* ===== Top Info Bar ===== */
    formNo: { type: String, trim: true },
    admissionNo: { type: String, required: true, trim: true },
    admissionDate: { type: String },
    class: { type: String, required: true },
    medium: { type: String },
    samagraId: { type: String },
    aadharCardNo: { type: String },
    apaarId: { type: String },
    penNo: { type: String },
    familyId: { type: String },
    enrollmentNo: { type: String },

    /* ===== Student Details ===== */
    studentName: { type: String, required: true, trim: true },
    gender: { type: String, required: true },
    dobWords: { type: String, required: true },
    nationality: { type: String },
    motherTongue: { type: String },
    religion: { type: String },
    category: { type: String },
    caste: { type: String },
    bloodGroup: { type: String },
    bankAccountNumber: { type: String },
    ifscCode: { type: String },
    bankName: { type: String },
    lastExamSchool: { type: String },
    tcNumber: { type: String },

    /* ===== Father's Details ===== */
    fatherName: { type: String },
    fatherQualification: { type: String },
    fatherOccupation: { type: String },
    fatherIncome: { type: String },
    fatherMobile: { type: String },
    fatherAadhar: { type: String },

    /* ===== Mother's Details ===== */
    motherName: { type: String },
    motherQualification: { type: String },
    motherOccupation: { type: String },
    motherIncome: { type: String },
    motherMobile: { type: String },
    motherAadhar: { type: String },

    /* ===== Address ===== */
    residentialAddress: { type: String },
    district: { type: String },
    pinCode: { type: String },
    transportRequired: { type: String },
    whatsappNo: { type: String },
    area: { type: String },

    /* ===== For Office Use Only ===== */
    admittedClass: { type: String },
    section: { type: String },
    regNo: { type: String },

    /* ===== Uploaded File Paths ===== */
    studentPhoto: { type: String },
    fatherPhoto: { type: String },
    motherPhoto: { type: String },
    casteCertificate: { type: String },
    incomeCertificate: { type: String },
    residentCertificate: { type: String },
    birthCertificate: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewAdmission", newAdmissionSchema);
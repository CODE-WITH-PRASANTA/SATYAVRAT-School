import React, { useState, useEffect } from "react";
import AccordionSection from "../../Component/AccordionSection/AccordionSection";
import API, { IMAGE_URL } from "../../api/axios";
import { Download } from "lucide-react";
import "./StudentAdmission.css";
import { useNavigate } from "react-router-dom";
import DownloadFrom from "../../assets/ApplicationForm.pdf.pdf";

const initialFormState = {
  /* Student Details */

  rollNumber: "",
  admissionNo: "",
  admissionDate: "",

  class: "",
  section: "",
  medium: "",
  samagraId: "",

  aadharNumber: "",
  apaarId: "",
  penNo: "",
  enrollmentNo: "",

  studentName: "",
  gender: "",
  dob: "",

  nationality: "",
  motherTongue: "",
  religion: "",

  category: "",
  caste: "",
  bloodGroup: "",

  height: "",
  weight: "",

  bankAccountNumber: "",
  bankName: "",
  ifscCode: "",

  previousSchool: "",
  tcNumber: "",

  /* Father Details */

  fatherName: "",
  fatherPhone: "",
  fatherDob: "",
  fatherOccupation: "",
  fatherQualification: "",
  fatherIncome: "",
  fatherAadhar: "",
  marriageAnniversary: "",

  /* Mother Details */

  motherName: "",
  motherPhone: "",
  motherDob: "",
  motherOccupation: "",
  motherQualification: "",
  motherIncome: "",
  motherAadhar: "",

  /* Guardian */

  guardianType: "",
  guardianName: "",
  guardianRelation: "",
  guardianEmail: "",
  guardianPhone: "",
  guardianOccupation: "",
  guardianAddress: "",

  /* Address */

  guardianAddressSame: false,
  permanentAddressSame: false,

  currentAddress: "",
  permanentAddress: "",

  district: "",
  pinCode: "",
  whatsappNo: "",
  area: "",

  /* Transport */

  transportRequired: "",

  /* Documents */

  documents: {},
};

export default function StudentAdmission() {
  const [formData, setFormData] = useState(initialFormState);
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  const classOptions = [
    "LKG",
    "UKG",
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
  ];

  useEffect(() => {
    const id = localStorage.getItem("editStudentId");

    if (!id) return;

    const loadStudent = async () => {
      try {
        const res = await API.get(`/students/${id}`);

        const studentData = res.data?.data || res.data;

        setFormData({
          ...initialFormState,
          ...studentData,

          // 🔥 ADD THIS LINE
          documents: studentData.documents || {},

          studentBehaviour: Array.isArray(studentData.studentBehaviour)
            ? studentData.studentBehaviour
            : studentData.studentBehaviour
              ? JSON.parse(studentData.studentBehaviour)
              : [],
        });

        setEditId(id);
      } catch (error) {
        console.error("Edit load error:", error);
      }
    };

    loadStudent();
  }, []);

  useEffect(() => {
    if (formData.guardianAddressSame && formData.guardianAddress) {
      setFormData((prev) => ({
        ...prev,
        currentAddress: formData.guardianAddress,
      }));
    }
  }, [formData.guardianAddressSame, formData.guardianAddress]);

  useEffect(() => {
    if (formData.permanentAddressSame && formData.currentAddress) {
      setFormData((prev) => ({
        ...prev,
        permanentAddress: formData.currentAddress,
      }));
    }
  }, [formData.permanentAddressSame, formData.currentAddress]);

  useEffect(() => {
    if (formData.guardianType === "Father") {
      setFormData((prev) => ({
        ...prev,
        guardianName: prev.fatherName,
        guardianPhone: prev.fatherPhone,
        guardianRelation: "Father",
      }));
    }

    if (formData.guardianType === "Mother") {
      setFormData((prev) => ({
        ...prev,
        guardianName: prev.motherName,
        guardianPhone: prev.motherPhone,
        guardianRelation: "Mother",
      }));
    }

    if (formData.guardianType === "Other") {
      setFormData((prev) => ({
        ...prev,
        guardianName: "",
        guardianPhone: "",
        guardianRelation: "",
      }));
    }
  }, [
    formData.guardianType,
    formData.fatherName,
    formData.fatherPhone,
    formData.motherName,
    formData.motherPhone,
  ]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await API.get("/classes");
        setClasses(res.data.data || []);
      } catch (err) {
        console.error("Class fetch error:", err);
      }
    };

    fetchClasses();
  }, []);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (name, file) => {
    setFiles((prev) => ({
      ...prev,
      [name]: file,
    }));

    // 🔥 ALSO update formData (IMPORTANT)
    if (!file) {
      setFormData((prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          [name]: null,
        },
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (
        !formData.admissionNo ||
        !formData.class ||
        // !formData.section ||
        !formData.studentName ||
        !formData.gender ||
        !formData.dob
      ) {
        alert("Please fill all required fields");
        return;
      }

      for (const file of Object.values(files)) {
        if (file && file.size > 2 * 1024 * 1024) {
          alert("Each file must be under 2MB");
          return;
        }
      }

      setLoading(true);

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        const value = formData[key];

        if (value !== undefined) {
          if (Array.isArray(value)) {
            data.append(key, JSON.stringify(value));
          } else if (value === null) {
            data.append(key, ""); // 🔥 FIX
          } else {
            data.append(key, value);
          }
        }
      });

      Object.keys(files).forEach((key) => {
        if (files[key]) {
          data.append(key, files[key]);
        }
      });

      /* ================= CREATE OR UPDATE ================= */

      if (editId) {
        await API.put(`/students/${editId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Student Updated Successfully");

        localStorage.removeItem("editStudentId");
        navigate("/student/admission/details");
      } else {
        await API.post("/students", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Student Created Successfully");
      }

      setFormData(initialFormState);
      setFiles({});
      setEditId(null);
    } catch (error) {
      console.error(error);
      alert("Error saving student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Student-Admission-Page">
      <div className="Student-Admission-Container">
        {/* HEADER */}
        <div className="Student-Admission-Header">
          <h1 className="Student-Admission-Title">
            {editId ? "Edit Student" : "Student Admission"}
          </h1>
          <button
            className="Student-Admission-DownloadBtn"
            onClick={() => {
              const link = document.createElement("a");
              link.href = DownloadFrom;
              link.download = "ApplicationForm.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <Download size={18} />
            Download Form
          </button>
        </div>

        {/* ================= STUDENT DETAILS ================= */}
        <AccordionSection title="Student Details">
          <div className="Student-Admission-FormGrid">
            <div className="Student-Admission-Left">
              {/* Row 1 */}

              <div className="Student-Admission-Row">
                <FormInput
                  label="Roll Number"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                />

                <FormInput
                  label="Admission No"
                  name="admissionNo"
                  value={formData.admissionNo}
                  onChange={handleChange}
                />

                <FormInput
                  label="Admission Date"
                  type="date"
                  name="admissionDate"
                  value={formData.admissionDate}
                  onChange={handleChange}
                />
              </div>

              {/* Row 2 */}

              <div className="Student-Admission-Row">
                <FormSelect
                  label="Class"
                  name="class"
                  value={formData.class}
                  options={classOptions}
                  onChange={handleChange}
                />

                <FormInput
                  label="Medium"
                  name="medium"
                  value={formData.medium}
                  onChange={handleChange}
                />

                <FormInput
                  label="Samagra ID"
                  name="samagraId"
                  value={formData.samagraId}
                  onChange={handleChange}
                />
              </div>

              {/* Row 3 */}

              <div className="Student-Admission-Row">
                <FormInput
                  label="Aadhar Card No"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                />

                <FormInput
                  label="APAAR ID"
                  name="apaarId"
                  value={formData.apaarId}
                  onChange={handleChange}
                />

                <FormInput
                  label="PEN No"
                  name="penNo"
                  value={formData.penNo}
                  onChange={handleChange}
                />
              </div>

              {/* Row 4 */}

              <div className="Student-Admission-Row">
                <FormInput
                  label="Enrollment No"
                  name="enrollmentNo"
                  value={formData.enrollmentNo}
                  onChange={handleChange}
                />

                <FormInput
                  label="Student Weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                />

                <FormInput
                  label="Height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>

              {/* Row 5 */}

              <div className="Student-Admission-Row">
                <FormInput
                  label="Student Name"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                />

                <FormSelect
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  options={["Male", "Female"]}
                  onChange={handleChange}
                />

                <FormInput
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              {/* Row 6 */}

              <div className="Student-Admission-Row">
                <FormInput
                  label="Nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                />

                <FormInput
                  label="Mother Tongue"
                  name="motherTongue"
                  value={formData.motherTongue}
                  onChange={handleChange}
                />

                <FormInput
                  label="Religion"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                />
              </div>

              {/* Row 7 */}

              <div className="Student-Admission-Row">
                <FormSelect
                  label="Category"
                  name="category"
                  value={formData.category}
                  options={["SC", "ST", "OBC", "GEN"]}
                  onChange={handleChange}
                />

                <FormInput
                  label="Caste"
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                />

                <FormInput
                  label="Blood Group"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                />
              </div>

              {/* Row 8 */}

              <div className="Student-Admission-Row">
                <FormInput
                  label="Bank A/C Number"
                  name="bankAccountNumber"
                  value={formData.bankAccountNumber}
                  onChange={handleChange}
                />

                <FormInput
                  label="IFSC Code"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                />

                <FormInput
                  label="Bank Name & Place"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                />
              </div>

              {/* Row 9 */}

              <div className="Student-Admission-Row">
                <FormInput
                  label="Previous School Name"
                  name="previousSchool"
                  value={formData.previousSchool}
                  onChange={handleChange}
                />

                <FormInput
                  label="TC Number"
                  name="tcNumber"
                  value={formData.tcNumber}
                  onChange={handleChange}
                />

                <div></div>
              </div>
            </div>

            <div className="Student-Admission-Right">
              <PhotoUploadBox
                name="studentPhoto"
                onFileChange={handleFileChange}
                existingImage={formData.studentPhoto}
              />
            </div>
          </div>
        </AccordionSection>

        {/* ================= PARENT / GUARDIAN ================= */}
        <AccordionSection title="Parent Details">
          {/* ================= FATHER ================= */}

          <h3 className="Student-Admission-SectionTitle">Father Details</h3>

          <div className="Student-Admission-FormGrid">
            <div className="Student-Admission-Left">
              <div className="Student-Admission-Row">
                <FormInput
                  label="Father Name"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                />

                <FormInput
                  label="Qualification"
                  name="fatherQualification"
                  value={formData.fatherQualification}
                  onChange={handleChange}
                />

                <FormInput
                  label="Occupation"
                  name="fatherOccupation"
                  value={formData.fatherOccupation}
                  onChange={handleChange}
                />
              </div>

              <div className="Student-Admission-Row">
                <FormInput
                  label="Annual Income"
                  name="fatherIncome"
                  value={formData.fatherIncome}
                  onChange={handleChange}
                />

                <FormInput
                  label="Mobile Number"
                  name="fatherPhone"
                  value={formData.fatherPhone}
                  onChange={handleChange}
                />

                <FormInput
                  label="Aadhar Number"
                  name="fatherAadhar"
                  value={formData.fatherAadhar}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="Student-Admission-Right">
              <PhotoUploadBox
                name="fatherPhoto"
                onFileChange={handleFileChange}
                existingImage={formData.fatherPhoto}
              />
            </div>
          </div>

          {/* ================= MOTHER ================= */}

          <h3 className="Student-Admission-SectionTitle">Mother Details</h3>

          <div className="Student-Admission-FormGrid">
            <div className="Student-Admission-Left">
              <div className="Student-Admission-Row">
                <FormInput
                  label="Mother Name"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                />

                <FormInput
                  label="Qualification"
                  name="motherQualification"
                  value={formData.motherQualification}
                  onChange={handleChange}
                />

                <FormInput
                  label="Occupation"
                  name="motherOccupation"
                  value={formData.motherOccupation}
                  onChange={handleChange}
                />
              </div>

              <div className="Student-Admission-Row">
                <FormInput
                  label="Annual Income"
                  name="motherIncome"
                  value={formData.motherIncome}
                  onChange={handleChange}
                />

                <FormInput
                  label="Mobile Number"
                  name="motherPhone"
                  value={formData.motherPhone}
                  onChange={handleChange}
                />

                <FormInput
                  label="Aadhar Number"
                  name="motherAadhar"
                  value={formData.motherAadhar}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="Student-Admission-Right">
              <PhotoUploadBox
                name="motherPhoto"
                onFileChange={handleFileChange}
                existingImage={formData.motherPhoto}
              />
            </div>
          </div>

          {/* ================= ADDRESS DETAILS ================= */}

          <h3 className="Student-Admission-SectionTitle">Address Details</h3>

          <div className="Student-Admission-Row">
            <FormTextarea
              label="Residential Address"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
            />
          </div>

          <div className="Student-Admission-Row">
            <FormInput
              label="District"
              name="district"
              value={formData.district}
              onChange={handleChange}
            />

            <FormInput
              label="Pin Code"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
            />

            <FormInput
              label="WhatsApp Number"
              name="whatsappNo"
              value={formData.whatsappNo}
              onChange={handleChange}
            />
          </div>

          <div className="Student-Admission-Row">
            <FormSelect
              label="School Transportation"
              name="transportRequired"
              value={formData.transportRequired}
              options={["Yes", "No"]}
              onChange={handleChange}
            />

            <FormInput
              label="Area"
              name="area"
              value={formData.area}
              onChange={handleChange}
            />

            <div></div>
          </div>
        </AccordionSection>

        {/* ================= UPLOAD DOCUMENTS ================= */}
        <AccordionSection title="Upload Documents">
          <table className="Student-Admission-DocumentTable">
            <thead>
              <tr>
                <th>#</th>
                <th>Document Name</th>
                <th>Upload / View File</th>
              </tr>
            </thead>

            <tbody>
              {[
                {
                  label: "Student Passport Photo",
                  field: "studentPhoto",
                },

                {
                  label: "Father Passport Photo",
                  field: "fatherPhoto",
                },

                {
                  label: "Mother Passport Photo",
                  field: "motherPhoto",
                },

                {
                  label: "Student Aadhaar Card",
                  field: "studentAadhar",
                },

                {
                  label: "Father Aadhaar Card",
                  field: "fatherAadhar",
                },

                {
                  label: "Mother Aadhaar Card",
                  field: "motherAadhar",
                },

                {
                  label: "Samagra ID",
                  field: "samagraIdDoc",
                },

                {
                  label: "Birth Certificate",
                  field: "birthCertificate",
                },

                {
                  label: "Transfer Certificate (TC)",
                  field: "tcCertificate",
                },

                {
                  label: "Previous School Marksheet",
                  field: "previousMarksheet",
                },

                {
                  label: "Bank Passbook",
                  field: "bankPassbook",
                },

                {
                  label: "Income Certificate",
                  field: "incomeCertificate",
                },
              ].map((item, index) => (
                <tr key={item.field}>
                  <td>{index + 1}</td>

                  <td className="Student-Admission-DocName">{item.label}</td>

                  <td className="Student-Admission-DocumentCell">
                    <DocumentUpload
                      name={item.field}
                      existingFile={(formData.documents || {})[item.field]}
                      onFileChange={handleFileChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AccordionSection>

        {/* SUBMIT */}
        <div className="Student-Admission-SubmitWrapper">
          <button
            type="button"
            className="Student-Admission-SubmitBtn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : editId ? "Update Student" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

const FormInput = ({
  label,
  type = "text",
  name,
  onChange,
  value,
  disabled,
}) => {
  const handleInputChange = (e) => {
    let val = e.target.value;

    // Only numbers for phone / aadhar
    if (
      name === "mobile" ||
      name === "fatherPhone" ||
      name === "motherPhone" ||
      name === "guardianPhone" ||
      name === "aadharNumber"
    ) {
      val = val.replace(/[^0-9]/g, "");

      // limit length
      if (
        name === "mobile" ||
        name === "fatherPhone" ||
        name === "motherPhone" ||
        name === "guardianPhone"
      ) {
        val = val.slice(0, 10);
      }

      if (name === "aadharNumber") {
        val = val.slice(0, 12);
      }
    }

    onChange(name, val);
  };

  return (
    <div className="Student-Admission-Group">
      <label className="Student-Admission-Label">{label}</label>

      <input
        type={type}
        name={name}
        value={value || ""}
        disabled={disabled}
        className="Student-Admission-Input"
        onChange={handleInputChange}
      />
    </div>
  );
};

const FormSelect = ({ label, name, onChange, options = [], value }) => (
  <div className="Student-Admission-Group">
    <label className="Student-Admission-Label">{label}</label>

    <select
      name={name}
      value={value || ""}
      className="Student-Admission-Input"
      onChange={(e) => onChange(name, e.target.value)}
    >
      <option value="">Select</option>

      {options.map((opt) =>
        typeof opt === "object" ? (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ) : (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ),
      )}
    </select>
  </div>
);

const FormTextarea = ({ label, name, onChange, value, disabled }) => (
  <div className="Student-Admission-Group">
    <label className="Student-Admission-Label">{label}</label>

    <textarea
      name={name}
      value={value || ""}
      disabled={disabled}
      className="Student-Admission-Textarea"
      onChange={(e) => onChange(name, e.target.value)}
    />
  </div>
);
const PhotoUploadBox = ({ name, onFileChange, existingImage }) => {
  const [preview, setPreview] = useState(null);

  // ✅ LOAD EXISTING IMAGE (SAFE)
  useEffect(() => {
    if (!existingImage) {
      setPreview(null);
      return;
    }

    let imagePath =
      existingImage && typeof existingImage === "object"
        ? existingImage?.path
        : existingImage || null;

    let imageUrl = imagePath;

    if (
      imagePath &&
      typeof imagePath === "string" &&
      !imagePath.startsWith("http")
    ) {
      imageUrl = `${IMAGE_URL}${imagePath}`;
    }

    setPreview(imageUrl);
  }, [existingImage]);

  // ✅ CLEANUP (MEMORY LEAK FIX)
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // ✅ HANDLE FILE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ SIZE CHECK
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }

    // ✅ TYPE CHECK
    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowed.includes(file.type)) {
      alert("Only JPG, PNG, WEBP allowed");
      return;
    }

    // ✅ CLEAN OLD PREVIEW
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    onFileChange(name, file);
  };

  // ✅ REMOVE IMAGE
  const handleRemove = () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    onFileChange(name, null);
  };

  return (
    <div className="Student-Admission-PhotoBox">
      {preview ? (
        <>
          <img
            src={preview}
            alt="Preview"
            className="Student-Admission-PhotoPreview"
          />

          <div className="Student-Admission-PhotoOverlay">Change Photo</div>

          {/* 🔥 REMOVE BUTTON */}
          <button
            type="button"
            className="Student-Admission-RemoveBtn"
            onClick={handleRemove}
          >
            Remove
          </button>
        </>
      ) : (
        <div className="Student-Admission-PhotoPlaceholder">
          <span>Upload Photo</span>
          <small>JPG / PNG / WEBP (Max 2MB)</small>
        </div>
      )}

      <input
        type="file"
        name={name}
        accept="image/*"
        className="Student-Admission-PhotoInput"
        onChange={handleImageChange}
      />
    </div>
  );
};
const DocumentUpload = ({ name, existingFile, onFileChange }) => {
  // ✅ SAFE FILE PATH (no crash)
  const filePath =
    existingFile && typeof existingFile === "object"
      ? existingFile?.path
      : existingFile || null;

  // ✅ SAFE URL
  const fileUrl =
    filePath && typeof filePath === "string" && !filePath.startsWith("http")
      ? `${IMAGE_URL}${filePath}`
      : filePath || "";

  return (
    <div className="Student-Admission-DocumentBox">
      {/* ✅ FILE PREVIEW */}
      {filePath && (
        <div className="Student-Admission-DocumentPreview">
          <a href={fileUrl} target="_blank" rel="noreferrer">
            View File
          </a>

          {/* 🔥 Show file name */}
          <p style={{ fontSize: "12px", color: "#666" }}>
            {filePath.split("/").pop()}
          </p>

          {/* 🔥 REMOVE BUTTON */}
          {/* <button
            type="button"
            className="Student-Admission-RemoveBtn"
            onClick={() => onFileChange(name, null)}
          >
            Remove
          </button> */}
        </div>
      )}

      {/* ✅ FILE INPUT */}
      <input
        type="file"
        name={name}
        accept=".pdf,.jpg,.jpeg,.png"
        className="Student-Admission-FileInput"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          // ✅ SIZE CHECK
          if (file.size > 2 * 1024 * 1024) {
            alert("File must be under 2MB");
            return;
          }

          // ✅ TYPE CHECK
          const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/jpg",
          ];

          if (!allowedTypes.includes(file.type)) {
            alert("Only PDF, JPG, PNG allowed");
            return;
          }

          onFileChange(name, file);
        }}
      />
    </div>
  );
};

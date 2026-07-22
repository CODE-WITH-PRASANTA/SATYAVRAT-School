import React, { useState, useEffect, useRef } from "react";
import AccordionSection from "../../Component/AccordionSection/AccordionSection";
import { Download, Upload, FileText, X, Check, RefreshCw, Eraser } from "lucide-react";
import "./StudentAdmission.css";
import DownloadFrom from "../../assets/ApplicationForm.pdf.pdf";
import { useParams, useNavigate } from "react-router-dom";
import API, { IMAGE_URL } from "../../Api/axios";

// Base API configuration
const API_BASE_URL = "http://localhost:5000/api/newadmi";
const SERVER_URL = "http://localhost:5000";

const getFileUrl = (filePath) => {
  if (!filePath) return "";

  if (filePath.startsWith("http")) {
    return filePath;
  }

  return `${SERVER_URL}${filePath.startsWith("/") ? filePath : `/${filePath}`}`;
};

const initialFormState = {
  /* ===== Top Info Bar ===== */
  formNo: "",
  admissionNo: "",
  admissionDate: "",
  class: "",
  medium: "",
  samagraId: "",
  aadharCardNo: "",
  apaarId: "",
  penNo: "",
  familyId: "",
  enrollmentNo: "",

  /* ===== Student Details ===== */
  studentName: "",
  gender: "",
  dobWords: "",
  nationality: "",
  motherTongue: "",
  religion: "",
  category: "",
  caste: "",
  bloodGroup: "",
  bankAccountNumber: "",
  ifscCode: "",
  bankName: "",
  lastExamSchool: "",
  tcNumber: "",

  /* ===== Father's Details ===== */
  fatherName: "",
  fatherQualification: "",
  fatherOccupation: "",
  fatherIncome: "",
  fatherMobile: "",
  fatherAadhar: "",

  /* ===== Mother's Details ===== */
  motherName: "",
  motherQualification: "",
  motherOccupation: "",
  motherIncome: "",
  motherMobile: "",
  motherAadhar: "",

  /* ===== Address Details ===== */
  residentialAddress: "",
  district: "",
  pinCode: "",
  transportRequired: "",
  whatsappNo: "",
  area: "",

  /* ===== For Office Use Only ===== */
  admittedClass: "",
  section: "",
  regNo: "",
};

const classOptions = [
  "LKG", "UKG", "1st", "2nd", "3rd", "4th", "5th",
  "6th", "7th", "8th", "9th", "10th",
];

const sectionOptions = ["A", "B", "C", "D"];

export default function StudentAdmission() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormState);
  const [files, setFiles] = useState({});
  const [existingFiles, setExistingFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Fetch admission details when an `id` parameter exists in URL
  useEffect(() => {
    if (id) {
      fetchAdmissionDetails(id);
    }
  }, [id]);

  const fetchAdmissionDetails = async (admissionId) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/${admissionId}`);
      if (res.data && res.data.data) {
        const data = res.data.data;
        
        // Extract text fields
        const textData = {};
        Object.keys(initialFormState).forEach((key) => {
          textData[key] = data[key] || "";
        });
        setFormData(textData);

        // Store existing server uploaded file paths
        setExistingFiles({
          studentPhoto: data.studentPhoto || null,
          fatherPhoto: data.fatherPhoto || null,
          motherPhoto: data.motherPhoto || null,
          casteCertificate: data.casteCertificate || null,
          incomeCertificate: data.incomeCertificate || null,
          residentCertificate: data.residentCertificate || null,
          birthCertificate: data.birthCertificate || null,
          admissionInchargeSignature: data.admissionInchargeSignature || null,
          principalSignature: data.principalSignature || null,
        });
      }
    } catch (err) {
      console.error("Error fetching admission details:", err);
      alert(err.response?.data?.message || "Failed to fetch student details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name, file) => {
    setFiles((prev) => ({ ...prev, [name]: file }));
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setFiles({});
    setExistingFiles({});
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Required Field Validations
    if (
      !formData.admissionNo ||
      !formData.class ||
      !formData.studentName ||
      !formData.gender ||
      !formData.dobWords
    ) {
      alert("Please fill all required fields (Admission No., Class, Student Name, Gender, Date of Birth in words)");
      return;
    }

    try {
      setLoading(true);
      const payload = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => {
        payload.append(key, formData[key] !== undefined ? formData[key] : "");
      });

      // Append newly attached files (photos, signatures, certificates)
      Object.keys(files).forEach((key) => {
        if (files[key]) {
          payload.append(key, files[key]);
        }
      });

      let response;
      if (id) {
        // UPDATE existing entry
        response = await axios.put(`${API_BASE_URL}/update/${id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // CREATE new entry
        response = await axios.post(`${API_BASE_URL}/create`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.data && (response.data.success || response.status === 200 || response.status === 201)) {
        setSubmitted(true);
        alert(id ? "Student record updated successfully!" : "Student admission submitted successfully!");
        
        if (!id) {
          handleReset();
        } else {
          fetchAdmissionDetails(id);
        }

        setTimeout(() => setSubmitted(false), 2500);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert(error.response?.data?.message || "Failed to save student admission data. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && id && !formData.studentName) {
    return <div className="Student-Admission-Loading">Loading Admission Record...</div>;
  }

  return (
    <div className="Student-Admission-Page">
      <form onSubmit={handleSubmit} className="Student-Admission-Container">
        {/* HEADER */}
        <div className="Student-Admission-Header">
          <div>
            <h1 className="Student-Admission-Title">
              {id ? "Edit Student Admission" : "Student Admission"}
            </h1>
            <p className="Student-Admission-Subtitle">
              Fill in the student, parent and document details below
            </p>
          </div>
          <button
            type="button"
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
          <div className="Student-Admission-InfoBar">
            <div className="Student-Admission-InfoGrid">
              <InfoField label="Form No." name="formNo" value={formData.formNo} onChange={handleChange} />
              <InfoField label="Admission No." name="admissionNo" value={formData.admissionNo} onChange={handleChange} />
              <InfoField label="Date" type="date" name="admissionDate" value={formData.admissionDate} onChange={handleChange} />

              <InfoSelect label="Class" name="class" value={formData.class} options={classOptions} onChange={handleChange} />
              <InfoField label="Medium" name="medium" value={formData.medium} onChange={handleChange} />
              <InfoField label="Samagra ID" name="samagraId" value={formData.samagraId} onChange={handleChange} />

              <InfoField label="Aadhar Card No." name="aadharCardNo" value={formData.aadharCardNo} onChange={handleChange} numericLimit={12} />
              <InfoField label="APAAR ID" name="apaarId" value={formData.apaarId} onChange={handleChange} />
              <InfoField label="PEN No." name="penNo" value={formData.penNo} onChange={handleChange} />

              <InfoField label="Family ID" name="familyId" value={formData.familyId} onChange={handleChange} />
              <InfoField label="Enrollment No." name="enrollmentNo" value={formData.enrollmentNo} onChange={handleChange} />
            </div>

            <PhotoUploadBox
              name="studentPhoto"
              label="Recent Passport Size Coloured Photograph"
              onFileChange={handleFileChange}
              file={files.studentPhoto}
              existingUrl={existingFiles.studentPhoto}
            />
          </div>

          <ol className="Student-Admission-NumberedList">
            <li>
              <span className="Student-Admission-ItemLabel">Name of the Student</span>
              <div className="Student-Admission-InlineRow">
                <PlainField name="studentName" value={formData.studentName} onChange={handleChange} placeholder="Full name" wide />
                <div className="Student-Admission-GenderToggle">
                  {["Male", "Female"].map((g) => (
                    <button
                      type="button"
                      key={g}
                      className={`Student-Admission-GenderBtn ${formData.gender === g ? "is-active" : ""}`}
                      onClick={() => handleChange("gender", g)}
                    >
                      {g === "Male" ? "M" : "F"}
                    </button>
                  ))}
                </div>
              </div>
            </li>

            <li>
              <span className="Student-Admission-ItemLabel">Date of Birth (in words)</span>
              <PlainField name="dobWords" value={formData.dobWords} onChange={handleChange} placeholder="e.g. Twelfth March, Two Thousand Fifteen" wide />
            </li>

            <li>
              <span className="Student-Admission-ItemLabel">Nationality / Mother Tongue / Religion</span>
              <div className="Student-Admission-InlineRow Student-Admission-InlineRow--triple">
                <PlainField name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Nationality" />
                <PlainField name="motherTongue" value={formData.motherTongue} onChange={handleChange} placeholder="Mother Tongue" />
                <PlainField name="religion" value={formData.religion} onChange={handleChange} placeholder="Religion" />
              </div>
            </li>

            <li>
              <span className="Student-Admission-ItemLabel">Category / Caste / Blood Group</span>
              <div className="Student-Admission-InlineRow Student-Admission-InlineRow--triple">
                <PlainSelect name="category" value={formData.category} options={["SC", "ST", "OBC", "GEN"]} onChange={handleChange} placeholder="Category" />
                <PlainField name="caste" value={formData.caste} onChange={handleChange} placeholder="Caste" />
                <PlainField name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="Blood Group" />
              </div>
            </li>

            <li>
              <span className="Student-Admission-ItemLabel">Bank A/C No. / IFSC Code / Bank Name &amp; Place</span>
              <div className="Student-Admission-InlineRow Student-Admission-InlineRow--triple">
                <PlainField name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} placeholder="Bank A/C No." />
                <PlainField name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="IFSC Code" />
                <PlainField name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name & Place" />
              </div>
            </li>

            <li>
              <span className="Student-Admission-ItemLabel">Details of Last Exam</span>
              <div className="Student-Admission-InlineRow">
                <PlainField name="lastExamSchool" value={formData.lastExamSchool} onChange={handleChange} placeholder="Name of School" wide />
                <PlainField name="tcNumber" value={formData.tcNumber} onChange={handleChange} placeholder="T.C. No." />
              </div>
            </li>
          </ol>
        </AccordionSection>

        {/* ================= PARENT DETAILS ================= */}
        <AccordionSection title="Parent Details">
          <h3 className="Student-Admission-SectionTitle">Parent&apos;s Background</h3>

          <div className="Student-Admission-ParentGrid">
            {/* FATHER */}
            <div className="Student-Admission-ParentCard">
              <div className="Student-Admission-ParentCardHead">
                <span>Father</span>
                <PhotoUploadBox
                  name="fatherPhoto"
                  label="Photograph (Optional)"
                  compact
                  onFileChange={handleFileChange}
                  file={files.fatherPhoto}
                  existingUrl={existingFiles.fatherPhoto}
                />
              </div>

              <ParentField label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
              <ParentField label="Qualification" name="fatherQualification" value={formData.fatherQualification} onChange={handleChange} />
              <ParentSelect
                label="Occupation"
                name="fatherOccupation"
                value={formData.fatherOccupation}
                options={["Service", "Business"]}
                onChange={handleChange}
              />
              <ParentField label="Annual Income" name="fatherIncome" value={formData.fatherIncome} onChange={handleChange} />
              <ParentField label="Mobile No." name="fatherMobile" value={formData.fatherMobile} onChange={handleChange} numericLimit={10} />
              <ParentField label="Aadhar No." name="fatherAadhar" value={formData.fatherAadhar} onChange={handleChange} numericLimit={12} />
            </div>

            {/* MOTHER */}
            <div className="Student-Admission-ParentCard">
              <div className="Student-Admission-ParentCardHead">
                <span>Mother</span>
                <PhotoUploadBox
                  name="motherPhoto"
                  label="Photograph (Optional)"
                  compact
                  onFileChange={handleFileChange}
                  file={files.motherPhoto}
                  existingUrl={existingFiles.motherPhoto}
                />
              </div>

              <ParentField label="Mother's Name" name="motherName" value={formData.motherName} onChange={handleChange} />
              <ParentField label="Qualification" name="motherQualification" value={formData.motherQualification} onChange={handleChange} />
              <ParentSelect
                label="Occupation"
                name="motherOccupation"
                value={formData.motherOccupation}
                options={["Service", "Business", "Housewife"]}
                onChange={handleChange}
              />
              <ParentField label="Annual Income" name="motherIncome" value={formData.motherIncome} onChange={handleChange} />
              <ParentField label="Mobile No." name="motherMobile" value={formData.motherMobile} onChange={handleChange} numericLimit={10} />
              <ParentField label="Aadhar No." name="motherAadhar" value={formData.motherAadhar} onChange={handleChange} numericLimit={12} />
            </div>
          </div>

          <h3 className="Student-Admission-SectionTitle">Address Details</h3>

          <div className="Student-Admission-Row">
            <FormTextarea
              label="Residential Address"
              name="residentialAddress"
              value={formData.residentialAddress}
              onChange={handleChange}
            />
          </div>

          <div className="Student-Admission-Row">
            <FormInput label="Distt." name="district" value={formData.district} onChange={handleChange} />
            <FormInput label="Pin Code" name="pinCode" value={formData.pinCode} onChange={handleChange} numericLimit={6} />
            <FormSelect
              label="Availing School Transportation"
              name="transportRequired"
              value={formData.transportRequired}
              options={["Yes", "No"]}
              onChange={handleChange}
            />
          </div>

          <div className="Student-Admission-Row">
            <FormInput label="WhatsApp No." name="whatsappNo" value={formData.whatsappNo} onChange={handleChange} numericLimit={10} />
            <FormInput label="Area" name="area" value={formData.area} onChange={handleChange} />
            <div></div>
          </div>
        </AccordionSection>

        {/* ================= UPLOAD DOCUMENTS ================= */}
        <AccordionSection title="Upload Documents">
          <div className="Student-Admission-DocGrid">
            {[
              { label: "Caste Certificate", field: "casteCertificate" },
              { label: "Income Certificate", field: "incomeCertificate" },
              { label: "Residential Certificate", field: "residentCertificate" },
              { label: "Birth Certificate", field: "birthCertificate" },
            ].map((item) => (
              <DocumentCard
                key={item.field}
                label={item.label}
                name={item.field}
                file={files[item.field]}
                existingUrl={existingFiles[item.field]}
                onFileChange={handleFileChange}
              />
            ))}
          </div>
        </AccordionSection>

        {/* ================= FOR OFFICE USE ONLY ================= */}
        <AccordionSection title="For Office Use Only">
          <div className="Student-Admission-OfficeUse">
            <div className="Student-Admission-OfficeUseHead">For Office Use Only</div>

            <div className="Student-Admission-OfficeUseRow">
              <span className="Student-Admission-OfficeUseText">
                Student: <strong>{formData.studentName || "—"}</strong> is admitted in class
              </span>
              <PlainSelect
                name="admittedClass"
                value={formData.admittedClass}
                options={classOptions}
                onChange={handleChange}
                placeholder="Class"
              />
              <span className="Student-Admission-OfficeUseText">Section</span>
              <PlainSelect
                name="section"
                value={formData.section}
                options={sectionOptions}
                onChange={handleChange}
                placeholder="Section"
              />
            </div>

            <div className="Student-Admission-OfficeUseRow Student-Admission-OfficeUseRow--signatures">
              <div className="Student-Admission-OfficeUseField">
                <label>Reg. No.</label>
                <PlainField name="regNo" value={formData.regNo} onChange={handleChange} placeholder="Registration No." />
              </div>

              {/* Admission In-Charge Signature Area */}
              <SignaturePad
                title="ADMISSION IN-CHARGE"
                name="admissionInchargeSignature"
                file={files.admissionInchargeSignature}
                existingUrl={existingFiles.admissionInchargeSignature}
                onFileChange={handleFileChange}
              />

              {/* Principal Signature Area */}
              <SignaturePad
                title="PRINCIPAL"
                name="principalSignature"
                file={files.principalSignature}
                existingUrl={existingFiles.principalSignature}
                onFileChange={handleFileChange}
              />
            </div>
          </div>
        </AccordionSection>

        {/* ACTIONS / SUBMIT */}
        <div className="Student-Admission-SubmitWrapper">
          <button
            type="button"
            className="Student-Admission-ResetBtn"
            onClick={handleReset}
            disabled={loading}
          >
            <RefreshCw size={16} /> Reset
          </button>

          {submitted && (
            <span className="Student-Admission-SuccessTag">
              <Check size={16} /> Saved to server
            </span>
          )}

          <button
            type="submit"
            className="Student-Admission-SubmitBtn"
            disabled={loading}
          >
            {loading ? "Saving..." : id ? "Update Admission" : "Submit Admission"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ===================================================================== */
/* ============================ SUBCOMPONENTS =========================== */
/* ===================================================================== */

const sanitizeNumeric = (val, limit) => val.replace(/[^0-9]/g, "").slice(0, limit || undefined);

const SignaturePad = ({ title, name, file, existingUrl, onFileChange }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000000";
    }
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          const signatureFile = new File([blob], `${name}.png`, { type: "image/png" });
          onFileChange(name, signatureFile);
        }
      });
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasDrawn(false);
    onFileChange(name, null);
  };

  const handleUpload = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      onFileChange(name, selected);
    }
  };

  return (
    <div className="Student-Admission-SignatureLine">
      <div className="Student-Admission-SignatureCanvasWrapper" style={{ position: "relative", borderBottom: "2px solid #94a3b8", marginBottom: "8px" }}>
        {file || existingUrl ? (
          <div style={{ position: "relative", height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
              src={file ? URL.createObjectURL(file) : (existingUrl.startsWith("http") ? existingUrl : `${SERVER_URL}/uploads/${existingUrl}`)}
              alt={title}
              style={{ maxHeight: "70px", maxWidth: "100%", objectFit: "contain" }}
            />
            <button
              type="button"
              onClick={() => onFileChange(name, null)}
              style={{ position: "absolute", top: "2px", right: "2px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", padding: "2px", cursor: "pointer" }}
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <>
            <canvas
              ref={canvasRef}
              width={220}
              height={80}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              style={{ cursor: "crosshair", display: "block", background: "transparent" }}
            />
            {hasDrawn && (
              <button
                type="button"
                onClick={handleClear}
                style={{ position: "absolute", top: "2px", right: "2px", background: "none", border: "none", color: "#64748b", cursor: "pointer" }}
                title="Clear Signature"
              >
                <Eraser size={14} />
              </button>
            )}
            <label style={{ position: "absolute", bottom: "2px", right: "2px", cursor: "pointer", color: "#2563eb", fontSize: "10px", display: "flex", alignItems: "center", gap: "2px" }}>
              <Upload size={10} />
              <span>Upload</span>
              <input type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} />
            </label>
          </>
        )}
      </div>
      <label style={{ fontSize: "12px", fontWeight: "bold", color: "#334155", letterSpacing: "0.5px" }}>{title}</label>
    </div>
  );
};

const FormInput = ({ label, type = "text", name, onChange, value, numericLimit }) => {
  const handleInputChange = (e) => {
    let val = e.target.value;
    if (numericLimit) val = sanitizeNumeric(val, numericLimit);
    onChange(name, val);
  };

  return (
    <div className="Student-Admission-Group">
      <label className="Student-Admission-Label">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ""}
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
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const FormTextarea = ({ label, name, onChange, value }) => (
  <div className="Student-Admission-Group">
    <label className="Student-Admission-Label">{label}</label>
    <textarea
      name={name}
      value={value || ""}
      className="Student-Admission-Textarea"
      onChange={(e) => onChange(name, e.target.value)}
    />
  </div>
);

const PlainField = ({ name, value, onChange, placeholder, wide, numericLimit }) => (
  <input
    type="text"
    name={name}
    value={value || ""}
    placeholder={placeholder}
    className={`Student-Admission-PlainField ${wide ? "Student-Admission-PlainField--wide" : ""}`}
    onChange={(e) => {
      let val = e.target.value;
      if (numericLimit) val = sanitizeNumeric(val, numericLimit);
      onChange(name, val);
    }}
  />
);

const PlainSelect = ({ name, value, options = [], onChange, placeholder }) => (
  <select
    name={name}
    value={value || ""}
    className="Student-Admission-PlainField"
    onChange={(e) => onChange(name, e.target.value)}
  >
    <option value="">{placeholder || "Select"}</option>
    {options.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

const InfoField = ({ label, type = "text", name, value, onChange, numericLimit }) => (
  <div className="Student-Admission-InfoField">
    <label>{label}</label>
    <input
      type={type}
      value={value || ""}
      onChange={(e) => {
        let val = e.target.value;
        if (numericLimit) val = sanitizeNumeric(val, numericLimit);
        onChange(name, val);
      }}
    />
  </div>
);

const InfoSelect = ({ label, name, value, options = [], onChange }) => (
  <div className="Student-Admission-InfoField">
    <label>{label}</label>
    <select value={value || ""} onChange={(e) => onChange(name, e.target.value)}>
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const ParentField = ({ label, name, value, onChange, numericLimit }) => (
  <div className="Student-Admission-ParentField">
    <label>{label}</label>
    <input
      type="text"
      value={value || ""}
      onChange={(e) => {
        let val = e.target.value;
        if (numericLimit) val = sanitizeNumeric(val, numericLimit);
        onChange(name, val);
      }}
    />
  </div>
);

const ParentSelect = ({ label, name, value, options = [], onChange }) => (
  <div className="Student-Admission-ParentField">
    <label>{label}</label>
    <select value={value || ""} onChange={(e) => onChange(name, e.target.value)}>
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const PhotoUploadBox = ({ name, label, onFileChange, file, existingUrl, compact }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (existingUrl) {
      const fullUrl = existingUrl.startsWith("http") ? existingUrl : `${SERVER_URL}/uploads/${existingUrl}`;
      setPreview(fullUrl);
    } else {
      setPreview(null);
    }
  }, [file, existingUrl]);

  const handleImageChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }

    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowed.includes(selected.type)) {
      alert("Only JPG, PNG, WEBP allowed");
      return;
    }

    onFileChange(name, selected);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onFileChange(name, null);
  };

  return (
    <div className={`Student-Admission-PhotoBox ${compact ? "Student-Admission-PhotoBox--compact" : ""}`}>
      {preview ? (
        <>
          <img src={preview} alt="Preview" className="Student-Admission-PhotoPreview" />
          <div className="Student-Admission-PhotoOverlay">Change Photo</div>
          <button type="button" className="Student-Admission-RemoveBtn" onClick={handleRemove}>
            <X size={12} />
          </button>
        </>
      ) : (
        <div className="Student-Admission-PhotoPlaceholder">
          <Upload size={compact ? 16 : 22} />
          <span>{label}</span>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="Student-Admission-PhotoInput"
        onChange={handleImageChange}
      />
    </div>
  );
};

const DocumentCard = ({ label, name, file, existingUrl, onFileChange }) => {
  const handleChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > 2 * 1024 * 1024) {
      alert("File must be under 2MB");
      return;
    }

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(selected.type)) {
      alert("Only PDF, JPG, PNG allowed");
      return;
    }

    onFileChange(name, selected);
  };

  const getStatusText = () => {
    if (file) return file.name;
    if (existingUrl) return `Uploaded file: ${existingUrl.split("/").pop()}`;
    return "PDF, JPG or PNG · Max 2MB";
  };

  return (
    <div className={`Student-Admission-DocCard ${file || existingUrl ? "is-filled" : ""}`}>
      <div className="Student-Admission-DocCardIcon">
        <FileText size={20} />
      </div>

      <div className="Student-Admission-DocCardBody">
        <span className="Student-Admission-DocCardLabel">{label}</span>
        <span className="Student-Admission-DocCardStatus">{getStatusText()}</span>
      </div>

      <div className="Student-Admission-DocCardAction">
        {file || existingUrl ? (
          <button type="button" className="Student-Admission-DocCardRemove" onClick={() => onFileChange(name, null)}>
            <X size={14} />
          </button>
        ) : (
          <label className="Student-Admission-DocCardUpload">
            <Upload size={14} />
            Upload
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} />
          </label>
        )}
      </div>
    </div>
  );
};
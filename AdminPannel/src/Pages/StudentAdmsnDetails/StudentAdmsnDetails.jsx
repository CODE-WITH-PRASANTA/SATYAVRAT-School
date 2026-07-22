import React, { useState, useEffect } from "react";
import "./StudentAdmsnDetails.css";
import { useNavigate } from "react-router-dom";
import API, { IMAGE_URL } from "../../Api/axios";

export default function StudentAdmsnDetails() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [nameSearch, setNameSearch] = useState("");
  const [rollSearch, setRollSearch] = useState("");

  const navigate = useNavigate();

  // Helper function to extract path string from various formats (String, Object, Array)
  const extractPathString = (pathInput) => {
    if (!pathInput) return null;
    if (typeof pathInput === "string") return pathInput;
    if (Array.isArray(pathInput) && pathInput.length > 0) {
      return extractPathString(pathInput[0]);
    }
    if (typeof pathInput === "object") {
      return pathInput.url || pathInput.path || pathInput.filename || null;
    }
    return null;
  };

  // Helper function to build clean, normalized media URLs
  const getMediaUrl = (pathInput) => {
    const path = extractPathString(pathInput);
    if (!path || path === "#" || typeof path !== "string") return null;

    // Normalize Windows backslashes (\) to forward slashes (/)
    const normalizedPath = path.replace(/\\/g, "/");

    if (
      normalizedPath.startsWith("http://") ||
      normalizedPath.startsWith("https://") ||
      normalizedPath.startsWith("data:")
    ) {
      return normalizedPath;
    }

    // Ensure IMAGE_URL exists or fallback to standard origin
    const base = (IMAGE_URL || "").endsWith("/")
      ? IMAGE_URL.slice(0, -1)
      : IMAGE_URL || window.location.origin;

    const cleanPath = normalizedPath.startsWith("/")
      ? normalizedPath
      : `/${normalizedPath}`;

    return `${base}${cleanPath}`;
  };

  // 1. Fetch All Admissions from Backend
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await API.get("/newadmi");

      console.log("Raw /newadmi response:", response.data);

      const data = response.data.data || response.data || [];

      setStudents(data);
      setFilteredStudents(data);

      if (data.length > 0) {
        setSelectedStudent(data[0]);
      } else {
        setSelectedStudent(null);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(
        err.response?.data?.message || "Failed to fetch student details."
      );
    } finally {
      setLoading(false);
    }
  };

  // 2. Client-side Search Filter (Name & Roll Number)
  useEffect(() => {
    let result = students;

    if (nameSearch.trim() !== "") {
      result = result.filter((s) =>
        s.studentName?.toLowerCase().includes(nameSearch.toLowerCase())
      );
    }

    if (rollSearch.trim() !== "") {
      result = result.filter((s) =>
        s.rollNumber?.toString().toLowerCase().includes(rollSearch.toLowerCase())
      );
    }

    setFilteredStudents(result);
  }, [nameSearch, rollSearch, students]);

  // 3. Navigate to Edit Page
  const handleEdit = () => {
    if (selectedStudent?._id) {
      navigate(`/student/admission/${selectedStudent._id}`);
    }
  };

  // 4. Delete Student Record via API
  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Stop parent <tr> click trigger
    if (!window.confirm("Are you sure you want to delete this student record?"))
      return;

    try {
      await API.delete(`/newadmi/delete/${id}`);

      // Update state without refreshing page
      const updatedList = students.filter((s) => s._id !== id);
      setStudents(updatedList);

      // Re-select first item if the deleted record was active
      if (selectedStudent?._id === id) {
        setSelectedStudent(updatedList.length > 0 ? updatedList[0] : null);
      }

      alert("Student record deleted successfully.");
    } catch (err) {
      console.error("Error deleting student:", err);
      alert(err.response?.data?.message || "Failed to delete student record.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Improved Media Preview Component
  const MediaPreview = ({ path, alt = "Media Preview" }) => {
    const [imgError, setImgError] = useState(false);
    const url = getMediaUrl(path);

    if (!url) return <span>-</span>;

    const isPdf = /\.pdf($|\?)/i.test(url);

    if (isPdf) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            padding: "6px 12px",
            backgroundColor: "#eef2f7",
            border: "1px solid #cbd5e1",
            borderRadius: "4px",
            color: "#0f172a",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: "bold",
          }}
        >
          📄 View PDF Document
        </a>
      );
    }

    if (imgError) {
      return (
        <div style={{ fontSize: "0.85rem" }}>
          <span style={{ color: "#dc2626", display: "block" }}>
            Failed to load image
          </span>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#2563eb", textDecoration: "underline" }}
          >
            Open raw file link
          </a>
        </div>
      );
    }

    return (
      <div style={{ display: "inline-block" }}>
        <a href={url} target="_blank" rel="noreferrer">
          <img
            src={url}
            alt={alt}
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "6px",
              objectFit: "cover",
              border: "1px solid #d1d5db",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              display: "block",
            }}
            onError={() => {
              console.error(`Failed to load image at URL: ${url}`);
              setImgError(true);
            }}
          />
        </a>
      </div>
    );
  };

  return (
    <div className="Student-Details-Wrapper">
      {/* LEFT PANEL */}
      <div className="Student-Search-Panel">
        <h2>Search Student</h2>

        <input
          type="text"
          placeholder="Search by Name"
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
          className="Student-Search-Input"
        />

        <input
          type="text"
          placeholder="Search by Roll Number"
          value={rollSearch}
          onChange={(e) => setRollSearch(e.target.value)}
          className="Student-Search-Input"
        />

        <div className="Student-Table-Wrapper">
          {loading ? (
            <p style={{ textAlign: "center", padding: "1rem" }}>
              Loading records...
            </p>
          ) : error ? (
            <p style={{ color: "red", textAlign: "center", padding: "1rem" }}>
              {error}
            </p>
          ) : (
            <table className="Student-Table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Roll</th>
                  <th>Class</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No student records found.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s, index) => (
                    <tr
                      key={s._id}
                      onClick={() => setSelectedStudent(s)}
                      className={`Student-Table-Row ${
                        selectedStudent?._id === s._id ? "active" : ""
                      }`}
                    >
                      <td>{index + 1}</td>
                      <td>{s.studentName || "-"}</td>
                      <td>{s.rollNumber || "-"}</td>
                      <td>{s.class || "-"}</td>

                      {/* ACTION BUTTON */}
                      <td>
                        <button
                          className="Student-Delete-Btn"
                          onClick={(e) => handleDelete(s._id, e)}
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="Student-Details-Page">
        {!selectedStudent ? (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            Select a student to view details
          </p>
        ) : (
          <div className="Student-Details-Scroll">
            {/* HEADER */}
            <div className="Student-Header">
              <div className="Student-Photo">
                {getMediaUrl(selectedStudent.studentPhoto) ? (
                  <img
                    src={getMediaUrl(selectedStudent.studentPhoto)}
                    alt="student"
                    className="Student-Photo-Image"
                    onError={(e) => {
                      console.error(
                        "Student photo failed to load:",
                        getMediaUrl(selectedStudent.studentPhoto)
                      );
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="Student-Photo-Placeholder">No Photo</div>
                )}
              </div>

              <div>
                <h1 className="Student-Details-Title">
                  {selectedStudent.studentName || "N/A"}
                </h1>
                <p>
                  Class {selectedStudent.class || "-"} • Roll{" "}
                  {selectedStudent.rollNumber || "-"}
                </p>
              </div>

              <button className="Student-Edit-Btn" onClick={handleEdit}>
                Edit
              </button>
              <button className="Student-Edit-Btn" onClick={handlePrint}>
                Print
              </button>
            </div>

            {/* TOP INFO BAR DETAILS */}
            <Section title="Admission Info">
              <Detail label="Form No" value={selectedStudent.formNo} />
              <Detail label="Admission No" value={selectedStudent.admissionNo} />
              <Detail label="Admission Date" value={selectedStudent.admissionDate} />
              <Detail label="Class" value={selectedStudent.class} />
              <Detail label="Medium" value={selectedStudent.medium} />
              <Detail label="Samagra ID" value={selectedStudent.samagraId} />
              <Detail label="Aadhar Card No" value={selectedStudent.aadharCardNo} />
              <Detail label="Apaar ID" value={selectedStudent.apaarId} />
              <Detail label="Pen No" value={selectedStudent.penNo} />
              <Detail label="Family ID" value={selectedStudent.familyId} />
              <Detail label="Enrollment No" value={selectedStudent.enrollmentNo} />
            </Section>

            {/* STUDENT DETAILS */}
            <Section title="Student Information">
              <Detail label="Roll Number" value={selectedStudent.rollNumber} />
              <Detail label="Section" value={selectedStudent.section} />
              <Detail label="Gender" value={selectedStudent.gender} />
              <Detail label="Date of Birth" value={selectedStudent.dobWords} />
              <Detail label="Nationality" value={selectedStudent.nationality} />
              <Detail label="Mother Tongue" value={selectedStudent.motherTongue} />
              <Detail label="Religion" value={selectedStudent.religion} />
              <Detail label="Category" value={selectedStudent.category} />
              <Detail label="Caste" value={selectedStudent.caste} />
              <Detail label="Blood Group" value={selectedStudent.bloodGroup} />
              <Detail label="Last Exam School" value={selectedStudent.lastExamSchool} />
              <Detail label="TC Number" value={selectedStudent.tcNumber} />
            </Section>

            {/* FATHER DETAILS */}
            <Section title="Father Details">
              <Detail label="Father Name" value={selectedStudent.fatherName} />
              <Detail label="Qualification" value={selectedStudent.fatherQualification} />
              <Detail label="Occupation" value={selectedStudent.fatherOccupation} />
              <Detail label="Annual Income" value={selectedStudent.fatherIncome} />
              <Detail label="Mobile No" value={selectedStudent.fatherMobile} />
              <Detail label="Aadhar No" value={selectedStudent.fatherAadhar} />
            </Section>

            {/* MOTHER DETAILS */}
            <Section title="Mother Details">
              <Detail label="Mother Name" value={selectedStudent.motherName} />
              <Detail label="Qualification" value={selectedStudent.motherQualification} />
              <Detail label="Occupation" value={selectedStudent.motherOccupation} />
              <Detail label="Annual Income" value={selectedStudent.motherIncome} />
              <Detail label="Mobile No" value={selectedStudent.motherMobile} />
              <Detail label="Aadhar No" value={selectedStudent.motherAadhar} />
            </Section>

            {/* ADDRESS DETAILS */}
            <Section title="Address Details">
              <Detail label="Residential Address" value={selectedStudent.residentialAddress} />
              <Detail label="District" value={selectedStudent.district} />
              <Detail label="Pin Code" value={selectedStudent.pinCode} />
              <Detail label="Availing School Transportation" value={selectedStudent.transportRequired} />
              <Detail label="WhatsApp No" value={selectedStudent.whatsappNo} />
              <Detail label="Area" value={selectedStudent.area} />
            </Section>

            {/* BANK DETAILS */}
            <Section title="Bank Details">
              <Detail label="Bank Name" value={selectedStudent.bankName} />
              <Detail label="Account Number" value={selectedStudent.bankAccountNumber} />
              <Detail label="IFSC Code" value={selectedStudent.ifscCode} />
            </Section>

            {/* FOR OFFICE USE */}
            <Section title="For Office Use Only">
              <Detail label="Admitted Class" value={selectedStudent.admittedClass} />
              <Detail label="Section" value={selectedStudent.section} />
              <Detail label="Reg. No" value={selectedStudent.regNo} />
            </Section>

            {/* PARENT PHOTOS */}
            <Section title="Parent Photos">
              <Detail
                label="Father Photo"
                value={
                  <MediaPreview
                    path={selectedStudent.fatherPhoto}
                    alt="Father Photo"
                  />
                }
              />
              <Detail
                label="Mother Photo"
                value={
                  <MediaPreview
                    path={selectedStudent.motherPhoto}
                    alt="Mother Photo"
                  />
                }
              />
            </Section>

            {/* DOCUMENTS */}
            <Section title="Uploaded Documents">
              <Detail
                label="Caste Certificate"
                value={
                  <MediaPreview
                    path={selectedStudent.casteCertificate}
                    alt="Caste Certificate"
                  />
                }
              />
              <Detail
                label="Income Certificate"
                value={
                  <MediaPreview
                    path={selectedStudent.incomeCertificate}
                    alt="Income Certificate"
                  />
                }
              />
              <Detail
                label="Residential Certificate"
                value={
                  <MediaPreview
                    path={selectedStudent.residentCertificate}
                    alt="Residential Certificate"
                  />
                }
              />
              <Detail
                label="Birth Certificate"
                value={
                  <MediaPreview
                    path={selectedStudent.birthCertificate}
                    alt="Birth Certificate"
                  />
                }
              />
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}

/* UI HELPER COMPONENTS */
const Section = ({ title, children }) => (
  <div className="Student-Details-Section">
    <h2>{title}</h2>
    <div className="Student-Details-Grid">{children}</div>
  </div>
);

const Detail = ({ label, value }) => (
  <div className="Student-Details-Item">
    <span className="Student-Details-Label">{label}</span>
    <span className="Student-Details-Value">{value || "-"}</span>
  </div>
);
import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import "./ExamResultAdmin.css";

const ExamResultAdmin = () => {
  const [students, setStudents] = useState([]);
  const [classSubjects, setClassSubjects] = useState([]);
  const [results, setResults] = useState([]);
  const [examTypes, setExamTypes] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [examType, setExamType] = useState("");
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
    fetchResults();
    fetchExamTypes();
  }, []);

  const fetchStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data.data || []);
  };

  const fetchSubjects = async () => {
    const res = await API.get("/classwise-subjects");
    setClassSubjects(res.data.data || []);
  };

  const fetchResults = async () => {
    const res = await API.get("/exam-results");
    setResults(res.data.data || []);
  };

  const fetchExamTypes = async () => {
    const res = await API.get("/exam-types");
    const published = (res.data.data || []).filter((e) => e.isPublished);
    setExamTypes(published);
  };

  /* ================= STUDENT FILTER ================= */

  const filteredStudents = students.filter(
    (s) =>
      `${s.firstName} ${s.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      String(s.rollNumber || "").includes(search)
  );

  /* ================= SELECT ================= */

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setSearch(`${student.firstName} ${student.lastName}`);
    setShowDropdown(false);

    const found = classSubjects.find(
      (c) =>
        (c.classId?.className || "").trim() ===
        (student.class || "").trim()
    );

    if (found?.subjects?.length) {
      setSubjects(
        found.subjects.map((sub) => ({
          subject: sub,
          marks: 0,
          fullMarks: 100,
        }))
      );
    } else {
      setSubjects([]);
    }
  };

  /* ================= MARK ================= */

  const handleMarksChange = (i, val) => {
    const updated = [...subjects];
    let marks = Number(val);

    if (marks < 0) marks = 0;
    if (marks > updated[i].fullMarks) marks = updated[i].fullMarks;

    updated[i].marks = marks;
    setSubjects(updated);
  };

  const handleFullMarksChange = (i, val) => {
    const updated = [...subjects];
    let full = Number(val);

    if (full < 1) full = 1;

    updated[i].fullMarks = full;
    if (updated[i].marks > full) updated[i].marks = full;

    setSubjects(updated);
  };

  /* ================= CALC ================= */

  const totalMarks = subjects.reduce((s, x) => s + x.marks, 0);
  const totalFullMarks = subjects.reduce((s, x) => s + x.fullMarks, 0);

  const percentage = totalFullMarks
    ? (totalMarks / totalFullMarks) * 100
    : 0;

  const getGrade = () => {
    if (percentage >= 90) return "A+";
    if (percentage >= 75) return "A";
    if (percentage >= 60) return "B";
    if (percentage >= 40) return "C";
    return "F";
  };

  const getResult = () =>
    subjects.some((s) => s.marks < s.fullMarks * 0.35)
      ? "Fail"
      : "Pass";

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedStudent || !examType) {
      alert("Select student & exam type");
      return;
    }

    const payload = {
      admissionNo: selectedStudent.admissionNo,
      name: `${selectedStudent.firstName} ${selectedStudent.lastName}`,
      rollNumber: selectedStudent.rollNumber,
      classId: selectedStudent.classId,
      class: selectedStudent.class,
      examType,
      subjects,
      total: totalMarks,
      fullMarks: totalFullMarks,
      percentage,
      grade: getGrade(),
      result: getResult(),
    };

    try {
      if (editId) {
        await API.put(`/exam-results/${editId}`, payload);
      } else {
        await API.post("/exam-results", payload);
      }

      fetchResults();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setSelectedStudent(null);
    setSubjects([]);
    setExamType("");
    setEditId(null);
    setSearch("");
  };

  /* ================= UI ================= */

  return (
    <div className="exam-container">
      <h1>Exam Result Management</h1>

      <form className="exam-form" onSubmit={handleSubmit}>
        <h2>{editId ? "Edit Result" : "Add Result"}</h2>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search Student"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(true);
          }}
        />

        {/* DROPDOWN */}
        {showDropdown && search && (
          <div className="dropdown">
            {filteredStudents.map((s) => (
              <div
                key={s._id}
                onClick={() => handleStudentSelect(s)}
              >
                {s.firstName} {s.lastName} ({s.rollNumber})
              </div>
            ))}
          </div>
        )}

        {/* EXAM */}
        <select
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
        >
          <option value="">Select Exam</option>
          {examTypes.map((e) => (
            <option key={e._id}>{e.name}</option>
          ))}
        </select>

        {/* SUBJECTS */}
        {subjects.map((sub, i) => (
          <div key={i} className="subject-row">
            <span>{sub.subject}</span>

            <input
              type="number"
              value={sub.marks}
              onChange={(e) =>
                handleMarksChange(i, e.target.value)
              }
            />

            <input
              type="number"
              value={sub.fullMarks}
              onChange={(e) =>
                handleFullMarksChange(i, e.target.value)
              }
            />
          </div>
        ))}

        {/* RESULT */}
        {subjects.length > 0 && (
          <div className="result-box">
            <p>Total: {totalMarks}/{totalFullMarks}</p>
            <p>Percentage: {percentage.toFixed(2)}%</p>
            <p>Grade: {getGrade()}</p>
            <p className={getResult()}>
              {getResult()}
            </p>
          </div>
        )}

        <button>
          {editId ? "Update Result" : "Save Result"}
        </button>
      </form>
    </div>
  );
};

export default ExamResultAdmin;
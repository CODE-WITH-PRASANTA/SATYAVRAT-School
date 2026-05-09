import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import "./ClassWiseSubjectAdmin.css";

const ClassWiseSubjectAdmin = () => {

  const emptyForm = {
    classIds: [],
    subjectName: "",
    subjectType: "regular",
  };

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const [editing, setEditing] = useState(false);

  const [editId, setEditId] = useState(null);

  /* ======================================================
     FETCH CLASSES
  ====================================================== */

  const fetchClasses = async () => {
    try {

      const res = await API.get("/classes");

      setClasses(res.data.data || []);

    } catch (err) {

      console.error("Class Fetch Error:", err);

    }
  };

  /* ======================================================
     FETCH SUBJECTS
  ====================================================== */

  const fetchSubjects = async () => {
    try {

      const res = await API.get("/subjects");

      setSubjects(res.data.data || []);

    } catch (err) {

      console.error("Subject Fetch Error:", err);

    }
  };

  useEffect(() => {

    fetchClasses();

    fetchSubjects();

  }, []);

  /* ======================================================
     HANDLE INPUT
  ====================================================== */

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  /* ======================================================
     HANDLE CHECKBOX
  ====================================================== */

  const handleCheckbox = (classId, checked) => {

    if (checked) {

      setForm({
        ...form,
        classIds: [...form.classIds, classId],
      });

    } else {

      setForm({
        ...form,
        classIds: form.classIds.filter(
          (id) => id !== classId
        ),
      });

    }
  };

  /* ======================================================
     HANDLE SUBMIT
  ====================================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !form.classIds.length ||
      !form.subjectName.trim()
    ) {
      alert("Select class & enter subject");
      return;
    }

    try {

      /* ================= UPDATE ================= */

      if (editing) {

        await API.put(`/subjects/${editId}`, {
          subjectName: form.subjectName,
          subjectType: form.subjectType,
        });

      } else {

        /* ================= CREATE ================= */

        for (const classId of form.classIds) {

          await API.post("/subjects", {
            classId,
            subjectName: form.subjectName,
            subjectType: form.subjectType,
          });

        }
      }

      alert("✅ Success");

      setForm(emptyForm);

      setEditing(false);

      setEditId(null);

      fetchSubjects();

    } catch (err) {

      console.error("Submit Error:", err);

      alert(
        err?.response?.data?.message ||
        "Server Error"
      );
    }
  };

  /* ======================================================
     DELETE SUBJECT
  ====================================================== */

  const deleteSubject = async (id) => {

    if (!window.confirm("Delete this subject?")) {
      return;
    }

    try {

      await API.delete(`/subjects/${id}`);

      fetchSubjects();

    } catch (err) {

      console.error(err);

    }
  };

  /* ======================================================
     DELETE CLASS SUBJECTS
  ====================================================== */

  const deleteClassSubjects = async (classId) => {

    if (
      !window.confirm(
        "Delete all subjects of this class?"
      )
    ) {
      return;
    }

    try {

      const filtered = subjects.filter(
        (s) => s.classId?._id === classId
      );

      await Promise.all(
        filtered.map((s) =>
          API.delete(`/subjects/${s._id}`)
        )
      );

      fetchSubjects();

    } catch (err) {

      console.error(err);

    }
  };

  /* ======================================================
     EDIT SUBJECT
  ====================================================== */

  const editSubject = (sub) => {

    setEditing(true);

    setEditId(sub._id);

    setForm({
      classIds: [sub.classId._id],
      subjectName: sub.subjectName,
      subjectType: sub.subjectType,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ======================================================
     GROUP SUBJECTS
  ====================================================== */

  const groupedSubjects = classes.map((cls) => ({
    ...cls,

    subjects: subjects.filter(
      (s) => s.classId?._id === cls._id
    ),
  }));

  /* ======================================================
     UI
  ====================================================== */

  return (
    <div className="cws-container">

      <h1 className="cws-title">
        Class Wise Subject Management
      </h1>

      {/* ======================================================
         FORM
      ====================================================== */}

      <form
        className="cws-card"
        onSubmit={handleSubmit}
      >

        <h2>
          {editing
            ? "Update Subject"
            : "Add Subject"}
        </h2>

        {/* ================= CLASS BOX ================= */}

        <div className="class-box-grid">

          {classes.map((cls) => (

            <label
              key={cls._id}
              className={`class-box ${
                form.classIds.includes(cls._id)
                  ? "active"
                  : ""
              }`}
            >

              <input
                type="checkbox"
                checked={form.classIds.includes(
                  cls._id
                )}
                onChange={(e) =>
                  handleCheckbox(
                    cls._id,
                    e.target.checked
                  )
                }
              />

              <div className="class-box-content">

                <span className="class-name">
                  {cls.className}
                </span>

                <span className="section-name">
                  ({cls.sectionName})
                </span>

              </div>

            </label>

          ))}

        </div>

        <p className="selected-count">
          Selected: {form.classIds.length}
        </p>

        {/* ================= SUBJECT INPUT ================= */}

        <input
          type="text"
          name="subjectName"
          value={form.subjectName}
          onChange={handleChange}
          placeholder="Enter Subject Name"
          className="input"
        />

        {/* ================= SUBJECT TYPE ================= */}

        <div className="radio-group">

          <label>
            <input
              type="radio"
              name="subjectType"
              value="regular"
              checked={
                form.subjectType === "regular"
              }
              onChange={handleChange}
            />

            Regular
          </label>

          <label>
            <input
              type="radio"
              name="subjectType"
              value="optional"
              checked={
                form.subjectType === "optional"
              }
              onChange={handleChange}
            />

            Optional
          </label>

        </div>

        {/* ================= BUTTONS ================= */}

        <div className="btn-group">

          <button className="btn primary">
            {editing
              ? "Update Subject"
              : "Add Subject"}
          </button>

          {editing && (

            <button
              type="button"
              className="btn secondary"
              onClick={() => {

                setForm(emptyForm);

                setEditing(false);

                setEditId(null);

              }}
            >
              Cancel
            </button>

          )}

        </div>

      </form>

      {/* ======================================================
         SUBJECT LIST
      ====================================================== */}

      {groupedSubjects.map((cls) => (

        <div
          key={cls._id}
          className="class-block"
        >

          <div className="class-header">

            <h3>
              Class {cls.className} (
              {cls.sectionName})
            </h3>

            {cls.subjects.length > 0 && (

              <button
                className="delete-class"
                onClick={() =>
                  deleteClassSubjects(cls._id)
                }
              >
                Delete Class Subjects
              </button>

            )}

          </div>

          {cls.subjects.length === 0 ? (

            <p className="empty">
              No subjects found
            </p>

          ) : (

            cls.subjects.map((sub) => (

              <div
                key={sub._id}
                className="subject-row"
              >

                <div className="subject-left">

                  {sub.subjectName.toUpperCase()}

                  {sub.subjectType ===
                    "optional" && (
                    <span className="optional">
                      (Optional)
                    </span>
                  )}

                </div>

                <div className="subject-actions">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      editSubject(sub)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteSubject(sub._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      ))}

    </div>
  );
};

export default ClassWiseSubjectAdmin;
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

  /* ================= FETCH DATA ================= */

  const fetchClasses = async () => {
    try {
      const res = await API.get("/classes");
      setClasses(res.data.data || []);
    } catch (err) {
      console.error("Class Fetch Error:", err);
    }
  };

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

  /* ================= INPUT ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (classId, checked) => {
    if (checked) {
      setForm({ ...form, classIds: [...form.classIds, classId] });
    } else {
      setForm({
        ...form,
        classIds: form.classIds.filter((i) => i !== classId),
      });
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.classIds.length || !form.subjectName.trim()) {
      alert("Select class & enter subject");
      return;
    }

    try {
      if (editing) {
        await API.put(`/subjects/${editId}`, {
          subjectName: form.subjectName,
          subjectType: form.subjectType,
        });
      } else {
        await API.post("/subjects", form);
      }

      alert("✅ Success");

      setForm(emptyForm);
      setEditing(false);
      setEditId(null);

      fetchSubjects();
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  /* ================= DELETE ================= */

  const deleteSubject = async (id) => {
    if (!window.confirm("Delete this subject?")) return;

    try {
      await API.delete(`/subjects/${id}`);
      fetchSubjects();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteClassSubjects = async (classId) => {
    if (!window.confirm("Delete all subjects of this class?")) return;

    try {
      const filtered = subjects.filter(
        (s) => s.classId?._id === classId
      );

      await Promise.all(
        filtered.map((s) => API.delete(`/subjects/${s._id}`))
      );

      fetchSubjects();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= EDIT ================= */

  const editSubject = (sub) => {
    setEditing(true);
    setEditId(sub._id);

    setForm({
      classIds: [sub.classId._id],
      subjectName: sub.subjectName,
      subjectType: sub.subjectType,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= GROUP ================= */

  const groupedSubjects = classes.map((cls) => ({
    ...cls,
    subjects: subjects.filter(
      (s) => s.classId?._id === cls._id
    ),
  }));

  /* ================= UI ================= */

  return (
    <div className="cws-container">
      <h1 className="cws-title">Class Wise Subject Management</h1>

      {/* FORM */}
      <form className="cws-card" onSubmit={handleSubmit}>
        <h2>{editing ? "Update Subject" : "Add Subject"}</h2>

        <div className="checkbox-grid">
          {classes.map((cls) => (
            <label key={cls._id} className="checkbox-card">
              <input
                type="checkbox"
                checked={form.classIds.includes(cls._id)}
                onChange={(e) =>
                  handleCheckbox(cls._id, e.target.checked)
                }
              />
              <span>
                Class {cls.className} ({cls.sectionName})
              </span>
            </label>
          ))}
        </div>

        <input
          name="subjectName"
          value={form.subjectName}
          onChange={handleChange}
          placeholder="Subject Name"
          className="input"
        />

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="subjectType"
              value="regular"
              checked={form.subjectType === "regular"}
              onChange={handleChange}
            />
            Regular
          </label>

          <label>
            <input
              type="radio"
              name="subjectType"
              value="optional"
              checked={form.subjectType === "optional"}
              onChange={handleChange}
            />
            Optional
          </label>
        </div>

        <div className="btn-group">
          <button className="btn primary">
            {editing ? "Update" : "Add"}
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

      {/* TABLE */}
      {groupedSubjects.map((cls) => (
        <div key={cls._id} className="class-block">
          <div className="class-header">
            <h3>
              Class {cls.className} ({cls.sectionName})
            </h3>

            {cls.subjects.length > 0 && (
              <button
                className="delete-class"
                onClick={() => deleteClassSubjects(cls._id)}
              >
                Delete Class Subjects
              </button>
            )}
          </div>

          {cls.subjects.length === 0 ? (
            <p className="empty">No subjects</p>
          ) : (
            cls.subjects.map((sub) => (
              <div key={sub._id} className="subject-row">
                <div className="subject-left">
                  {sub.subjectName.toUpperCase()}
                  {sub.subjectType === "optional" && (
                    <span className="optional">(Optional)</span>
                  )}
                </div>

                <div className="subject-actions">
                  <button
                    className="edit-btn"
                    onClick={() => editSubject(sub)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteSubject(sub._id)}
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
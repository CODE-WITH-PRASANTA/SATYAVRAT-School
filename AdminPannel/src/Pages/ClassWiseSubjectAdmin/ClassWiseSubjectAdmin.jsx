import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import "./ClassWiseSubjectAdmin.css";

const ClassWiseSubjectAdmin = () => {
  const emptyForm = {
    classIds: [],
    subjectName: "",
    subjectType: "regular",
  };

  const [classes] = useState([
    { _id: "1", className: "1" },
    { _id: "2", className: "2" },
    { _id: "3", className: "3" },
  ]);

  const [form, setForm] = useState(emptyForm);
  const [subjects, setSubjects] = useState([]);

  const [editing, setEditing] = useState(false);
  const [oldSubjectName, setOldSubjectName] = useState("");

  /* ================= FETCH ================= */
  const fetchSubjects = async () => {
    try {
      const res = await API.get("/classwise-subjects");
      setSubjects(res.data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
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
        await API.put("/classwise-subjects/update", {
          classId: form.classIds[0],
          oldName: oldSubjectName,
          newName: form.subjectName,
          type: form.subjectType,
        });
      } else {
        await Promise.all(
          form.classIds.map((id) =>
            API.post("/classwise-subjects", {
              classId: id,
              name: form.subjectName,
              type: form.subjectType,
            })
          )
        );
      }

      fetchSubjects();
      setForm(emptyForm);
      setEditing(false);
      setOldSubjectName("");
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  /* ================= DELETE ================= */
  const deleteSubject = async (classId, name) => {
    try {
      await API.put("/classwise-subjects/delete", {
        classId,
        name,
      });
      fetchSubjects();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteClass = async (classId) => {
    try {
      await API.delete(`/classwise-subjects/${classId}`);
      fetchSubjects();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= EDIT ================= */
  const editSubject = (classId, sub) => {
    setEditing(true);
    setOldSubjectName(sub.name);

    setForm({
      classIds: [classId],
      subjectName: sub.name,
      subjectType: sub.type,
    });
  };

  /* ================= GROUP ================= */
  const groupedSubjects = classes.map((cls) => {
    const match = subjects.find((s) => s.classId === cls._id);

    return {
      ...cls,
      subjects: match ? match.subjects : [],
    };
  });

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
              <span>Class {cls.className}</span>
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
            <h3>{cls.className}</h3>
            {cls.subjects.length > 0 && (
              <button
                className="delete-class"
                onClick={() => deleteClass(cls._id)}
              >
                Delete Class
              </button>
            )}
          </div>

          {cls.subjects.map((sub, i) => (
            <div key={i} className="subject-row">
              <div className="subject-left">
                {sub.name.toUpperCase()}
                {sub.type === "optional" && (
                  <span className="optional">(Optional)</span>
                )}
              </div>

              <div className="subject-actions">
                <button
                  className="edit-btn"
                  onClick={() => editSubject(cls._id, sub)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteSubject(cls._id, sub.name)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ClassWiseSubjectAdmin;
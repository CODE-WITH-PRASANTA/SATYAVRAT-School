import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import "./ClassWiseSubjectAdmin.css";

const ClassWiseSubjectAdmin = () => {
  const emptyForm = {
    classIds: [],
    subjectName: "",
    subjectType: "regular",
  };

  const [form, setForm] = useState(emptyForm);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  /* ================= FETCH ================= */

  const fetchClasses = async () => {
    try {
      const res = await API.get("/classes");
      setClasses(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await API.get("/classwise-subjects");
      setSubjects(res.data.data || []);
    } catch (err) {
      console.error(err);
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
    const id = String(classId);

    if (checked) {
      setForm({ ...form, classIds: [...form.classIds, id] });
    } else {
      setForm({
        ...form,
        classIds: form.classIds.filter((i) => i !== id),
      });
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subjectName = form.subjectName.trim();

    if (!form.classIds.length || !subjectName) {
      alert("Select class & enter subject");
      return;
    }

    try {
      await Promise.all(
        form.classIds.map((classId) =>
          API.post("/classwise-subjects", {
            classId,
            subjects: [
              {
                name: subjectName,
                type: form.subjectType,
              },
            ],
          })
        )
      );

      fetchSubjects();
      setForm(emptyForm);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= DELETE ================= */

  const deleteSubject = async (classId, subjectName) => {
    try {
      await API.put("/classwise-subjects/remove", {
        classId,
        subjectName,
      });
      fetchSubjects();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteClass = async (docId) => {
    if (!window.confirm("Delete full class?")) return;

    try {
      await API.delete(`/classwise-subjects/${docId}`);
      fetchSubjects();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= EDIT ================= */

  const editSubject = (clsId, subject) => {
    const isString = typeof subject === "string";

    setForm({
      classIds: [String(clsId)],
      subjectName: isString ? subject : subject.name,
      subjectType: isString ? "regular" : subject.type || "regular",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= GROUP ================= */

  const groupedSubjects = classes
    .map((cls) => {
      const matched = subjects.filter((s) => {
        const subjectClassId =
          typeof s.classId === "object" ? s.classId._id : s.classId;

        return String(subjectClassId) === String(cls._id);
      });

      const allSubjects = matched.flatMap((m) => m.subjects);

      return {
        ...cls,
        docId: matched[0]?._id,
        classId:
          typeof matched[0]?.classId === "object"
            ? matched[0]?.classId._id
            : matched[0]?.classId,
        subjects: allSubjects,
      };
    })
    .filter((cls) => cls.subjects.length > 0);

  return (
    <div className="cws-container">
      <h1 className="cws-title">Class Wise Subject Management</h1>

      {/* FORM */}
      <form className="cws-card" onSubmit={handleSubmit}>
        <h2>{form.subjectName ? "Update Subject" : "Add Subject"}</h2>

        {/* CHECKBOX */}
        <div className="checkbox-grid">
          {classes.map((cls) => (
            <label
              key={cls._id}
              className={`checkbox-card ${
                form.classIds.includes(String(cls._id)) ? "active" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={form.classIds.includes(String(cls._id))}
                onChange={(e) =>
                  handleCheckbox(cls._id, e.target.checked)
                }
              />
              <span>{cls.className}</span>
            </label>
          ))}
        </div>

        <p className="selected-text">
          Selected: {form.classIds.length} classes
        </p>

        {/* SUBJECT INPUT */}
        <input
          name="subjectName"
          value={form.subjectName}
          onChange={handleChange}
          placeholder="Subject Name"
          className="input"
        />

        {/* RADIO */}
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
            {form.subjectName ? "Update" : "Add"}
          </button>

          {form.subjectName && (
            <button
              type="button"
              className="btn secondary"
              onClick={() => setForm(emptyForm)}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      {groupedSubjects.map((cls) => (
        <div key={cls._id} className="cws-card">
          <div className="card-header">
            <h2>{cls.className}</h2>

            {cls.docId && (
              <button
                className="btn danger"
                onClick={() => deleteClass(cls.docId)}
              >
                Delete Class
              </button>
            )}
          </div>

          <ul className="subject-list">
            {cls.subjects.map((sub, index) => (
              <li key={index} className="subject-item">
                <span>
                  {typeof sub === "string" ? sub : sub.name}
                  {typeof sub !== "string" && sub.type === "optional" && (
                    <span className="optional-tag">(Optional)</span>
                  )}
                </span>

                <div>
                  <button
                    className="btn warning"
                    onClick={() => editSubject(cls.classId, sub)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn danger"
                    onClick={() =>
                      deleteSubject(
                        cls.classId,
                        typeof sub === "string" ? sub : sub.name
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ClassWiseSubjectAdmin;
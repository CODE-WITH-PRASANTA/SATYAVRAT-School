import React, { useState, useEffect } from "react";
import API, { IMAGE_URL } from "../../api/axios";
import "./SubjectAdmin.css";

export default function SubjectAdmin() {
  const emptyForm = {
    subjectName: "",
    className: "",
    teacher: "",
    description: "",
    image: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [subjects, setSubjects] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // 🔁 FETCH FROM BACKEND
  const fetchSubjects = async () => {
    try {
      const res = await API.get("/subjects");
      setSubjects(res.data.data || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // 🧾 INPUT HANDLER
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🖼 IMAGE HANDLER
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // preview
      setForm({
        ...form,
        image: URL.createObjectURL(file),
      });
    }
  };

  // 🚀 SUBMIT (POST / PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("subjectName", form.subjectName);
      formData.append("className", form.className);
      formData.append("teacher", form.teacher);
      formData.append("description", form.description);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (editId) {
        await API.put(`/subjects/${editId}`, formData);
      } else {
        await API.post("/subjects", formData);
      }

      fetchSubjects();
      setForm(emptyForm);
      setImageFile(null);
      setEditId(null);
    } catch (err) {
      console.error("SUBMIT ERROR:", err);
    }
  };

  // ❌ DELETE
  const deleteSubject = async (id) => {
    try {
      await API.delete(`/subjects/${id}`);
      fetchSubjects();
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  // ✏️ EDIT
  const editSubject = (subject) => {
    setForm({
      ...subject,
      image: subject.image ? IMAGE_URL + subject.image : "",
    });

    setEditId(subject._id);
    setImageFile(null);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🔍 SEARCH
  const filteredSubjects = subjects.filter((s) =>
    s.subjectName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="subject-container">
      <h1 className="page-title">Subject Admin Panel</h1>

      <div className="subject-grid">
        {/* FORM */}
        <form onSubmit={handleSubmit} className="card form">
          <h2>{editId ? "Edit Subject" : "Add Subject"}</h2>

          <div className="form-group">
            <label>Subject Name</label>
            <input
              name="subjectName"
              value={form.subjectName}
              onChange={handleChange}
              placeholder="Mathematics"
              required
            />
          </div>

          <div className="form-group">
            <label>Class</label>
            <select
              name="className"
              value={form.className}
              onChange={handleChange}
              required
            >
              <option value="">Select Class</option>
              <option>Nursery</option>
              <option>LKG</option>
              <option>UKG</option>
              <option>Class 1</option>
              <option>Class 2</option>
            </select>
          </div>

          <div className="form-group">
            <label>Teacher</label>
            <input
              name="teacher"
              value={form.teacher}
              onChange={handleChange}
              placeholder="Teacher Name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Image</label>
            <input type="file" onChange={handleImage} />
          </div>

          <button className="btn primary">
            {editId ? "Update Subject" : "Post Subject"}
          </button>
        </form>

        {/* PREVIEW */}
        <div className="card preview">
          <h2>Live Preview</h2>

          <div className="preview-card">
            {form.image && <img src={form.image} alt="preview" />}

            <div className="preview-content">
              <h3>{form.subjectName || "Subject Name"}</h3>
              <p>Class: {form.className || "Class"}</p>
              <p>Teacher: {form.teacher || "Teacher"}</p>
              <p>{form.description || "Description"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card table-section">
        <div className="table-header">
          <h2>Subject List</h2>
          <input
            placeholder="Search subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Teacher</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredSubjects.map((s) => (
                <tr key={s._id}>
                  <td>
                    {s.image && (
                      <img
                        src={IMAGE_URL + s.image}
                        className="table-img"
                      />
                    )}
                  </td>

                  <td>{s.subjectName}</td>
                  <td>{s.className}</td>
                  <td>{s.teacher}</td>

                  <td>
                    <button
                      className="btn warning"
                      onClick={() => editSubject(s)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn danger"
                      onClick={() => deleteSubject(s._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredSubjects.length === 0 && (
                <tr>
                  <td colSpan="5" className="no-data">
                    No subjects found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
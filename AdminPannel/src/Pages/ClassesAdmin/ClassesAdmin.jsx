import React, { useState, useEffect } from "react";
import API from "../../api/axios"; // make sure this file exists
import "./ClassesAdmin.css";

export default function ClassesAdmin() {
  const emptyForm = {
    className: "",
    sectionName: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  // 🔁 FETCH CLASSES FROM BACKEND
  const fetchClasses = async () => {
    try {
      const res = await API.get("/classes");
      setClasses(res.data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // 🧾 HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value || "",
    });
  };

  // 🚀 SUBMIT (POST / PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // UPDATE
        await API.put(`/classes/${editId}`, form);
      } else {
        // CREATE
        await API.post("/classes", form);
      }

      fetchClasses(); // refresh list
      setForm(emptyForm);
      setEditId(null);
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  // ❌ DELETE
  const deleteClass = async (id) => {
    try {
      await API.delete(`/classes/${id}`);
      fetchClasses();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // ✏️ EDIT
  const editClass = (c) => {
    setForm({
      className: c.className || "",
      sectionName: c.sectionName || "",
    });
    setEditId(c._id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🔍 SEARCH FILTER
  const filteredClasses = classes.filter((c) =>
    (c.className || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="classes-container">
      <h1 className="page-title">Classes Admin Panel</h1>

      {/* FORM */}
      <div className="card">
        <form onSubmit={handleSubmit} className="form">
          <h2 className="form-title">
            {editId ? "Edit Class" : "Add Class"}
          </h2>

          <div className="form-grid">
            <div className="form-group">
              <label>Class Name</label>
              <input
                name="className"
                value={form.className}
                onChange={handleChange}
                placeholder="Example: Class 1"
                required
              />
            </div>

            <div className="form-group">
              <label>Section Name</label>
              <input
                name="sectionName"
                value={form.sectionName}
                onChange={handleChange}
                placeholder="Example: A"
                required
              />
            </div>
          </div>

          <button className="btn primary">
            {editId ? "Update Class" : "Post Class"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="card">
        <div className="table-header">
          <h2>Class List</h2>

          <input
            placeholder="Search class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Section</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredClasses.map((c) => (
                <tr key={c._id}>
                  <td>{c.className}</td>
                  <td>{c.sectionName}</td>

                  <td>
                    <div className="actions">
                      <button
                        onClick={() => editClass(c)}
                        className="btn warning"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteClass(c._id)}
                        className="btn danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredClasses.length === 0 && (
                <tr>
                  <td colSpan="3" className="no-data">
                    No classes found
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
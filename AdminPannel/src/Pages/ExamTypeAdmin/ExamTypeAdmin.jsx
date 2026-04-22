import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import "./ExamTypeAdmin.css";

export default function ExamTypeAdmin() {
  const [examTypes, setExamTypes] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchExamTypes();
  }, []);

  const fetchExamTypes = async () => {
    const res = await API.get("/exam-types");
    setExamTypes(res.data.data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    await API.post("/exam-types", { name });
    setName("");
    fetchExamTypes();
  };

  const togglePublish = async (id) => {
    await API.put(`/exam-types/toggle/${id}`);
    fetchExamTypes();
  };

  const deleteExam = async (id) => {
    if (!window.confirm("Delete exam?")) return;

    await API.delete(`/exam-types/${id}`);
    fetchExamTypes();
  };

  return (
    <div className="examType-container">
      <h1 className="examType-title">Exam Type Management</h1>

      {/* FORM */}
      <form className="examType-form" onSubmit={handleSubmit}>
        <input
          className="examType-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Exam Name"
        />
        <button className="examType-btn">Add</button>
      </form>

      {/* LIST */}
      <div className="examType-list">
        {examTypes.map((exam) => (
          <div key={exam._id} className="examType-card">
            <span className="examType-name">{exam.name}</span>

            <div className="examType-actions">
              <button
                onClick={() => togglePublish(exam._id)}
                className={
                  exam.isPublished
                    ? "status-btn published"
                    : "status-btn unpublished"
                }
              >
                {exam.isPublished ? "Published" : "Unpublished"}
              </button>

              <button
                onClick={() => deleteExam(exam._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
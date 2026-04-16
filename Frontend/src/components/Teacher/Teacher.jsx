import React, { useState, useEffect } from "react";
import "./Teacher.css";
import API, { IMAGE_URL } from "../../Api/axios";

const Teacher = () => {
  const [teachersData, setTeachersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  /* ================= FETCH FROM BACKEND ================= */
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await API.get("/teachers");
        setTeachersData(res.data.data || []);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  /* ================= RESPONSIVE ================= */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) setCardsPerPage(1);
      else if (window.innerWidth < 992) setCardsPerPage(2);
      else setCardsPerPage(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(teachersData.length / cardsPerPage);

  const startIndex = currentPage * cardsPerPage;
  const selectedTeachers = teachersData.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  return (
    <section className="teacher">
      <div className="teacher__container">
        <h2 className="teacher__title">Our Teachers</h2>

        <div className="teacher__grid">
          {selectedTeachers.map((teacher) => (
            <div key={teacher._id} className="teacher__card">
              <div className="teacher__image">
                <img
                  src={IMAGE_URL + teacher.image}
                  alt={teacher.name}
                />
              </div>

              <h3 className="teacher__name">{teacher.name}</h3>
              <p className="teacher__role">{teacher.role}</p>
              <p className="teacher__desc">{teacher.description}</p>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="teacher__pagination">
          <button
            className="nav-btn"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ← Prev
          </button>

          <button
            className="nav-btn"
            disabled={currentPage === totalPages - 1}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Teacher;
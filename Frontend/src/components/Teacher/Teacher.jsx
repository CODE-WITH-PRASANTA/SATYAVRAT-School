import React, { useState, useEffect } from "react";
import "./Teacher.css";

const teachersData = [
  {
    id: 1,
    name: "Steven Smith",
    role: "Spanish Teacher",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    desc: "The ship set ground on the shore of this uncharted desert isle with that this group would form a family.",
  },
  {
    id: 2,
    name: "David Warner",
    role: "Drawing Teacher",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    desc: "The ship set ground on the shore of this uncharted desert isle with that this group would form a family.",
  },
  {
    id: 3,
    name: "Steve Alia",
    role: "Language Teacher",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    desc: "The ship set ground on the shore of this uncharted desert isle with that this group would form a family.",
  },
  {
    id: 4,
    name: "Kevin Peterson",
    role: "Science Teacher",
    img: "https://randomuser.me/api/portraits/men/52.jpg",
    desc: "The ship set ground on the shore of this uncharted desert isle with that this group would form a family.",
  },
  {
    id: 5,
    name: "Kristen Stewart",
    role: "Math Teacher",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    desc: "The ship set ground on the shore of this uncharted desert isle with that this group would form a family.",
  },
  {
    id: 6,
    name: "Ben Anderson",
    role: "Games Teacher",
    img: "https://randomuser.me/api/portraits/men/60.jpg",
    desc: "The ship set ground on the shore of this uncharted desert isle with that this group would form a family.",
  },
];

const Teacher = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setCardsPerPage(1); // mobile
      } else if (window.innerWidth < 992) {
        setCardsPerPage(2); // tablet
      } else {
        setCardsPerPage(3); // laptop
      }
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
            <div key={teacher.id} className="teacher__card">
              <div className="teacher__image">
                <img src={teacher.img} alt={teacher.name} />
              </div>

              <h3 className="teacher__name">{teacher.name}</h3>
              <p className="teacher__role">{teacher.role}</p>
              <p className="teacher__desc">{teacher.desc}</p>
            </div>
          ))}
        </div>

        {/* SIMPLE PAGINATION */}
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
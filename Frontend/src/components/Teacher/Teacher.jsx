import React, { useState, useEffect } from "react";
import "./Teacher.css";
import API, { IMAGE_URL } from "../../api/axios";

import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
  FaPhoneAlt,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const Teacher = () => {
  const [teachersData, setTeachersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await API.get("/teachers");

        const activeTeachers = (res.data.data || []).filter(
          (teacher) => teacher.status === "Active"
        );

        setTeachersData(activeTeachers);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  /* ================= RESPONSIVE ================= */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 992) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(
    teachersData.length / cardsPerPage
  );

  const startIndex = currentPage * cardsPerPage;

  const selectedTeachers = teachersData.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  return (
    <section className="teacher">
      <div className="teacher__container">
        {/* TOP */}
        <div className="teacher__top">
          <span className="teacher__label">
            Our Expert Faculty
          </span>

          <h2 className="teacher__title">
            Meet Our Professional Teachers
          </h2>

          <p className="teacher__subtitle">
            Our experienced teachers nurture creativity,
            confidence and discipline with modern teaching
            methods and personal care.
          </p>
        </div>

        {/* GRID */}
        <div className="teacher__grid">
          {selectedTeachers.length === 0 ? (
            <div className="teacher__empty">
              No teacher data found
            </div>
          ) : (
            selectedTeachers.map((teacher) => (
              <div
                key={teacher._id}
                className="teacher__card"
              >
                {/* IMAGE */}
                <div className="teacher__imageWrap">
                  <img
                    src={
                      teacher.image
                        ? `${IMAGE_URL}${teacher.image}`
                        : "https://via.placeholder.com/400x500"
                    }
                    alt={teacher.name}
                    className="teacher__image"
                  />

                  <div className="teacher__status">
                    <span></span>
                    {teacher.status}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="teacher__content">
                  <span className="teacher__tag">
                    Teacher
                  </span>

                  <h3 className="teacher__name">
                    {teacher.name}
                  </h3>

                  <h4 className="teacher__role">
                    {teacher.role}
                  </h4>

                  <p className="teacher__desc">
                    {teacher.description}
                  </p>

                  <div className="teacher__line"></div>

                  {/* PHONE */}
                  {teacher.phone && (
                    <a
                      href={`tel:${teacher.phone}`}
                      className="teacher__phone"
                    >
                      <FaPhoneAlt />

                      <span>{teacher.phone}</span>
                    </a>
                  )}

                  {/* SOCIALS */}
                  <div className="teacher__socials">
                    <a
                      href={
                        teacher.facebook ||
                        "https://facebook.com"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaFacebookF />
                    </a>

                    <a
                      href={
                        teacher.instagram ||
                        "https://instagram.com"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaInstagram />
                    </a>

                    <a
                      href={`mailto:${
                        teacher.email ||
                        "info@example.com"
                      }`}
                    >
                      <FaEnvelope />
                    </a>

                    <a
                      href={`https://wa.me/${
                        teacher.phone?.replace(
                          /\D/g,
                          ""
                        ) || ""
                      }`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        {teachersData.length > cardsPerPage && (
          <div className="teacher__pagination">
            <button
              className="teacher__navBtn"
              disabled={currentPage === 0}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
            >
              <FaArrowLeft />
            </button>

            <div className="teacher__pageInfo">
              {currentPage + 1} / {totalPages}
            </div>

            <button
              className="teacher__navBtn"
              disabled={
                currentPage === totalPages - 1
              }
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Teacher;
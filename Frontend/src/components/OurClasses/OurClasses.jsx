import React, { useEffect, useState } from "react";
import "./OurClasses.css";
import API, { IMAGE_URL } from "../../Api/axios";

const OurClasses = () => {
  /* =========================
     STATES
  ========================= */

  const [classesData, setClassesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  /* =========================
     RESPONSIVE CARD COUNT
  ========================= */

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth <= 768) {
        setCardsPerPage(1);
      } else if (window.innerWidth <= 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }

      setCurrentPage(1);
    };

    updateCardsPerPage();

    window.addEventListener("resize", updateCardsPerPage);

    return () => {
      window.removeEventListener("resize", updateCardsPerPage);
    };
  }, []);

  /* =========================
     FETCH CLASSES
  ========================= */

  const fetchClasses = async () => {
    try {
      setLoading(true);

      const res = await API.get("/class-post");

      console.log("CLASS API:", res.data);

      if (res.data.success) {
        setClassesData(res.data.data || []);
      }
    } catch (error) {
      console.log("FETCH CLASSES ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  /* =========================
     PAGINATION LOGIC
  ========================= */

  const totalPages = Math.ceil(classesData.length / cardsPerPage);

  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;

  const currentCards = classesData.slice(firstIndex, lastIndex);

  return (
    <section className="ourClasses">
      <div className="ourClasses__container">
        {/* HEADER */}

        <div className="ourClasses__header">
          <h2 className="ourClasses__title">
            OUR CLASSES
            <span className="ourClasses__sun"></span>
          </h2>

          <h3 className="ourClasses__subtitle">Our Weekly Classes</h3>

          <p className="ourClasses__text">
            We are group of teachers who really love childrens and enjoy every
            moment of teaching
          </p>
        </div>

        {/* LOADING */}

        {loading && (
          <div className="ourClassesLoading">Loading Classes...</div>
        )}

        {/* GRID */}

        {!loading && (
          <>
            <div className="ourClasses__grid">
              {currentCards.map((item) => (
                <div className="ourClassesCard" key={item._id}>
                  {/* IMAGE */}

                  <div className="ourClassesCard__imageWrap">
                    <img
                      src={`${IMAGE_URL}${item.uploadImage}`}
                      alt={item.classTitle}
                      className="ourClassesCard__image"
                    />

                    <span className="ourClassesCard__tag">
                      {item.category}
                    </span>
                  </div>

                  {/* BODY */}

                  <div className="ourClassesCard__body">
                    <p className="ourClassesCard__date">
                      {item.yearStart} - {item.yearEnd}
                    </p>

                    <h4 className="ourClassesCard__title">
                      {item.classTitle}
                    </h4>

                    <p className="ourClassesCard__desc">
                      {item.classDescription}
                    </p>

                    <a
                      href="tel:+919753317591"
                      className="ourClassesCard__button"
                    >
                      APPLY NOW
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* NO DATA */}

            {classesData.length === 0 && (
              <div className="ourClassesNoData">No Classes Available</div>
            )}

            {/* PAGINATION */}

            {totalPages > 1 && (
              <div className="ourClassesPagination">
                <button
                  className="ourClassesPageBtn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`ourClassesPageBtn ${
                      currentPage === index + 1 ? "ourClassesActivePage" : ""
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className="ourClassesPageBtn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default OurClasses;
import React from "react";
import "./VissionMission.css";

// IMPORT IMAGES
import mainImg from "../../assets/SatyaSchool.webp";
import shapeBorder from "../../assets/border-shape.png";
import iconMission from "../../assets/Mission-icon.svg";
import iconVision from "../../assets/Vision-icon.svg";

const VissionMission = () => {
  return (
    <section className="aboutSection">
      <div className="aboutSection__container">
        {/* ================= LEFT IMAGE ================= */}
        <div className="aboutSection__left">
          <div className="aboutSection__imageWrapper">
            {/* backdrop panel + ring, gives depth behind the full uncropped photo */}
            <span className="aboutSection__backdrop" aria-hidden="true" />
            <span className="aboutSection__ring" aria-hidden="true" />
            <span className="aboutSection__dots" aria-hidden="true" />

            <img
              src={shapeBorder}
              alt=""
              aria-hidden="true"
              className="aboutSection__shape"
            />

            <div className="aboutSection__frame">
              <img
                src={mainImg}
                alt="SATYAVRAT VIDYA NIKETAN HIGH SCHOOL"
                className="aboutSection__mainImg"
              />
            </div>

            {/* ornamental corner ticks */}
            <span className="aboutSection__corner aboutSection__corner--tl" aria-hidden="true" />
            <span className="aboutSection__corner aboutSection__corner--br" aria-hidden="true" />
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="aboutSection__right">
          <span className="aboutSection__tag">
            <span className="aboutSection__tagLine" aria-hidden="true" />
            Vision &amp; Mission
          </span>

          <h2 className="aboutSection__title">
            Welcome To
            <span>Satyavrat Vidya Niketan High School</span>
          </h2>

          <p className="aboutSection__desc">
            SATYAVRAT VIDYA NIKETAN HIGH SCHOOL is dedicated to
            providing quality education in a safe, disciplined,
            and motivating environment. Our school believes in
            developing knowledge, confidence, values, creativity,
            and leadership qualities in every student. We focus
            on both academic excellence and overall personality
            development to help students build a successful future.
          </p>

          {/* ================= CARDS ================= */}
          <div className="aboutSection__cards">
            {/* MISSION */}
            <div className="aboutSection__card">
              <div className="aboutSection__cardIcon">
                <img src={iconMission} alt="" aria-hidden="true" />
              </div>

              <div className="aboutSection__cardBody">
                <h4>Our Mission</h4>
                <p>
                  To provide students with quality education,
                  strong moral values, discipline, and practical
                  learning that prepares them for future success
                  and responsible citizenship.
                </p>
              </div>
            </div>

            {/* VISION */}
            <div className="aboutSection__card">
              <div className="aboutSection__cardIcon">
                <img src={iconVision} alt="" aria-hidden="true" />
              </div>

              <div className="aboutSection__cardBody">
                <h4>Our Vision</h4>
                <p>
                  To create a positive learning environment where
                  students grow with confidence, knowledge,
                  creativity, and leadership skills to achieve
                  excellence in every stage of life.
                </p>
              </div>
            </div>
          </div>

          <span className="aboutSection__divider" aria-hidden="true" />

          {/* ================= BOTTOM SECTION ================= */}
          <div className="aboutSection__bottom">
            {/* PRINCIPAL */}
            <div className="aboutSection__principalDetails">
              <h3>Mr. Moorat Kuswahaa</h3>
              <h4>Principal &amp; Academic Head</h4>
            </div>

            {/* CALL */}
            <a href="tel:+919753317591" className="aboutSection__call">
              <span className="aboutSection__callIcon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path
                    d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="aboutSection__callText">
                <span>Call Us Now</span>
                <h5>+91 97533 17591</h5>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VissionMission;
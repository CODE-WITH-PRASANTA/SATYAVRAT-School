import React from "react";
import "./VissionMission.css";

// IMPORT IMAGES
import mainImg from "../../assets/img7.jpeg";
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

            <img
              src={mainImg}
              alt="SATYAVRAT VIDYA NIKETAN HIGH SCHOOL"
              className="aboutSection__mainImg"
            />


          </div>

        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="aboutSection__right">

          <span className="aboutSection__tag">
            Vision & Mission
          </span>

          <h2 className="aboutSection__title">
            Welcome To <br />
            <span>SATYAVRAT VIDYA NIKETAN HIGH SCHOOL</span>
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
            <div className="aboutSection__card aboutSection__card--mission">

              <img
                src={iconMission}
                alt="Our Mission"
              />

              <div>

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
            <div className="aboutSection__card aboutSection__card--vision">

              <img
                src={iconVision}
                alt="Our Vision"
              />

              <div>

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

          {/* ================= BOTTOM SECTION ================= */}
          <div className="aboutSection__bottom">

            {/* DIRECTOR */}
            <div className="aboutSection__director">

              <div>
                <h3>Moorat Kuswahaa</h3>
                <h4>Director</h4>
              </div>

            </div>

            {/* CALL */}
            <div className="aboutSection__call">

              <div>
                <span>Call Us Now</span>
                <h5>+91 9753317591</h5>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default VissionMission;
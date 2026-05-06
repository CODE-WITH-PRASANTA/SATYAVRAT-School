import React from "react";
import "./KindergartenSection.css";
import kidImg from "../../assets/welcome-2.png";

import {
  FaBookOpen,
  FaHeart,
  FaChalkboardTeacher,
  FaGraduationCap,
} from "react-icons/fa";

const KindergartenSection = () => {
  return (
    <section
      className="kindergartenSection"
      aria-label="Kindergarten Program - Satyavrat Vidya Niketan High School"
    >
      <div className="kindergartenSection__container">

        {/* HEADER */}
        <div className="kindergartenSection__header">
          <h2>Welcome to Our Kindergarten</h2>

          <p className="kindergartenSection__subtitle">
            Satyavrat Vidya Niketan High School
          </p>

          <p className="kindergartenSection__description">
            Our kindergarten program is designed to give young learners a happy and safe start to their education. 
            We focus on basic learning, good habits, and building confidence in every child through simple and engaging activities.
          </p>
        </div>

        {/* CONTENT */}
        <div className="kindergartenSection__content">

          {/* LEFT SIDE */}
          <div className="kindergartenSection__side left">

            <div className="kindergartenSection__item">
              <div className="text">
                <h4>Joyful Learning Environment</h4>
                <p>
                  Children learn best when they are happy. We create a friendly space where kids enjoy learning through play, stories, and activities.
                </p>
              </div>

              <div className="kindergartenSection__iconWrapper blue">
                <div className="kindergartenSection__iconInner">
                  <FaBookOpen />
                </div>
              </div>
            </div>

            <div className="kindergartenSection__item">
              <div className="text">
                <h4>Caring and Supportive Atmosphere</h4>
                <p>
                  Our teachers treat every child with care and attention, helping them feel safe, valued, and confident in school.
                </p>
              </div>

              <div className="kindergartenSection__iconWrapper pink">
                <div className="kindergartenSection__iconInner">
                  <FaHeart />
                </div>
              </div>
            </div>

          </div>

          {/* CENTER IMAGE */}
          <div className="kindergartenSection__center">
            <img
              src={kidImg}
              alt="Kindergarten students learning at Satyavrat Vidya Niketan High School"
              loading="lazy"
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="kindergartenSection__side right">

            <div className="kindergartenSection__item">
              <div className="kindergartenSection__iconWrapper orange">
                <div className="kindergartenSection__iconInner">
                  <FaChalkboardTeacher />
                </div>
              </div>

              <div className="text">
                <h4>Experienced Teaching Staff</h4>
                <p>
                  Our trained teachers guide children with simple methods that make learning easy, interesting, and effective.
                </p>
              </div>
            </div>

            <div className="kindergartenSection__item">
              <div className="kindergartenSection__iconWrapper green">
                <div className="kindergartenSection__iconInner">
                  <FaGraduationCap />
                </div>
              </div>

              <div className="text">
                <h4>Strong Learning Foundation</h4>
                <p>
                  We help children build basic skills in reading, writing, and communication to prepare them for future classes.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default KindergartenSection;
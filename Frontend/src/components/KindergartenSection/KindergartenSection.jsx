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
    <section className="kindergartenSection">
      <div className="kindergartenSection__container">

        {/* HEADER */}
        <div className="kindergartenSection__header">
          <h2>WELCOME TO KINDERGARTEN</h2>
          <p className="kindergartenSection__subtitle">
            About Our Play School
          </p>
          <p className="kindergartenSection__description">
            We're a childcare centre with an engaging curriculum backed by
            qualified, experienced teachers.
          </p>
        </div>

        {/* CONTENT */}
        <div className="kindergartenSection__content">

          {/* LEFT SIDE */}
          <div className="kindergartenSection__side left">

            <div className="kindergartenSection__item">
              <div className="text">
                <h4>Funny and Happy</h4>
                <p>
                  We are group of teachers who really love children and enjoy
                  every moment.
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
                <h4>Fulfill With Love</h4>
                <p>
                  We are group of teachers who really love children and enjoy
                  every moment.
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
            <img src={kidImg} alt="kid" />
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
                <h4>Professional Teaching</h4>
                <p>
                  We are group of teachers who really love children and enjoy
                  every moment.
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
                <h4>Fully Equipped</h4>
                <p>
                  We are group of teachers who really love children and enjoy
                  every moment.
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
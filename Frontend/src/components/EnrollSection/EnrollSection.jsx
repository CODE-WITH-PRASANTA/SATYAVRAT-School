import React from "react";
import "./EnrollSection.css";

import boy from "../../assets/boy.webp";
import bg1 from "../../assets/bg1.webp";

const EnrollSection = () => {
  return (
    <section className="enrollSection">
      <div className="enrollSection__hero">
        <img src={bg1} alt="bg" className="enrollSection__bg" />

        <div className="enrollSection__content">
          <div className="enrollSection__container">
            <div className="enrollSection__left">
              <img src={boy} alt="boy" className="enrollSection__boy" />
            </div>

            <div className="enrollSection__right">
              <h3 className="enrollSection__subtitle">Get Enroll,</h3>

              <h2 className="enrollSection__title">
                HOW TO ENROLL YOUR CHILD
                <br />
                TO A CLASS?
              </h2>

              <p className="enrollSection__desc">
                We are group of teachers who really love childrens and eaching
                and playing with our students.enjoy every and playing with our
                students.
              </p>

              <button className="enrollSection__btn">CONTACT NOW</button>
            </div>
          </div>
        </div>
      </div>

      <div className="enrollSection__searchWrap">
        <div className="enrollSection__searchBox">
          <div className="enrollSection__field enrollSection__field--select">
            <select className="enrollSection__select">
              <option>ALL CATEGORIES</option>
              <option>PRIMARY</option>
              <option>GAMES</option>
              <option>STORIES</option>
            </select>
          </div>

          <div className="enrollSection__field">
            <input
              type="text"
              placeholder="COURSE KEYWORD"
              className="enrollSection__input"
            />
          </div>

          <div className="enrollSection__field enrollSection__field--button">
            <button className="enrollSection__searchBtn">SEARCH COURSE</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnrollSection;
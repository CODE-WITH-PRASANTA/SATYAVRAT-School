import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import "./EnrollSection.css";

import topImage from "../../assets/image-2.jpg";
import bottomImage from "../../assets/image-1.jpg";

const featureItems = [
  "Assign practice exercises",
  "Videos and articles",
  "Track student progress",
  "Join millions of students",
];

const EnrollSection = () => {
  return (
    <section className="enrollSection">
      <div className="enrollSection__container">
        <div className="enrollSection__left" aria-hidden="true">
          <div className="enrollSection__photo enrollSection__photo--top">
            <img src={topImage} alt="" />
          </div>
          <div className="enrollSection__photo enrollSection__photo--bottom">
            <img src={bottomImage} alt="" />
          </div>
        </div>

        <div className="enrollSection__right">
          <h2 className="enrollSection__title">Apply For Admission</h2>

          <div className="enrollSection__featureGrid">
            {featureItems.map((item) => (
              <div className="enrollSection__feature" key={item}>
                <FaCheckCircle className="enrollSection__featureIcon" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <form className="enrollSection__form" onSubmit={(event) => event.preventDefault()}>
            <div className="enrollSection__fields">
              <label className="enrollSection__field">
                <span className="enrollSection__label">
                  Child&apos;s Name <em>(Required)</em>
                </span>
                <input type="text" />
              </label>

              <label className="enrollSection__field">
                <span className="enrollSection__label">
                  Child&apos;s DOB <em>(Required)</em>
                </span>
                <span className="enrollSection__inputWrap">
                  <input type="text" placeholder="dd-mm-yyyy" />
                  <FiCalendar className="enrollSection__calendarIcon" />
                </span>
              </label>

              <label className="enrollSection__field">
                <span className="enrollSection__label">
                  Parent&apos;s Name <em>(Required)</em>
                </span>
                <input type="text" />
              </label>

              <label className="enrollSection__field">
                <span className="enrollSection__label">
                  Parent&apos;s Designation <em>(Required)</em>
                </span>
                <input type="text" />
              </label>

              <label className="enrollSection__field">
                <span className="enrollSection__label">
                  Email <em>(Required)</em>
                </span>
                <input type="email" />
              </label>

              <label className="enrollSection__field">
                <span className="enrollSection__label">Phone No</span>
                <input type="tel" />
              </label>
            </div>

            <div className="enrollSection__formFooter">
              <label className="enrollSection__checkbox">
                <input type="checkbox" />
                <span>Notify Your child weekly progress</span>
              </label>

              <button className="enrollSection__button" type="submit">
                Apply Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EnrollSection;

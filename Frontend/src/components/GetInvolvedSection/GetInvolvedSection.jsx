import React from "react";
import "./GetInvolvedSection.css";

const GetInvolvedSection = () => {
  return (
    <section className="getInvolvedSection">
      <div className="getInvolvedSection__overlay">
        <div className="getInvolvedSection__container">

          {/* LEFT TEXT */}
          <div className="getInvolvedSection__content">
            <h2>GET INVOLVED!</h2>
            <p>
              Nothing is more important than your child's well-being. Join our
              seminars and training and learn how to keep it.
            </p>
          </div>

          {/* BUTTON */}
          <div className="getInvolvedSection__btnWrap">
            <button className="getInvolvedSection__btn">
              JOIN NOW
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;
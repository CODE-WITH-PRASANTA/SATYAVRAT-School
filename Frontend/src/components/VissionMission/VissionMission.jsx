import React from "react";
import "./VissionMission.css";

// IMPORT IMAGES (use your provided images here)
import mainImg from "../../assets/Home-About.webp";
import shapeBorder from "../../assets/border-shape.png"
import iconMission from "../../assets/Mission-icon.svg";
import iconVision from "../../assets/Vision-icon.svg";

const VissionMission = () => {
  return (
    <section className="aboutSection">
      <div className="aboutSection__container">

        {/* LEFT SIDE IMAGE */}
        <div className="aboutSection__left">
          <div className="aboutSection__imageWrapper">
            <img
              src={mainImg}
              alt="about"
              className="aboutSection__mainImg"
            />
            <img
              src={shapeBorder}
              alt="shape"
              className="aboutSection__shape"
            />
          </div>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="aboutSection__right">

          <span className="aboutSection__tag">About Us</span>

          <h2 className="aboutSection__title">
            Welcome To Learning Step <br />
            <span>International School</span>
          </h2>

          <p className="aboutSection__desc">
            Founded in 2019, Learning Step International School provides a
            nurturing and inclusive environment where students grow with
            confidence, creativity, and strong values. We focus on academic
            excellence along with moral, social, and personal development.
          </p>

          {/* CARDS */}
          <div className="aboutSection__cards">

            <div className="aboutSection__card aboutSection__card--mission">
              <img src={iconMission} alt="mission" />
              <div>
                <h4>Our Mission</h4>
                <p>
                  To inspire lifelong learners through quality education,
                  creativity, and global awareness.
                </p>
              </div>
            </div>

            <div className="aboutSection__card aboutSection__card--vision">
              <img src={iconVision} alt="vision" />
              <div>
                <h4>Our Vision</h4>
                <p>
                  To empower students with knowledge, values, and skills for a
                  successful future.
                </p>
              </div>
            </div>

          </div>

          {/* BOTTOM SECTION */}
          <div className="aboutSection__bottom">

            <div className="aboutSection__director">
            
              <div>
                <h5>Mr. Vishnu Sharma</h5>
                <span>Founder & Managing Director</span>
              </div>
            </div>

            <div className="aboutSection__call">
            
              <div>
                <span>Call Us Now</span>
                <h5>+91 7014627894</h5>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default VissionMission;
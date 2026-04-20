import React from "react";
import "./BlogBDcrum.css";

// IMPORT YOUR IMAGE
import bgImg from "../../assets/BlogBDImg.webp";

const BlogBDcrum = () => {
  return (
    <section className="blog-bdcrum">

      {/* BACKGROUND */}
      <div
        className="bd-bg"
        style={{ backgroundImage: `url(${bgImg})` }}
      ></div>

      {/* GRADIENT OVERLAY */}
      <div className="bd-overlay"></div>

      {/* CONTENT */}
      <div className="bd-content">
        <h1>BLOG DETAILS</h1>

        <div className="breadcrumb">
          <span>HOME</span>
          <span className="slash">/</span>
          <span>BLOG</span>
          <span className="slash">/</span>
          <span className="active">BLOG DETAILS</span>
        </div>
      </div>

      {/* BOTTOM WAVE SVG */}
      <div className="bd-wave">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,50 C250,120 450,0 720,50 C1000,100 1200,0 1440,50 L1440,120 L0,120 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
};

export default BlogBDcrum;
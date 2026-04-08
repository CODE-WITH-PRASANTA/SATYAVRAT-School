import React, { useEffect, useState } from "react";
import "./HeroSection.css";

import slide1 from "../../assets/image-1.jpg";
import slide2 from "../../assets/image-2.jpg";
import hand from "../../assets/content-image-1.png"

const HeroSection = () => {
  const slides = [
    {
      image: slide1,
      titleTop: "Welcome To Our Driving School",
      heading: "YOUR CHILDRENS ARE SAFE WITH US",
      sub: "See Our Kindergarten Special Features!",
      btn1: "LET'S GO",
      btn2: null,
    },
    {
      image: slide2,
      titleTop: "Welcome To Our Driving School",
      heading: "Play And Learn How To Explore New Things",
      sub: "Programs of Kids Tree Preschool include world-class curriculum and knowledgeable child development.",
      btn1: "LET'S GO",
      btn2: "READ MORE",
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000); // smooth timing

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="heroSection">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`heroSlide ${index === active ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="heroOverlay"></div>

          <div className="heroContent">
            <img src={hand} alt="hand" className="heroHand" />

            <p className="heroTopText">{slide.titleTop}</p>

            <h1 className="heroHeading">{slide.heading}</h1>

            <p className="heroSub">{slide.sub}</p>

            <div className="heroButtons">
              <button className="btn primary">{slide.btn1}</button>

              {slide.btn2 && (
                <button className="btn secondary">{slide.btn2}</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroSection;
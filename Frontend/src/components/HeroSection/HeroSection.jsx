import React, { useEffect, useState } from "react";
import "./HeroSection.css";

import slide1 from "../../assets/image-1.jpg";
import slide2 from "../../assets/image-2.jpg";
import hand from "../../assets/content-image-1.png";

const HeroSection = () => {
  const slides = [
    {
      image: slide1,
      titleTop: "Welcome to Satyavrat Vidya Niketan High School",
      heading: "A Safe, Caring and Inspiring Place for Every Student",
      sub: "At Satyavrat Vidya Niketan High School, we believe every child deserves quality education, strong values, and the confidence to succeed in life.",
      btn1: "Get Started",
      btn2: null,
    },
    {
      image: slide2,
      titleTop: "Learning Beyond Books",
      heading: "Building Knowledge, Skills and Bright Futures",
      sub: "We create a friendly and supportive environment where students can learn, explore new ideas, and grow into responsible individuals.",
      btn1: "Explore More",
      btn2: "Read About Us",
    },
  ];

  const [active, setActive] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Manual Controls
  const nextSlide = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActive((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section
      className="heroSection"
      aria-label="Satyavrat Vidya Niketan High School Hero Section"
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`heroSlide ${index === active ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
          role="img"
          aria-label={`Slide ${index + 1} - ${slide.heading}`}
        >
          <div className="heroOverlay"></div>

          <div className="heroContent">
            <img
              src={hand}
              alt="School learning icon"
              className="heroHand"
              loading="lazy"
            />

            <p className="heroTopText">{slide.titleTop}</p>

            <h1 className="heroHeading">{slide.heading}</h1>

            <p className="heroSub">{slide.sub}</p>

            <div className="heroButtons">
              <button className="btn primary">
                {slide.btn1}
              </button>

              {slide.btn2 && (
                <button className="btn secondary">
                  {slide.btn2}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button className="heroArrow left" onClick={prevSlide}>
        ❮
      </button>
      <button className="heroArrow right" onClick={nextSlide}>
        ❯
      </button>

      {/* Dots Indicator */}
      <div className="heroDots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === active ? "activeDot" : ""}`}
            onClick={() => setActive(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
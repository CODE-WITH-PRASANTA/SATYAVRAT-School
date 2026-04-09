import React, { useState, useEffect } from "react";
import "./TestimonialSection.css";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "KRISTEN STEWART",
    role: "Parents",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa.",
  },
  {
    id: 2,
    name: "JOHN DOE",
    role: "Parents",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 3,
    name: "EMMA WATSON",
    role: "Parents",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
];

const TestimonialSection = () => {
  const [index, setIndex] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [index]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="testimonialSection">
      <div className="testimonialSection__overlay">

        <div className="testimonialSection__container">

          {/* QUOTE */}
          <FaQuoteLeft className="testimonialSection__quoteIcon" />

          {/* TEXT */}
          <p className="testimonialSection__text">
            {testimonials[index].text}
          </p>

          {/* AVATAR SLIDER */}
          <div className="testimonialSection__avatars">

            <button
              className="testimonialSection__arrow left"
              onClick={prevSlide}
            >
              <FaChevronLeft />
            </button>

            <div className="testimonialSection__avatarList">
              {testimonials.map((item, i) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.name}
                  className={`testimonialSection__avatar ${
                    i === index ? "active" : ""
                  }`}
                />
              ))}
            </div>

            <button
              className="testimonialSection__arrow right"
              onClick={nextSlide}
            >
              <FaChevronRight />
            </button>

          </div>

          {/* NAME */}
          <h4 className="testimonialSection__name">
            {testimonials[index].name}
          </h4>
          <span className="testimonialSection__role">
            {testimonials[index].role}
          </span>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
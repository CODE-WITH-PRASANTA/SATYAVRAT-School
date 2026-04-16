import React, { useState, useEffect } from "react";
import "./TestimonialSection.css";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH DATA FROM BACKEND
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/testimonials");

        // 🔥 IMPORTANT: handle both formats
        const data = Array.isArray(res.data) ? res.data : res.data.data;

        setTestimonials(data || []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // ✅ RESET INDEX WHEN DATA LOADS
  useEffect(() => {
    if (testimonials.length > 0) {
      setIndex(0);
    }
  }, [testimonials]);

  // ✅ AUTO SLIDE
  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials]);

  const nextSlide = () => {
    if (testimonials.length === 0) return;
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    if (testimonials.length === 0) return;
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // ✅ LOADING
  if (loading) {
    return (
      <p style={{ textAlign: "center", padding: "40px" }}>
        Loading testimonials...
      </p>
    );
  }

  // ✅ EMPTY STATE
  if (!testimonials || testimonials.length === 0) {
    return (
      <p style={{ textAlign: "center", padding: "40px" }}>
        No testimonials found
      </p>
    );
  }

  // ✅ EXTRA SAFETY (NO CRASH)
  const current = testimonials[index] || {};

  return (
    <section className="testimonialSection">
      <div className="testimonialSection__overlay">
        <div className="testimonialSection__container">

          {/* QUOTE */}
          <FaQuoteLeft className="testimonialSection__quoteIcon" />

          {/* TEXT */}
          <p className="testimonialSection__text">
            {current.text || "No message available"}
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
                  key={item._id || i}
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
            {current.name || "Anonymous"}
          </h4>

          <span className="testimonialSection__role">
            {current.role || ""}
          </span>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
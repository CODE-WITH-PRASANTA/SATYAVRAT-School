import React, { useState, useEffect } from "react";
import "./TestimonialSection.css";

import {
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";

import axios from "axios";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const IMAGE_URL = "http://localhost:5000";

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/testimonials"
        );

        const data = res.data?.data || res.data || [];

        setTestimonials(data);
      } catch (error) {
        console.error(
          "Error fetching testimonials:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  /* ================= AUTO SLIDE ================= */

  useEffect(() => {
    if (!testimonials.length) return;

    const interval = setInterval(() => {
      setIndex(
        (prev) => (prev + 1) % testimonials.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials]);

  /* ================= NAVIGATION ================= */

  const nextSlide = () => {
    setIndex(
      (prev) => (prev + 1) % testimonials.length
    );
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0
        ? testimonials.length - 1
        : prev - 1
    );
  };

  /* ================= IMAGE FIX ================= */

  const getImage = (img) => {
    if (!img)
      return "https://i.pravatar.cc/150?img=12";

    if (img.startsWith("http")) return img;

    return `${IMAGE_URL}${img}`;
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <section className="testimonialMini">
        <div className="testimonialMini__loading">
          Loading Testimonials...
        </div>
      </section>
    );
  }

  /* ================= EMPTY ================= */

  if (!testimonials.length) {
    return (
      <section className="testimonialMini">
        <div className="testimonialMini__loading">
          No Testimonials Found
        </div>
      </section>
    );
  }

  const current = testimonials[index];

  return (
    <section className="testimonialMini">
      <div className="testimonialMini__container">

        {/* TOP */}
        <div className="testimonialMini__top">
          <span className="testimonialMini__badge">
            Testimonials
          </span>

          <h2 className="testimonialMini__title">
            Parents Feedback
          </h2>
        </div>

        {/* CARD */}
        <div className="testimonialMini__card">

          {/* QUOTE */}
          <div className="testimonialMini__quoteWrap">
            <FaQuoteLeft />
          </div>

          {/* REVIEW */}
          <p className="testimonialMini__review">
            {current.reviewText ||
              "No review available"}
          </p>

          {/* STARS */}
          <div className="testimonialMini__stars">
            {[...Array(current.rating || 5)].map(
              (_, i) => (
                <FaStar key={i} />
              )
            )}
          </div>

          {/* PROFILE */}
          <div className="testimonialMini__profile">
            <img
              src={getImage(current.image)}
              alt={current.parentName}
              className="testimonialMini__mainImg"
            />

            <div>
              <h3 className="testimonialMini__name">
                {current.parentName || "Anonymous"}
              </h3>

              <span className="testimonialMini__role">
                Parent Review
              </span>
            </div>
          </div>

          {/* AVATARS */}
          <div className="testimonialMini__avatars">

            <button
              className="testimonialMini__arrow"
              onClick={prevSlide}
            >
              <FaChevronLeft />
            </button>

            <div className="testimonialMini__avatarList">
              {testimonials.map((item, i) => (
                <div
                  key={item._id || i}
                  className={`testimonialMini__avatarItem ${
                    i === index
                      ? "testimonialMini__avatarItem--active"
                      : ""
                  }`}
                  onClick={() => setIndex(i)}
                >
                  <img
                    src={getImage(item.image)}
                    alt={item.parentName}
                    className="testimonialMini__avatar"
                  />
                </div>
              ))}
            </div>

            <button
              className="testimonialMini__arrow"
              onClick={nextSlide}
            >
              <FaChevronRight />
            </button>
          </div>

          {/* DOTS */}
          <div className="testimonialMini__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonialMini__dot ${
                  i === index
                    ? "testimonialMini__dot--active"
                    : ""
                }`}
                onClick={() => setIndex(i)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
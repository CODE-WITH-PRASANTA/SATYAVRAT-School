import React, { useState } from "react";
import "./FAQSection.css";
import childImg from "../../assets/Ankita.webp";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 👉 SEO-friendly FAQ data
  const faqPages = {
    1: [
      {
        question: "What facilities are available at Satyavrat Vidya Niketan High School?",
        answer:
          "Our school provides a clean and safe campus, experienced teachers, and a supportive environment where students can focus on learning and overall development.",
      },
      {
        question: "How does the school support student learning?",
        answer:
          "We follow simple and effective teaching methods that help students understand concepts clearly and build a strong academic foundation.",
      },
    ],
    2: [
      {
        question: "What is the admission process?",
        answer:
          "Parents can visit the school, meet the staff, and complete the admission form. Our team will guide you through every step.",
      },
      {
        question: "Does the school focus on overall development?",
        answer:
          "Yes, along with studies, we encourage activities that help improve confidence, discipline, and communication skills.",
      },
    ],
    3: [
      {
        question: "Are qualified teachers available?",
        answer:
          "Yes, our teachers are experienced and dedicated to helping every student learn in a simple and friendly way.",
      },
      {
        question: "Is the school environment safe for children?",
        answer:
          "Safety is our priority. We ensure a secure and positive environment where children feel comfortable and cared for.",
      },
    ],
    4: [
      {
        question: "Do students get individual attention?",
        answer:
          "We try to give proper attention to each student so they can improve at their own pace and perform better.",
      },
      {
        question: "Why choose Satyavrat Vidya Niketan High School?",
        answer:
          "Because we focus on quality education, good values, and helping every child grow into a responsible and confident individual.",
      },
    ],
  };

  const currentFAQs = faqPages[currentPage] || [];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section
      className="faq-section"
      aria-label="Frequently Asked Questions - Satyavrat Vidya Niketan High School"
    >
      <div className="faq-container container">

        {/* LEFT SIDE */}
        <div className="faq-left">
          <div className="circle big"></div>
          <div className="circle green"></div>
          <div className="circle red"></div>
          <div className="circle orange"></div>

          <img
            src={childImg}
            alt="Students of Satyavrat Vidya Niketan High School"
            className="faq-image"
            loading="lazy"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="faq-right">
          <p className="faq-subtitle">
            Frequently Asked Questions
          </p>

          <h2 className="faq-title">
            Satyavrat Vidya Niketan High School – <br />
            Common Questions from Parents and Students
          </h2>

          {/* FAQ LIST */}
          <div className="faq-list">
            {currentFAQs.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-icon">
                    {activeIndex === index ? "-" : "+"}
                  </span>
                </button>

                <div
                  className={`faq-answer-wrapper ${
                    activeIndex === index ? "open" : ""
                  }`}
                >
                  <p className="faq-answer">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="faq-pagination">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => {
                  setCurrentPage(num);
                  setActiveIndex(null);
                }}
                className={`page-btn ${
                  currentPage === num ? "active" : ""
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
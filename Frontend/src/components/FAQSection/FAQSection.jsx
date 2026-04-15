import React, { useState } from "react";
import "./FAQSection.css";
import childImg from "../../assets/Ankita.webp";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 👉 FAQ data per page
  const faqPages = {
    1: [
      {
        question: "How is Montessori different from traditional schooling?",
        answer:
          "Montessori focuses on understanding through activities instead of memorization.",
      },
      {
        question: "Does Montessori focus on development?",
        answer:
          "Yes, it supports cognitive, emotional, and social growth.",
      },
    ],
    2: [
      {
        question: "What age is best for Montessori?",
        answer: "Early childhood (2–6 years) is ideal.",
      },
      {
        question: "Is Montessori expensive?",
        answer: "It depends on the school and facilities.",
      },
    ],
    3: [
      {
        question: "Does Montessori include exams?",
        answer: "No, it focuses on practical learning.",
      },
      {
        question: "Is Montessori good for creativity?",
        answer: "Yes, it encourages creativity strongly.",
      },
    ],
    4: [
      {
        question: "Do kids get homework?",
        answer: "Usually minimal or none.",
      },
      {
        question: "Is Montessori globally accepted?",
        answer: "Yes, it is widely used worldwide.",
      },
    ],
  };

  const currentFAQs = faqPages[currentPage] || [];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container container">

        {/* LEFT SIDE */}
        <div className="faq-left">
          <div className="circle big"></div>
          <div className="circle green"></div>
          <div className="circle red"></div>
          <div className="circle orange"></div>

          <img src={childImg} alt="child" className="faq-image" />
        </div>

        {/* RIGHT SIDE */}
        <div className="faq-right">
          <p className="faq-subtitle">Frequently Asked Questions</p>

          <h2 className="faq-title">
            Bright Stars Montessori – <br />
            Common Questions About Early Learning
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
import React from "react";
import "./OurClasses.css";

import class1 from "../../assets/class1.webp";
import class2 from "../../assets/class2.webp";
import class3 from "../../assets/class3.webp";

const classesData = [
  {
    id: 1,
    image: class1,
    tag: "GAMES",
    date: "Feb 29, 2017",
    title: "ALPHABET MATCHING CLASS",
    desc: "We build up the best education nvironment for themselves at most",
  },
  {
    id: 2,
    image: class2,
    tag: "PRIMARY",
    date: "Mar 17, 2017",
    title: "LETTER MATH CLASS",
    desc: "We build up the best education nvironment for themselves at most",
  },
  {
    id: 3,
    image: class3,
    tag: "STORIES",
    date: "Apr 01, 2017",
    title: "COLOUR MATCHING CLASS",
    desc: "We build up the best education nvironment for themselves at most",
  },
];

const OurClasses = () => {
  return (
    <section className="ourClasses">
      <div className="ourClasses__container">

        {/* HEADER */}
        <div className="ourClasses__header">
          <h2 className="ourClasses__title">
            OUR CLASSES
            <span className="ourClasses__sun"></span>
          </h2>

          <h3 className="ourClasses__subtitle">Our Weekly Classes</h3>

          <p className="ourClasses__text">
            We are group of teachers who really love childrens and enjoy every
            moment of teaching
          </p>
        </div>

        {/* CARDS */}
        <div className="ourClasses__grid">
          {classesData.map((item) => (
            <div className="ourClassesCard" key={item.id}>

              <div className="ourClassesCard__imageWrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="ourClassesCard__image"
                />
                <span className="ourClassesCard__tag">{item.tag}</span>
              </div>

              <div className="ourClassesCard__body">
                <p className="ourClassesCard__date">{item.date}</p>
                <h4 className="ourClassesCard__title">{item.title}</h4>
                <p className="ourClassesCard__desc">{item.desc}</p>

                <button className="ourClassesCard__button">
                  APPLY NOW
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurClasses;
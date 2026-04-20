import React, { useState } from "react";
import "./BlogActivitesHome.css";

const BlogActivitesHome = () => {
  const [activeTab, setActiveTab] = useState("education");

  const tabData = {
    education: [
      {
        title: "LET THE LEARNING BEGIN",
        img: "https://images.unsplash.com/photo-1588072432836-e10032774350",
        desc: "We are group of teachers who really love childrens and enjoy every moment of teaching.",
      },
      {
        title: "SPECIAL COURSES PROGRAMMES",
        img: "https://images.unsplash.com/photo-1577896851231-70ef18881754",
        desc: "We are group of teachers who really love childrens and enjoy every moment of teaching.",
      },
    ],
    activities: [
      {
        title: "FUN ACTIVITIES",
        img: "https://images.unsplash.com/photo-1603575448363-8f7c9fbe8f5d",
        desc: "Kids enjoying fun activities and learning with joy.",
      },
    ],
    painting: [
      {
        title: "CREATIVE PAINTING",
        img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
        desc: "Creative painting improves imagination and skills.",
      },
    ],
    games: [
      {
        title: "INDOOR & OUTDOOR GAMES",
        img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30",
        desc: "Games help children stay active and social.",
      },
    ],
  };

  return (
    <section className="blog-activities">
      <div className="container">

        {/* HEADER */}
        <div className="ba-header">
          <h2>BLOG & ACTIVITIES</h2>
          <p className="subtitle">Time Line & Activities</p>
          <p className="desc">
            We are group of teachers who really love childrens and enjoy every moment of teaching
          </p>
        </div>

        <div className="ba-content">

          {/* LEFT */}
          <div className="ba-left">
            {[1, 2, 3].map((item, i) => (
              <div className="ba-card" key={i}>
                <div className="ba-img">
                  <img
                    src={
                      i === 0
                        ? "https://images.unsplash.com/photo-1516627145497-ae6968895b74" // kids music
                        : i === 1
                        ? "https://images.unsplash.com/photo-1522202176988-66273c2fd55f" // school kids group
                        : "https://images.unsplash.com/photo-1588072432836-e10032774350" // kids learning
                    }
                    alt="kids"
                  />
                  <div className="ba-date">1 Apr</div>
                </div>

                <div className="ba-info">
                  <h4>
                    {i === 0
                      ? "MUSIC ACTIVITIES"
                      : i === 1
                      ? "SCHOOL ANNIVERSARY"
                      : "BIO SPECIAL"}
                  </h4>

                  <div className="meta">
                    <span>👤 Adam Rose</span>
                    <span>💬 {7 - i} Comments</span>
                  </div>

                  <p>
                    Nulla ac condimentum mauris, ac laoreet enim. Pellentesque nunc nibh.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="ba-right">

            <div className="tabs">
              <button
                className={activeTab === "education" ? "active" : ""}
                onClick={() => setActiveTab("education")}
              >
                EDUCATION
              </button>
              <button
                className={activeTab === "activities" ? "active" : ""}
                onClick={() => setActiveTab("activities")}
              >
                ACTIVITIES
              </button>
              <button
                className={activeTab === "painting" ? "active" : ""}
                onClick={() => setActiveTab("painting")}
              >
                PAINTING
              </button>
              <button
                className={activeTab === "games" ? "active" : ""}
                onClick={() => setActiveTab("games")}
              >
                GAMES
              </button>
            </div>

            <div className="tab-content">
              {tabData[activeTab].map((item, i) => (
                <div key={i}>
                  <div className="mini-card">
                    <img src={item.img} alt="kids" />
                    <div>
                      <h5>{item.title}</h5>
                      <p>{item.desc}</p>
                    </div>
                  </div>

                  {i !== tabData[activeTab].length - 1 && (
                    <div className="divider"></div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogActivitesHome;
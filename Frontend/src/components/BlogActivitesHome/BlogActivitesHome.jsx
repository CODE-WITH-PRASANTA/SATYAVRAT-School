import React, { useEffect, useState } from "react";
import "./BlogActivitesHome.css";
import API, { IMAGE_URL } from "../../api/axios";

const BlogActivitesHome = () => {
  const [activeTab, setActiveTab] = useState("education");
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await API.get("/news");

        const data = Array.isArray(res.data.data)
          ? res.data.data
          : [];

        console.log("NEWS DATA:", data); // DEBUG
        setNewsData(data);
      } catch (error) {
        console.error("API Error:", error);
        setNewsData([]);
      }
    };

    loadNews();
  }, []);

  const filteredData = newsData.filter(
    (item) =>
      item?.category?.toLowerCase() === activeTab.toLowerCase()
  );

  // ✅ FINAL IMAGE HANDLER (STRONG FIX)
  const getImage = (img) => {
    if (!img) return "https://via.placeholder.com/150";

    console.log("IMAGE PATH:", img); // DEBUG

    // already full URL
    if (img.startsWith("http")) return img;

    // remove duplicate slashes
    const cleanPath = img.startsWith("/") ? img : `/${img}`;

    return `${IMAGE_URL}${cleanPath}`;
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
            {newsData.length > 0 ? (
              newsData.slice(0, 3).map((item, i) => (
                <div className="ba-card" key={i}>

                  <div className="ba-img">
                    <img
                      src={getImage(item.image)}
                      alt="news"
                      onError={(e) => {
                        console.log("❌ Image failed:", item.image);
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />

                    <div className="ba-date">
                      {item?.date
                        ? new Date(item.date).toDateString()
                        : "No Date"}
                    </div>
                  </div>

                  <div className="ba-info">
                    <h4>{item?.title}</h4>

                    <div className="meta">
                      <span>👤 Admin</span>
                      <span>💬 0 Comments</span>
                    </div>

                    <p>{item?.description}</p>
                  </div>

                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>

          {/* RIGHT */}
          <div className="ba-right">

            {/* TABS */}
            <div className="tabs">
              {["education", "activities", "painting", "games"].map((tab) => (
                <button
                  key={tab}
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            <div className="tab-content">
              {filteredData.length > 0 ? (
                filteredData.map((item, i) => (
                  <div key={i}>

                    <div className="mini-card">
                      <img
                        src={getImage(item.image)}
                        alt="news"
                        onError={(e) => {
                          console.log("❌ Image failed:", item.image);
                          e.target.src = "https://via.placeholder.com/100";
                        }}
                      />

                      <div>
                        <h5>{item?.title}</h5>
                        <p>{item?.description}</p>
                      </div>
                    </div>

                    {i !== filteredData.length - 1 && (
                      <div className="divider"></div>
                    )}

                  </div>
                ))
              ) : (
                <p>No data in this category</p>
              )}
            </div>

            {/* BANNER */}
            {filteredData[0]?.image && (
              <div className="tab-banner">
                <img
                  src={getImage(filteredData[0].image)}
                  alt="banner"
                  onError={(e) => {
                    console.log("❌ Banner failed:", filteredData[0].image);
                    e.target.src = "https://via.placeholder.com/600x200";
                  }}
                />
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogActivitesHome;
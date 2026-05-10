import React, { useEffect, useState } from "react";
import "./BlogActivitesHome.css";
import API, { IMAGE_URL } from "../../Api/axios";
import { Link } from "react-router-dom";

const BlogActivitesHome = () => {
  const [activeTab, setActiveTab] = useState("Education");
  const [newsData, setNewsData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await API.get("/news");

        const data = Array.isArray(res.data.data)
          ? res.data.data
          : [];

        // ACTIVE POSTS ONLY
        const activePosts = data
          .filter((item) => item?.status === "Active")
          .sort((a, b) => b.order - a.order);

        setNewsData(activePosts);
      } catch (error) {
        console.error("API Error:", error);
        setNewsData([]);
      }
    };

    loadNews();
  }, []);

  // CATEGORY FILTER
  const filteredData = newsData.filter(
    (item) =>
      item?.category?.toLowerCase() ===
      activeTab.toLowerCase()
  );

  // LOAD MORE
  const visibleBlogs = filteredData.slice(0, visibleCount);

  // REMOVE HTML TAGS
  const stripHtml = (html) => {
    if (!html) return "";

    return html.replace(/<[^>]+>/g, "");
  };

  // IMAGE FIX
  const getImage = (img) => {
    if (!img)
      return "https://via.placeholder.com/600x400";

    if (img.startsWith("http")) return img;

    const cleanPath = img.startsWith("/")
      ? img
      : `/${img}`;

    return `${IMAGE_URL}${cleanPath}`;
  };

  return (
    <section className="blog-activities">
      <div className="container">

        {/* HEADER */}
        <div className="ba-header">
          <h2>BLOG & ACTIVITIES</h2>

          <p className="subtitle">
            Time Line & Activities
          </p>

          <p className="desc">
            We are group of teachers who really love
            childrens and enjoy every moment of teaching
          </p>
        </div>

        {/* CATEGORY TABS */}
        <div className="tabs">

          {[
            "Education",
            "Activities",
            "Painting",
            "Games",
          ].map((tab) => (
            <button
              key={tab}
              className={
                activeTab === tab ? "active" : ""
              }
              onClick={() => {
                setActiveTab(tab);
                setVisibleCount(6);
              }}
            >
              {tab.toUpperCase()}
            </button>
          ))}

        </div>

        {/* BLOG GRID */}
        <div className="blog-grid">

          {visibleBlogs.length > 0 ? (
            visibleBlogs.map((item) => (
              <div
                className="blog-card"
                key={item._id}
              >

                {/* IMAGE */}
                <div className="blog-image-wrap">

                  <img
                    src={getImage(item.image)}
                    alt={item?.title}
                    className="blog-image"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/600x400";
                    }}
                  />

                  <div className="blog-date">
                    {item?.date
                      ? new Date(item.date)
                          .toDateString()
                      : "No Date"}
                  </div>

                </div>

                {/* CONTENT */}
                <div className="blog-content">

                  <span className="blog-category">
                    {item?.category}
                  </span>

                  <h3>{item?.title}</h3>

                  <div className="blog-meta">

                    <span>
                         👤 {item?.author || "Admin"}
                    </span>

                    <span>
                         💬 {item?.comments || 0} Comments
                    </span>

                     <span>
                          👁️ {item?.views || 0} Views
                    </span>

                  </div>

                  <p>
                    {stripHtml(
                      item?.description
                    ).slice(0, 130)}
                    ...
                  </p>

                  {/* READ MORE */}
                  <Link
                    to={`/blog/${item._id}`}
                    className="read-more-btn"
                  >
                    Read More →
                  </Link>

                </div>
              </div>
            ))
          ) : (
            <div className="empty-blog">
              No Blogs Found
            </div>
          )}

        </div>

        {/* LOAD MORE */}
        {visibleCount < filteredData.length && (
          <div className="load-more-wrap">

            <button
              className="load-more-btn"
              onClick={() =>
                setVisibleCount(
                  (prev) => prev + 3
                )
              }
            >
              Load More Blogs
            </button>

          </div>
        )}

      </div>
    </section>
  );
};

export default BlogActivitesHome;
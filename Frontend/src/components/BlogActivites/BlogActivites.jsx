import React, { useEffect, useState } from "react";
import "./BlogActivites.css";
import { useParams, Link } from "react-router-dom";
import API, { IMAGE_URL } from "../../Api/axios";

const BlogActivites = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await API.get("/news");

      const data = Array.isArray(res.data.data)
        ? res.data.data
        : [];

      const activeBlogs = data.filter(
        (item) => item?.status === "Active"
      );

      // FIND CURRENT BLOG
      const currentBlog = activeBlogs.find(
        (item) => item._id === id
      );

      setBlog(currentBlog);

      // LATEST POSTS
      const latest = activeBlogs
        .filter((item) => item._id !== id)
        .slice(0, 4);

      setLatestPosts(latest);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // IMAGE FIX
  const getImage = (img) => {
    if (!img)
      return "https://via.placeholder.com/1200x700";

    if (img.startsWith("http")) return img;

    const cleanPath = img.startsWith("/")
      ? img
      : `/${img}`;

    return `${IMAGE_URL}${cleanPath}`;
  };

  if (loading) {
    return (
      <div className="blog-loader">
        Loading Blog...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-loader">
        Blog Not Found
      </div>
    );
  }

  return (
    <section className="blog-details">

      <div className="container">

        <div className="bd-wrapper">

          {/* ================= LEFT ================= */}
          <div className="bd-left">

            {/* IMAGE */}
            <div className="bd-image-wrap">

              <img
                className="bd-main-img"
                src={getImage(blog?.image)}
                alt={blog?.title}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/1200x700";
                }}
              />

              <div className="bd-category">
                {blog?.category}
              </div>

            </div>

            {/* DATE */}
            <p className="bd-date">
              {blog?.date
                ? new Date(blog.date).toDateString()
                : "No Date"}
            </p>

            {/* TITLE */}
            <h2 className="bd-title">
              {blog?.title}
            </h2>

            {/* META */}
            <span>
            👤 {blog?.author || "Admin"}
            </span>

           <span>
            💬 {blog?.comments || 0} Comments
           </span>

           <span>
            👁️ {blog?.views || 0} Views
           </span>

            {/* DESCRIPTION */}
            <div
              className="bd-description"
              dangerouslySetInnerHTML={{
                __html: blog?.description,
              }}
            />

          </div>

          {/* ================= RIGHT ================= */}
          <div className="bd-right">

            {/* CATEGORY */}
            <div className="bd-box">

              <h3>Categories</h3>

              <div className="category-wrap">

                {[
                  "Education",
                  "Activities",
                  "Painting",
                  "Games",
                ].map((cat) => (
                  <div
                    className={`category-item ${
                      blog?.category === cat
                        ? "active"
                        : ""
                    }`}
                    key={cat}
                  >
                    {cat}
                  </div>
                ))}

              </div>
            </div>

            {/* LATEST POSTS */}
            <div className="bd-box">

              <h3>Latest Blogs</h3>

              {latestPosts.map((item) => (

                <Link
                  to={`/blog/${item._id}`}
                  className="bd-post"
                  key={item._id}
                >

                  <img
                    src={getImage(item.image)}
                    alt={item.title}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/100";
                    }}
                  />

                  <div>

                    <h5>{item.title}</h5>

                    <span>
                      {new Date(
                        item.date
                      ).toDateString()}
                    </span>

                  </div>

                </Link>

              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default BlogActivites;
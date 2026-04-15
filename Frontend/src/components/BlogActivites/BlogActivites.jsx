import React from "react";
import "./BlogActivites.css";

const BlogActivites = () => {
  return (
    <section className="blog-details">
      <div className="container">

        <div className="bd-wrapper">

          {/* LEFT */}
          <div className="bd-left">

            <img
              className="bd-main-img"
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200"
              alt="kids"
            />

            <p className="bd-date">April 09, 2017</p>

            <h2 className="bd-title">
              ACTIVITIES USING THE FIVE SENSES WITH CLEAR EXAMPLE
            </h2>

            <div className="bd-meta">
              <span>👤 Adam Rose</span>
              <span>💬 7 Comments</span>
              <span>👁️ 18 Views</span>
            </div>

            <p>
              Your child is growing up fast and ready for a little more independence,
              our pre school club will be a perfect introduction.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <p>
              Aenean magna quam, elementum sit amet tristique eu, pretium a ex.
              Proin porta placerat odio, at viverra mauris maximus finibus.
            </p>

            <blockquote>
              Your child is growing up fast and ready for a little more independence,
              our pre school club will be a perfect introduction.
            </blockquote>

            <p>
              Proin porta placerat odio at viverra maximus finibus.
              Donec pulvinar mauris quis interdum tempor.
            </p>

          </div>

          {/* RIGHT */}
          <div className="bd-right">

            {/* CATEGORIES */}
            <div className="bd-box">
              <h3>Categories</h3>

              <ul className="category-list">
                <li><span className="dot"></span>Child Care <span>(15)</span></li>
                <li><span className="dot"></span>Education <span>(20)</span></li>
                <li><span className="dot"></span>Sports <span>(10)</span></li>
                <li><span className="dot"></span>Development <span>(30)</span></li>
              </ul>
            </div>

            {/* LATEST POSTS */}
            <div className="bd-box">
              <h3>Latest Post</h3>

              {[1, 2, 3].map((i) => (
                <div className="bd-post" key={i}>
                  <img
                    src={`https://picsum.photos/80/80?random=${i}`}
                    alt="post"
                  />
                  <div>
                    <h5>
                      {i === 1
                        ? "Activities Improves Mind"
                        : i === 2
                        ? "Make Learning Fun For Your Kids"
                        : "What Do Kids Learn In Preschool?"}
                    </h5>
                    <span>Posted by Adam Rose</span>
                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogActivites;
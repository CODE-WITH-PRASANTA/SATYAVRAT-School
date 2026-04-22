import React, { useState, useEffect } from "react";
import "./Gallery.css";
import API, { IMAGE_URL } from "../../api/axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(6);

  /* ================= RESPONSIVE ================= */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setImagesPerPage(1);
      } else {
        setImagesPerPage(6);
      }
    };

    handleResize(); // run once
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= FETCH FROM BACKEND ================= */
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await API.get("/gallery");
        setImages(res.data.data || []);
      } catch (err) {
        console.error("Gallery fetch error:", err);
      }
    };

    fetchGallery();
  }, []);

  /* ================= PAGINATION ================= */
  const indexOfLast = currentPage * imagesPerPage;
  const indexOfFirst = indexOfLast - imagesPerPage;
  const currentImages = images.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(images.length / imagesPerPage);

  /* ================= MODAL NAV ================= */
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="gallery">
      {/* HEADER */}
      <div className="gallery__header">
        <h2>Gallery</h2>
      </div>

      {/* GRID */}
      <div className="gallery__grid">
        {currentImages.length > 0 ? (
          currentImages.map((img, index) => (
            <div
              key={img._id}
              className="gallery__card"
              onClick={() => setCurrentIndex(indexOfFirst + index)}
            >
              <img
                src={IMAGE_URL + img.image}
                alt="gallery"
              />

              <div className="gallery__overlay">
                <div className="overlay__content">
                  <span>Explore</span>
                  <p>View Image</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>
            No images available
          </p>
        )}
      </div>

      {/* PAGINATION */}
      {images.length > 0 && (
        <div className="gallery__pagination">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </div>
      )}

      {/* MODAL */}
      {currentIndex !== null && images.length > 0 && (
        <div className="gallery__modal">
          <span
            className="close"
            onClick={() => setCurrentIndex(null)}
          >
            ✕
          </span>

          <button className="nav prev" onClick={prevImage}>
            ‹
          </button>

          <img
            src={IMAGE_URL + images[currentIndex].image}
            alt="preview"
          />

          <button className="nav next" onClick={nextImage}>
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
// ======================= UPDATED GALLERY WITH RESPONSIVE PAGINATION =======================
import React, { useState } from "react";
import "./Gallery.css";

import img1 from "../../assets/Ank1.webp";
import img2 from "../../assets/Ank2.webp";
import img3 from "../../assets/Ank3.webp";
import img4 from "../../assets/Ank4.webp";
import img5 from "../../assets/Ank5.webp";
import img6 from "../../assets/Ank6.webp";

const images = [img1, img2, img3, img4, img5, img6];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const isMobile = window.innerWidth <= 500;
  const imagesPerPage = isMobile ? 1 : 6;

  const indexOfLast = currentPage * imagesPerPage;
  const indexOfFirst = indexOfLast - imagesPerPage;
  const currentImages = images.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(images.length / imagesPerPage);

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

      {/* HEADING */}
      <div className="gallery__header">
        <h2>Gallery</h2>
      </div>

      {/* GRID */}
      <div className="gallery__grid">
        {currentImages.map((img, index) => (
          <div
            key={index}
            className="gallery__card"
            onClick={() => setCurrentIndex(indexOfFirst + index)}
          >
            <img src={img} alt="gallery" />

            <div className="gallery__overlay">
              <div className="overlay__content">
                <span>Explore</span>
                <p>View Image</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
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

      {/* MODAL */}
      {currentIndex !== null && (
        <div className="gallery__modal">

          <span className="close" onClick={() => setCurrentIndex(null)}>✕</span>

          <button className="nav prev" onClick={prevImage}>‹</button>

          <img src={images[currentIndex]} alt="preview" />

          <button className="nav next" onClick={nextImage}>›</button>
        </div>
      )}
    </div>
  );
};

export default Gallery;



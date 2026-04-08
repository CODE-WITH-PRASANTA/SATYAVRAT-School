import React, { useEffect, useRef, useState } from "react";
import "./Galleryposting.css";
import API, { IMAGE_URL } from "../../api/axios"; // ✅ ADDED

const Galleryposting = () => {
  const [gallerypostingForm, setGallerypostingForm] = useState({
    image: null,
    preview: "",
  });

  const [gallerypostingList, setGallerypostingList] = useState([]);
  const [gallerypostingEditId, setGallerypostingEditId] = useState(null);
  const [gallerypostingCurrentPage, setGallerypostingCurrentPage] = useState(1);

  const gallerypostingFileRef = useRef(null);
  const gallerypostingItemsPerPage = 5;

  /* ================= FETCH ================= */
  const fetchGallery = async () => {
    try {
      const res = await API.get("/gallery");

      const data = (res.data.data || []).map((item) => ({
        id: item._id,
        image: item.image,
        preview: IMAGE_URL + item.image, // ✅ show image
      }));

      setGallerypostingList(data);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  /* ================= IMAGE CHANGE ================= */
  const handleGallerypostingImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setGallerypostingForm({
      image: file, // ✅ send file
      preview: imageUrl,
    });
  };

  /* ================= SUBMIT ================= */
  const handleGallerypostingSubmit = async (e) => {
    e.preventDefault();

    if (!gallerypostingForm.image && !gallerypostingEditId) {
      alert("Please upload a gallery image.");
      return;
    }

    try {
      const formData = new FormData();

      if (gallerypostingForm.image) {
        formData.append("image", gallerypostingForm.image);
      }

      if (gallerypostingEditId !== null) {
        await API.put(`/gallery/${gallerypostingEditId}`, formData);
        setGallerypostingEditId(null);
      } else {
        await API.post("/gallery", formData);
      }

      fetchGallery(); // ✅ refresh list

      setGallerypostingForm({
        image: null,
        preview: "",
      });

      if (gallerypostingFileRef.current) {
        gallerypostingFileRef.current.value = "";
      }

      setGallerypostingCurrentPage(1);
    } catch (err) {
      console.error("SUBMIT ERROR:", err);
    }
  };

  /* ================= EDIT ================= */
  const handleGallerypostingEdit = (item) => {
    setGallerypostingForm({
      image: null,
      preview: item.preview, // ✅ show existing
    });

    setGallerypostingEditId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const handleGallerypostingDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/gallery/${id}`);
      fetchGallery();
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  /* ================= PAGINATION ================= */
  const gallerypostingTotalPages =
    Math.ceil(gallerypostingList.length / gallerypostingItemsPerPage) || 1;

  const gallerypostingStartIndex =
    (gallerypostingCurrentPage - 1) * gallerypostingItemsPerPage;

  const gallerypostingPaginatedList = gallerypostingList.slice(
    gallerypostingStartIndex,
    gallerypostingStartIndex + gallerypostingItemsPerPage
  );

  const handleGallerypostingPageChange = (page) => {
    setGallerypostingCurrentPage(page);
  };

  return (
    <div className="galleryposting">
      <div className="galleryposting__wrapper">
        <div className="galleryposting__left">
          <div className="galleryposting__card">
            <div className="galleryposting__header">
              <h2 className="galleryposting__title">Gallery Posting Form</h2>
              <p className="galleryposting__subtitle">
                Upload gallery images for your admin panel.
              </p>
            </div>

            <form
              className="galleryposting__form"
              onSubmit={handleGallerypostingSubmit}
            >
              <div className="galleryposting__formGroup">
                <label className="galleryposting__label">
                  Upload Gallery Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  ref={gallerypostingFileRef}
                  className="galleryposting__fileInput"
                  onChange={handleGallerypostingImageChange}
                />
              </div>

              {gallerypostingForm.preview && (
                <div className="galleryposting__previewBox">
                  <img
                    src={gallerypostingForm.preview}
                    alt="Preview"
                    className="galleryposting__previewImage"
                  />
                </div>
              )}

              <button type="submit" className="galleryposting__submitBtn">
                {gallerypostingEditId !== null ? "Update Image" : "Submit"}
              </button>
            </form>
          </div>
        </div>

        <div className="galleryposting__right">
          <div className="galleryposting__card">
            <div className="galleryposting__header">
              <h2 className="galleryposting__title">Gallery Posting Table</h2>
              <p className="galleryposting__subtitle">
                All uploaded gallery images will appear here.
              </p>
            </div>

            <div className="galleryposting__tableWrap">
              <table className="galleryposting__table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Picture</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {gallerypostingPaginatedList.length > 0 ? (
                    gallerypostingPaginatedList.map((item, index) => (
                      <tr key={item.id}>
                        <td>{gallerypostingStartIndex + index + 1}</td>
                        <td>
                          <div className="galleryposting__imageCell">
                            <img
                              src={item.preview}
                              alt={`Gallery ${gallerypostingStartIndex + index + 1}`}
                              className="galleryposting__tableImage"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="galleryposting__actionButtons">
                            <button
                              type="button"
                              className="galleryposting__actionBtn galleryposting__actionBtn--edit"
                              onClick={() => handleGallerypostingEdit(item)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="galleryposting__actionBtn galleryposting__actionBtn--delete"
                              onClick={() => handleGallerypostingDelete(item.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="galleryposting__empty">
                        No gallery images uploaded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {gallerypostingList.length > 0 && (
              <div className="galleryposting__pagination">
                <button
                  className="galleryposting__pageBtn"
                  onClick={() =>
                    handleGallerypostingPageChange(
                      gallerypostingCurrentPage > 1
                        ? gallerypostingCurrentPage - 1
                        : 1
                    )
                  }
                  disabled={gallerypostingCurrentPage === 1}
                >
                  Prev
                </button>

                {Array.from({ length: gallerypostingTotalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`galleryposting__pageBtn ${
                      gallerypostingCurrentPage === index + 1
                        ? "galleryposting__pageBtn--active"
                        : ""
                    }`}
                    onClick={() => handleGallerypostingPageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className="galleryposting__pageBtn"
                  onClick={() =>
                    handleGallerypostingPageChange(
                      gallerypostingCurrentPage < gallerypostingTotalPages
                        ? gallerypostingCurrentPage + 1
                        : gallerypostingTotalPages
                    )
                  }
                  disabled={
                    gallerypostingCurrentPage === gallerypostingTotalPages
                  }
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Galleryposting;
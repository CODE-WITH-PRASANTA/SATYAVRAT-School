import React, { useEffect, useMemo, useState } from "react";
import "./Testimonial.css";
import API, { IMAGE_URL } from "../../Api/axios";

import {
  FaQuoteLeft,
  FaStar,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

const Testimonial = () => {
  const base = "ts";

  const initialForm = {
    parentName: "",
    reviewText: "",
    rating: 5,
    image: "",
    file: null,
  };

  const [form, setForm] = useState(initialForm);

  const [testimonials, setTestimonials] = useState([]);

  const [editId, setEditId] = useState(null);

  /* ================= IMAGE URL ================= */

  const getImageUrl = (img) => {
    if (!img) return "";

    if (img.startsWith("http")) return img;

    return `${IMAGE_URL}${img}`;
  };

  /* ================= FETCH ================= */

  const fetchTestimonials = async () => {
    try {
      const res = await API.get("/testimonials");

      setTestimonials(res.data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  /* ================= PREVIEW ================= */

  const preview = useMemo(
    () => ({
      parentName: form.parentName || "Parent Name",

      reviewText:
        form.reviewText ||
        "Your review preview will display beautifully here with premium testimonial design.",

      rating: form.rating,

      image:
        form.image ||
        "https://randomuser.me/api/portraits/women/44.jpg",
    }),
    [form]
  );

  /* ================= CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "rating" ? Number(value) : value,
    }));
  };

  /* ================= IMAGE ================= */

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      file,
      image: previewUrl,
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append(
        "parentName",
        form.parentName
      );

      formData.append(
        "reviewText",
        form.reviewText
      );

      formData.append("rating", form.rating);

      if (form.file) {
        formData.append("image", form.file);
      }

      if (editId) {
        await API.put(
          `/testimonials/${editId}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      } else {
        await API.post(
          "/testimonials",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      }

      fetchTestimonials();

      handleReset();
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  /* ================= RESET ================= */

  const handleReset = () => {
    setForm(initialForm);

    setEditId(null);
  };

  /* ================= EDIT ================= */

  const handleEdit = (item) => {
    setForm({
      parentName: item.parentName,
      reviewText: item.reviewText,
      rating: item.rating,
      image: getImageUrl(item.image),
      file: null,
    });

    setEditId(item._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    try {
      await API.delete(`/testimonials/${id}`);

      fetchTestimonials();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <section className={base}>
      <div className={`${base}__container`}>
        {/* TOP */}
        <div className={`${base}__top`}>
          <span className={`${base}__label`}>
            Testimonial Management
          </span>

          <h2 className={`${base}__title`}>
            Parent Review Dashboard
          </h2>

          <p className={`${base}__subtitle`}>
            Manage parent testimonials, reviews,
            ratings and preview beautiful frontend
            testimonial cards instantly.
          </p>
        </div>

        {/* GRID */}
        <div className={`${base}__grid`}>
          {/* FORM */}
          <div className={`${base}__card`}>
            <div className={`${base}__cardHeader`}>
              <div>
                <h3>
                  {editId
                    ? "Update Testimonial"
                    : "Add New Testimonial"}
                </h3>

                <p>
                  Add premium testimonial reviews
                  for your website.
                </p>
              </div>
            </div>

            <form
              className={`${base}__form`}
              onSubmit={handleSubmit}
            >
              <div className={`${base}__formGroup`}>
                <label>Parent Name</label>

                <input
                  type="text"
                  name="parentName"
                  value={form.parentName}
                  onChange={handleChange}
                  placeholder="Enter parent name"
                  className={`${base}__input`}
                />
              </div>

              <div className={`${base}__formGroup`}>
                <label>Upload Image</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className={`${base}__input`}
                />
              </div>

              <div className={`${base}__formGroup`}>
                <label>Review Message</label>

                <textarea
                  rows="5"
                  name="reviewText"
                  value={form.reviewText}
                  onChange={handleChange}
                  placeholder="Write testimonial review..."
                  className={`${base}__textarea`}
                />
              </div>

              <div className={`${base}__formGroup`}>
                <label>Select Rating</label>

                <select
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  className={`${base}__select`}
                >
                  <option value={5}>
                    ⭐⭐⭐⭐⭐ 5 Star
                  </option>

                  <option value={4}>
                    ⭐⭐⭐⭐ 4 Star
                  </option>

                  <option value={3}>
                    ⭐⭐⭐ 3 Star
                  </option>

                  <option value={2}>
                    ⭐⭐ 2 Star
                  </option>

                  <option value={1}>
                    ⭐ 1 Star
                  </option>
                </select>
              </div>

              <div className={`${base}__btnRow`}>
                <button
                  type="submit"
                  className={`${base}__btnPrimary`}
                >
                  <FaPlus />

                  {editId
                    ? "Update Review"
                    : "Save Review"}
                </button>

                <button
                  type="button"
                  className={`${base}__btnSecondary`}
                  onClick={handleReset}
                >
                  <FaTimes />

                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* PREVIEW */}
          <div className={`${base}__preview`}>
            <FaQuoteLeft
              className={`${base}__quote`}
            />

            <div className={`${base}__previewCard`}>
              <div className={`${base}__previewTop`}>
                {preview.image ? (
                  <img
                    src={preview.image}
                    alt={preview.parentName}
                    className={`${base}__avatar`}
                  />
                ) : (
                  <FaUserCircle
                    className={`${base}__avatarIcon`}
                  />
                )}

                <div>
                  <h4>{preview.parentName}</h4>

                  <span>Happy Parent</span>
                </div>
              </div>

              <p>{preview.reviewText}</p>

              <div className={`${base}__stars`}>
                {[...Array(preview.rating)].map(
                  (_, i) => (
                    <FaStar key={i} />
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className={`${base}__tableCard`}>
          <div className={`${base}__tableTop`}>
            <div>
              <h3>Testimonials List</h3>

              <p>
                Manage all testimonial reviews
                easily.
              </p>
            </div>

            <div className={`${base}__count`}>
              Total : {testimonials.length}
            </div>
          </div>

          <div className={`${base}__tableWrap`}>
            <table className={`${base}__table`}>
              <thead>
                <tr>
                  <th>Parent</th>
                  <th>Review</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {testimonials.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className={`${base}__empty`}
                    >
                      No testimonial data found
                    </td>
                  </tr>
                ) : (
                  testimonials.map((item) => (
                    <tr key={item._id}>
                      {/* PARENT */}
                      <td>
                        <div
                          className={`${base}__user`}
                        >
                          <img
                            src={getImageUrl(
                              item.image
                            )}
                            alt={
                              item.parentName
                            }
                            className={`${base}__tableImg`}
                          />

                          <div>
                            <h4>
                              {item.parentName}
                            </h4>

                            <span>
                              Parent Review
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* REVIEW */}
                      <td
                        className={`${base}__review`}
                      >
                        {item.reviewText}
                      </td>

                      {/* RATING */}
                      <td>
                        <div
                          className={`${base}__rating`}
                        >
                          {[
                            ...Array(item.rating),
                          ].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                      </td>

                      {/* ACTION */}
                      <td>
                        <div
                          className={`${base}__actions`}
                        >
                          <button
                            className={`${base}__editBtn`}
                            onClick={() =>
                              handleEdit(item)
                            }
                          >
                            <FaEdit />
                          </button>

                          <button
                            className={`${base}__deleteBtn`}
                            onClick={() =>
                              handleDelete(
                                item._id
                              )
                            }
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
import React, { useMemo, useState } from "react";
import "./Testimonial.css";
import {
  FaQuoteLeft,
  FaStar,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

const Testimonial = () => {
  const base = "testimonialAdmin";

  const sectionData = {
    smallTitle: "PARENT REVIEWS",
    heading: "SATYAVRAT VIDYA NIKETAN HIGH SCHOOL",
  };

  const initialForm = {
    parentName: "",
    reviewText: "",
    rating: 5,
    status: "Active",
  };

  const [form, setForm] = useState(initialForm);
  const [testimonials, setTestimonials] = useState([]);
  const [editId, setEditId] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const previewData = useMemo(() => {
    return {
      parentName: form.parentName || "Parent Name",
      reviewText:
        form.reviewText ||
        "Your testimonial preview will appear here. Add a parent review to see how it looks in the frontend card design.",
      rating: Number(form.rating) || 5,
      status: form.status || "Active",
    };
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      id: editId || Date.now(),
      rating: Number(form.rating),
    };

    if (editId) {
      setTestimonials((prev) =>
        prev.map((item) => (item.id === editId ? payload : item))
      );
      setEditId(null);
    } else {
      setTestimonials((prev) => [...prev, payload]);
    }

    setForm(initialForm);
  };

  const handleClear = () => {
    setForm(initialForm);
    setEditId(null);
  };

  const handleEdit = (item) => {
    setForm({
      parentName: item.parentName,
      reviewText: item.reviewText,
      rating: item.rating,
      status: item.status,
    });
    setEditId(item.id);
    setOpenMenu(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setTestimonials((prev) => prev.filter((item) => item.id !== id));
    if (editId === id) {
      handleClear();
    }
    setOpenMenu(null);
  };

  const renderStars = (count) =>
    [...Array(count)].map((_, index) => <FaStar key={index} />);

  return (
    <section className={base}>
      <div className={`${base}__header`}>
        <div>
          <p className={`${base}__eyebrow`}>Admin Panel</p>
          <h2>Testimonial Management</h2>
          <p className={`${base}__subtext`}>
            Add, edit, and manage parent testimonials with live preview and a
            clean admin table.
          </p>
        </div>
      </div>

      <div className={`${base}__topGrid`}>
        <div className={`${base}__card`}>
          <div className={`${base}__cardHeader`}>
            <h3>{editId ? "Update Review Card Form" : "Review Card Form"}</h3>
            <p>Fill testimonial details and save the review card.</p>
          </div>

          <form className={`${base}__form`} onSubmit={handleSubmit}>
            <div className={`${base}__formGroup`}>
              <label>Parent Name</label>
              <input
                type="text"
                name="parentName"
                value={form.parentName}
                onChange={handleChange}
                placeholder="Enter parent name"
              />
            </div>

            <div className={`${base}__formGroup`}>
              <label>Review Text</label>
              <textarea
                name="reviewText"
                rows="6"
                value={form.reviewText}
                onChange={handleChange}
                placeholder="Write review text"
              />
            </div>

            <div className={`${base}__formRow`}>
              <div className={`${base}__formGroup`}>
                <label>Rating</label>
                <select
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                >
                  <option value={5}>5 Star</option>
                  <option value={4}>4 Star</option>
                  <option value={3}>3 Star</option>
                  <option value={2}>2 Star</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>

              <div className={`${base}__formGroup`}>
                <label>Card Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className={`${base}__buttonRow`}>
              <button type="submit" className={`${base}__primaryBtn`}>
                <FaPlus />
                {editId ? "Update Review" : "Save Review"}
              </button>

              <button
                type="button"
                className={`${base}__secondaryBtn`}
                onClick={handleClear}
              >
                <FaTimes />
                Clear
              </button>
            </div>
          </form>
        </div>

        <div className={`${base}__card`}>
          <div className={`${base}__cardHeader`}>
            <h3>Live Preview</h3>
            <p>Preview the testimonial card before saving.</p>
          </div>

          <div className={`${base}__previewSection`}>
            <div className={`${base}__previewHead`}>
              <div>
                <p className={`${base}__previewEyebrow`}>
                  {sectionData.smallTitle}
                </p>
                <h2 className={`${base}__previewHeading`}>
                  {sectionData.heading}
                </h2>
              </div>

              <div className={`${base}__previewNav`}>
                <button type="button">←</button>
                <button type="button">→</button>
              </div>
            </div>

            <div className={`${base}__previewCard`}>
              <p className={`${base}__previewText`}>{previewData.reviewText}</p>

              <div className={`${base}__previewBottom`}>
                <div className={`${base}__quoteIcon`}>
                  <FaQuoteLeft />
                </div>

                <div className={`${base}__previewMeta`}>
                  <h4>{previewData.parentName}</h4>
                  <div className={`${base}__stars`}>
                    {renderStars(previewData.rating)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${base}__tableCard`}>
        <div className={`${base}__cardHeader`}>
          <h3>Testimonials List Table</h3>
          <p>Manage all saved testimonial cards below.</p>
        </div>

        <div className={`${base}__tableWrap`}>
          <table className={`${base}__table`}>
            <thead>
              <tr>
                <th>Parent Name</th>
                <th>Review Text</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {testimonials.length > 0 ? (
                testimonials.map((item) => (
                  <tr key={item.id}>
                    <td className={`${base}__tableName`}>{item.parentName}</td>
                    <td className={`${base}__reviewCell`}>{item.reviewText}</td>
                    <td>
                      <span className={`${base}__ratingBadge`}>
                        {item.rating} Star
                      </span>
                    </td>
                    <td>
                      <span
                        className={`${base}__statusBadge ${
                          item.status === "Active"
                            ? `${base}__statusBadge--active`
                            : `${base}__statusBadge--inactive`
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className={`${base}__dropdown`}>
                        <button
                          type="button"
                          className={`${base}__dropdownBtn`}
                          onClick={() =>
                            setOpenMenu(openMenu === item.id ? null : item.id)
                          }
                        >
                          Actions <FaChevronDown />
                        </button>

                        {openMenu === item.id && (
                          <div className={`${base}__dropdownMenu`}>
                            <button type="button" onClick={() => handleEdit(item)}>
                              <FaEdit />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                            >
                              <FaTrash />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className={`${base}__emptyRow`}>
                    No testimonial cards added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
import React, { useEffect, useMemo, useState } from "react";
import "./Testimonial.css";
import API from "../../Api/axios"; // ✅ ADDED
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
    heading: "What Parents Say About Bright Stars Montessori",
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

  /* ================= FETCH ================= */
  const fetchTestimonials = async () => {
    try {
      const res = await API.get("/testimonials");
      setTestimonials(res.data.data || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  /* ================= PREVIEW ================= */
  const previewData = useMemo(() => {
    return {
      parentName: form.parentName || "Parent Name",
      reviewText:
        form.reviewText ||
        "Your testimonial preview will appear here.",
      rating: Number(form.rating) || 5,
      status: form.status || "Active",
    };
  }, [form]);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/testimonials/${editId}`, form);
      } else {
        await API.post("/testimonials", form);
      }

      fetchTestimonials(); // ✅ refresh
      setForm(initialForm);
      setEditId(null);
    } catch (err) {
      console.error("SUBMIT ERROR:", err);
    }
  };

  const handleClear = () => {
    setForm(initialForm);
    setEditId(null);
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setForm({
      parentName: item.parentName,
      reviewText: item.reviewText,
      rating: item.rating,
      status: item.status,
    });

    setEditId(item._id); // ✅ FIXED
    setOpenMenu(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      await API.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (err) {
      console.error("DELETE ERROR:", err);
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
            Add, edit, and manage parent testimonials.
          </p>
        </div>
      </div>

      <div className={`${base}__topGrid`}>
        <div className={`${base}__card`}>
          <div className={`${base}__cardHeader`}>
            <h3>{editId ? "Update Review Card Form" : "Review Card Form"}</h3>
          </div>

          <form className={`${base}__form`} onSubmit={handleSubmit}>
            <div className={`${base}__formGroup`}>
              <label>Parent Name</label>
              <input
                type="text"
                name="parentName"
                value={form.parentName}
                onChange={handleChange}
              />
            </div>

            <div className={`${base}__formGroup`}>
              <label>Review Text</label>
              <textarea
                name="reviewText"
                rows="6"
                value={form.reviewText}
                onChange={handleChange}
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

        {/* PREVIEW SAME */}
        <div className={`${base}__card`}>
          <div className={`${base}__previewCard`}>
            <p className={`${base}__previewText`}>
              {previewData.reviewText}
            </p>

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

      {/* TABLE */}
      <div className={`${base}__tableCard`}>
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
                  <tr key={item._id}>
                    <td>{item.parentName}</td>
                    <td>{item.reviewText}</td>
                    <td>{item.rating} Star</td>
                    <td>{item.status}</td>

                    <td>
                      <button onClick={() => handleEdit(item)}>
                        <FaEdit />
                      </button>

                      <button onClick={() => handleDelete(item._id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No data</td>
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
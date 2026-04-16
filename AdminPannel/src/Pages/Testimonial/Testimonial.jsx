import React, { useEffect, useMemo, useState } from "react";
import "./Testimonial.css";
import API from "../../api/axios";
import { FaQuoteLeft, FaStar, FaEdit, FaTrash } from "react-icons/fa";

const Testimonial = () => {
  const base = "ts";

  const initialForm = {
  parentName: "",
  reviewText: "",
  rating: 5,
  image: "",
  file: null, // ✅ important
};

  const [form, setForm] = useState(initialForm);
  const [testimonials, setTestimonials] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchTestimonials = async () => {
    const res = await API.get("/testimonials");
    setTestimonials(res.data.data || []);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const preview = useMemo(
    () => ({
      parentName: form.parentName || "Parent Name",
      reviewText:
        form.reviewText ||
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
      rating: form.rating,
      image: form.image || "https://randomuser.me/api/portraits/women/44.jpg",
    }),
    [form],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({
      ...p,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("parentName", form.parentName);
  formData.append("reviewText", form.reviewText);
  formData.append("rating", form.rating);

  if (form.file) {
    formData.append("image", form.file);
  }

  try {
    if (editId) {
      await API.put(`/testimonials/${editId}`, formData);
    } else {
      await API.post("/testimonials", formData);
    }

    fetchTestimonials();
    setForm(initialForm);
    setEditId(null);
  } catch (err) {
    console.error(err);
  }
};

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    await API.delete(`/testimonials/${id}`);
    fetchTestimonials();
  };

  return (
    <section className={base}>
      <div className={`${base}__grid`}>
        {/* FORM */}
        <div className={`${base}__card`}>
          <h3>{editId ? "Update Testimonial" : "Add Testimonial"}</h3>

          <form onSubmit={handleSubmit} className={`${base}__form`}>
            <input
              className={`${base}__input`}
              name="parentName"
              placeholder="Parent Name"
              value={form.parentName}
              onChange={handleChange}
            />

            <input
              type="file"
              accept="image/*"
              className={`${base}__input`}
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                // preview
                const previewUrl = URL.createObjectURL(file);

                setForm((prev) => ({
                  ...prev,
                  file, // actual file for backend
                  image: previewUrl, // preview in UI
                }));
              }}
            />

            <textarea
              className={`${base}__textarea`}
              name="reviewText"
              placeholder="Write review..."
              value={form.reviewText}
              onChange={handleChange}
            />

            {/* ✅ FIXED */}
            <select
              className={`${base}__select`}
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

            <div className={`${base}__btnRow`}>
              <button className={`${base}__btnPrimary`}>
                {editId ? "Update" : "Save"}
              </button>

              <button
                type="button"
                className={`${base}__btnSecondary`}
                onClick={() => {
                  setForm(initialForm);
                  setEditId(null);
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* PREVIEW */}
        <div className={`${base}__preview`}>
          <FaQuoteLeft className={`${base}__quote`} />
          <p>{preview.reviewText}</p>
          <img src={preview.image} className={`${base}__avatar`} />
          <h4>{preview.parentName}</h4>

          <div className={`${base}__stars`}>
            {[...Array(preview.rating)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className={`${base}__tableWrap`}>
        <table className={`${base}__table`}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Review</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {testimonials.map((item) => (
              <tr key={item._id}>
                <td data-label="Image">
                  <img src={item.image} className={`${base}__tableImg`} />
                </td>

                <td data-label="Name">{item.parentName}</td>

                <td data-label="Review">{item.reviewText}</td>

                <td data-label="Rating">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </td>

                <td data-label="Action">
                  <FaEdit
                    className={`${base}__iconEdit`}
                    onClick={() => handleEdit(item)}
                  />
                  <FaTrash
                    className={`${base}__iconDelete`}
                    onClick={() => handleDelete(item._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Testimonial;

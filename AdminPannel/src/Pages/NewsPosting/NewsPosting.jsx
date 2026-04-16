import { useEffect } from "react";
import React, { useMemo, useState } from "react";
import "./NewsPosting.css";
import API, { IMAGE_URL } from "../../Api/axois";
import {
  FaCalendarAlt,
  FaEdit,
  FaEye,
  FaTrash,
  FaPlus,
  FaTimes,
  FaImage,
  FaStar,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const NewsPosting = () => {
  const base = "newsPostingAdmin";

  const initialForm = {
    image: "",
    date: "",
    title: "",
    description: "",
    buttonText: "Read More",
    link: "",
    status: "Active",
    featured: false,
    order: 1,
  };

  const [form, setForm] = useState(initialForm);
  const [previewImage, setPreviewImage] = useState("");
  const [editId, setEditId] = useState(null);
  const [viewPost, setViewPost] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await API.get("/news");
        setPosts(res.data.data || []);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "12 January 2026";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const truncateText = (text, max = 110) => {
    if (!text) return "Write a short news description for preview display.";
    return text.length > max ? `${text.slice(0, max)}...` : text;
  };

  const displayPreview = useMemo(
    () => ({
      image:
        previewImage ||
        (typeof form.image === "string" && form.image
          ? IMAGE_URL + form.image
          : "") ||
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",

      date: formatDate(form.date),

      title: form.title || "New Academic Session Admissions Open",

      description: truncateText(form.description),

      buttonText: form.buttonText || "Read More",

      featured: form.featured,

      status: form.status,

      link: form.link,
    }),
    [form, previewImage],
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    setForm((prev) => ({
      ...prev,
      image: file, // ✅ IMPORTANT
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      if (editId) {
        const res = await API.put(`/news/${editId}`, formData);

        setPosts((prev) =>
          prev.map((item) => (item._id === editId ? res.data.data : item)),
        );

        setEditId(null);
      } else {
        const res = await API.post("/news", formData);
        setPosts((prev) => [...prev, res.data.data]);
      }

      setForm(initialForm);
      setPreviewImage("");
    } catch (err) {
      console.error("SUBMIT ERROR:", err);
    }
  };
  const handleClear = () => {
    setForm(initialForm);
    setPreviewImage("");
    setEditId(null);
  };

  const handleEdit = (post) => {
    setForm(post);
    setPreviewImage(IMAGE_URL + post.image);
    setEditId(post._id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/news/${id}`);
      setPosts((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };
  const handleToggleStatus = async (id) => {
    try {
      const res = await API.put(`/news/${id}/status`);
      setPosts((prev) =>
        prev.map((item) => (item._id === id ? res.data.data : item)),
      );
    } catch (err) {
      console.error("STATUS ERROR:", err);
    }
  };

  const sortedPosts = [...posts].sort(
    (a, b) => Number(a.order) - Number(b.order),
  );

  return (
    <>
      <section className={base}>
        <div className={`${base}__header`}>
          <div>
            <h2>News Post Management</h2>
            <p className={`${base}__subtext`}>
              Create, preview, and manage all school news posts from one place.
            </p>
          </div>
        </div>

        <div className={`${base}__topLayout`}>
          <div className={`${base}__formPanel`}>
            <div className={`${base}__panelHead`}>
              <h3>{editId ? "Update News Post" : "Create News Post"}</h3>
              <p>Fill all details and save the post.</p>
            </div>

            <form className={`${base}__form`} onSubmit={handleSubmit}>
              <div className={`${base}__formGroup`}>
                <label>Upload Image</label>
                <label className={`${base}__uploadBox`}>
                  <input type="file" accept="image/*" onChange={handleImage} />
                  <div className={`${base}__uploadContent`}>
                    <FaImage />
                    <span>
                      {previewImage || form.image
                        ? "Change Image"
                        : "Choose Image"}
                    </span>
                  </div>
                </label>
              </div>

              <div className={`${base}__formRow`}>
                <div className={`${base}__formGroup`}>
                  <label>News Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                  />
                </div>

                <div className={`${base}__formGroup`}>
                  <label>Post Order</label>
                  <input
                    type="number"
                    name="order"
                    min="1"
                    value={form.order}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={`${base}__formGroup`}>
                <label>News Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter news title"
                />
              </div>

              <div className={`${base}__formGroup`}>
                <label>Short Description</label>
                <textarea
                  name="description"
                  rows="5"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Write short description"
                />
              </div>

              <div className={`${base}__formRow`}>
                <div className={`${base}__formGroup`}>
                  <label>Button Text</label>
                  <input
                    type="text"
                    name="buttonText"
                    value={form.buttonText}
                    onChange={handleChange}
                    placeholder="Read More"
                  />
                </div>

                <div className={`${base}__formGroup`}>
                  <label>Status</label>
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

              <div className={`${base}__formGroup`}>
                <label>Read More Link</label>
                <input
                  type="url"
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  placeholder="Enter redirect link"
                />
              </div>

              <div className={`${base}__toggleRow`}>
                <label className={`${base}__checkboxWrap`}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                  />
                  <span>Featured Post</span>
                </label>
              </div>

              <div className={`${base}__buttonRow`}>
                <button type="submit" className={`${base}__primaryBtn`}>
                  <FaPlus />
                  {editId ? "Update Post" : "Save Post"}
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

          <div className={`${base}__previewPanel`}>
            <div className={`${base}__panelHead`}>
              <h3>Live Preview</h3>
              <p>Frontend news card preview</p>
            </div>

            <div className={`${base}__previewCard`}>
              <div className={`${base}__previewImageWrap`}>
                <img
                  src={displayPreview.image}
                  alt="News preview"
                  className={`${base}__previewImage`}
                />

                {displayPreview.featured && (
                  <span className={`${base}__featuredBadge`}>
                    <FaStar />
                    Featured
                  </span>
                )}
              </div>

              <div className={`${base}__previewContent`}>
                <div className={`${base}__previewDate`}>
                  <FaCalendarAlt />
                  <span>{displayPreview.date}</span>
                </div>

                <h4>{displayPreview.title}</h4>
                <p>{displayPreview.description}</p>
              </div>

              <div className={`${base}__previewFooter`}>
                <button type="button">
                  {displayPreview.buttonText} <span>→</span>
                </button>
              </div>
            </div>

            <div className={`${base}__previewStatusWrap`}>
              <span
                className={`${base}__statusBadge} ${
                  displayPreview.status === "Active"
                    ? `${base}__statusBadge--active`
                    : `${base}__statusBadge--inactive`
                }`}
              >
                {displayPreview.status}
              </span>
            </div>
          </div>
        </div>

        <div className={`${base}__tablePanel`}>
          <div className={`${base}__panelHead`}>
            <h3>Manage News Posts</h3>
            <p>Edit, preview, activate, or delete saved posts.</p>
          </div>

          <div className={`${base}__tableWrap`}>
            <table className={`${base}__table`}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {sortedPosts?.length ? (
                  sortedPosts.map((post) => {
                    // 🔥 SAFE IMAGE HANDLER
                    const imageSrc =
                      post?.image && typeof post.image === "string"
                        ? post.image.startsWith("http")
                          ? post.image
                          : `${IMAGE_URL}${post.image}`
                        : "https://picsum.photos/150";

                    return (
                      <tr key={post._id}>
                        {/* IMAGE */}
                        <td>
                          <img
                            src={imageSrc}
                            alt={post?.title || "news"}
                            className={`${base}__tableImage`}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://picsum.photos/150";
                            }}
                          />
                        </td>

                        {/* TITLE */}
                        <td className={`${base}__tableTitle`}>
                          {post?.title?.trim() || "No Title"}
                        </td>

                        {/* DATE */}
                        <td>{post?.date ? formatDate(post.date) : "-"}</td>

                        {/* DESCRIPTION */}
                        <td>
                          {post?.description
                            ? truncateText(post.description, 75)
                            : "No description"}
                        </td>

                        {/* STATUS */}
                        <td>
                          <span
                            className={`${base}__statusBadge} ${
                              post?.status === "Active"
                                ? `${base}__statusBadge--active`
                                : `${base}__statusBadge--inactive`
                            }`}
                          >
                            {post?.status || "Inactive"}
                          </span>
                        </td>

                        {/* FEATURED */}
                        <td>
                          {post?.featured ? (
                            <span className={`${base}__featuredMini`}>Yes</span>
                          ) : (
                            <span className={`${base}__notFeaturedMini`}>
                              No
                            </span>
                          )}
                        </td>

                        {/* ORDER */}
                        <td>{post?.order ?? "-"}</td>

                        {/* ACTIONS */}
                        <td>
                          <div className={`${base}__actionBtns`}>
                            <button
                              className={`${base}__iconBtn edit`}
                              onClick={() => handleEdit(post)}
                              type="button"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>

                            <button
                              className={`${base}__iconBtn view`}
                              onClick={() => setViewPost(post)}
                              type="button"
                              title="View"
                            >
                              <FaEye />
                            </button>

                            <button
                              className={`${base}__iconBtn toggle`}
                              onClick={() => handleToggleStatus(post._id)}
                              type="button"
                              title="Activate / Deactivate"
                            >
                              {post?.status === "Active" ? (
                                <FaToggleOn />
                              ) : (
                                <FaToggleOff />
                              )}
                            </button>

                            <button
                              className={`${base}__iconBtn delete`}
                              onClick={() => handleDelete(post._id)}
                              type="button"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className={`${base}__emptyRow`}>
                      No news posts added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {viewPost && (
        <div
          className={`${base}__modalOverlay`}
          onClick={() => setViewPost(null)}
        >
          <div
            className={`${base}__modal`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={`${base}__modalClose`}
              onClick={() => setViewPost(null)}
            >
              <FaTimes />
            </button>

            {/* IMAGE */}
            <div className={`${base}__modalImageWrap`}>
              <img
                src={
                  viewPost?.image
                    ? viewPost.image.startsWith("http")
                      ? viewPost.image
                      : `${IMAGE_URL}${viewPost.image}`
                    : "https://picsum.photos/400"
                }
                alt={viewPost?.title || "news"}
                onError={(e) => {
                  e.target.src = "https://picsum.photos/400";
                }}
              />
            </div>

            {/* CONTENT */}
            <div className={`${base}__modalBody`}>
              <div className={`${base}__previewDate`}>
                <FaCalendarAlt />
                <span>{formatDate(viewPost?.date)}</span>
              </div>

              <h3>{viewPost?.title || "No Title"}</h3>

              <p>{viewPost?.description || "No description available."}</p>

              <div className={`${base}__modalMeta`}>
                <span
                  className={`${base}__statusBadge} ${
                    viewPost?.status === "Active"
                      ? `${base}__statusBadge--active`
                      : `${base}__statusBadge--inactive`
                  }`}
                >
                  {viewPost?.status}
                </span>

                {viewPost?.featured && (
                  <span className={`${base}__featuredMini`}>Featured</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsPosting;

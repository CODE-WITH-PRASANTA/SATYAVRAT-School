import React, { useMemo, useState, useEffect } from "react";
import "./Teacher.css";
import API, { IMAGE_URL } from "../../Api/axois"; // ✅ use your api
import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
  FaPhoneAlt,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaPlus,
  FaTimes,
  FaImage,
} from "react-icons/fa";

const Teacher = () => {
  const base = "teacherAdmin";

  const initialForm = {
    image: "",
    name: "",
    role: "",
    description: "",
    phone: "",
    status: "Active",
  };

  const [form, setForm] = useState(initialForm);
  const [previewImage, setPreviewImage] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const [editId, setEditId] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  /* ================= FETCH ================= */
  const fetchTeachers = async () => {
    try {
      const res = await API.get("/teachers");
      setTeachers(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  /* ================= PREVIEW ================= */
  const displayPreview = useMemo(
    () => ({
      image:
        previewImage ||
        (form.image ? IMAGE_URL + form.image : "") ||
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
      name: form.name || "Mrs. Kavita Sharma",
      role: form.role || "Principal & Academic Head",
      description:
        form.description ||
        "She leads Bright Stars Montessori with a nurturing vision that helps every child grow with confidence, curiosity, discipline, and a lifelong love for learning.",
      phone: form.phone || "+91 7016201096",
      status: form.status,
    }),
    [form, previewImage]
  );

  /* ================= CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= IMAGE ================= */
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("role", form.role);
      formData.append("description", form.description);
      formData.append("phone", form.phone);
      formData.append("status", form.status);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (editId) {
        await API.put(`/teachers/${editId}`, formData);
      } else {
        await API.post("/teachers", formData);
      }

      fetchTeachers();
      handleClear();
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= CLEAR ================= */
  const handleClear = () => {
    setForm(initialForm);
    setPreviewImage("");
    setImageFile(null);
    setEditId(null);
  };

  /* ================= EDIT ================= */
  const handleEdit = (teacher) => {
    setForm({
      image: teacher.image,
      name: teacher.name,
      role: teacher.role,
      description: teacher.description,
      phone: teacher.phone,
      status: teacher.status,
    });

    setPreviewImage(IMAGE_URL + teacher.image);
    setEditId(teacher._id);
    setOpenMenu(null);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      await API.delete(`/teachers/${id}`);
      fetchTeachers();
      setOpenMenu(null);
    } catch (err) {
      console.log(err);
    }
  };

  const sortedTeachers = [...teachers].sort(
    (a, b) => Number(a.order) - Number(b.order)
  );

  return (
    <section className={base}>
      <div className={`${base}__header`}>
        <div>
          <p className={`${base}__eyebrow`}>Admin Panel</p>
          <h2>Teacher Post Management</h2>
          <p className={`${base}__subtext`}>
            Add teacher profiles, preview the frontend design, and manage teacher
            cards from one place.
          </p>
        </div>
      </div>

      <div className={`${base}__topGrid`}>
        <div className={`${base}__card`}>
          <div className={`${base}__cardHeader`}>
            <h3>{editId ? "Update Teacher Form" : "Add Teacher Form"}</h3>
            <p>Fill the details and save the teacher profile.</p>
          </div>

          <form className={`${base}__form`} onSubmit={handleSubmit}>
            <div className={`${base}__formGroup`}>
              <label>Upload Teacher Image</label>
              <label className={`${base}__uploadBox`}>
                <input type="file" accept="image/*" onChange={handleImage} />
                <div className={`${base}__uploadContent`}>
                  <FaImage />
                  <span>
                    {previewImage || form.image ? "Change Image" : "Choose Image"}
                  </span>
                </div>
              </label>
            </div>

            <div className={`${base}__formGroup`}>
              <label>Teacher Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter teacher name"
              />
            </div>

            <div className={`${base}__formGroup`}>
              <label>Teacher Role / Designation</label>
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Enter teacher role"
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
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
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

            <div className={`${base}__buttonRow`}>
              <button type="submit" className={`${base}__primaryBtn`}>
                <FaPlus />
                {editId ? "Update Teacher" : "Save Teacher"}
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
          <div className={`${base}__cardHeader`}>
            <h3>Live Preview Card</h3>
            <p>Preview the teacher card before saving.</p>
          </div>

          <div className={`${base}__previewCard`}>
            <div className={`${base}__previewImageWrap`}>
              <img
                src={displayPreview.image}
                alt={displayPreview.name}
                className={`${base}__previewImage`}
              />
            </div>

            <div className={`${base}__previewContent`}>
              <span className={`${base}__tagBadge`}>Teacher</span>

              <h4>{displayPreview.name}</h4>
              <h5>{displayPreview.role}</h5>

              <p>{displayPreview.description}</p>

              <div className={`${base}__line`}></div>

              <div className={`${base}__phone`}>
                <FaPhoneAlt />
                <span>{displayPreview.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE SAME */}
      <div className={`${base}__tableCard`}>
        <div className={`${base}__tableWrap`}>
          <table className={`${base}__table`}>
            <tbody>
              {sortedTeachers.map((teacher) => (
                <tr key={teacher._id}>
                  <td>
                    <img
                      src={IMAGE_URL + teacher.image}
                      className={`${base}__tableImage`}
                    />
                  </td>
                  <td>{teacher.name}</td>
                  <td>{teacher.role}</td>
                  <td>{teacher.phone}</td>

                  <td>
                    <button onClick={() => handleEdit(teacher)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(teacher._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Teacher;

import React, { useMemo, useState } from "react";
import "./Teacher.css";
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
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
      name: "Mrs. Kavita Sharma",
      role: "Principal & Academic Head",
      description:
        "She leads Bright Stars Montessori with a nurturing vision that helps every child grow with confidence, curiosity, discipline, and a lifelong love for learning.",
      phone: "+91 7016201096",
      status: "Active",
      tag: "Lead Mentor",
      order: 1,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80",
      name: "Anita Sharma",
      role: "Senior Montessori Teacher",
      description:
        "A caring mentor focused on joyful learning, creativity, and strong early childhood development.",
      phone: "+91 9876543210",
      status: "Active",
      tag: "Teacher",
      order: 2,
    },
  ]);

  const [editId, setEditId] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const displayPreview = useMemo(
    () => ({
      image:
        previewImage ||
        form.image ||
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    setForm((prev) => ({
      ...prev,
      image: imageUrl,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      id: editId || Date.now(),
      tag: "Teacher",
      order: editId
        ? teachers.find((item) => item.id === editId)?.order || teachers.length + 1
        : teachers.length + 1,
    };

    if (editId) {
      setTeachers((prev) =>
        prev.map((item) => (item.id === editId ? payload : item))
      );
      setEditId(null);
    } else {
      setTeachers((prev) => [...prev, payload]);
    }

    setForm(initialForm);
    setPreviewImage("");
  };

  const handleClear = () => {
    setForm(initialForm);
    setPreviewImage("");
    setEditId(null);
  };

  const handleEdit = (teacher) => {
    setForm({
      image: teacher.image,
      name: teacher.name,
      role: teacher.role,
      description: teacher.description,
      phone: teacher.phone,
      status: teacher.status,
    });

    setPreviewImage(teacher.image);
    setEditId(teacher.id);
    setOpenMenu(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setTeachers((prev) => prev.filter((item) => item.id !== id));
    if (editId === id) handleClear();
    setOpenMenu(null);
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

              <div className={`${base}__socials`}>
                <button type="button">
                  <FaFacebookF />
                </button>
                <button type="button">
                  <FaInstagram />
                </button>
                <button type="button">
                  <FaEnvelope />
                </button>
                <button type="button">
                  <FaWhatsapp />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${base}__tableCard`}>
        <div className={`${base}__cardHeader`}>
          <h3>Teachers List Table</h3>
          <p>Manage saved teacher profiles below.</p>
        </div>

        <div className={`${base}__tableWrap`}>
          <table className={`${base}__table`}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Teacher Name</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Tag</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {sortedTeachers.length > 0 ? (
                sortedTeachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className={`${base}__tableImage`}
                      />
                    </td>
                    <td className={`${base}__tableName`}>{teacher.name}</td>
                    <td>{teacher.role}</td>
                    <td>{teacher.phone}</td>
                    <td>
                      <span className={`${base}__tagMini`}>{teacher.tag}</span>
                    </td>
                    <td>
                      <span
                        className={`${base}__statusBadge} ${
                          teacher.status === "Active"
                            ? `${base}__statusBadge--active`
                            : `${base}__statusBadge--inactive`
                        }`}
                      >
                        {teacher.status}
                      </span>
                    </td>
                    <td>
                      <div className={`${base}__dropdown`}>
                        <button
                          type="button"
                          className={`${base}__dropdownBtn`}
                          onClick={() =>
                            setOpenMenu(openMenu === teacher.id ? null : teacher.id)
                          }
                        >
                          Actions <FaChevronDown />
                        </button>

                        {openMenu === teacher.id && (
                          <div className={`${base}__dropdownMenu`}>
                            <button
                              type="button"
                              onClick={() => handleEdit(teacher)}
                            >
                              <FaEdit />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(teacher.id)}
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
                  <td colSpan="7" className={`${base}__emptyRow`}>
                    No teacher profiles added yet.
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

export default Teacher;
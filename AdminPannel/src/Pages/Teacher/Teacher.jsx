import React, { useMemo, useState, useEffect } from "react";
import "./Teacher.css";
import API, { IMAGE_URL } from "../../Api/axios";

import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
  FaPhoneAlt,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaImage,
  FaUsers,
  FaUserCheck,
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

  const [previewImage, setPreviewImage] =
    useState("");

  const [teachers, setTeachers] = useState([]);

  const [imageFile, setImageFile] =
    useState(null);

  const [editId, setEditId] = useState(null);

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
        (form.image
          ? IMAGE_URL + form.image
          : "") ||
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",

      name: form.name || "Mrs. Kavita Sharma",

      role:
        form.role ||
        "Principal & Academic Head",

      description:
        form.description ||
        "She leads Bright Stars Montessori with a nurturing vision that helps every child grow with confidence, curiosity, discipline, and a lifelong love for learning.",

      phone:
        form.phone || "+91 7016201096",

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

    setPreviewImage(
      URL.createObjectURL(file)
    );
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);

      formData.append("role", form.role);

      formData.append(
        "description",
        form.description
      );

      formData.append("phone", form.phone);

      formData.append("status", form.status);

      if (imageFile) {
        formData.append(
          "image",
          imageFile
        );
      }

      if (editId) {
        await API.put(
          `/teachers/${editId}`,
          formData
        );
      } else {
        await API.post(
          "/teachers",
          formData
        );
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

    setPreviewImage(
      IMAGE_URL + teacher.image
    );

    setEditId(teacher._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    try {
      await API.delete(`/teachers/${id}`);

      fetchTeachers();
    } catch (err) {
      console.log(err);
    }
  };

  const sortedTeachers = [...teachers].sort(
    (a, b) =>
      Number(a.order) - Number(b.order)
  );

  const activeTeachers = teachers.filter(
    (teacher) =>
      teacher.status === "Active"
  );

  return (
    <section className={base}>
      <div className={`${base}__shell`}>
        {/* HERO */}
        <div className={`${base}__hero`}>
          <div
            className={`${base}__heroContent`}
          >
            <span
              className={`${base}__heroLabel`}
            >
              Teacher Management
            </span>

            <h2>
              Teacher Post Management Panel
            </h2>

            <p>
              Add teacher profiles, manage
              teacher cards, preview frontend
              design and control all teacher
              data from one beautiful dashboard.
            </p>
          </div>

          <div
            className={`${base}__heroStats`}
          >
            <div
              className={`${base}__statCard`}
            >
              <div
                className={`${base}__statIcon`}
              >
                <FaUsers />
              </div>

              <div>
                <h4>{teachers.length}</h4>

                <span>
                  Total Teachers
                </span>
              </div>
            </div>

            <div
              className={`${base}__statCard`}
            >
              <div
                className={`${base}__statIcon} ${base}__statIcon--green`}
              >
                <FaUserCheck />
              </div>

              <div>
                <h4>
                  {activeTeachers.length}
                </h4>

                <span>
                  Active Teachers
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TOP GRID */}
        <div className={`${base}__topGrid`}>
          {/* FORM */}
          <div className={`${base}__card`}>
            <div
              className={`${base}__cardHeader`}
            >
              <div>
                <h3>
                  {editId
                    ? "Update Teacher Form"
                    : "Add Teacher Form"}
                </h3>

                <p>
                  Fill the details and save
                  the teacher profile.
                </p>
              </div>
            </div>

            <form
              className={`${base}__form`}
              onSubmit={handleSubmit}
            >
              {/* IMAGE */}
              <div
                className={`${base}__formGroup`}
              >
                <label>
                  Upload Teacher Image
                </label>

                <label
                  className={`${base}__uploadBox`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                  />

                  <div
                    className={`${base}__uploadContent`}
                  >
                    <div
                      className={`${base}__uploadIcon`}
                    >
                      <FaImage />
                    </div>

                    <h5>
                      {previewImage ||
                      form.image
                        ? "Change Teacher Image"
                        : "Choose Teacher Image"}
                    </h5>

                    <span>
                      Upload PNG, JPG or WEBP
                      image
                    </span>
                  </div>
                </label>
              </div>

              {/* NAME */}
              <div
                className={`${base}__formGroup`}
              >
                <label>
                  Teacher Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter teacher name"
                />
              </div>

              {/* ROLE */}
              <div
                className={`${base}__formGroup`}
              >
                <label>
                  Teacher Role / Designation
                </label>

                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="Enter teacher role"
                />
              </div>

              {/* DESCRIPTION */}
              <div
                className={`${base}__formGroup`}
              >
                <label>
                  Short Description
                </label>

                <textarea
                  name="description"
                  rows="5"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Write short description"
                />
              </div>

              {/* ROW */}
              <div
                className={`${base}__formRow`}
              >
                <div
                  className={`${base}__formGroup`}
                >
                  <label>
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                  />
                </div>

                <div
                  className={`${base}__formGroup`}
                >
                  <label>Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>
                </div>
              </div>

              {/* BUTTONS */}
              <div
                className={`${base}__buttonRow`}
              >
                <button
                  type="submit"
                  className={`${base}__primaryBtn`}
                >
                  <FaPlus />

                  {editId
                    ? "Update Teacher"
                    : "Save Teacher"}
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

          {/* PREVIEW */}
          <div className={`${base}__card`}>
            <div
              className={`${base}__cardHeader`}
            >
              <div>
                <h3>
                  Live Preview Card
                </h3>

                <p>
                  Preview the teacher card
                  before saving.
                </p>
              </div>
            </div>

            <div
              className={`${base}__previewWrap`}
            >
              <div
                className={`${base}__previewCard`}
              >
                <div
                  className={`${base}__previewImageWrap`}
                >
                  <img
                    src={displayPreview.image}
                    alt={displayPreview.name}
                    className={`${base}__previewImage`}
                  />

                  <div
                    className={`${base}__previewStatus ${
                      displayPreview.status ===
                      "Active"
                        ? `${base}__previewStatus--active`
                        : `${base}__previewStatus--inactive`
                    }`}
                  >
                    <span
                      className={`${base}__previewStatusDot`}
                    ></span>

                    {displayPreview.status}
                  </div>
                </div>

                <div
                  className={`${base}__previewContent`}
                >
                  <span
                    className={`${base}__previewTag`}
                  >
                    Teacher
                  </span>

                  <h4>
                    {displayPreview.name}
                  </h4>

                  <h5>
                    {displayPreview.role}
                  </h5>

                  <p>
                    {
                      displayPreview.description
                    }
                  </p>

                  <div
                    className={`${base}__line`}
                  ></div>

                  <div
                    className={`${base}__phone`}
                  >
                    <FaPhoneAlt />

                    <span>
                      {displayPreview.phone}
                    </span>
                  </div>

                  <div
                    className={`${base}__socials`}
                  >
                    <button>
                      <FaFacebookF />
                    </button>

                    <button>
                      <FaInstagram />
                    </button>

                    <button>
                      <FaEnvelope />
                    </button>

                    <button>
                      <FaWhatsapp />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div
          className={`${base}__tableCard`}
        >
          <div
            className={`${base}__tableHeader`}
          >
            <div
              className={`${base}__tableHeaderLeft`}
            >
              <h3>
                Teacher List Table
              </h3>

              <p>
                Manage all teacher cards
                from this list.
              </p>
            </div>

            <div
              className={`${base}__tableCount`}
            >
              <span>
                Total Teachers
              </span>

              <h4>{teachers.length}</h4>
            </div>
          </div>

          <div
            className={`${base}__tableWrap`}
          >
            <table
              className={`${base}__table`}
            >
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Designation</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {sortedTeachers.length ===
                0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className={`${base}__emptyRow`}
                    >
                      No teacher data found
                    </td>
                  </tr>
                ) : (
                  sortedTeachers.map(
                    (teacher) => (
                      <tr key={teacher._id}>
                        {/* TEACHER */}
                        <td>
                          <div
                            className={`${base}__teacherInfo`}
                          >
                            <div
                              className={`${base}__teacherImageWrap`}
                            >
                              <img
                                src={
                                  IMAGE_URL +
                                  teacher.image
                                }
                                alt={
                                  teacher.name
                                }
                                className={`${base}__tableImage`}
                              />
                            </div>

                            <div
                              className={`${base}__teacherText`}
                            >
                              <h4>
                                {teacher.name}
                              </h4>

                              <span>
                                ID :
                                {" "}
                                {teacher._id.slice(
                                  0,
                                  6
                                )}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* ROLE */}
                        <td>
                          <span
                            className={`${base}__tagMini`}
                          >
                            {teacher.role}
                          </span>
                        </td>

                        {/* PHONE */}
                        <td
                          className={`${base}__tablePhone`}
                        >
                          {teacher.phone ||
                            "N/A"}
                        </td>

                        {/* STATUS */}
                        <td>
                          <span
                            className={`${base}__statusBadge ${
                              teacher.status ===
                              "Active"
                                ? `${base}__statusBadge--active`
                                : `${base}__statusBadge--inactive`
                            }`}
                          >
                            {teacher.status}
                          </span>
                        </td>

                        {/* ACTIONS */}
                        <td>
                          <div
                            className={`${base}__tableActions`}
                          >
                            <button
                              className={`${base}__editBtn`}
                              onClick={() =>
                                handleEdit(
                                  teacher
                                )
                              }
                            >
                              <FaEdit />
                            </button>

                            <button
                              className={`${base}__deleteBtn`}
                              onClick={() =>
                                handleDelete(
                                  teacher._id
                                )
                              }
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teacher;
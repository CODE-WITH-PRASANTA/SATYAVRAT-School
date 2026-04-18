// =======================================
// EnrollSection.jsx
// FULLY CONNECTED TO BACKEND
// API: POST /api/students
// =======================================

import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import "./EnrollSection.css";
import API from "../../Api/axios";

import topImage from "../../assets/git.webp";
import bottomImage from "../../assets/git-2.webp";

const featureItems = [
  "Assign practice exercises",
  "Videos and articles",
  "Track student progress",
  "Join millions of students",
];

const EnrollSection = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    guardianName: "",
    guardianOccupation: "",
    email: "",
    guardianPhone: "",
    notifyProgress: "No",
  });

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
            ? "Yes"
            : "No"
          : value,
    }));
  };

  const handleDateChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      dob: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.dob ||
      !formData.guardianName ||
      !formData.guardianOccupation ||
      !formData.email ||
      !formData.guardianPhone
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/students", formData);

      alert("Admission Submitted Successfully");

      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        guardianName: "",
        guardianOccupation: "",
        email: "",
        guardianPhone: "",
        notifyProgress: "No",
      });
    } catch (error) {
      console.error(error);
      alert("Submission Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="enrollSection">
      <div className="enrollSection__container">

        {/* LEFT */}
        <div className="enrollSection__left">
          <div className="enrollSection__photo enrollSection__photo--top">
            <img src={topImage} alt="Student" />
          </div>

          <div className="enrollSection__photo enrollSection__photo--bottom">
            <img src={bottomImage} alt="Student" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="enrollSection__right">
          <h2 className="enrollSection__title">
            Apply For Admission
          </h2>

          <div className="enrollSection__featureGrid">
            {featureItems.map((item) => (
              <div
                className="enrollSection__feature"
                key={item}
              >
                <FaCheckCircle className="enrollSection__featureIcon" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* FORM */}
          <form
            className="enrollSection__form"
            onSubmit={handleSubmit}
          >
            <div className="enrollSection__fields">

              {/* FIRST NAME */}
              <label className="enrollSection__field">
                <span className="enrollSection__label">
                  First Name <em>(Required)</em>
                </span>

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </label>

              {/* LAST NAME */}
              <label className="enrollSection__field">
                <span className="enrollSection__label">
                  Last Name <em>(Required)</em>
                </span>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </label>

              {/* DOB */}
              <label className="enrollSection__field">
                <span className="enrollSection__label">
                  Child DOB <em>(Required)</em>
                </span>

                <div className="enrollSection__inputWrap">

                  <input
                    type="text"
                    readOnly
                    placeholder="dd-mm-yyyy"
                    value={formatDate(formData.dob)}
                  />

                  <input
                    type="date"
                    className="enrollSection__hiddenDate"
                    onChange={handleDateChange}
                  />

                  <FiCalendar className="enrollSection__calendarIcon" />
                </div>
              </label>

              {/* PARENT NAME */}
              <label className="enrollSection__field">
                <span className="enrollSection__label">
                  Parent Name <em>(Required)</em>
                </span>

                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                />
              </label>

              {/* DESIGNATION */}
              <label className="enrollSection__field">
                <span className="enrollSection__label">
                  Parent Designation <em>(Required)</em>
                </span>

                <input
                  type="text"
                  name="guardianOccupation"
                  value={formData.guardianOccupation}
                  onChange={handleChange}
                />
              </label>

              {/* EMAIL */}
              <label className="enrollSection__field">
                <span className="enrollSection__label">
                  Email <em>(Required)</em>
                </span>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>

              {/* PHONE */}
              <label className="enrollSection__field">
                <span className="enrollSection__label">
                  Phone No <em>(Required)</em>
                </span>

                <input
                  type="text"
                  name="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={handleChange}
                />
              </label>

            </div>

            {/* FOOTER */}
            <div className="enrollSection__formFooter">

              <label className="enrollSection__checkbox">
                <input
                  type="checkbox"
                  checked={
                    formData.notifyProgress === "Yes"
                  }
                  onChange={handleChange}
                  name="notifyProgress"
                />

                <span>
                  Notify your child weekly progress
                </span>
              </label>

              <button
                className="enrollSection__button"
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Apply Now"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default EnrollSection;
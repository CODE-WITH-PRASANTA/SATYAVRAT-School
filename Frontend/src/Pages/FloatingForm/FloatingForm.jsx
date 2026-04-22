import React, { useEffect, useState } from "react";
import "./FloatingForm.css";
import { FaTimes, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import API from "../../api/axios"; // ✅ IMPORTANT

const FloatingForm = () => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    setShow(true);
    setTimeout(() => setActive(true), 50);
  }, []);

  const handleClose = () => {
    setActive(false);
    setTimeout(() => setShow(false), 300);
  };

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("Name and phone are required");
      return;
    }

    try {
      await API.post("/enquiries", formData);

      alert("Enquiry submitted successfully ✅");

      // reset form
      setFormData({
        name: "",
        address: "",
        phone: "",
        message: "",
      });

      handleClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  if (!show) return null;

  return (
    <div className={`floatingform-overlay ${active ? "show" : ""}`}>
      <div className={`floatingform-container ${active ? "show" : ""}`}>

        <FaTimes className="floatingform-close" onClick={handleClose} />

        <h2 className="floatingform-title">
          SATYAVRAT VIDYA NIKETAN HIGH SCHOOL
        </h2>

        <p className="floatingform-subtitle">
          Admission & Enquiry Form
        </p>

        <p className="floatingform-desc">
          Give your child the best start in life.
        </p>

        <form className="floatingform-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Parent / Student Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address / City"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">
            Submit Enquiry
          </button>
        </form>

        <div className="floatingform-or">OR</div>

        <div className="floatingform-actions">
          <button className="call-btn">
            <FaPhoneAlt /> Call Us
          </button>

          <button className="whatsapp-btn">
            <FaWhatsapp /> WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
};

export default FloatingForm;
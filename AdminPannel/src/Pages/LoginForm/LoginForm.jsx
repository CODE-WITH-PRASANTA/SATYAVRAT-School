// src/pages/Login/LoginForm.jsx

import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [animate, setAnimate] =
    useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] =
    useState({
      username: "",
      password: "",
    });

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 200);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // ================= LOGIN API =================

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      console.log(response.data);

      // ================= SUCCESS =================

      if (response.data.success) {
        // TOKEN STORE

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "adminAuth",
          "true"
        );

        localStorage.setItem(
          "adminData",
          JSON.stringify(response.data.user)
        );

        navigate("/");
      } else {
        setError(
          response.data.message ||
            "Invalid Username or Password"
        );
      }
    } catch (err) {
      console.log(err);

      if (err.response) {
        setError(
          err.response.data.message ||
            "Login Failed"
        );
      } else {
        setError(
          "Backend Server Not Connected"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="LoginForm">
      {/* BACKGROUND SHAPES */}

      <div className="LoginForm-bgShape LoginForm-bgShape1"></div>

      <div className="LoginForm-bgShape LoginForm-bgShape2"></div>

      <div className="LoginForm-bgShape LoginForm-bgShape3"></div>

      {/* CONTAINER */}

      <div
        className={`LoginForm-container ${
          animate
            ? "LoginForm-show"
            : ""
        }`}
      >
        {/* LEFT SIDE */}

        <div className="LoginForm-left">
          <div className="LoginForm-overlay"></div>

          <div className="LoginForm-leftContent">
            <h1>Admin Panel</h1>

            <p>
              Secure School Management
              System Dashboard with fully
              protected authentication
              access.
            </p>

            <div className="LoginForm-floatingCard">
              <span>Secure Login</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="LoginForm-right">
          <form
            className="LoginForm-form"
            onSubmit={handleLogin}
          >
            {/* LOGO */}

            <div className="LoginForm-logo">
              <FaUserShield />
            </div>

            <h2>Welcome Back</h2>

            <p>
              Login to continue to Admin
              Dashboard
            </p>

            {/* ERROR MESSAGE */}

            {error && (
              <div className="LoginForm-error">
                {error}
              </div>
            )}

            {/* USERNAME */}

            <div className="LoginForm-inputGroup">
              <FaUserShield className="LoginForm-inputIcon" />

              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}

            <div className="LoginForm-inputGroup">
              <FaLock className="LoginForm-inputIcon" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="LoginForm-eyeBtn"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className={`LoginForm-submit ${
                loading
                  ? "LoginForm-loading"
                  : ""
              }`}
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Login"}
            </button>

            {/* DEMO */}

            <div className="LoginForm-demoCredentials">
              <h4>Demo Credentials</h4>

              <span>
                Username : satyavrat
              </span>

              <span>
                Password : 123456
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
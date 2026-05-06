import React, {
  useEffect,
  useState,
} from "react";

import "./LoginForm.css";

import { useNavigate } from "react-router-dom";

import {
  FaUserShield,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";

const LoginForm = () => {
  const navigate = useNavigate();

  // ================= STATES =================

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [animate, setAnimate] =
    useState(false);

  const [loginSuccess, setLoginSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      username: "",
      password: "",
    });

  // ================= PAGE ANIMATION =================

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 200);

    return () =>
      clearTimeout(timer);
  }, []);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // ================= HANDLE LOGIN =================

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    setTimeout(() => {
      const validUsername =
        "satyavrat";

      const validPassword =
        "123456";

      if (
        formData.username ===
          validUsername &&
        formData.password ===
          validPassword
      ) {
        // SAVE LOGIN
        localStorage.setItem(
          "adminAuth",
          "true"
        );

        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            username:
              validUsername,
          })
        );

        // SUCCESS ANIMATION
        setLoginSuccess(true);

        setTimeout(() => {
          navigate("/");
        }, 1800);
      } else {
        setError(
          "Invalid Username or Password"
        );

        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="LoginForm">
      {/* ================= BG SHAPES ================= */}

      <div className="LoginForm-bgShape LoginForm-bgShape1"></div>

      <div className="LoginForm-bgShape LoginForm-bgShape2"></div>

      <div className="LoginForm-bgShape LoginForm-bgShape3"></div>

      {/* ================= MAIN CONTAINER ================= */}

      <div
        className={`LoginForm-container ${
          animate
            ? "LoginForm-show"
            : ""
        } ${
          loginSuccess
            ? "LoginForm-success"
            : ""
        }`}
      >
        {/* ================= LEFT SECTION ================= */}

        <div className="LoginForm-left">
          <div className="LoginForm-overlay"></div>

          {/* FLOATING PARTICLES */}

          <span className="LoginForm-particle particle1"></span>
          <span className="LoginForm-particle particle2"></span>
          <span className="LoginForm-particle particle3"></span>

          {/* ANIMATED IMAGE */}

          <div className="LoginForm-animatedImage">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="dashboard"
            />
          </div>

          {/* CONTENT */}

          <div className="LoginForm-leftContent">
            <h1>Admin Panel</h1>

            <p>
              Secure School
              Management System
              Dashboard with fully
              protected
              authentication access.
            </p>

            <div className="LoginForm-floatingCard">
              <span>
                Secure Login
              </span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}

        <div className="LoginForm-right">
          <form
            className="LoginForm-form"
            onSubmit={
              handleLogin
            }
          >
            {/* SUCCESS */}

            {loginSuccess ? (
              <div className="LoginForm-successBox">
                <FaCheckCircle />

                <h2>
                  Login Successful
                </h2>

                <p>
                  Redirecting to
                  Dashboard...
                </p>
              </div>
            ) : (
              <>
                {/* LOGO */}

                <div className="LoginForm-logo">
                  <FaUserShield />
                </div>

                {/* TITLE */}

                <h2>
                  Welcome Back
                </h2>

                <p>
                  Login to continue
                  to Admin Dashboard
                </p>

                {/* ERROR */}

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
                    value={
                      formData.username
                    }
                    onChange={
                      handleChange
                    }
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
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
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
                  disabled={loading}
                  className={`LoginForm-submit ${
                    loading
                      ? "LoginForm-loading"
                      : ""
                  }`}
                >
                  {loading
                    ? "Signing In..."
                    : "Login"}
                </button>

                {/* DEMO */}

                <div className="LoginForm-demoCredentials">
                  <h4>
                    Demo Credentials
                  </h4>

                  <span>
                    Username :
                    satyavrat
                  </span>

                  <span>
                    Password :
                    123456
                  </span>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
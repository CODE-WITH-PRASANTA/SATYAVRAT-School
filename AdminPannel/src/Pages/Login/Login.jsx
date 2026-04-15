import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../api/axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";
import "./Login.css";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("admin", JSON.stringify(res.data.admin));

        Swal.fire({
          title: "Login Successful 🎉",
          text: "Welcome back!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(from, { replace: true });
      }
    } catch (err) {
      Swal.fire(
        "Error ❌",
        err.response?.data?.message || "Invalid credentials",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Admin Login 🔐</h2>

        <form onSubmit={handleSubmit} className="login-form">
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />

          {/* PASSWORD */}
          <div className="login-password">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />

            <span
              onClick={() => setShowPass(!showPass)}
              className="login-eye"
            >
              {showPass ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* BUTTON */}
          <button disabled={loading} className="login-btn">
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
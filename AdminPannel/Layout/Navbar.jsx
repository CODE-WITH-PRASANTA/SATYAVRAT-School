import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

// import "./Navbar.css";

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const [openProfile, setOpenProfile] =
    useState(false);

  const navigate = useNavigate();

  // ================= TOGGLE SIDEBAR =================

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // ================= LOGOUT =================

  const handleLogout = () => {
    // REMOVE LOGIN DATA
    localStorage.removeItem(
      "adminAuth"
    );

    localStorage.removeItem(
      "adminUser"
    );

    // CLOSE DROPDOWN
    setOpenProfile(false);

    // REDIRECT TO LOGIN
    navigate("/login");
  };

  // ================= GO TO PROFILE =================

  const handleGoToProfile = () => {
    navigate("/admin/profile");

    setOpenProfile(false);
  };

  // ================= GO TO SETTINGS =================

  const handleGoToSettings = () => {
    navigate("/admin/settings");

    setOpenProfile(false);
  };

  return (
    <header className="admin-navbar">
      {/* ================= LEFT ================= */}

      <div className="navbar-left">
        <button
          className="menu-btn"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <h2 className="navbar-title">
          Admin Dashboard
        </h2>
      </div>

      {/* ================= RIGHT ================= */}

      <div className="navbar-profile">
        <img
          src="https://i.pravatar.cc/40"
          alt="user"
          className="profile-img"
          onClick={() =>
            setOpenProfile(
              !openProfile
            )
          }
        />

        {/* ================= DROPDOWN ================= */}

        {openProfile && (
          <div className="profile-dropdown">
            {/* PROFILE */}

            <button
              className="dropdown-item"
              onClick={
                handleGoToProfile
              }
            >
              <FaUser />
              Profile
            </button>

            {/* SETTINGS */}

            <button
              className="dropdown-item"
              onClick={
                handleGoToSettings
              }
            >
              <FaCog />
              Settings
            </button>

            {/* LOGOUT */}

            <button
              onClick={
                handleLogout
              }
              className="dropdown-item logout"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
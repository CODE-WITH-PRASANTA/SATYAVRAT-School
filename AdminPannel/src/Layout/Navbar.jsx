import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
  FaBars,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import "./Navbar.css";

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
    // REMOVE TOKEN
    localStorage.removeItem(
      "adminToken"
    );

    // REMOVE OLD AUTH ALSO
    localStorage.removeItem(
      "adminAuth"
    );

    // CLOSE DROPDOWN
    setOpenProfile(false);

    // REDIRECT LOGIN
    navigate("/login");

    // OPTIONAL REFRESH
    window.location.reload();
  };

  // ================= PROFILE =================

  const handleGoToProfile = () => {
    navigate("/admin/profile");

    setOpenProfile(false);
  };

  // ================= SETTINGS =================

  const handleGoToSettings = () => {
    navigate("/admin/settings");

    setOpenProfile(false);
  };

  // ================= CLOSE DROPDOWN =================

  useEffect(() => {
    const closeDropdown = () => {
      setOpenProfile(false);
    };

    window.addEventListener(
      "click",
      closeDropdown
    );

    return () => {
      window.removeEventListener(
        "click",
        closeDropdown
      );
    };
  }, []);

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

      <div
        className="navbar-profile"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* PROFILE IMAGE */}

        <img
          src="https://i.pravatar.cc/100"
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
              onClick={handleLogout}
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
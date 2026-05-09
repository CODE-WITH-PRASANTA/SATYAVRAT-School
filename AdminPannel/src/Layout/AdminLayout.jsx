import { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar/Sidebar";

import Navbar from "./Navbar";

import { FaSignOutAlt } from "react-icons/fa";

import "./AdminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  // ================= SIDEBAR =================

  const [sidebarOpen, setSidebarOpen] = useState(
    window.innerWidth > 1024
  );

  // ================= USER INFO =================

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  // ================= RESPONSIVE =================

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");

    navigate("/login");
  };

  // ================= CLOSE MENU =================

  useEffect(() => {
    const closeMenu = () => {
      setShowProfileMenu(false);
    };

    window.addEventListener("click", closeMenu);

    return () =>
      window.removeEventListener(
        "click",
        closeMenu
      );
  }, []);

  return (
    <div className="admin-layout">
      {/* ================= SIDEBAR ================= */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* ================= MAIN CONTENT ================= */}

      <div className="admin-content">
        {/* ================= NAVBAR ================= */}

        <div className="AdminLayout-navbarWrapper">
          <Navbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          {/* ================= PROFILE ================= */}

          <div
            className="AdminLayout-profile"
            onClick={(e) => {
              e.stopPropagation();

              setShowProfileMenu(
                !showProfileMenu
              );
            }}
          >
            <div className="AdminLayout-avatar">
              S
            </div>

            <div className="AdminLayout-userInfo">
              <h4>Satyavrat</h4>

              <span>Administrator</span>
            </div>

            {/* ================= DROPDOWN ================= */}

            {showProfileMenu && (
              <div className="AdminLayout-dropdown">
                <button
                  className="AdminLayout-logoutBtn"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />

                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= PAGE CONTENT ================= */}

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
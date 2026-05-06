import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";

// Font Awesome
import {
  FaHome,
  FaNewspaper,
  FaImages,
  FaChalkboardTeacher,
  FaUserTie,
  FaCommentDots,
  FaChevronDown,
  FaMoneyBillWave,
  FaUserGraduate,
  FaClipboardList,
  FaQuoteLeft,
} from "react-icons/fa";

// Feather
import {
  FiEdit,
  FiLayers,
  FiBriefcase,
  FiCreditCard,
  FiCheckSquare,
  FiBookOpen,
} from "react-icons/fi";

import "./Sidebar.css";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const handleMenuClick = () => {
    if (isMobile) setSidebarOpen(false);
  };

  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },

    { name: "Cold Lead", path: "/admin/cold-lead", icon: <FaChalkboardTeacher /> },
    { name: "Cold Lead Table", path: "/admin/cold-lead-table", icon: <FaChalkboardTeacher /> },

    { name: "News Posting", path: "/admin/newsposting", icon: <FaNewspaper /> },
    { name: "Teacher Posting", path: "/admin/teacherposting", icon: <FaChalkboardTeacher /> },
    { name: "Testimonial", path: "/admin/testimonial", icon: <FaQuoteLeft /> },

    { name: "Gallery posting", path: "/admin/gallery", icon: <FaMoneyBillWave /> },
    { name: "Admission Table", path: "/admin/Admission-Table", icon: <FaImages /> },

    { type: "section", label: "ERP Solution" },

    {
      name: "Student Hub",
      icon: <FaUserGraduate />,
      submenu: [
        { name: "Student Admission", path: "/student/admission", icon: <FaClipboardList /> },
        { name: "Student Details", path: "/student/admission/details", icon: <FaUserTie /> },
      ],
    },

    {
      name: "Student Paytrack",
      icon: <FaCommentDots />,
      submenu: [
        { name: "Fee Collect", path: "/fee-collect", icon: <FaMoneyBillWave /> },
        { name: "Fee Type", path: "/fee-type", icon: <FaMoneyBillWave /> },
      ],
    },

    {
      name: "Class Post",
      path: "/class-post",
      icon: <FiBookOpen />,
    },

    {
      name: "Subject Post",
      path: "/subject-post",
      icon: <FiEdit />,
    },

    {
      name: "Classwise Subject",
      path: "/classwise-subject",
      icon: <FiLayers />,
    },

    {
      name: "Exam Result Desk",
      icon: <FiBriefcase />,
      submenu: [
        { name: "Exam Result", path: "/exam-result" },
        { name: "Exam Score Manager", path: "/exam-result-manager" },
        { name: "Type of Exam Publish", path: "/exam-type" },
        { name: "Progress Report Card", path: "/exam-report" },
      ],
    },

    {
      name: "Attendance",
      icon: <FiCheckSquare />,
      submenu: [
        { name: "Student Attendance", path: "/attendance/student-attendance" },
        { name: "Student Leave", path: "/attendance/student-leave" },
        { name: "Attendance Report", path: "/attendance/attendance-report" },
      ],
    },

    {
      name: "Expense",
      icon: <FiCreditCard />,
      submenu: [
        { name: "Add Expense", path: "/expense/details" },
        { name: "Expense Search", path: "/expense-search" },
        { name: "Expense Head", path: "/expense-head" },
      ],
    },
  ];

  return (
    <>
      {sidebarOpen && isMobile && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "close"}`}>
        {/* HEADER */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-brand-icon">A</div>

            {sidebarOpen && (
              <div className="sidebar-brand-text">
                <h2>Admin Panel</h2>
                <p>Management System</p>
              </div>
            )}
          </div>
        </div>

        {/* MENU */}
        <nav className="sidebar-menu">
          {menu.map((item, index) => {
            if (item.type === "section") {
              return sidebarOpen ? (
                <div className="sidebar-section" key={index}>
                  {item.label}
                </div>
              ) : null;
            }

            return (
              <div className="sidebar-menu-item" key={item.name}>
                {item.submenu ? (
                  <>
                    {/* BUTTON */}
                    <button
                      className={`menu-btn ${
                        openMenu === item.name ? "expanded" : ""
                      }`}
                      onClick={() => toggleMenu(item.name)}
                    >
                      <div className="menu-main">
                        <span className="menu-icon">{item.icon}</span>
                        {sidebarOpen && (
                          <span className="menu-text">{item.name}</span>
                        )}
                      </div>

                      {sidebarOpen && (
                        <span
                          className={`menu-arrow ${
                            openMenu === item.name ? "rotate" : ""
                          }`}
                        >
                          <FaChevronDown />
                        </span>
                      )}
                    </button>

                    {/* SUBMENU */}
                    {openMenu === item.name && sidebarOpen && (
                      <div className="submenu">
                        {item.submenu.map((sub) => (
                          <NavLink
                            key={sub.path}
                            to={sub.path}
                            onClick={handleMenuClick}
                            className={({ isActive }) =>
                              `submenu-link ${isActive ? "active" : ""}`
                            }
                          >
                            {sub.icon && (
                              <span className="submenu-icon">
                                {sub.icon}
                              </span>
                            )}
                            <span className="submenu-text">{sub.name}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={handleMenuClick}
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active" : ""}`
                    }
                  >
                    <div className="menu-main">
                      <span className="menu-icon">{item.icon}</span>
                      {sidebarOpen && (
                        <span className="menu-text">{item.name}</span>
                      )}
                    </div>
                  </NavLink>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
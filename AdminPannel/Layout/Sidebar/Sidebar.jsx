import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";

/* ================= ICONS ================= */

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
  FaComments,
  FaBook,
} from "react-icons/fa";

import {
  FiEdit,
  FiLayers,
  FiBriefcase,
  FiCreditCard,
  FiCheckSquare,
  FiBookOpen,
} from "react-icons/fi";

import "./Sidebar.css";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const [openMenu, setOpenMenu] =
    useState(null);

  const [isMobile, setIsMobile] =
    useState(window.innerWidth <= 1024);

  /* ================= RESPONSIVE ================= */

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.innerWidth <= 1024
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  /* ================= TOGGLE ================= */

  const toggleMenu = (name) => {
    setOpenMenu(
      openMenu === name ? null : name
    );
  };

  const handleMenuClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  /* ================= MENU ================= */

  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaHome />,
    },

    {
      name: "Cold Lead",
      path: "/admin/cold-lead",
      icon: <FaChalkboardTeacher />,
    },

    {
      name: "Cold Lead Table",
      path: "/admin/cold-lead-table",
      icon: <FaChalkboardTeacher />,
    },

    /* ================= NEWS MANAGEMENT ================= */

    {
      name: "News Management",
      icon: <FaNewspaper />,

      submenu: [
        {
          name: "News Posting",
          path: "/admin/newsposting",
          icon: <FaNewspaper />,
        },

        {
          name: "Comment Management",
          path: "/admin/comment-management",
          icon: <FaComments />,
        },
      ],
    },

    /* ================= TEACHER ================= */

    {
      name: "Teacher Posting",
      path: "/admin/teacherposting",
      icon: <FaChalkboardTeacher />,
    },

    /* ================= TESTIMONIAL ================= */

    {
      name: "Testimonial",
      path: "/admin/testimonial",
      icon: <FaQuoteLeft />,
    },

    /* ================= GALLERY ================= */

    {
      name: "Gallery Posting",
      path: "/admin/gallery",
      icon: <FaImages />,
    },

    /* ================= ADMISSION ================= */

    {
      name: "Admission Table",
      path: "/admin/Admission-Table",
      icon: <FaImages />,
    },

    {
      name: "Class Post",
      path: "/class/post",
      icon: <FaBook />,
    },

    /* ================= ERP ================= */

    {
      type: "section",
      label: "ERP Solution",
    },

    /* ================= STUDENT HUB ================= */

    {
      name: "Student Hub",
      icon: <FaUserGraduate />,

      submenu: [
        {
          name: "Student Admission",
          path: "/student/admission",
          icon: <FaClipboardList />,
        },

        {
          name: "Student Details",
          path:
            "/student/admission/details",
          icon: <FaUserTie />,
        },
      ],
    },

    /* ================= PAYTRACK ================= */

    {
      name: "Student Paytrack",
      icon: <FaCommentDots />,

      submenu: [
        {
          name: "Fee Collect",
          path: "/fee-collect",
          icon: <FaMoneyBillWave />,
        },

        {
          name: "Fee Type",
          path: "/fee-type",
          icon: <FaMoneyBillWave />,
        },
      ],
    },

    /* ================= CLASS MANAGEMENT ================= */

    {
      name: "Class Management",
      path: "/class-post",
      icon: <FiBookOpen />,
    },

    /* ================= CLASS POST ================= */

  

    /* ================= SUBJECT ================= */

    {
      name: "Subject Post",
      path: "/subject-post",
      icon: <FiEdit />,
    },

    /* ================= CLASSWISE SUBJECT ================= */

    {
      name: "Classwise Subject",
      path: "/classwise-subject",
      icon: <FiLayers />,
    },

    /* ================= EXAM ================= */

    {
      name: "Exam Result Desk",
      icon: <FiBriefcase />,

      submenu: [
        {
          name: "Exam Result",
          path: "/exam-result",
        },

        {
          name: "Exam Score Manager",
          path:
            "/exam-result-manager",
        },

        {
          name: "Type of Exam Publish",
          path: "/exam-type",
        },

        {
          name: "Progress Report Card",
          path: "/exam-report",
        },
      ],
    },

    /* ================= ATTENDANCE ================= */

    {
      name: "Attendance",
      icon: <FiCheckSquare />,

      submenu: [
        {
          name: "Student Attendance",
          path:
            "/attendance/student-attendance",
        },

        {
          name: "Student Leave",
          path:
            "/attendance/student-leave",
        },

        {
          name: "Attendance Report",
          path:
            "/attendance/attendance-report",
        },
      ],
    },

    /* ================= EXPENSE ================= */

    {
      name: "Expense",
      icon: <FiCreditCard />,

      submenu: [
        {
          name: "Add Expense",
          path: "/expense/details",
        },

        {
          name: "Expense Search",
          path: "/expense-search",
        },

        {
          name: "Expense Head",
          path: "/expense-head",
        },
      ],
    },
  ];

  /* ================= JSX ================= */

  return (
    <>
      {sidebarOpen && isMobile && (
        <div
          className="sidebar-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "open" : "close"
        }`}
      >

        {/* HEADER */}
        <div className="sidebar-header">

          <div className="sidebar-brand">

            <div className="sidebar-brand-icon">
              A
            </div>

            {sidebarOpen && (
              <div className="sidebar-brand-text">
                <h2>Admin Panel</h2>
                <p>
                  Management System
                </p>
              </div>
            )}

          </div>

        </div>

        {/* MENU */}
        <nav className="sidebar-menu">

          {menu.map((item, index) => {

            /* SECTION */
            if (item.type === "section") {
              return sidebarOpen ? (
                <div
                  className="sidebar-section"
                  key={index}
                >
                  {item.label}
                </div>
              ) : null;
            }

            return (
              <div
                className="sidebar-menu-item"
                key={item.name}
              >

                {/* SUBMENU */}
                {item.submenu ? (
                  <>

                    <button
                      className={`menu-btn ${
                        openMenu === item.name
                          ? "expanded"
                          : ""
                      }`}
                      onClick={() =>
                        toggleMenu(item.name)
                      }
                    >

                      <div className="menu-main">

                        <span className="menu-icon">
                          {item.icon}
                        </span>

                        {sidebarOpen && (
                          <span className="menu-text">
                            {item.name}
                          </span>
                        )}

                      </div>

                      {sidebarOpen && (
                        <span
                          className={`menu-arrow ${
                            openMenu === item.name
                              ? "rotate"
                              : ""
                          }`}
                        >
                          <FaChevronDown />
                        </span>
                      )}

                    </button>

                    {/* DROPDOWN */}
                    {openMenu === item.name &&
                      sidebarOpen && (
                        <div className="submenu">

                          {item.submenu.map(
                            (sub) => (

                              <NavLink
                                key={sub.path}
                                to={sub.path}
                                onClick={
                                  handleMenuClick
                                }
                                className={({
                                  isActive,
                                }) =>
                                  `submenu-link ${
                                    isActive
                                      ? "active"
                                      : ""
                                  }`
                                }
                              >

                                {sub.icon && (
                                  <span className="submenu-icon">
                                    {sub.icon}
                                  </span>
                                )}

                                <span className="submenu-text">
                                  {sub.name}
                                </span>

                              </NavLink>

                            )
                          )}

                        </div>
                      )}

                  </>
                ) : (

                  /* NORMAL MENU */
                  <NavLink
                    to={item.path}
                    onClick={handleMenuClick}
                    className={({ isActive }) =>
                      `menu-link ${
                        isActive
                          ? "active"
                          : ""
                      }`
                    }
                  >

                    <div className="menu-main">

                      <span className="menu-icon">
                        {item.icon}
                      </span>

                      {sidebarOpen && (
                        <span className="menu-text">
                          {item.name}
                        </span>
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
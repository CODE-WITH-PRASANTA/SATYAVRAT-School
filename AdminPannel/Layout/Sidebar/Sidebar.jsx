import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaNewspaper,
  FaImages,
  FaUserTie,
  FaComments,
  FaMoneyBillWave,
  FaUserGraduate,
  FaClipboardList,
  FaQuoteLeft,
  FaBullhorn,
  FaBook,
  FaUserPlus,
  FaUsers,
  FaWallet,
  FaTags,
  FaRupeeSign,
  FaLayerGroup,
  FaListAlt,
  FaPercentage,
  FaSitemap,
  FaHandHoldingUsd,
  FaMoneyCheckAlt,
  FaBan,
  FaDatabase,
  FaEdit,
  FaChalkboardTeacher,
  FaChevronDown, // ADD THIS
} from "react-icons/fa";

import {
  FiCheckSquare, // ADD THIS
  FiCreditCard, // ADD THIS
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

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const handleMenuClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

 const menu = [
  {
    name: "Dashboard",
    path: "/",
    icon: <FaHome />,
  },

  {
    name: "Lead Management",
    path: "/admin/cold-lead",
    icon: <FaUserPlus />,
  },

  {
    name: "Lead Records",
    path: "/admin/cold-lead-table",
    icon: <FaDatabase />,
  },

  {
    name: "News & Updates",
    icon: <FaNewspaper />,
    submenu: [
      {
        name: "Publish News",
        path: "/admin/newsposting",
        icon: <FaEdit />,
      },
      {
        name: "Manage Comments",
        path: "/admin/comment-management",
        icon: <FaComments />,
      },
    ],
  },

  {
    name: "Faculty Management",
    path: "/admin/teacherposting",
    icon: <FaChalkboardTeacher />,
  },

  {
    name: "Testimonials",
    path: "/admin/testimonial",
    icon: <FaQuoteLeft />,
  },

  {
    name: "Media Gallery",
    path: "/admin/gallery",
    icon: <FaImages />,
  },

  {
    name: "Advertisements",
    path: "/admin/advites",
    icon: <FaBullhorn />,
  },

  {
    name: "Admissions",
    path: "/admin/Admission-Table",
    icon: <FaUserGraduate />,
  },

  {
    name: "Class Management",
    path: "/class/post",
    icon: <FaBook />,
  },

  {
    type: "section",
    label: "ERP MODULES",
  },

  {
    name: "Student",
    icon: <FaUserGraduate />,
    submenu: [
      {
        name: "New Admission",
        path: "/student/admission",
        icon: <FaUserPlus />,
      },
      {
        name: "Student Directory",
        path: "/student/admission/details",
        icon: <FaUsers />,
      },
    ],
  },

  {
    name: "Fee Collection",
    icon: <FaWallet />,
    submenu: [
      {
        name: "Collect Fees",
        path: "/fee-collect",
        icon: <FaMoneyBillWave />,
      },
      {
        name: "Wallet",
        path: "/wallet",
        icon: <FaWallet />,
      },
      {
        name: "Fee Types",
        path: "/fee-type",
        icon: <FaTags />,
      },
    ],
  },

  {
    name: "Fee Configuration",
    icon: <FaRupeeSign />,
    submenu: [
      {
        name: "Fee Groups",
        path: "/fee-group",
        icon: <FaLayerGroup />,
      },
      {
        name: "Fee Heads",
        path: "/fee-head",
        icon: <FaListAlt />,
      },
      
      {
        name: "Fee Structure",
        path: "/fee-structure",
        icon: <FaSitemap />,
      },
      
      {
        name: "Fee Entries",
        path: "/fee-entry",
        icon: <FaMoneyCheckAlt />,
      },
      {
        name: "Cancelled Fees",
        path: "/cancel-fee",
        icon: <FaBan />,
      },
      
    ],
  },

  {
    name: "Attendance",
    icon: <FiCheckSquare />,
    submenu: [
      {
        name: "Student Attendance",
        path: "/attendance/student-attendance",
      },
      {
        name: "Leave Management",
        path: "/attendance/student-leave",
      },
      {
        name: "Attendance Reports",
        path: "/attendance/attendance-report",
      },
    ],
  },

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
        name: "Expense Categories",
        path: "/expense-head",
      },
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

      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "open" : "close"
        }`}
      >

        <div className="sidebar-header">

          <div className="sidebar-brand">

            <div className="sidebar-brand-icon">
              A
            </div>

            {sidebarOpen && (
              <div className="sidebar-brand-text">
                <h2>Admin Panel</h2>
                <p>Management System</p>
              </div>
            )}

          </div>

        </div>

        <nav className="sidebar-menu">

          {menu.map((item, index) => {

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

                    {openMenu === item.name &&
                      sidebarOpen && (
                        <div className="submenu">

                          {item.submenu.map((sub) => (

                            <NavLink
                              key={sub.path}
                              to={sub.path}
                              onClick={handleMenuClick}
                              className={({ isActive }) =>
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

                          ))}

                        </div>
                      )}

                  </>
                ) : (

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
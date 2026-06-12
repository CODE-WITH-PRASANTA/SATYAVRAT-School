import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaNewspaper,
  FaImages,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaUserTie,
  FaCommentDots,
  FaComments,
  FaChevronDown,
  FaAddressBook,
  FaMoneyBillWave,
  FaUserGraduate,
  FaClipboardList,
  FaQuoteLeft,
  FiFileText,
  FiDatabase,
  FiMessageCircle,
  FiCheckSquare,
  FiActivity,
  FiCreditCard,
  FiTrendingUp,
  FiMessageSquare,
  FiBookOpen,
  FiEdit,
  FiLayers,
  FiBriefcase,
} from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },

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
    {
      name: "Teacher Posting",
      path: "/admin/teacherposting",
      icon: <FaChalkboardTeacher />,
    },
    { name: "Testimonial", path: "/admin/testimonial", icon: <FaQuoteLeft /> },

    {
      name: "Gallery posting",
      path: "/admin/gallery",
      icon: <FaMoneyBillWave />,
    },
    {
      name: "Admission Table",
      path: "/admin/Admission-Table",
      icon: <FaImages />,
    },

    // {
    //   name: "Gallery",
    //   icon: <FaImages />,
    //   submenu: [
    //     { name: "Gallery Post", path: "/admin/gallery-post", icon: <FaImages /> },
    //     { name: "Gallery View", path: "/admin/gallery-view", icon: <FaImages /> },
    //   ],
    // },

    // { name: "Event", path: "/admin/event", icon: <FaCalendarAlt /> },
    // { name: "Classes", path: "/admin/classes", icon: <FaChalkboardTeacher /> },
    // { name: "Contact", path: "/admin/contact", icon: <FaAddressBook /> },
    // { name: "Admission", path: "/admin/admission", icon: <FaClipboardList /> },
    // { name: "Fees", path: "/admin/fees", icon: <FaMoneyBillWave /> },

    {
      type: "section",
      label: "ERP Solution",
    },

    // {
    //   name: "Student Hub",
    //   icon: <FaUserGraduate />,
    //   submenu: [
    //     {
    //       name: "Student Admission",
    //       path: "/student/admission",
    //       icon: <FaClipboardList />,
    //     },
    //     {
    //       name: "Student Details",
    //       path: "/student/admission/details",
    //       icon: <FaUserTie />,
    //     },
    //   ],
    // },

    {
      name: "Student Paytrack",
      icon: <FaCommentDots />,
      submenu: [
        {
          name: "Fee Collect",
          path: "/fee-collect",
          icon: <FaMoneyBillWave />,
        },
        { name: "Fee Type", path: "/fee-type", icon: <FaMoneyBillWave /> },
      ],
    },

    {
      name: "fees Management",
      icon: <FaImages />,
      submenu: [
<<<<<<< HEAD
=======
       
>>>>>>> 04475c0c806d4c82fa3cdbb632ec33046a4e9c36
        { name: "Fee Group", path: "/admin/feegroup" },
        { name: "Fee Head", path: "/admin/feehead" },
        { name: "Fee Structure", path: "/admin/feestructure" },
        { name: "Fee Entry", path: "/admin/feeentry" },
      ],
    },

    // {
    //   name: "Fees",
    //   icon: <FaImages />,
    //   submenu: [
    //     { name: "Fees", path: "/admin/fees", icon: <FaMoneyBillWave /> },
    //     { name: "Fee Group", path: "/admin/feegroup" },
    //     { name: "Fee Head", path: "/admin/feehead" },
    //     { name: "Fee Structure", path: "/admin/feestructure" },
    //     { name: "Fee Entry", path: "/admin/feeentry" },
    //   ],
    // },

    {
      label: "Class Post",
      icon: FiBookOpen,
      path: "/class-post",
    },

    {
      label: "Subject Post",
      icon: FiEdit,
      path: "/subject-post",
    },
    {
      label: "Classwise Subject",
      icon: FiLayers,
      path: "/classwise-subject",
    },
    { type: "divider" },

    {
      label: "Exam Result Desk",
      icon: FiBriefcase,
      children: [
        { label: "Exam Result", path: "/exam-result" },
        { label: "Exam Score Manager", path: "/exam-result-manager" },
        { label: "Type of Exam Publish", path: "/exam-type" },
        { label: "Progress Report Card", path: "/exam-report" },
      ],
    },
    {
      label: "Attendance",
      icon: FiCheckSquare,
      children: [
        { label: "Student Attendance", path: "/attendance/student-attendance" },
        { label: "Student Leave", path: "/attendance/student-leave" },
        { label: "Attendance Report", path: "/attendance/attendance-report" },
      ],
    },

    {
      label: "Expense",
      icon: FiCreditCard,
      children: [
        { label: "Add Expense", path: "/expense/details" },
        { label: "Expense Search", path: "/expense-search" },
        { label: "Expense Head", path: "/expense-head" },
      ],
    },
  ];

  const [openMenu, setOpenMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const handleMenuClick = () => {
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <>
      {sidebarOpen && isMobile && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "close"}`}>
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

        <nav className="sidebar-menu">
          {menu.map((item, index) => {
            // Section
            if (item.type === "section") {
              return sidebarOpen ? (
                <div className="sidebar-section" key={`${item.label}-${index}`}>
                  {item.label}
                </div>
              ) : null;
            }

            // Divider
            if (item.type === "divider") {
              return (
                <hr key={`divider-${index}`} className="sidebar-divider" />
              );
            }

            const itemName = item.name || item.label;
            const subItems = item.submenu || item.children;

            return (
              <div
                className="sidebar-menu-item"
                key={itemName || `menu-${index}`}
              >
                {subItems ? (
                  <>
                    <button
                      type="button"
                      className={`menu-btn ${
                        openMenu === itemName ? "expanded" : ""
                      }`}
                      onClick={() => toggleMenu(itemName)}
                    >
                      <div className="menu-main">
                        <span className="menu-icon">
                          {React.isValidElement(item.icon)
                            ? item.icon
                            : item.icon && <item.icon />}
                        </span>

                        {sidebarOpen && (
                          <span className="menu-text">{itemName}</span>
                        )}
                      </div>

                      {sidebarOpen && (
                        <span
                          className={`menu-arrow ${
                            openMenu === itemName ? "rotate" : ""
                          }`}
                        >
                          <FaChevronDown />
                        </span>
                      )}
                    </button>

                    {openMenu === itemName && sidebarOpen && (
                      <div className="submenu">
                        {subItems.map((sub) => {
                          const subName = sub.name || sub.label;

                          return (
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
                                  {React.isValidElement(sub.icon) ? (
                                    sub.icon
                                  ) : (
                                    <sub.icon />
                                  )}
                                </span>
                              )}

                              <span className="submenu-text">{subName}</span>
                            </NavLink>
                          );
                        })}
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
                      <span className="menu-icon">
                        {React.isValidElement(item.icon)
                          ? item.icon
                          : item.icon && <item.icon />}
                      </span>

                      {sidebarOpen && (
                        <span className="menu-text">{itemName}</span>
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

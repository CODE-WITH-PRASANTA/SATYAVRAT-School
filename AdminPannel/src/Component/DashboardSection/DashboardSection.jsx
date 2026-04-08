import React, { useState, useEffect, useRef } from "react";
import "./DashboardSection.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTimes, FaEdit } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

/* ================= DROPDOWN ================= */
const Dropdown = () => (
  <div className="dashSec-dropdownMenu">
    <div className="dashSec-dropdownItem"><FaTimes /> Close</div>
    <div className="dashSec-dropdownItem"><FaEdit /> Edit</div>
    <div className="dashSec-dropdownItem"><FiRefreshCw /> Refresh</div>
  </div>
);

const DashboardSection = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  /* ================= CALENDAR ================= */
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    let dates = [];

    for (let i = 0; i < firstDay; i++) dates.push("");
    for (let i = 1; i <= totalDays; i++) dates.push(i);

    return dates;
  };

  const changeMonth = (dir) => {
    setCurrentDate(
      new Date(currentDate.setMonth(currentDate.getMonth() + dir))
    );
  };

  /* ================= NOTICE DATA ================= */
  const notices = [
    "Great School manage meneesom.",
    "Great School manage mesom text of printing.",
    "Great School manage printing.",
    "School annual function update.",
    "New admission started.",
    "Holiday notice for festival.",
    "Exam schedule released.",
    "Sports day announcement.",
    "Library update notice.",
    "Fee submission reminder."
  ];

  return (
    <div className="dashSec-wrapper">

      {/* ================= CALENDAR ================= */}
      <div className="dashSec-card">
        <div className="dashSec-header">
          <h3>Event Calender</h3>
          <div ref={openMenu === "cal" ? menuRef : null}>
            <BsThreeDotsVertical onClick={() => toggleMenu("cal")} />
            {openMenu === "cal" && <Dropdown />}
          </div>
        </div>

        <div className="dashSec-calTop">
          <h4>
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h4>
          <div>
            <button onClick={() => changeMonth(-1)}>‹</button>
            <button onClick={() => changeMonth(1)}>›</button>
          </div>
        </div>

        <div className="dashSec-daysRow">
          {days.map((d) => <span key={d}>{d}</span>)}
        </div>

        <div className="dashSec-datesGrid">
          {getDays().map((d, i) => (
            <div
              key={i}
              className={`dashSec-date ${
                d === today.getDate() &&
                currentDate.getMonth() === today.getMonth()
                  ? "active"
                  : ""
              }`}
            >
              {d}
            </div>
          ))}
        </div>
      </div>

      {/* ================= TRAFFIC ================= */}
      <div className="dashSec-card">
        <div className="dashSec-header">
          <h3>Website Traffic</h3>
          <div ref={openMenu === "traf" ? menuRef : null}>
            <BsThreeDotsVertical onClick={() => toggleMenu("traf")} />
            {openMenu === "traf" && <Dropdown />}
          </div>
        </div>

        <h2 className="dashSec-trafficValue">2,590</h2>

        {/* Progress Bar */}
        <div className="dashSec-bar">
          <span style={{ width: "50%", background: "#10b981" }}></span>
          <span style={{ width: "27%", background: "#3b82f6" }}></span>
          <span style={{ width: "8%", background: "#facc15" }}></span>
          <span style={{ width: "7%", background: "#ef4444" }}></span>
        </div>

        {/* List */}
        <div className="dashSec-trafficList">
          <div>
            <div><span className="green"></span> Direct</div>
            <b>12,890</b>
            <span>50%</span>
          </div>

          <div>
            <div><span className="blue"></span> Search</div>
            <b>7,245</b>
            <span>27%</span>
          </div>

          <div>
            <div><span className="orange"></span> Referrals</div>
            <b>4,256</b>
            <span>8%</span>
          </div>

          <div>
            <div><span className="red"></span> Social</div>
            <b>500</b>
            <span>7%</span>
          </div>
        </div>
      </div>

      {/* ================= NOTICE BOARD ================= */}
      <div className="dashSec-card">
        <div className="dashSec-header">
          <h3>Notice Board</h3>
          <div ref={openMenu === "note" ? menuRef : null}>
            <BsThreeDotsVertical onClick={() => toggleMenu("note")} />
            {openMenu === "note" && <Dropdown />}
          </div>
        </div>

        <div className="dashSec-noticeList">
          {notices.map((item, i) => (
            <div key={i} className="dashSec-noticeItem">
              <span className="dashSec-badge">16 June 2019</span>
              <p>{item}</p>
              <small>Jennyfar Lopez / 5 min ago</small>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DashboardSection;
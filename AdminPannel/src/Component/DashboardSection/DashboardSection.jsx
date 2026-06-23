import React, { useState, useEffect, useRef } from "react";
import "./DashboardSection.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTimes, FaEdit } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

const Dropdown = () => (
  <div className="dashSec-dropdownMenu">
    <div className="dashSec-dropdownItem">
      <FaTimes /> Close
    </div>
    <div className="dashSec-dropdownItem">
      <FaEdit /> Edit
    </div>
    <div className="dashSec-dropdownItem">
      <FiRefreshCw /> Refresh
    </div>
  </div>
);

const formatNumber = (value) => Number(value || 0).toLocaleString("en-IN");

const getTimeAgo = (date) => {
  if (!date) return "";

  const diff = Math.max(0, Date.now() - new Date(date).getTime());
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

const DashboardSection = ({ data }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);
  const traffic = data?.traffic || {};
  const trafficItems = traffic.items || [];
  const notices = data?.notices || [];

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

  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const dates = [];

    for (let i = 0; i < firstDay; i += 1) dates.push("");
    for (let i = 1; i <= totalDays; i += 1) dates.push(i);

    return dates;
  };

  const changeMonth = (dir) => {
    setCurrentDate((date) => new Date(date.getFullYear(), date.getMonth() + dir, 1));
  };

  return (
    <div className="dashSec-wrapper">
      <div className="dashSec-card">
        <div className="dashSec-header">
          <h3>Event Calendar</h3>
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
            <button onClick={() => changeMonth(-1)}>Prev</button>
            <button onClick={() => changeMonth(1)}>Next</button>
          </div>
        </div>

        <div className="dashSec-daysRow">
          {days.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        <div className="dashSec-datesGrid">
          {getDays().map((d, i) => (
            <div
              key={`${d}-${i}`}
              className={`dashSec-date ${
                d === today.getDate() &&
                currentDate.getMonth() === today.getMonth() &&
                currentDate.getFullYear() === today.getFullYear()
                  ? "active"
                  : ""
              }`}
            >
              {d}
            </div>
          ))}
        </div>
      </div>

      <div className="dashSec-card">
        <div className="dashSec-header">
          <h3>Website Traffic</h3>
          <div ref={openMenu === "traf" ? menuRef : null}>
            <BsThreeDotsVertical onClick={() => toggleMenu("traf")} />
            {openMenu === "traf" && <Dropdown />}
          </div>
        </div>

        <h2 className="dashSec-trafficValue">{formatNumber(traffic.total)}</h2>

        <div className="dashSec-bar">
          {trafficItems.map((item) => (
            <span
              key={item.label}
              style={{
                width: `${item.percent || 0}%`,
                background:
                  item.color === "green"
                    ? "#10b981"
                    : item.color === "blue"
                      ? "#3b82f6"
                      : item.color === "orange"
                        ? "#facc15"
                        : "#ef4444",
              }}
            ></span>
          ))}
        </div>

        <div className="dashSec-trafficList">
          {trafficItems.length > 0 ? (
            trafficItems.map((item) => (
              <div key={item.label}>
                <div>
                  <span className={item.color}></span> {item.label}
                </div>
                <b>{formatNumber(item.value)}</b>
                <span>{item.percent || 0}%</span>
              </div>
            ))
          ) : (
            <p className="dashSec-empty">No traffic data</p>
          )}
        </div>
      </div>

      <div className="dashSec-card">
        <div className="dashSec-header">
          <h3>Notice Board</h3>
          <div ref={openMenu === "note" ? menuRef : null}>
            <BsThreeDotsVertical onClick={() => toggleMenu("note")} />
            {openMenu === "note" && <Dropdown />}
          </div>
        </div>

        <div className="dashSec-noticeList">
          {notices.length > 0 ? (
            notices.map((item, i) => (
              <div key={`${item.title}-${i}`} className="dashSec-noticeItem">
                <span className="dashSec-badge">{item.date || "Latest"}</span>
                <p>{item.title}</p>
                <small>
                  {item.author || "Admin"} / {getTimeAgo(item.createdAt)}
                </small>
              </div>
            ))
          ) : (
            <p className="dashSec-empty">No active notices</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;

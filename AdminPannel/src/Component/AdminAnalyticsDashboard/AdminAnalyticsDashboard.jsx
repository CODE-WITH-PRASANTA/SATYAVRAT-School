import React, { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import "./AdminAnalyticsDashboard.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTimes, FaEdit } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

/* ================= DROPDOWN COMPONENT ================= */
const Dropdown = () => {
  return (
    <div className="adminAnalytics-dropdownMenu">
      <div className="adminAnalytics-dropdownItem">
        <FaTimes /> Close
      </div>
      <div className="adminAnalytics-dropdownItem">
        <FaEdit /> Edit
      </div>
      <div className="adminAnalytics-dropdownItem">
        <FiRefreshCw /> Refresh
      </div>
    </div>
  );
};

const AdminAnalyticsDashboard = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  /* ================= CLOSE ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /* ================= EARNINGS ================= */
  const earningsOptions = {
    chart: { toolbar: { show: false } },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#3b82f6", "#ef4444"],
    dataLabels: { enabled: false },
    fill: { type: "gradient", gradient: { opacityFrom: 0.6, opacityTo: 0.1 } },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    grid: { borderColor: "#e5e7eb" },
    legend: { show: false },
  };

  const earningsSeries = [
    { name: "Total Collections", data: [0, 20, 60, 70, 50, 90, 80] },
    { name: "Fees Collection", data: [0, 50, 20, 15, 70, 50, 75] },
  ];

  /* ================= EXPENSES ================= */
  const expensesOptions = {
    chart: { toolbar: { show: false } },
    colors: ["#14b8a6", "#3b82f6", "#f59e0b"],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%",
      },
    },
    xaxis: {
      categories: ["Jan 2019", "Feb 2019", "Mar 2019"],
    },
    grid: { borderColor: "#e5e7eb" },
  };

  const expensesSeries = [
    {
      name: "Expenses",
      data: [15000, 10000, 8000],
    },
  ];

  /* ================= STUDENTS ================= */
  const studentsOptions = {
    labels: ["Female", "Male"],
    colors: ["#3b82f6", "#f59e0b"],
    legend: { show: false },
    dataLabels: { enabled: false },
  };

  const studentsSeries = [45000, 105000];

  return (
    <div className="adminAnalytics-wrapper">
      
      {/* ================= EARNINGS ================= */}
      <div className="adminAnalytics-card">
        <div className="adminAnalytics-cardHeader">
          <h3>Earnings</h3>

          <div
            className="adminAnalytics-menuWrap"
            ref={openMenu === "earn" ? menuRef : null}
          >
            <BsThreeDotsVertical onClick={() => toggleMenu("earn")} />
            {openMenu === "earn" && <Dropdown />}
          </div>
        </div>

        <div className="adminAnalytics-statsRow">
          <div>
            <span className="adminAnalytics-dot blue"></span>
            Total Collections
            <h4>$ 75,000</h4>
          </div>
          <div>
            <span className="adminAnalytics-dot red"></span>
            Fees Collection
            <h4>$ 15,000</h4>
          </div>
        </div>

        <Chart
          options={earningsOptions}
          series={earningsSeries}
          type="area"
          height={220}
        />
      </div>

      {/* ================= EXPENSES ================= */}
      <div className="adminAnalytics-card">
        <div className="adminAnalytics-cardHeader">
          <h3>Expenses</h3>

          <div
            className="adminAnalytics-menuWrap"
            ref={openMenu === "exp" ? menuRef : null}
          >
            <BsThreeDotsVertical onClick={() => toggleMenu("exp")} />
            {openMenu === "exp" && <Dropdown />}
          </div>
        </div>

        <div className="adminAnalytics-statsRow">
          <h4>$ 15,000</h4>
          <h4>$ 10,000</h4>
          <h4>$ 8,000</h4>
        </div>

        <Chart
          options={expensesOptions}
          series={expensesSeries}
          type="bar"
          height={220}
        />
      </div>

      {/* ================= STUDENTS ================= */}
      <div className="adminAnalytics-card">
        <div className="adminAnalytics-cardHeader">
          <h3>Students</h3>

          <div
            className="adminAnalytics-menuWrap"
            ref={openMenu === "stu" ? menuRef : null}
          >
            <BsThreeDotsVertical onClick={() => toggleMenu("stu")} />
            {openMenu === "stu" && <Dropdown />}
          </div>
        </div>

        <Chart
          options={studentsOptions}
          series={studentsSeries}
          type="donut"
          height={220}
        />

        <div className="adminAnalytics-bottomStats">
          <div>
            <span className="adminAnalytics-dot blue"></span>
            Female Students
            <h4>45,000</h4>
          </div>
          <div>
            <span className="adminAnalytics-dot orange"></span>
            Male Students
            <h4>1,05,000</h4>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminAnalyticsDashboard;
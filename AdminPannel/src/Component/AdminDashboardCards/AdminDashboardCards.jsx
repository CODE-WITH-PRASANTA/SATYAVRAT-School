import React from "react";
import "./AdminDashboardCards.css";
import { FaUserGraduate, FaChalkboardTeacher, FaUsers, FaDollarSign } from "react-icons/fa";

const AdminDashboardCards = () => {
  const stats = [
    {
      id: 1,
      title: "Students",
      value: "150000",
      icon: <FaUserGraduate />,
      color: "#22c55e",
      bg: "#dcfce7",
    },
    {
      id: 2,
      title: "Teachers",
      value: "2250",
      icon: <FaChalkboardTeacher />,
      color: "#3b82f6",
      bg: "#dbeafe",
    },
    {
      id: 3,
      title: "Parents",
      value: "5690",
      icon: <FaUsers />,
      color: "#f59e0b",
      bg: "#fef3c7",
    },
    {
      id: 4,
      title: "Earnings",
      value: "$193000",
      icon: <FaDollarSign />,
      color: "#ef4444",
      bg: "#fee2e2",
    },
  ];

  return (
    <div className="adminDash-wrapper">
      <div className="adminDash-header">
        <h2 className="adminDash-title">Admin Dashboard</h2>
        <p className="adminDash-breadcrumb">Home &gt; Admin</p>
      </div>

      <div className="adminDash-cardGrid">
        {stats.map((item) => (
          <div key={item.id} className="adminDash-card">
            
            <div
              className="adminDash-iconBox"
              style={{ background: item.bg, color: item.color }}
            >
              {item.icon}
            </div>

            <div className="adminDash-textBox">
              <p className="adminDash-label">{item.title}</p>
              <h3 className="adminDash-value">{item.value}</h3>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardCards;
import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import API from "../../Api/axios";

import AdminDashboardCards from "../../Component/AdminDashboardCards/AdminDashboardCards";
import AdminAnalyticsDashboard from "../../Component/AdminAnalyticsDashboard/AdminAnalyticsDashboard";
import DashboardSection from "../../Component/DashboardSection/DashboardSection";
import SocialStats from "../../Component/SocialStats/SocialStats";
import DashFboardeeCollection from "../../Component/DashFboardeeCollection/DashFboardeeCollection";

const DashBoard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await API.get("/dashboard/summary");
      setDashboardData(response.data?.data || null);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className={darkMode ? "dashboard-theme dark" : "dashboard-theme"}>
      <div className="themeBtnWrapper">
        <button className="themeBtn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {error && <p className="dashboard-error">{error}</p>}

      <AdminDashboardCards
        data={dashboardData}
        loading={loading}
        onRefresh={fetchDashboardData}
      />
      <AdminAnalyticsDashboard darkMode={darkMode} data={dashboardData} />
      <DashboardSection darkMode={darkMode} data={dashboardData} />
      <DashFboardeeCollection darkMode={darkMode} data={dashboardData} />
      <SocialStats darkMode={darkMode} data={dashboardData} />
    </div>
  );
};

export default DashBoard;

import React from "react";
import "./AdminDashboardCards.css";
import { IMAGE_URL } from "../../Api/axios";

import {
  FaSyncAlt,
  FaUserGraduate,
  FaClipboardCheck,
  FaWallet,
  FaMoneyBillWave,
  FaChalkboardTeacher,
  FaUserCheck,
  FaMale,
  FaFemale,
  FaBirthdayCake,
  FaHeart,
  FaPlaneDeparture,
  FaDownload,
} from "react-icons/fa";

const fallbackAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const getImageSrc = (image) => {
  if (!image) return fallbackAvatar;
  if (/^https?:\/\//i.test(image)) return image;

  return `${IMAGE_URL}/${image.replace(/\\/g, "/").replace(/^\/+/, "")}`;
};

const formatNumber = (value) => Number(value || 0).toLocaleString("en-IN");

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });

const getUpdatedText = (generatedAt) => {
  if (!generatedAt) return "Updated just now";

  const diff = Math.max(0, Date.now() - new Date(generatedAt).getTime());
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Updated just now";
  if (minutes === 1) return "Updated 1 min ago";
  return `Updated ${minutes} mins ago`;
};

const AdminDashboardCards = ({ data, loading, onRefresh }) => {
  const stats = data?.cards || {};
  const birthdays = data?.occasions?.birthdays || [];
  const anniversaries = data?.occasions?.anniversaries || [];
  const leaves = data?.occasions?.leaves || [];
  const peopleList = [...birthdays, ...anniversaries, ...leaves].slice(0, 4);

  const cards = [
    {
      icon: <FaUserGraduate />,
      value: formatNumber(stats.totalStudents),
      title: "Student",
      color: "red",
    },
    {
      icon: <FaClipboardCheck />,
      value: formatNumber(stats.studentPresence),
      title: "Student Presence",
      color: "purple",
      badge: "Today",
    },
    {
      icon: <FaWallet />,
      value: formatCurrency(stats.monthlyFees),
      title: "Monthly Fees",
      color: "blue",
    },
    {
      icon: <FaMoneyBillWave />,
      value: `${formatCurrency(stats.monthlyIncome)} / ${formatCurrency(stats.monthlyExpense)}`,
      title: "Income / Expense",
      color: "cyan",
      badge: "Monthly",
    },
    {
      icon: <FaChalkboardTeacher />,
      value: formatNumber(stats.staff),
      title: "Staff",
      color: "teal",
    },
    {
      icon: <FaUserCheck />,
      value: formatNumber(stats.staffPresence),
      title: "Staff Presence",
      color: "green",
      badge: "Today",
    },
    {
      icon: <FaMale />,
      value: formatNumber(stats.totalMale),
      title: "Total Male",
      color: "orange",
    },
    {
      icon: <FaFemale />,
      value: formatNumber(stats.totalFemale),
      title: "Total Female",
      color: "pink",
    },
  ];

  return (
    <section className="WelcomeSection">
      <div className="WelcomeSection_TopRow">
        <div className="WelcomeSection_WelcomeCard">
          <div className="WelcomeSection_Content">
            <h1>Welcome Back!</h1>

            <p>Manage your dashboard and settings from here.</p>

            <button
              className="WelcomeSection_RefreshBtn"
              onClick={onRefresh}
              disabled={loading}
            >
              <FaSyncAlt />
              {loading ? "Refreshing..." : "Refresh Dashboard"}
            </button>

            <span>{getUpdatedText(data?.meta?.generatedAt)}</span>
          </div>

          <div className="WelcomeSection_Illustration">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
              alt=""
            />
          </div>
        </div>

        <div className="WelcomeSection_CardsGrid">
          {cards.slice(0, 6).map((card) => (
            <div className="WelcomeSection_StatCard" key={card.title}>
              {card.badge && (
                <span className="WelcomeSection_Badge">{card.badge}</span>
              )}

              <div className={`WelcomeSection_Icon WelcomeSection_${card.color}`}>
                {card.icon}
              </div>

              <div className="WelcomeSection_Info">
                <h3>{card.value}</h3>
                <p>{card.title}</p>
              </div>

              <div className="WelcomeSection_Circle" />
            </div>
          ))}
        </div>
      </div>

      <div className="WelcomeSection_BottomRow">
        <div className="WelcomeSection_BirthdayCard">
          <div className="WelcomeSection_BirthdayHeader">
            <div className="WelcomeSection_Tabs">
              <span>
                <FaBirthdayCake /> Birthday
              </span>
              <span>
                <FaHeart /> Anniversary
              </span>
              <span>
                <FaPlaneDeparture /> Leave
              </span>
            </div>

            <button>
              <FaDownload />
              Download
            </button>
          </div>

          <div className="WelcomeSection_BirthdayBody">
            {peopleList.length > 0 ? (
              peopleList.map((person, index) => (
                <div
                  className="WelcomeSection_PersonCard"
                  key={`${person.name}-${index}`}
                >
                  <img src={getImageSrc(person.image)} alt="" />

                  <div>
                    <h4>{person.name}</h4>
                    <p>{person.date || "This month"}</p>
                  </div>

                  <button>Wish</button>
                </div>
              ))
            ) : (
              <div className="WelcomeSection_EmptyState">
                No occasions this month
              </div>
            )}
          </div>
        </div>

        <div className="WelcomeSection_StatCard">
          <div className="WelcomeSection_Icon WelcomeSection_orange">
            <FaMale />
          </div>

          <div className="WelcomeSection_Info">
            <h3>{formatNumber(stats.totalMale)}</h3>
            <p>Total Male</p>
          </div>

          <div className="WelcomeSection_Circle" />
        </div>

        <div className="WelcomeSection_StatCard">
          <div className="WelcomeSection_Icon WelcomeSection_pink">
            <FaFemale />
          </div>

          <div className="WelcomeSection_Info">
            <h3>{formatNumber(stats.totalFemale)}</h3>
            <p>Total Female</p>
          </div>

          <div className="WelcomeSection_Circle" />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardCards;

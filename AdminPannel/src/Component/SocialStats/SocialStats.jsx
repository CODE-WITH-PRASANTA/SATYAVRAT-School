import React from "react";
import "./SocialStats.css";
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

const formatNumber = (value) => Number(value || 0).toLocaleString("en-IN");

const SocialStats = ({ data }) => {
  const stats = data?.socialStats || [];
  const defaults = [
    { key: "news", label: "News posts", value: 0 },
    { key: "views", label: "News views", value: 0 },
    { key: "gallery", label: "Gallery photos", value: 0 },
    { key: "testimonials", label: "Testimonials", value: 0 },
  ];
  const items = stats.length ? stats : defaults;
  const icons = [FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn];
  const classes = ["facebook", "twitter", "google", "linkedin"];

  return (
    <div className="socialStats-wrapper">
      {items.map((item, index) => {
        const Icon = icons[index] || FaFacebookF;

        return (
          <div
            className={`socialStats-card ${classes[index] || "facebook"}`}
            key={item.key || item.label}
          >
            <div className="socialStats-content">
              <Icon className="socialStats-icon" />
              <p>{item.label}</p>
              <h3>{formatNumber(item.value)}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SocialStats;

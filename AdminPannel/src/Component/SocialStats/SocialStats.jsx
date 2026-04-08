import React from "react";
import "./SocialStats.css";
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

const SocialStats = () => {
  return (
    <div className="socialStats-wrapper">

      {/* Facebook */}
      <div className="socialStats-card facebook">
        <div className="socialStats-content">
          <FaFacebookF className="socialStats-icon" />
          <p>Like us on facebook</p>
          <h3>30,000</h3>
        </div>
      </div>

      {/* Twitter */}
      <div className="socialStats-card twitter">
        <div className="socialStats-content">
          <FaTwitter className="socialStats-icon" />
          <p>Follow us on twitter</p>
          <h3>1,11,000</h3>
        </div>
      </div>

      {/* Google Plus */}
      <div className="socialStats-card google">
        <div className="socialStats-content">
          <FaGooglePlusG className="socialStats-icon" />
          <p>Follow us on googleplus</p>
          <h3>19,000</h3>
        </div>
      </div>

      {/* LinkedIn */}
      <div className="socialStats-card linkedin">
        <div className="socialStats-content">
          <FaLinkedinIn className="socialStats-icon" />
          <p>Follow us on linked</p>
          <h3>45,000</h3>
        </div>
      </div>

    </div>
  );
};

export default SocialStats;
import React from "react";
import "./CancelFeeReceipt.css";
import { FiSearch } from "react-icons/fi";
import { FaUserGraduate } from "react-icons/fa";

const CancelFeeReceipt = () => {
  return (
    <div className="cancel-fee-receipt-container">
      <div className="cancel-fee-receipt-card">

        {/* Search Section */}
        <div className="cancel-fee-receipt-search-wrapper">
          <div className="cancel-fee-receipt-search-box">
            <FiSearch className="cancel-fee-receipt-search-icon" />
            <input
              type="text"
              placeholder="Search"
              className="cancel-fee-receipt-search-input"
            />
          </div>
        </div>

        {/* Student Information Card */}
        <div className="cancel-fee-receipt-student-card">

          {/* Left Side */}
          <div className="cancel-fee-receipt-left-section">

            <div className="cancel-fee-receipt-row">
              <span>Enroll No. :</span>
              <p></p>
            </div>

            <div className="cancel-fee-receipt-row">
              <span>Name :</span>
              <p></p>
            </div>

            <div className="cancel-fee-receipt-row">
              <span>Class :</span>
              <p></p>
            </div>

            <div className="cancel-fee-receipt-row">
              <span>Father's Name :</span>
              <p></p>
            </div>

            <div className="cancel-fee-receipt-row">
              <span>Mother's Name :</span>
              <p></p>
            </div>

            <div className="cancel-fee-receipt-row">
              <span>Mobile No. :</span>
              <p></p>
            </div>

            <div className="cancel-fee-receipt-row">
              <span>Address :</span>
              <p></p>
            </div>

          </div>

          {/* Right Side */}
          <div className="cancel-fee-receipt-right-section">

            <FaUserGraduate className="cancel-fee-receipt-student-icon" />

            <div className="cancel-fee-receipt-type-row">
              <span>Stu Type :</span>
              <p></p>
            </div>

            <div className="cancel-fee-receipt-type-row">
              <span>Fee Type :</span>
              <p></p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CancelFeeReceipt;
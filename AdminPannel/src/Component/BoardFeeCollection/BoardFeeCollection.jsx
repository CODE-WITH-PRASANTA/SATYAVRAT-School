import React, { useState } from "react";
import "./BoardFeeCollection.css";

import {
  FaSearch,
  FaUserGraduate,
  FaCalendarAlt,
} from "react-icons/fa";

import { IoClose } from "react-icons/io5";

const BoardFeeCollection = () => {
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  return (
    <div className="board-fee-collection-container">

      <h2 className="board-fee-collection-title">
        Board Fee Collection
      </h2>

      {/* Search */}

      <div className="board-fee-collection-search-wrapper">
        <FaSearch className="board-fee-collection-search-icon" />

        <input
          type="text"
          placeholder="Search"
          className="board-fee-collection-search-input"
        />
      </div>

      {/* Main Section */}

      <div className="board-fee-collection-content">

        {/* Student Card */}

        <div className="board-fee-collection-student-card">

          <div className="board-fee-collection-student-left">

            <div>Name :</div>
            <div>Class :</div>
            <div>Father's Name :</div>
            <div>Mother's Name :</div>
            <div>Mobile No. :</div>
            <div>Address :</div>

          </div>

          <div className="board-fee-collection-student-right">

            <FaUserGraduate className="board-fee-collection-student-icon" />

            <div>Stu Type :</div>
            <div>Fee Type :</div>

          </div>

        </div>

        {/* Right Section */}

        <div className="board-fee-collection-form-section">

          <div className="board-fee-collection-form-row">

            <div className="board-fee-collection-date-box">
              <input type="date" />
              <FaCalendarAlt />
            </div>

            <select>
              <option>Pay Mode</option>
              <option>Cash</option>
              <option>UPI</option>
              <option>Card</option>
              <option>Online</option>
            </select>

          </div>

          <div className="board-fee-collection-form-row">

            <select>
              <option>None</option>
              <option>SBI</option>
              <option>HDFC</option>
              <option>ICICI</option>
            </select>

            <input
              type="text"
              placeholder="Cheq/POS/UPI/Card/Online No."
            />

          </div>

          {/* Fees Header */}

          <div className="board-fee-collection-fees-header">

            <span>Head Wise Fees</span>

            <button
              onClick={() => setShowReceiptModal(true)}
            >
              Show Receipts
            </button>

          </div>

          {/* Amount Section */}

          <div className="board-fee-collection-amount-grid">

            <div className="board-fee-collection-field">
              <label>Grand Total</label>
              <input type="text" value="0" readOnly />
            </div>

            <div className="board-fee-collection-field">
              <label>Payable Amount</label>
              <input type="text" value="0" readOnly />
            </div>

            <div className="board-fee-collection-field">
              <label>Total Paid</label>
              <input type="text" value="0" readOnly />
            </div>

            <div className="board-fee-collection-field">
              <label>Due Amount</label>
              <input type="text" value="0" readOnly />
            </div>

            <div className="board-fee-collection-field">
              <label>Remark</label>
              <input
                type="text"
                placeholder="Remark"
              />
            </div>

            <button className="board-fee-collection-save-btn">
              Save
            </button>

          </div>

        </div>

      </div>

      {/* Receipt Modal */}

      {showReceiptModal && (
        <div className="board-fee-collection-modal-overlay">

          <div className="board-fee-collection-modal">

            <div className="board-fee-collection-modal-header">

              <h3>FEE STATEMENT</h3>

              <button
                onClick={() =>
                  setShowReceiptModal(false)
                }
              >
                <IoClose />
              </button>

            </div>

            <div className="board-fee-collection-modal-table">

              <table>

                <thead>
                  <tr>
                    <th>S.no.</th>
                    <th>Rec. Date</th>
                    <th>Period</th>
                    <th>Pay Mode</th>
                    <th>Paid Amt</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1</td>
                    <td>15-06-2025</td>
                    <td>2025</td>
                    <td>UPI</td>
                    <td>5000</td>
                  </tr>

                  <tr>
                    <td>2</td>
                    <td>20-06-2025</td>
                    <td>2025</td>
                    <td>Cash</td>
                    <td>2500</td>
                  </tr>
                </tbody>

              </table>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default BoardFeeCollection;
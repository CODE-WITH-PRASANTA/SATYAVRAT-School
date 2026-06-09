import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  FiSearch,
  FiCalendar,
  FiX,
} from "react-icons/fi";

import "./Siblingfeeentry.css";

const feeOptions = [
  { value: "all", label: "All" },
  { value: "academic", label: "Academic" },
  { value: "transport", label: "Transport" },
  { value: "hostel", label: "Hostel" },
];

const payModeOptions = [
  { value: "cash", label: "Cash" },
  { value: "upi", label: "UPI" },
  { value: "card", label: "Card" },
  { value: "bank", label: "Bank Transfer" },
];

const Siblingfeeentry = () => {
  const [feeType, setFeeType] = useState(feeOptions[0]);
  const [payMode, setPayMode] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [grandDiscount, setGrandDiscount] = useState("");
  const [grandPaidTotal, setGrandPaidTotal] = useState("");
  const [grandPayableTotal, setGrandPayableTotal] = useState("");

  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const [receiptData, setReceiptData] = useState([
    {
      id: 1,
      recNo: "REC-1001",
      recDate: "05/06/2026",
      payMode: "Cash",
      discount: 200,
      payable: 5000,
      paid: 5000,
      due: 0,
    },
    {
      id: 2,
      recNo: "REC-1002",
      recDate: "07/06/2026",
      payMode: "UPI",
      discount: 300,
      payable: 6500,
      paid: 6000,
      due: 500,
    },
  ]);

  const handleSave = () => {
    const payable = Number(grandPayableTotal || 0);
    const paid = Number(grandPaidTotal || 0);
    const discount = Number(grandDiscount || 0);

    const newReceipt = {
      id: receiptData.length + 1,
      recNo: `REC-${1000 + receiptData.length + 1}`,
      recDate: selectedDate
        ? selectedDate.toLocaleDateString()
        : new Date().toLocaleDateString(),
      payMode: payMode?.label || "Cash",
      discount,
      payable,
      paid,
      due: payable - paid,
    };

    setReceiptData((prev) => [...prev, newReceipt]);

    alert("Receipt Saved Successfully");

    setGrandDiscount("");
    setGrandPaidTotal("");
    setGrandPayableTotal("");
    setSelectedDate(null);
    setPayMode(null);
  };

  const purpleSelect = {
    control: (base) => ({
      ...base,
      minHeight: "60px",
      borderRadius: "12px",
      border: "2px solid #7b2cff",
      boxShadow: "none",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      borderRadius: "12px",
      overflow: "hidden",
    }),
  };

  const orangeSelect = {
    ...purpleSelect,
    control: (base) => ({
      ...base,
      minHeight: "60px",
      borderRadius: "12px",
      border: "1.5px solid #ff4d1a",
      boxShadow: "none",
    }),
  };

  return (
    <div className="Siblingfeeentry">

      {/* Search */}

      <div className="Siblingfeeentry-search-wrapper">
        <FiSearch />
        <input type="text" placeholder="Search" />
      </div>

      {/* Main Content */}

      <div className="Siblingfeeentry-content">

        <div className="Siblingfeeentry-student-card">
          <p><strong>Father's Name :</strong></p>
          <p><strong>Mother's Name :</strong></p>
          <p><strong>Mobile No. :</strong></p>
          <p><strong>Address :</strong></p>
        </div>

        <div className="Siblingfeeentry-right">

          <div className="field">
            <label>Fee Type</label>

            <Select
              options={feeOptions}
              value={feeType}
              onChange={setFeeType}
              styles={purpleSelect}
              isSearchable={false}
            />
          </div>

          <div className="field">
            <label>Date</label>

            <div className="date-wrapper">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText="Choose a date"
                dateFormat="dd/MM/yyyy"
                className="custom-datepicker"
              />
              <FiCalendar className="calendar-icon" />
            </div>
          </div>

          <div className="field">
            <label>Receipt No.</label>

            <input
              type="text"
              placeholder="Receipt No."
              className="custom-input"
            />
          </div>

          <div className="field">
            <label>Pay Mode</label>

            <Select
              options={payModeOptions}
              value={payMode}
              onChange={setPayMode}
              placeholder="Pay Mode"
              styles={orangeSelect}
              isSearchable={false}
            />
          </div>

        </div>
      </div>

      {/* Bottom Section */}

      <div className="Siblingfeeentry-bottom">

        <div className="total-box">
          <label>Grand Discount</label>
          <input
            type="number"
            placeholder="Enter Discount"
            value={grandDiscount}
            onChange={(e) => setGrandDiscount(e.target.value)}
          />
        </div>

        <div className="total-box">
          <label>Grand Paid Total</label>
          <input
            type="number"
            placeholder="Enter Paid Amount"
            value={grandPaidTotal}
            onChange={(e) => setGrandPaidTotal(e.target.value)}
          />
        </div>

        <div className="total-box">
          <label>Grand Payable Total</label>
          <input
            type="number"
            placeholder="Enter Payable Amount"
            value={grandPayableTotal}
            onChange={(e) => setGrandPayableTotal(e.target.value)}
          />
        </div>

        <div className="action-buttons">

          <button
            className="receipt-btn"
            onClick={() => setShowReceiptModal(true)}
          >
            Show Sibling Receipts
          </button>

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save
          </button>

        </div>

      </div>

      {/* Modal */}

      {showReceiptModal && (
        <div
          className="receipt-modal-overlay"
          onClick={() => setShowReceiptModal(false)}
        >
          <div
            className="receipt-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="receipt-modal-header">
              <h2>Sibling Receipts</h2>

              <button
                className="close-btn"
                onClick={() => setShowReceiptModal(false)}
              >
                <FiX />
              </button>
            </div>

            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Receipt No</th>
                    <th>Date</th>
                    <th>Pay Mode</th>
                    <th>Discount</th>
                    <th>Payable</th>
                    <th>Paid</th>
                    <th>Due</th>
                  </tr>
                </thead>

                <tbody>
                  {receiptData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.recNo}</td>
                      <td>{item.recDate}</td>
                      <td>{item.payMode}</td>
                      <td>₹{item.discount}</td>
                      <td>₹{item.payable}</td>
                      <td>₹{item.paid}</td>
                      <td>₹{item.due}</td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Siblingfeeentry;
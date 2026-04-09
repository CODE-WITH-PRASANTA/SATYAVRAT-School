import React from "react";
import { FiX } from "react-icons/fi";
import html2pdf from "html2pdf.js";
import "./ReceiptModal.css";

const ReceiptModal = ({ showReceipt, setShowReceipt, selectedFee, logo }) => {
  if (!showReceipt || !selectedFee) return null;

  /* PRINT */
  const handlePrint = () => {
    const content = document.getElementById("receipt-print-area");

    if (!content) return;

    const printWindow = window.open("", "", "width=900,height=650");

    printWindow.document.write(`
    <html>
      <head>
        <title>Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }

          .receipt-card {
            width: 190mm;
            margin: auto;
          }

          .receipt-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .receipt-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }

          .receipt-table th,
          .receipt-table td {
            border: 1px solid #000;
            padding: 10px;
            text-align: center;
          }

          .receipt-total {
            background: #fef3c7;
            font-weight: bold;
          }

          .receipt-footer {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
          }

          .receipt-line {
            border-top: 1px solid #000;
            width: 120px;
            margin: auto;
          }

          .receipt-thank {
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
          }
        </style>
      </head>

      <body>
        ${content.innerHTML}
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  /* PDF */
  const handlePDF = () => {
    const element = document.getElementById("receipt-print-area");

    html2pdf()
      .set({
        margin: 10,
        filename: `${selectedFee.name}_Receipt.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4" },
      })
      .from(element)
      .save();
  };

  return (
    <div className="receipt-overlay">
      {/* ✅ ADD ID ONLY (NO DESIGN CHANGE) */}
      <div className="receipt-card" id="receipt-print-area">
        {/* CLOSE */}
        <FiX className="receipt-close" onClick={() => setShowReceipt(false)} />

        {/* HEADER */}
        <div className="receipt-header">
          <img src={logo} alt="logo" className="receipt-logo" />

          <div>
            <h2 className="receipt-title">Bright star school</h2>
            <p className="receipt-address">San Diego, California</p>
          </div>
        </div>

        <hr />

        {/* RECEIPT INFO */}
        <div className="receipt-top">
          <div>
            <p>
              <b>Receipt No:</b> #{selectedFee._id?.slice(-6)}
            </p>
            <p>
              <b>Date:</b>{" "}
              {selectedFee.date
                ? new Date(selectedFee.date).toLocaleDateString()
                : ""}
            </p>
          </div>

          <div>
            <p>
              <b>Payment Mode:</b> {selectedFee.paymentMethod}
            </p>
            <p>
              <b>Collected By:</b> Admin
            </p>
          </div>
        </div>

        {/* STUDENT INFO */}
        <div className="receipt-student">
          <p>
            <b>Student Name:</b> {selectedFee.name}
          </p>
          <p>
            <b>Class:</b> {selectedFee.class} ({selectedFee.section})
          </p>
          <p>
            <b>Roll No:</b> {selectedFee.rollNumber}
          </p>
        </div>

        {/* TABLE */}
        <table className="receipt-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Tuition Fee</td>
              <td>{selectedFee.amount}</td>
            </tr>

            {selectedFee.discount > 0 && (
              <tr>
                <td>Discount</td>
                <td>- {selectedFee.discount}</td>
              </tr>
            )}

            <tr className="receipt-total">
              <td>
                <b>Total Paid</b>
              </td>
              <td>
                <b>₹ {selectedFee.paid}</b>
              </td>
            </tr>

            <tr>
              <td>Due Amount</td>
              <td>₹ {selectedFee.due}</td>
            </tr>
          </tbody>
        </table>

        {/* NOTE */}
        <div className="receipt-note">
          <p>
            <b>Note:</b> {selectedFee.note || "No remarks"}
          </p>
        </div>

        {/* FOOTER */}
        <div className="receipt-footer">
          <div>
            <div className="receipt-line" />
            <p>Accountant</p>
          </div>

          <div>
            <div className="receipt-line" />
            <p>Authorized Sign</p>
          </div>
        </div>

        <p className="receipt-thank">Thank you for your payment!</p>
      </div>

      {/* ✅ BUTTONS (NO DESIGN CHANGE TO CARD) */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          style={{
            padding: "10px 15px",
            background: "green",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handlePDF}
        >
          PDF
        </button>

        <button
          style={{
            padding: "10px 15px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handlePrint}
        >
          Print
        </button>

        <button
          style={{
            padding: "10px 15px",
            background: "black",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setShowReceipt(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReceiptModal;

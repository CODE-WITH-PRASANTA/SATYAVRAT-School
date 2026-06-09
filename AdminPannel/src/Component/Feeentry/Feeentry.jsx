import React, { useState } from "react";

import {
  FiSearch,
  FiChevronDown,
  FiCalendar,
  FiX,
  FiList,
} from "react-icons/fi";

const Feeentry = () => {
  const [showACModal, setShowACModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showFeeType, setShowFeeType] = useState(false);
  const [showPayMode, setShowPayMode] = useState(false);

  const [feeType, setFeeType] = useState("All");
  const [payMode, setPayMode] = useState("");

  const feeTypes = [
    "All",
    "Academic",
    "Transport",
    "Hostel",
  ];

  const payModes = [
    "Cash",
    "UPI",
    "Card",
    "Cheque",
  ];

  const headData = [
    {
      head: "School Fee",
      amount: 1500,
      concession: 0,
      payable: 1500,
    },
    {
      head: "Transport",
      amount: 1000,
      concession: 100,
      payable: 900,
    },
  ];

  return (
    <div className="feeEntry">

      {/* TOP BAR */}

      <div className="topHeader">

        <div className="searchBox">
          <FiSearch />
          <input
            type="text"
            placeholder="Search"
          />
        </div>

        <button
          className="acBtn"
          onClick={() => setShowACModal(true)}
        >
          A/C Open
        </button>

      </div>

      {/* MAIN SECTION */}

      <div className="topSection">

        {/* LEFT CARD */}

        <div className="studentCard">

          <div className="studentInfo">

            <div>
              <p><strong>Enroll No :</strong></p>
              <p><strong>Sr. No. :</strong></p>
              <p><strong>Adm. No. :</strong></p>
              <p><strong>Name :</strong></p>
              <p><strong>Class :</strong></p>
              <p><strong>Father's Name :</strong></p>
              <p><strong>Mother's Name :</strong></p>
              <p><strong>Mobile No. :</strong></p>
              <p><strong>Address :</strong></p>
            </div>

            <div className="studentPhoto">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="student"
              />

              <p>Stu Type :</p>
              <p>Fee Type :</p>
              <p>Transport Status :</p>
            </div>

          </div>

        </div>

        {/* RIGHT FORM */}

        <div className="formArea">

          <div className="field">

            <label>Fee Type</label>

            <div
              className="customSelect"
              onClick={() =>
                setShowFeeType(!showFeeType)
              }
            >
              <span>{feeType}</span>
              <FiChevronDown />
            </div>

            {showFeeType && (
              <div className="dropdown">

                {feeTypes.map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      setFeeType(item);
                      setShowFeeType(false);
                    }}
                  >
                    {item}
                  </div>
                ))}

              </div>
            )}

          </div>

          <div className="field">
            <input
              type="date"
              className="dateInput"
            />
          </div>

          <div className="field">
            <input
              type="text"
              placeholder="Receipt No."
            />
          </div>

          <div className="field">

            <div
              className="customSelect payMode"
              onClick={() =>
                setShowPayMode(!showPayMode)
              }
            >
              <span>
                {payMode || "Pay Mode*"}
              </span>

              <FiChevronDown />
            </div>

            {showPayMode && (
              <div className="dropdown">

                {payModes.map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      setPayMode(item);
                      setShowPayMode(false);
                    }}
                  >
                    {item}
                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

      </div>

      {/* ADVANCE */}

      <div className="advanceBox">

        <label>
          <input type="checkbox" />
          Adv. Amount
        </label>

      </div>

      {/* HEAD WISE FEES */}

      <div className="headWiseCard">

        <div className="headWiseHeader">

          <h3>Head Wise Fees</h3>

          <button
            className="receiptBtn"
            onClick={() =>
              setShowReceiptModal(true)
            }
          >
            Show Receipts
          </button>

        </div>

        <div className="tableWrapper">

          <table>

            <thead>

              <tr>
                <th>
                  <input
                    type="checkbox"
                    defaultChecked
                  />
                </th>

                <th>HEAD</th>
                <th>AMT.</th>
                <th>CONC.</th>
                <th>PAYABLE</th>
              </tr>

            </thead>

            <tbody>

              {headData.map((item, index) => (

                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked
                    />
                  </td>

                  <td>{item.head}</td>
                  <td>{item.amount}</td>
                  <td>{item.concession}</td>
                  <td>{item.payable}</td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* TOTAL SECTION */}

      <div className="amountSection">

        <input
          type="text"
          value="0"
          readOnly
          placeholder="Grand Total"
        />

        <input
          type="text"
          placeholder="Advance Payment"
        />

        <input
          type="text"
          placeholder="Discount"
        />

        <input
          type="text"
          value="0"
          readOnly
          placeholder="Payable Amount"
        />

        <input
          type="text"
          value="0"
          readOnly
          placeholder="Total Paid"
        />

        <input
          type="text"
          value="0"
          readOnly
          placeholder="Due Amount"
        />

      </div>

      <div className="bottomSection">

        <input
          type="text"
          placeholder="Receipt Remark"
        />

        <button className="saveBtn">
          Save
        </button>

      </div>

      {/* A/C OPEN MODAL */}

      {showACModal && (

        <div className="overlay">

          <div className="modal">

            <div className="modalHeader">

              <h2>
                FEE COLLECTION A/C CLOSING
              </h2>

              <button
                onClick={() =>
                  setShowACModal(false)
                }
              >
                <FiX />
              </button>

            </div>

            <input
              type="date"
              className="modalField"
            />

            <textarea
              rows="5"
              placeholder="Narration"
              className="modalField"
            />

            <div className="modalFooter">

              <button className="submitBtn">
                Submit
              </button>

            </div>

          </div>

        </div>

      )}

      {/* RECEIPT MODAL */}

      {showReceiptModal && (

        <div className="overlay">

          <div className="receiptModal">

            <div className="modalHeader">

              <h2>FEE STATEMENT</h2>

              <div className="headerIcons">

                <button>
                  <FiList />
                </button>

                <button
                  onClick={() =>
                    setShowReceiptModal(false)
                  }
                >
                  <FiX />
                </button>

              </div>

            </div>

            <div className="tableWrapper">

              <table>

                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Rec No.</th>
                    <th>Rec Date</th>
                    <th>Period</th>
                    <th>Pay Mode</th>
                    <th>Gross Amt</th>
                    <th>Paid Amt</th>
                    <th>Due Amt</th>
                    <th>Adv Amt</th>
                  </tr>
                </thead>

                <tbody>

                  {[1, 2, 3, 4, 5].map(
                    (item) => (
                      <tr key={item}>
                        <td>{item}</td>
                        <td>REC00{item}</td>
                        <td>09-06-2026</td>
                        <td>June</td>
                        <td>Cash</td>
                        <td>5000</td>
                        <td>5000</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Feeentry;
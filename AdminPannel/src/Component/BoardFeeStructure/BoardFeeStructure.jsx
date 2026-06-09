import React, { useState } from "react";
import "./BoardFeeStructure.css";
import {
  FaPlus,
  FaTrash,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

const BoardFeeStructure = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const feeData = [
    { id: 1, className: "NURSERY", stream: "None", type: "Monthly" },
    { id: 2, className: "LKG", stream: "None", type: "Monthly" },
    { id: 3, className: "UKG", stream: "None", type: "Monthly" },
    { id: 4, className: "I", stream: "None", type: "Monthly" },
    { id: 5, className: "II", stream: "None", type: "Monthly" },
    { id: 6, className: "III", stream: "None", type: "Monthly" },
    { id: 7, className: "IV", stream: "None", type: "Monthly" },
    { id: 8, className: "V", stream: "None", type: "Monthly" },
    { id: 9, className: "VI", stream: "None", type: "Monthly" },
    { id: 10, className: "VII", stream: "None", type: "Monthly" },
    { id: 11, className: "VIII", stream: "None", type: "Monthly" },
    { id: 12, className: "IX", stream: "None", type: "Monthly" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const currentData = feeData.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(feeData.length / perPage);

  const months = [
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
    "JAN",
    "FEB",
    "MAR",
  ];

  const feeHeads = [
    { head: "Admission Fee", type: "Only Once" },
    { head: "School Fee", type: "Monthly" },
    { head: "Exam Fee", type: "Quarterly" },
    { head: "Belt", type: "Only Once" },
    { head: "ID Card", type: "Annually" },
    { head: "15 August", type: "Annually" },
    { head: "26 January", type: "Annually" },
  ];

  return (
    <>
      <div className="boardFeeStructure">

        <div className="boardFeeStructure__header">

          <div className="boardFeeStructure__search">
            <FaSearch />
            <input type="text" placeholder="Search..." />
          </div>

          <button
            className="boardFeeStructure__addBtn"
            onClick={() => setShowModal(true)}
          >
            <FaPlus />
          </button>
        </div>

        <div className="boardFeeStructure__tableWrapper">
          <table>
            <thead>
              <tr>
                <th>S.NO.</th>
                <th>CLASS</th>
                <th>STREAM</th>
                <th>STRUCTURE TYPE</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((item, index) => (
                <tr key={item.id}>
                  <td>{firstIndex + index + 1}</td>
                  <td>{item.className}</td>
                  <td>{item.stream}</td>
                  <td>{item.type}</td>
                  <td>
                    <button className="boardFeeStructure__delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="boardFeeStructure__pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          <span>
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {showModal && (
        <div className="boardFeeStructure__overlay">
          <div className="boardFeeStructure__modal">

            <div className="boardFeeStructure__modalHeader">
              <h2>FEE STRUCTURE</h2>

              <FaTimes
                onClick={() => {
                  setShowModal(false);
                  setSelectedType("");
                }}
              />
            </div>

            <div className="boardFeeStructure__form">

              <select
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Structure Type *</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Annually">Annually</option>
              </select>

              <select>
                <option>Class *</option>
                <option>NURSERY</option>
                <option>LKG</option>
                <option>UKG</option>
              </select>

              <select>
                <option>Stream</option>
                <option>None</option>
                <option>Science</option>
                <option>Commerce</option>
              </select>
            </div>

            {selectedType && (
              <div className="boardFeeStructure__feeTable">

                <table>
                  <thead>
                    <tr>
                      <th>FEE HEAD</th>
                      <th>FEE TYPE</th>

                      {months.map((month) => (
                        <th key={month}>{month}</th>
                      ))}

                      <th>TOTAL</th>
                    </tr>
                  </thead>

                  <tbody>
                    {feeHeads.map((item, i) => (
                      <tr key={i}>
                        <td>{item.head}</td>
                        <td>{item.type}</td>

                        {months.map((month) => (
                          <td key={month}>
                            <input type="number" />
                          </td>
                        ))}

                        <td>
                          <input type="number" />
                        </td>
                      </tr>
                    ))}

                    <tr className="boardFeeStructure__grandTotal">
                      <td colSpan="15">
                        <strong>Grand Total</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>

              </div>
            )}

            <div className="boardFeeStructure__footer">
              <button
                className="cancelBtn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button className="saveBtn">
                Add
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default BoardFeeStructure;
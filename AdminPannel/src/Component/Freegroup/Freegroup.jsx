import React, { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaTrash,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import "./Freegroup.css";

const Freegroup = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const feeData = [
    { id: 1, head: "OFTHO", priority: 1 },
    { id: 2, head: "Admission Fee", priority: 2 },
    { id: 3, head: "Quarterly Examination Fee", priority: 3 },
    { id: 4, head: "Tuition Fee", priority: 4 },
    { id: 5, head: "Half Yearly Examination Fee", priority: 5 },
    { id: 6, head: "Annual Examination Fee", priority: 6 },
    { id: 7, head: "SESSION CHARGE", priority: 7 },
    { id: 8, head: "Computer Fee", priority: 8 },
    { id: 9, head: "Library Fee", priority: 9 },
    { id: 10, head: "Sports Fee", priority: 10 },
    { id: 11, head: "Lab Fee", priority: 11 },
    { id: 12, head: "Transport Fee", priority: 12 },
  ];

  const totalPages = Math.ceil(feeData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = feeData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="Freegroup">

      <div className="FreegroupCard">

        <div className="FreegroupTop">

          <div className="FreegroupSearch">
            <FaSearch />
            <input type="text" placeholder="Search..." />
          </div>

          <button
            className="FreegroupAddBtn"
            onClick={() => setShowModal(true)}
          >
            <FaPlus />
          </button>

        </div>

        <div className="FreegroupTableWrapper">

          <table className="FreegroupTable">

            <thead>
              <tr>
                <th>S.NO.</th>
                <th>HEAD GROUP</th>
                <th>PRIORITY</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.head}</td>
                  <td>{item.priority}</td>
                  <td>
                    <FaTrash className="FreegroupDelete" />
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

        <div className="FreegroupPagination">

          <div className="FreegroupPageSize">

            <span>Items per page:</span>

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>

          </div>

          <div className="FreegroupPaginationRight">

            <span>
              {startIndex + 1}-
              {Math.min(
                startIndex + itemsPerPage,
                feeData.length
              )}{" "}
              of {feeData.length}
            </span>

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
            >
              <FaChevronLeft />
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
            >
              <FaChevronRight />
            </button>

          </div>

        </div>

      </div>

      {/* Modal */}

      {showModal && (
        <div className="FreegroupModalOverlay">

          <div className="FreegroupModal">

            <div className="FreegroupModalHeader">

              <h2>ADD FEE GROUP</h2>

              <FaTimes
                className="FreegroupClose"
                onClick={() => setShowModal(false)}
              />

            </div>

            <div className="FreegroupModalBody">

              <div className="FreegroupInputBox">

                <label>Fee Group Name*</label>

                <input type="text" />

              </div>

            </div>

            <div className="FreegroupModalFooter">

              <button
                className="FreegroupCancelBtn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button className="FreegroupSaveBtn">
                Add
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Freegroup;
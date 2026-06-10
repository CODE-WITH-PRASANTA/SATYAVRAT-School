import React, { useState } from "react";
import "./FeeEditManual.css";
import {
  FaPlus,
  FaSearch,
  FaTrash,
  FaTimes,
  FaFilter,
} from "react-icons/fa";

const FeeEditManual = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [search, setSearch] = useState("");

  const data = [
    {
      id: 1,
      admNo: "4572",
      srNo: "128",
      name: "Ayushi Jain",
      class: "1st-A",
      father: "Demo",
      type: "0",
    },
    {
      id: 2,
      admNo: "158",
      srNo: "135",
      name: "Ayansh Bharti",
      class: "1st-A",
      father: "Mr. Jitendra Kumar",
      type: "0",
    },
    {
      id: 3,
      admNo: "12/5008",
      srNo: "5017",
      name: "Dhruv",
      class: "1st-A",
      father: "Dhr",
      type: "0",
    },
    {
      id: 4,
      admNo: "6/5008",
      srNo: "5011",
      name: "ff vfdf",
      class: "N.C.-A",
      father: "bjuv",
      type: "0",
    },
    {
      id: 5,
      admNo: "8741",
      srNo: "121",
      name: "Rahul",
      class: "2nd-A",
      father: "Suresh",
      type: "0",
    },
    {
      id: 6,
      admNo: "9854",
      srNo: "555",
      name: "Priya",
      class: "3rd-A",
      father: "Rakesh",
      type: "0",
    },
    {
      id: 7,
      admNo: "1254",
      srNo: "777",
      name: "Ankit",
      class: "4th-A",
      father: "Mahesh",
      type: "0",
    },
    {
      id: 8,
      admNo: "4589",
      srNo: "888",
      name: "Pooja",
      class: "5th-A",
      father: "Kailash",
      type: "0",
    },
  ];

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <div className="feeEditManual">

        {/* Header */}
        <div className="feeEditManual__header">
          <h2>Fee Edit Manual</h2>
        </div>

        {/* Search + Actions */}
        <div className="feeEditManual__toolbar">
          <div className="feeEditManual__search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="feeEditManual__actions">
            <button className="feeEditManual__filterBtn">
              <FaFilter />
            </button>

            <button
              className="feeEditManual__addBtn"
              onClick={() => setShowPopup(true)}
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="feeEditManual__tableWrapper">
          <table className="feeEditManual__table">
            <thead>
              <tr>
                <th>S.NO.</th>
                <th>ADM.NO.</th>
                <th>SR.NO.</th>
                <th>NAME</th>
                <th>CLASS</th>
                <th>FATHER'S NAME</th>
                <th>TYPE</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((item, index) => (
                <tr key={item.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{item.admNo}</td>
                  <td>{item.srNo}</td>
                  <td>{item.name}</td>
                  <td>{item.class}</td>
                  <td>{item.father}</td>
                  <td>{item.type}</td>
                  <td>
                    <button className="feeEditManual__deleteBtn">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="feeEditManual__pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Popup */}
      <div
        className={`feeEditManual__overlay ${
          showPopup ? "active" : ""
        }`}
      >
        <div
          className={`feeEditManual__popup ${
            showPopup ? "show" : ""
          }`}
        >
          <div className="feeEditManual__popupHeader">
            <h3>FEE EDIT MANUAL</h3>

            <FaTimes
              className="feeEditManual__close"
              onClick={() => setShowPopup(false)}
            />
          </div>

          <div className="feeEditManual__popupBody">
            <div className="feeEditManual__popupSearch">
              <FaSearch />
              <input type="text" placeholder="Search" />
            </div>

            <label className="feeEditManual__checkbox">
              <input type="checkbox" />
              Apply Fees Structure from Admission Date
            </label>
          </div>

          <div className="feeEditManual__footer">
            <button
              className="feeEditManual__cancel"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>

            <button className="feeEditManual__submit">
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeeEditManual;
import React, { useState, useRef } from "react";
import "./FeeConcession.css";

import {
  FiSearch,
  FiPlus,
  FiTrash2,
  FiX,
  FiUploadCloud,
} from "react-icons/fi";

const FeeConcession = () => {
  const fileRef = useRef();

  const dummyData = [
    {
      admNo: "4572",
      srNo: "128",
      name: "Ayushi Jain",
      class: "1st-A",
      father: "Demo",
      type: "Principal",
      by: "Management",
    },
    {
      admNo: "19/5008",
      srNo: "5024",
      name: "Ayushi",
      class: "1st-A",
      father: "Mr.",
      type: "Staff",
      by: "Management",
    },
    {
      admNo: "168",
      srNo: "154",
      name: "Manisha",
      class: "1st-A",
      father: "GT",
      type: "Principal",
      by: "Management",
    },
    {
      admNo: "2/5008",
      srNo: "5007",
      name: "Rahuk Rahul",
      class: "2nd-A",
      father: "Rahuk",
      type: "Handicap",
      by: "Management",
    },
    {
      admNo: "167",
      srNo: "152",
      name: "Aditya Demo",
      class: "1st-A",
      father: "Rajesh Kumar",
      type: "Management",
      by: "Management",
    },
    {
      admNo: "4568",
      srNo: "1234",
      name: "Ashmita Minj",
      class: "2nd-A",
      father: "Atul",
      type: "Management",
      by: "Management",
    },
    {
      admNo: "170",
      srNo: "170",
      name: "Aaradhya",
      class: "U.K.G-A",
      father: "Mr. Subhash",
      type: "Poor Student",
      by: "Management",
    },
    {
      admNo: "4500",
      srNo: "100",
      name: "Riya",
      class: "3rd-A",
      father: "Kumar",
      type: "Staff",
      by: "Management",
    },
  ];

  const [tableData, setTableData] = useState(dummyData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [selectedFile, setSelectedFile] = useState(null);

  const filteredData = tableData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDelete = () => {
    const updated = [...tableData];
    updated.splice(deleteIndex, 1);
    setTableData(updated);
    setDeleteIndex(null);
  };

  const browseImage = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="feeConcession">

      {/* Header */}

      <div className="feeConcessionTop">

        <div className="feeConcessionSearchBox">
          <FiSearch />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          className="feeConcessionAddBtn"
          onClick={() => setShowModal(true)}
        >
          <FiPlus />
        </button>
      </div>

      {/* Table */}

      <div className="feeConcessionTableWrapper">

        <table className="feeConcessionTable">

          <thead>
            <tr>
              <th>S.NO.</th>
              <th>ADM.NO.</th>
              <th>SR.NO.</th>
              <th>NAME</th>
              <th>CLASS</th>
              <th>FATHER'S NAME</th>
              <th>CONCESSION TYPE</th>
              <th>CONCESSION BY</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>{startIndex + index + 1}</td>
                <td>{item.admNo}</td>
                <td>{item.srNo}</td>
                <td>{item.name}</td>
                <td>{item.class}</td>
                <td>{item.father}</td>
                <td>{item.type}</td>
                <td>{item.by}</td>

                <td>
                  <FiTrash2
                    className="feeConcessionDelete"
                    onClick={() => setDeleteIndex(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Pagination */}

      <div className="feeConcessionPagination">

        <div className="feeConcessionItems">

          <span>Items per page:</span>

          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>

        <div className="feeConcessionPages">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ❮
          </button>

          <span>
            {currentPage} / {totalPages || 1}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            ❯
          </button>
        </div>

      </div>

      {/* Popup */}

      {showModal && (
        <div className="feeConcessionModalOverlay">

          <div className="feeConcessionModal">

            <div className="feeConcessionModalHeader">

              <h2>FEE CONCESSION</h2>

              <button
                className="feeConcessionClose"
                onClick={() => setShowModal(false)}
              >
                <FiX />
              </button>
            </div>

            <div className="feeConcessionModalBody">

              <div className="feeConcessionModalSearch">
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search"
                />
              </div>

            </div>

            <div className="feeConcessionModalFooter">

              <input
                type="file"
                hidden
                ref={fileRef}
                accept="image/*"
                onChange={browseImage}
              />

              <button
                className="feeConcessionBrowseBtn"
                onClick={() => fileRef.current.click()}
              >
                <FiUploadCloud />
                Browse
              </button>

              <button
                className="feeConcessionCancelBtn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button className="feeConcessionSaveBtn">
                Add
              </button>

            </div>

            {selectedFile && (
              <div className="feeConcessionPreview">
                {selectedFile.name}
              </div>
            )}

          </div>

        </div>
      )}

      {/* Delete Modal */}

      {deleteIndex !== null && (
        <div className="feeConcessionDeleteOverlay">

          <div className="feeConcessionDeleteModal">

            <p>Are you sure you want to delete?</p>

            <div className="feeConcessionDeleteBtns">

              <button
                className="feeConcessionCancelDelete"
                onClick={() => setDeleteIndex(null)}
              >
                Cancel
              </button>

              <button
                className="feeConcessionConfirmDelete"
                onClick={handleDelete}
              >
                Yes
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default FeeConcession;
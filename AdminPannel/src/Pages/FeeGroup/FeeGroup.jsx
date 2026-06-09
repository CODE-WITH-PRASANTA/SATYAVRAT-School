import React, { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaTimes,
  FaSortUp,
  FaSortDown,
  FaSearch,
  FaEdit
} from "react-icons/fa";

import "./FeeGroup.css";

const FeeGroup = () => {
  const [feeGroups, setFeeGroups] = useState([
    { id: 1, headGroup: "Admission Fee", priority: 2 },
    { id: 2, headGroup: "Annual Examination Fee", priority: 6 },
    { id: 3, headGroup: "Half Yearly Examination Fee", priority: 5 },
    { id: 4, headGroup: "OFTHO", priority: 1 },
    { id: 5, headGroup: "Other Fee", priority: 11 },
    { id: 6, headGroup: "Quarterly Examination Fee", priority: 3 },
    { id: 7, headGroup: "ReAdmission", priority: 8 },
    { id: 8, headGroup: "Sports Fee", priority: 4 },
    { id: 9, headGroup: "Library Fee", priority: 7 },
    { id: 10, headGroup: "Computer Fee", priority: 9 },
    { id: 11, headGroup: "Lab Fee", priority: 10 },
    { id: 12, headGroup: "Transport Fee", priority: 12 },
  ]);

  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [newFeeGroup, setNewFeeGroup] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc"); // State to handle visual toggling smoothly

  const rowsPerPage = 7;

  // Search filter
  const filteredData = feeGroups.filter((item) =>
    item.headGroup.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination processing
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Add function
  const addFeeGroup = () => {
    if (!newFeeGroup.trim()) return;

    const newItem = {
      id: Date.now(),
      headGroup: newFeeGroup.trim(),
      priority: feeGroups.length + 1,
    };

    setFeeGroups([...feeGroups, newItem]);
    setNewFeeGroup("");
    setShowAddModal(false);
  };

  // Delete function - with page index correction
  const deleteFeeGroup = (id) => {
    const updatedList = feeGroups.filter((item) => item.id !== id);
    setFeeGroups(updatedList);
    
    const newTotalPages = Math.ceil(updatedList.filter(item => 
      item.headGroup.toLowerCase().includes(search.toLowerCase())
    ).length / rowsPerPage);
    
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  // Open Edit Modal
  const openEditModal = (item) => {
    setSelectedFee({ ...item });
    setShowEditModal(true);
  };

  // Update function
  const updateFeeGroup = () => {
    if (!selectedFee.headGroup.trim()) return;

    setFeeGroups(
      feeGroups.map((item) =>
        item.id === selectedFee.id 
          ? { ...selectedFee, headGroup: selectedFee.headGroup.trim(), priority: Number(selectedFee.priority) } 
          : item
      )
    );
    setShowEditModal(false);
  };

  // Premium Toggle Sorting (Alphabetical A-Z <-> Z-A handler)
  const sortByHeadGroup = () => {
    const nextOrder = sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...feeGroups].sort((a, b) => {
      if (nextOrder === "asc") {
        return a.headGroup.localeCompare(b.headGroup);
      } else {
        return b.headGroup.localeCompare(a.headGroup);
      }
    });
    setFeeGroups(sorted);
    setSortOrder(nextOrder);
  };

  return (
    <div className="fg-container">
      <div className="fg-card">
        
        {/* Premium Top Bar */}
        <div className="fg-top-bar">
          <div className="fg-search-box-wrapper">
            <FaSearch className="fg-search-inline-icon" />
            <input
              type="text"
              className="fg-search-input"
              placeholder="Search fee groups..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <button
            className="fg-btn-add"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus className="fg-add-icon" /> <span>Add Group</span>
          </button>
        </div>

        {/* Premium Table Content */}
        <div className="fg-table-wrapper">
          <table className="fg-table">
            <thead>
              <tr>
                <th style={{ width: "100px" }}>S.No.</th>
                <th onClick={sortByHeadGroup} className="fg-sortable-th" title="Click to sort alphabetically">
                  <div className="fg-th-content">
                    <span>HEAD GROUP</span> 
                    <span className="fg-sort-wrapper">
                      {sortOrder === "asc" ? (
                        <FaSortUp className="fg-sort-icon active" />
                      ) : (
                        <FaSortDown className="fg-sort-icon active shift-down" />
                      )}
                    </span>
                  </div>
                </th>
                <th style={{ width: "180px" }}>PRIORITY</th>
                <th style={{ width: "140px", textAlignment: "center" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className="fg-row-interactive"
                    onClick={() => openEditModal(item)} /* Row Click opens Modify Form */
                  >
                    <td>
                      <span className="fg-serial-badge">{indexOfFirst + index + 1}</span>
                    </td>
                    <td className="fg-text-bold">{item.headGroup}</td>
                    <td>
                      <span className={`fg-badge-priority ${item.priority <= 4 ? "prio-high" : item.priority <= 8 ? "prio-med" : "prio-low"}`}>
                        Priority {item.priority}
                      </span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="fg-action-btn-group">
                        <button 
                          className="fg-action-icon-btn edit-btn"
                          onClick={() => openEditModal(item)}
                          title="Modify Record"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="fg-action-icon-btn delete-btn"
                          onClick={(e) => {
                            e.stopPropagation(); /* Strict isolation layer for Delete operation */
                            deleteFeeGroup(item.id);
                          }}
                          title="Remove Record"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="fg-table-empty">
                    <div className="fg-empty-state-view">
                      <p>No matching record datasets found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Premium Pagination Footer */}
        <div className="fg-pagination">
          <span className="fg-pagination-info">
            Showing <span className="fg-highlight-text">{filteredData.length > 0 ? indexOfFirst + 1 : 0}</span> to{" "}
            <span className="fg-highlight-text">{Math.min(indexOfLast, filteredData.length)}</span> of{" "}
            <span className="fg-highlight-text">{filteredData.length}</span> Master Entries
          </span>

          <div className="fg-pagination-btns">
            <button
              className="fg-page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ❮ Previous
            </button>
            <button
              className="fg-page-btn"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next ❯
            </button>
          </div>
        </div>
      </div>

      {/* ADD MODAL CONTAINER */}
      {showAddModal && (
        <div className="fg-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="fg-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="fg-modal-header">
              <h2>Add Fee Group</h2>
              <button className="fg-modal-close" onClick={() => setShowAddModal(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="fg-modal-body">
              <div className="fg-form-group">
                <label>Fee Group Name <span className="fg-required">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Tuition Fee"
                  value={newFeeGroup}
                  onChange={(e) => setNewFeeGroup(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="fg-modal-footer">
              <button className="fg-btn-cancel" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="fg-btn-save" onClick={addFeeGroup}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / MODIFY MODAL CONTAINER */}
      {showEditModal && selectedFee && (
        <div className="fg-modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="fg-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="fg-modal-header">
              <h2>Add Fee Group</h2> {/* Layout branding preserved */}
              <button className="fg-modal-close" onClick={() => setShowEditModal(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="fg-modal-body">
              <div className="fg-form-group">
                <label>Fee Group Name *</label>
                <input
                  type="text"
                  value={selectedFee.headGroup}
                  onChange={(e) =>
                    setSelectedFee({
                      ...selectedFee,
                      headGroup: e.target.value,
                    })
                  }
                />
              </div>

              <div className="fg-form-group">
                <label>Priority No.*</label>
                <input
                  type="number"
                  value={selectedFee.priority}
                  onChange={(e) =>
                    setSelectedFee({
                      ...selectedFee,
                      priority: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="fg-modal-footer">
              <button className="fg-btn-cancel" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="fg-btn-save action-modify" onClick={updateFeeGroup}>
                Modify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeGroup;
import React, { useEffect, useMemo, useState } from "react";
import "./ColdLeadTable.css";
import API from "../../Api/axois"; // ✅ ADDED

const ColdLeadTable = () => {
  const [coldLeadTableList, setColdLeadTableList] = useState([]);
  const [coldLeadTableCurrentPage, setColdLeadTableCurrentPage] = useState(1);
  const [coldLeadTablePopupOpen, setColdLeadTablePopupOpen] = useState(false);
  const [coldLeadTableSelectedId, setColdLeadTableSelectedId] = useState(null);
  const [coldLeadTableFeedbackText, setColdLeadTableFeedbackText] = useState("");

  const coldLeadTableItemsPerPage = 8;

  /* ================= FETCH FROM BACKEND ================= */
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await API.get("/enquiries");
        setColdLeadTableList(res.data.data || []);
      } catch (error) {
        console.error("FETCH ERROR:", error);
      }
    };
    fetchLeads();
  }, []);

  const handleColdLeadTableEdit = (item) => {
    alert(`Edit clicked for ${item.name}`);
  };

  /* ================= DELETE ================= */
  const handleColdLeadTableDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cold lead record?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/enquiries/${id}`);

      const updatedList = coldLeadTableList.filter(
        (item) => item._id !== id
      );
      setColdLeadTableList(updatedList);

      const updatedPages =
        Math.ceil(updatedList.length / coldLeadTableItemsPerPage) || 1;

      if (coldLeadTableCurrentPage > updatedPages) {
        setColdLeadTableCurrentPage(updatedPages);
      }
    } catch (error) {
      console.error("DELETE ERROR:", error);
    }
  };

  /* ================= OPEN FEEDBACK ================= */
  const handleColdLeadTableOpenFeedback = (item) => {
    setColdLeadTableSelectedId(item._id); // ✅ FIXED
    setColdLeadTableFeedbackText(item.feedback || "");
    setColdLeadTablePopupOpen(true);
  };

  const handleColdLeadTableCloseFeedback = () => {
    setColdLeadTablePopupOpen(false);
    setTimeout(() => {
      setColdLeadTableSelectedId(null);
      setColdLeadTableFeedbackText("");
    }, 300);
  };

  /* ================= FEEDBACK SUBMIT ================= */
  const handleColdLeadTableFeedbackSubmit = async (e) => {
    e.preventDefault();

    if (!coldLeadTableFeedbackText.trim()) {
      alert("Please enter feedback.");
      return;
    }

    try {
      const res = await API.put(
        `/enquiries/${coldLeadTableSelectedId}/feedback`,
        { feedback: coldLeadTableFeedbackText }
      );

      setColdLeadTableList((prev) =>
        prev.map((item) =>
          item._id === coldLeadTableSelectedId
            ? res.data.data
            : item
        )
      );

      handleColdLeadTableCloseFeedback();
    } catch (error) {
      console.error("FEEDBACK ERROR:", error);
    }
  };

  /* ================= PAGINATION ================= */
  const coldLeadTableTotalPages =
    Math.ceil(coldLeadTableList.length / coldLeadTableItemsPerPage) || 1;

  const coldLeadTableStartIndex =
    (coldLeadTableCurrentPage - 1) * coldLeadTableItemsPerPage;

  const coldLeadTablePaginatedList = useMemo(() => {
    return coldLeadTableList.slice(
      coldLeadTableStartIndex,
      coldLeadTableStartIndex + coldLeadTableItemsPerPage
    );
  }, [coldLeadTableList, coldLeadTableStartIndex]);

  const handleColdLeadTablePageChange = (page) => {
    setColdLeadTableCurrentPage(page);
  };

  return (
    <div className="coldLeadTable">
      <div className="coldLeadTable__card">
        <div className="coldLeadTable__header">
          <h2 className="coldLeadTable__title">Cold Lead Table</h2>
          <p className="coldLeadTable__subtitle">
            Manage all parents and student cold lead records here.
          </p>
        </div>

        <div className="coldLeadTable__tableWrap">
          <table className="coldLeadTable__table">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Parents / Student Name</th>
                <th>Address</th>
                <th>Feedback</th>
                <th>Phone No</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {coldLeadTablePaginatedList.length > 0 ? (
                coldLeadTablePaginatedList.map((item, index) => (
                  <tr key={item._id}>
                    <td>{coldLeadTableStartIndex + index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td className="coldLeadTable__feedbackCell">
                      {item.feedback || "No feedback added"}
                    </td>
                    <td>{item.phone}</td>
                    <td>
                      <div className="coldLeadTable__actionButtons">
                        {/* <button
                          type="button"
                          className="coldLeadTable__actionBtn coldLeadTable__actionBtn--edit"
                          onClick={() => handleColdLeadTableEdit(item)}
                        >
                          Edit
                        </button> */}

                        <button
                          type="button"
                          className="coldLeadTable__actionBtn coldLeadTable__actionBtn--delete"
                          onClick={() =>
                            handleColdLeadTableDelete(item._id)
                          }
                        >
                          Delete
                        </button>

                        <button
                          type="button"
                          className="coldLeadTable__actionBtn coldLeadTable__actionBtn--feedback"
                          onClick={() => handleColdLeadTableOpenFeedback(item)}
                        >
                          Feedback
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="coldLeadTable__empty">
                    No cold lead records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {coldLeadTableList.length > 0 && (
          <div className="coldLeadTable__pagination">
            <button
              className="coldLeadTable__pageBtn"
              onClick={() =>
                handleColdLeadTablePageChange(
                  coldLeadTableCurrentPage > 1
                    ? coldLeadTableCurrentPage - 1
                    : 1
                )
              }
              disabled={coldLeadTableCurrentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: coldLeadTableTotalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`coldLeadTable__pageBtn ${
                  coldLeadTableCurrentPage === index + 1
                    ? "coldLeadTable__pageBtn--active"
                    : ""
                }`}
                onClick={() => handleColdLeadTablePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="coldLeadTable__pageBtn"
              onClick={() =>
                handleColdLeadTablePageChange(
                  coldLeadTableCurrentPage < coldLeadTableTotalPages
                    ? coldLeadTableCurrentPage + 1
                    : coldLeadTableTotalPages
                )
              }
              disabled={coldLeadTableCurrentPage === coldLeadTableTotalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* POPUP (UNCHANGED UI) */}
      <div
        className={`coldLeadTable__popupOverlay ${
          coldLeadTablePopupOpen ? "coldLeadTable__popupOverlay--show" : ""
        }`}
      >
        <div
          className={`coldLeadTable__popup ${
            coldLeadTablePopupOpen ? "coldLeadTable__popup--show" : ""
          }`}
        >
          <div className="coldLeadTable__popupHeader">
            <h3 className="coldLeadTable__popupTitle">Feedback Form</h3>
            <button
              type="button"
              className="coldLeadTable__popupClose"
              onClick={handleColdLeadTableCloseFeedback}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleColdLeadTableFeedbackSubmit}>
            <div className="coldLeadTable__popupGroup">
              <label className="coldLeadTable__popupLabel">Feedback</label>
              <textarea
                className="coldLeadTable__popupTextarea"
                value={coldLeadTableFeedbackText}
                onChange={(e) => setColdLeadTableFeedbackText(e.target.value)}
                rows="5"
              />
            </div>

            <div className="coldLeadTable__popupActions">
              <button
                type="button"
                className="coldLeadTable__popupBtn coldLeadTable__popupBtn--cancel"
                onClick={handleColdLeadTableCloseFeedback}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="coldLeadTable__popupBtn coldLeadTable__popupBtn--submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ColdLeadTable;
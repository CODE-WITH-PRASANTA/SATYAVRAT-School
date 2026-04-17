import React, { useEffect, useMemo, useState } from "react";
import "./ColdLead.css";
import API from "../../Api/axios"; // ✅ ADDED

const ColdLead = () => {
  const [coldLeadForm, setColdLeadForm] = useState({
    name: "",
    address: "",
    phone: "",
    message: "",
  });

  const [coldLeadList, setColdLeadList] = useState([]);
  const [coldLeadEditId, setColdLeadEditId] = useState(null);
  const [coldLeadCurrentPage, setColdLeadCurrentPage] = useState(1);
  const [coldLeadFilter, setColdLeadFilter] = useState({
    name: "",
    address: "",
  });

  const coldLeadItemsPerPage = 6;

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await API.get("/enquiries");
        setColdLeadList(res.data.data || []);
      } catch (error) {
        console.error("FETCH ERROR:", error);
      }
    };
    fetchLeads();
  }, []);

  const handleColdLeadInputChange = (e) => {
    const { name, value } = e.target;
    setColdLeadForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColdLeadFilterChange = (e) => {
    const { name, value } = e.target;
    setColdLeadFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
    setColdLeadCurrentPage(1);
  };

  /* ================= SUBMIT ================= */
  const handleColdLeadSubmit = async (e) => {
    e.preventDefault();

    if (
      !coldLeadForm.name.trim() ||
      !coldLeadForm.address.trim() ||
      !coldLeadForm.phone.trim() ||
      !coldLeadForm.message.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      if (coldLeadEditId !== null) {
        const res = await API.put(
          `/enquiries/${coldLeadEditId}`,
          coldLeadForm
        );

        setColdLeadList((prev) =>
          prev.map((item) =>
            item._id === coldLeadEditId ? res.data.data : item
          )
        );

        setColdLeadEditId(null);
      } else {
        const res = await API.post("/enquiries", coldLeadForm);

        setColdLeadList((prev) => [res.data.data, ...prev]);
      }

      setColdLeadForm({
        name: "",
        address: "",
        phone: "",
        message: "",
      });

      setColdLeadCurrentPage(1);
    } catch (error) {
      console.error("SUBMIT ERROR:", error);
    }
  };

  /* ================= EDIT ================= */
  const handleColdLeadEdit = (coldLeadItem) => {
    setColdLeadForm({
      name: coldLeadItem.name,
      address: coldLeadItem.address,
      phone: coldLeadItem.phone,
      message: coldLeadItem.message,
    });
    setColdLeadEditId(coldLeadItem._id); // ✅ FIXED
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const handleColdLeadDelete = async (coldLeadId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/enquiries/${coldLeadId}`);

      const updatedList = coldLeadList.filter(
        (item) => item._id !== coldLeadId
      );
      setColdLeadList(updatedList);

      const totalFilteredItemsAfterDelete = updatedList.filter((item) => {
        const matchesName = item.name
          .toLowerCase()
          .includes(coldLeadFilter.name.toLowerCase());
        const matchesAddress = item.address
          .toLowerCase()
          .includes(coldLeadFilter.address.toLowerCase());
        return matchesName && matchesAddress;
      }).length;

      const totalPagesAfterDelete =
        Math.ceil(totalFilteredItemsAfterDelete / coldLeadItemsPerPage) || 1;

      if (coldLeadCurrentPage > totalPagesAfterDelete) {
        setColdLeadCurrentPage(totalPagesAfterDelete);
      }
    } catch (error) {
      console.error("DELETE ERROR:", error);
    }
  };

  /* ================= FILTER (UNCHANGED UI) ================= */
  const filteredColdLeadList = useMemo(() => {
    return coldLeadList.filter((item) => {
      const matchesName = item.name
        .toLowerCase()
        .includes(coldLeadFilter.name.toLowerCase());

      const matchesAddress = item.address
        .toLowerCase()
        .includes(coldLeadFilter.address.toLowerCase());

      return matchesName && matchesAddress;
    });
  }, [coldLeadList, coldLeadFilter]);

  const coldLeadTotalPages =
    Math.ceil(filteredColdLeadList.length / coldLeadItemsPerPage) || 1;

  const coldLeadStartIndex = (coldLeadCurrentPage - 1) * coldLeadItemsPerPage;
  const coldLeadEndIndex = coldLeadStartIndex + coldLeadItemsPerPage;

  const paginatedColdLeadList = filteredColdLeadList.slice(
    coldLeadStartIndex,
    coldLeadEndIndex
  );

  const handleColdLeadPageChange = (pageNumber) => {
    setColdLeadCurrentPage(pageNumber);
  };

  return (
    <div className="coldLead">
      <div className="coldLead__wrapper">

        {/* ===== FORM (UNCHANGED) ===== */}
        <div className="coldLead__left">
          <div className="coldLead__card">
            <div className="coldLead__header">
              <h2 className="coldLead__title">Cold Lead Form</h2>
              <p className="coldLead__subtitle">
                Add parent or student lead details here.
              </p>
            </div>

            <form className="coldLead__form" onSubmit={handleColdLeadSubmit}>
              <div className="coldLead__formGroup">
                <label className="coldLead__label">Sl No</label>
                <input
                  type="text"
                  className="coldLead__input"
                  value={
                    coldLeadEditId !== null
                      ? "Editing..."
                      : coldLeadList.length + 1
                  }
                  readOnly
                />
              </div>

              <div className="coldLead__formGroup">
                <label className="coldLead__label">Parent / Student Name</label>
                <input
                  type="text"
                  name="name"
                  className="coldLead__input"
                  value={coldLeadForm.name}
                  onChange={handleColdLeadInputChange}
                />
              </div>

              <div className="coldLead__formGroup">
                <label className="coldLead__label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="coldLead__input"
                  value={coldLeadForm.address}
                  onChange={handleColdLeadInputChange}
                />
              </div>

              <div className="coldLead__formGroup">
                <label className="coldLead__label">Phone No</label>
                <input
                  type="tel"
                  name="phone"
                  className="coldLead__input"
                  value={coldLeadForm.phone}
                  onChange={handleColdLeadInputChange}
                />
              </div>

              <div className="coldLead__formGroup">
                <label className="coldLead__label">Message</label>
                <textarea
                  name="message"
                  className="coldLead__textarea"
                  value={coldLeadForm.message}
                  onChange={handleColdLeadInputChange}
                />
              </div>

              <button type="submit" className="coldLead__submitBtn">
                {coldLeadEditId !== null ? "Update Lead" : "Submit"}
              </button>
            </form>
          </div>
        </div>

        {/* ===== LIST (UNCHANGED WITH FILTER) ===== */}
        <div className="coldLead__right">
          <div className="coldLead__card">

            {/* 🔥 FILTER SECTION KEPT EXACT */}
            <div className="coldLead__filters">
              <div className="coldLead__filterGroup">
                <label className="coldLead__label">Filter by Name</label>
                <input
                  type="text"
                  name="name"
                  className="coldLead__input"
                  value={coldLeadFilter.name}
                  onChange={handleColdLeadFilterChange}
                />
              </div>

              <div className="coldLead__filterGroup">
                <label className="coldLead__label">Filter by Address</label>
                <input
                  type="text"
                  name="address"
                  className="coldLead__input"
                  value={coldLeadFilter.address}
                  onChange={handleColdLeadFilterChange}
                />
              </div>
            </div>

            <div className="coldLead__tableWrap">
              <table className="coldLead__table">
                <tbody>
                  {paginatedColdLeadList.length > 0 ? (
                    paginatedColdLeadList.map((item, index) => (
                      <tr key={item._id}>
                        <td>{coldLeadStartIndex + index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>{item.phone}</td>
                        <td className="coldLead__messageCell">{item.message}</td>
                        <td>
                          <div className="coldLead__actionButtons">
                            <button
                              className="coldLead__actionBtn coldLead__actionBtn--edit"
                              onClick={() => handleColdLeadEdit(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="coldLead__actionBtn coldLead__actionBtn--delete"
                              onClick={() =>
                                handleColdLeadDelete(item._id)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="coldLead__empty">
                        No cold leads found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ColdLead;
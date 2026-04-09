import React, { useMemo, useState, useEffect } from "react";
import "./AdmissionTable.css";
import API from "../../api/axios";

const AdmissionTable = () => {
  const [admissionTableList, setAdmissionTableList] = useState([]);

  const [admissionTableEditId, setAdmissionTableEditId] = useState(null);
  const [admissionTableCurrentPage, setAdmissionTableCurrentPage] = useState(1);

  const [admissionTableForm, setAdmissionTableForm] = useState({
    childName: "",
    childDob: "",
    parentName: "",
    parentDesignation: "",
    email: "",
    phoneNo: "",
    notifyProgress: "No",
  });

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const res = await API.get("/students");

      const data = res.data?.data || res.data?.students || res.data || [];

      const formatted = data.map((item) => ({
        id: item._id,
        childName: `${item.firstName || ""} ${item.lastName || ""}`,
        childDob: item.dob ? item.dob.split("T")[0] : "",
        parentName: item.guardianName,
        parentDesignation: item.guardianOccupation,
        email: item.email,
        phoneNo: item.guardianPhone,
        notifyProgress: "Yes",
      }));

      setAdmissionTableList(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const admissionTableItemsPerPage = 8;

  const handleAdmissionTableEdit = (item) => {
    localStorage.setItem("editStudentId", item.id);
    window.location.href = "/student/admission";
  };

  const handleAdmissionTableDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admission record?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/students/${id}`);

      fetchAdmissions(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleAdmissionTableInputChange = (e) => {
    const { name, value } = e.target;
    setAdmissionTableForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdmissionTableSubmit = (e) => {
    e.preventDefault();

    if (
      !admissionTableForm.childName.trim() ||
      !admissionTableForm.childDob.trim() ||
      !admissionTableForm.parentName.trim() ||
      !admissionTableForm.parentDesignation.trim() ||
      !admissionTableForm.email.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setAdmissionTableEditId(null);
    setAdmissionTableForm({
      childName: "",
      childDob: "",
      parentName: "",
      parentDesignation: "",
      email: "",
      phoneNo: "",
      notifyProgress: "No",
    });
  };

  const admissionTableTotalPages =
    Math.ceil(admissionTableList.length / admissionTableItemsPerPage) || 1;

  const admissionTableStartIndex =
    (admissionTableCurrentPage - 1) * admissionTableItemsPerPage;

  const admissionTablePaginatedList = useMemo(() => {
    return admissionTableList.slice(
      admissionTableStartIndex,
      admissionTableStartIndex + admissionTableItemsPerPage,
    );
  }, [admissionTableList, admissionTableStartIndex]);

  const handleAdmissionTablePageChange = (page) => {
    setAdmissionTableCurrentPage(page);
  };

  return (
    <div className="admissionTable">
      <div className="admissionTable__card">
        <div className="admissionTable__header">
          <h2 className="admissionTable__title">Admission Table</h2>
          <p className="admissionTable__subtitle">
            Manage all admission form records here.
          </p>
        </div>

        {admissionTableEditId !== null && (
          <form
            className="admissionTable__editForm"
            onSubmit={handleAdmissionTableSubmit}
          >
            <div className="admissionTable__formGrid">
              <div className="admissionTable__formGroup">
                <label className="admissionTable__label">Child's Name</label>
                <input
                  type="text"
                  name="childName"
                  className="admissionTable__input"
                  value={admissionTableForm.childName}
                  onChange={handleAdmissionTableInputChange}
                />
              </div>

              <div className="admissionTable__formGroup">
                <label className="admissionTable__label">Child's DOB</label>
                <input
                  type="text"
                  name="childDob"
                  className="admissionTable__input"
                  value={admissionTableForm.childDob}
                  onChange={handleAdmissionTableInputChange}
                />
              </div>

              <div className="admissionTable__formGroup">
                <label className="admissionTable__label">Parent's Name</label>
                <input
                  type="text"
                  name="parentName"
                  className="admissionTable__input"
                  value={admissionTableForm.parentName}
                  onChange={handleAdmissionTableInputChange}
                />
              </div>

              <div className="admissionTable__formGroup">
                <label className="admissionTable__label">
                  Parent's Designation
                </label>
                <input
                  type="text"
                  name="parentDesignation"
                  className="admissionTable__input"
                  value={admissionTableForm.parentDesignation}
                  onChange={handleAdmissionTableInputChange}
                />
              </div>

              <div className="admissionTable__formGroup">
                <label className="admissionTable__label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="admissionTable__input"
                  value={admissionTableForm.email}
                  onChange={handleAdmissionTableInputChange}
                />
              </div>

              <div className="admissionTable__formGroup">
                <label className="admissionTable__label">Phone No</label>
                <input
                  type="text"
                  name="phoneNo"
                  className="admissionTable__input"
                  value={admissionTableForm.phoneNo}
                  onChange={handleAdmissionTableInputChange}
                />
              </div>

              <div className="admissionTable__formGroup">
                <label className="admissionTable__label">
                  Notify Weekly Progress
                </label>
                <select
                  name="notifyProgress"
                  className="admissionTable__input"
                  value={admissionTableForm.notifyProgress}
                  onChange={handleAdmissionTableInputChange}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div className="admissionTable__formActions">
              <button type="submit" className="admissionTable__saveBtn">
                Update Admission
              </button>
              <button
                type="button"
                className="admissionTable__cancelBtn"
                onClick={() => {
                  setAdmissionTableEditId(null);
                  setAdmissionTableForm({
                    childName: "",
                    childDob: "",
                    parentName: "",
                    parentDesignation: "",
                    email: "",
                    phoneNo: "",
                    notifyProgress: "No",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="admissionTable__tableWrap">
          <table className="admissionTable__table">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Child's Name</th>
                <th>Child's DOB</th>
                <th>Parent's Name</th>
                <th>Parent's Designation</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Notify Progress</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {admissionTablePaginatedList.length > 0 ? (
                admissionTablePaginatedList.map((item, index) => (
                  <tr key={item.id}>
                    <td>{admissionTableStartIndex + index + 1}</td>
                    <td>{item.childName}</td>
                    <td>{item.childDob}</td>
                    <td>{item.parentName}</td>
                    <td>{item.parentDesignation}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNo}</td>
                    <td>
                      <span
                        className={`admissionTable__status ${
                          item.notifyProgress === "Yes"
                            ? "admissionTable__status--yes"
                            : "admissionTable__status--no"
                        }`}
                      >
                        {item.notifyProgress}
                      </span>
                    </td>
                    <td>
                      <div className="admissionTable__actionButtons">
                        <button
                          type="button"
                          className="admissionTable__actionBtn admissionTable__actionBtn--edit"
                          onClick={() => handleAdmissionTableEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="admissionTable__actionBtn admissionTable__actionBtn--delete"
                          onClick={() => handleAdmissionTableDelete(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="admissionTable__empty">
                    No admission records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {admissionTableList.length > 0 && (
          <div className="admissionTable__pagination">
            <button
              className="admissionTable__pageBtn"
              onClick={() =>
                handleAdmissionTablePageChange(
                  admissionTableCurrentPage > 1
                    ? admissionTableCurrentPage - 1
                    : 1,
                )
              }
              disabled={admissionTableCurrentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: admissionTableTotalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`admissionTable__pageBtn ${
                  admissionTableCurrentPage === index + 1
                    ? "admissionTable__pageBtn--active"
                    : ""
                }`}
                onClick={() => handleAdmissionTablePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="admissionTable__pageBtn"
              onClick={() =>
                handleAdmissionTablePageChange(
                  admissionTableCurrentPage < admissionTableTotalPages
                    ? admissionTableCurrentPage + 1
                    : admissionTableTotalPages,
                )
              }
              disabled={admissionTableCurrentPage === admissionTableTotalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionTable;

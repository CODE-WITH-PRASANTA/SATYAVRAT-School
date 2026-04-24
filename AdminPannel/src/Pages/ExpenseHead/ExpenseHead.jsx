import React, { useEffect, useState } from "react";
import "./ExpenseHead.css";
import { FaEllipsisV } from "react-icons/fa";
import API from "../../api/axios";

const ExpenseHead = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      const res = await API.get("/expense-head");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SAVE / UPDATE =================
  const handleSubmit = async () => {
    try {
      if (editId) {
        await API.put(`/expense-head/${editId}`, form);
      } else {
        await API.post("/expense-head", form);
      }

      setForm({ name: "", description: "" });
      setEditId(null);
      fetchData();
    } catch (error) {
      console.log("ERROR RESPONSE:", error.response?.data);
      console.log("FULL ERROR:", error);
    }
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description || "",
    });
    setEditId(item._id);
    setOpenMenu(null);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await API.delete(`/expense-head/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= MENU =================
  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <div className="expenseHead-wrapper">
      <div className="expenseHead-pageTitle">Expense Head</div>

      <div className="expenseHead-grid">
        {/* LEFT FORM */}
        <div className="expenseHead-card">
          <div className="expenseHead-cardHeader">
            {editId ? "Edit Expense Head" : "Add Expense Head"}
          </div>

          <div className="expenseHead-form">
            <label>Expense Head *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Expense Head"
            />

            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description"
            />

            <button className="expenseHead-saveBtn" onClick={handleSubmit}>
              {editId ? "Update" : "Save"}
            </button>
          </div>
        </div>

        {/* RIGHT TABLE */}
        <div className="expenseHead-card">
          <div className="expenseHead-cardHeader">Expense Head List</div>

          <div className="expenseHead-tableWrap">
            <table className="expenseHead-table">
              <thead>
                <tr>
                  <th>EXPENSE HEAD</th>
                  <th style={{ width: "70px" }}>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>

                    <td className="expenseHead-actionCell">
                      <button
                        className="expenseHead-actionIcon"
                        onClick={() => toggleMenu(item._id)}
                      >
                        <FaEllipsisV size={16} />
                      </button>

                      {openMenu === item._id && (
                        <div className="expenseHead-menu">
                          <button onClick={() => handleEdit(item)}>Edit</button>
                          <button
                            className="delete"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {data.length === 0 && (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseHead;

import React, { useState, useEffect } from "react";
import "./AddExpense.css";
import API from "../../api/axios"; // use your axios instance

import { FaWallet, FaList, FaEdit } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const AddExpense = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [editId, setEditId] = useState(null);

  const [expenseHeads, setExpenseHeads] = useState([]);

  const [formData, setFormData] = useState({
    head: "",
    name: "",
    accountNumber: "",
    invoice: "",
    amount: "",
    date: "",
    description: "",
  });

  const [expenses, setExpenses] = useState([]);

  // ✅ FETCH DATA FROM BACKEND
  const fetchExpenseHeads = async () => {
    try {
      const res = await API.get("/expense-head");
      setExpenseHeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses"); // ✅ clean
      setExpenses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchExpenseHeads(); // ✅ ADD THIS
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ ADD / UPDATE EXPENSE
  const handleSave = async () => {
    try {
      // ✅ VALIDATION
      if (
        !formData.head ||
        !formData.name ||
        !formData.invoice ||
        !formData.amount ||
        !formData.date
      ) {
        alert("Please fill all required fields!");
        return;
      }

      // ✅ UPDATE / CREATE
      if (editId) {
        await API.put(`/expenses/${editId}`, formData);
      } else {
        await API.post("/expenses", formData);
      }

      // ✅ REFRESH DATA
      await fetchExpenses();

      // ✅ RESET FORM
      setFormData({
        head: "",
        name: "",
        accountNumber: "",
        invoice: "",
        amount: "",
        date: "",
        description: "",
      });

      setEditId(null);
    } catch (error) {
      console.error("Save Error:", error.response?.data || error.message);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure?");
      if (!confirmDelete) return;

      await API.delete(`/expenses/${id}`);

      // instant UI update
      setExpenses((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
    }
  };

  // ✅ EDIT (FILL FORM)
  const handleEdit = (item) => {
    setFormData({
      head: item.head?._id || item.head,
      name: item.name,
      accountNumber: item.accountNumber,
      invoice: item.invoice,
      amount: item.amount,
      date: item.date?.substring(0, 10),
      description: item.description,
    });

    setEditId(item._id);
    setActiveMenu(null);
  };

  return (
    <div className="add-expense-page">
      {/* HEADER */}
      <div className="expense-header">
        <h2>
          <FaWallet /> Add Expense
        </h2>
      </div>

      <div className="expense-layout">
        {/* LEFT FORM */}
        <div className="expense-form-card">
          <h3>
            <FaEdit /> {editId ? "Edit Expense" : "Add Expense"}
          </h3>

          <div className="form-scroll">
            <div className="form-group">
              <label>Expense Head *</label>
              <select name="head" value={formData.head} onChange={handleChange}>
                <option value="">Select</option>

                {expenseHeads.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                name="accountNumber"
                placeholder="Enter Account Number"
                value={formData.accountNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Invoice Number *</label>
              <input
                type="text"
                name="invoice"
                placeholder="Enter Invoice No"
                value={formData.invoice}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Amount *</label>
              <input
                type="number"
                name="amount"
                placeholder="Enter Amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Enter Description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <button className="save-btn" onClick={handleSave}>
            {editId ? "Update Expense" : "Save Expense"}
          </button>
        </div>

        {/* RIGHT TABLE */}
        <div className="expense-table-card">
          <h3>
            <FaList /> Expense List
          </h3>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Expense Head</th>
                  <th>Name</th>
                  <th>Account</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((item, index) => (
                  <tr key={item._id}>
                    <td>{item.head}</td>
                    <td>{item.name}</td>
                    <td>{item.accountNumber}</td>
                    <td>₹ {item.amount}</td>
                    <td>{item.date?.substring(0, 10)}</td>

                    <td className="action-cell">
                      <BsThreeDotsVertical
                        className="action-icon"
                        onClick={() =>
                          setActiveMenu(activeMenu === index ? null : index)
                        }
                      />

                      {activeMenu === index && (
                        <div className="dropdown-menu">
                          <div
                            className="dropdown-item"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </div>

                          <div
                            className="dropdown-item delete"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;

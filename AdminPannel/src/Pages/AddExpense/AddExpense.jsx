import React, { useState, useEffect } from "react";
import "./AddExpense.css";
import API from "../../api/axios";

import { FaWallet, FaList, FaEdit } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const BASE_URL = "http://localhost:5000"; // backend URL

const AddExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [preview, setPreview] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
    description: "",
    image: null,
  });

  /* ================= FETCH ================= */
  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.expenses || [];

      setExpenses(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  /* ================= IMAGE URL FIX ================= */
  const getImageUrl = (img) => {
    if (!img) return null;

    // already full URL
    if (img.startsWith("http")) return img;

    // fix missing slash
    if (!img.startsWith("/")) img = "/" + img;

    return `${BASE_URL}${img}`;
  };

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= IMAGE ================= */
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    if (file) setPreview(URL.createObjectURL(file));
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    try {
      if (!formData.name || !formData.amount) {
        return alert("Fill required fields");
      }

      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) form.append(key, formData[key]);
      });

      let res;

      if (editId) {
        res = await API.put(`/expenses/${editId}`, form);
      } else {
        res = await API.post("/expenses", form);
      }

      // ✅ Immediately update UI (important fix)
      const newItem = res.data;

      setExpenses((prev) => {
        if (editId) {
          return prev.map((item) =>
            item._id === editId ? newItem : item
          );
        } else {
          return [newItem, ...prev];
        }
      });

      // reset
      setFormData({
        name: "",
        amount: "",
        date: "",
        description: "",
        image: null,
      });

      setPreview(null);
      setEditId(null);

    } catch (err) {
      console.error("Save error:", err);
      alert("Save failed ❌");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;

    try {
      await API.delete(`/expenses/${id}`);
      setExpenses((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      amount: item.amount,
      date: item.date?.substring(0, 10),
      description: item.description,
      image: null,
    });

    setPreview(getImageUrl(item.image));
    setEditId(item._id);
  };

  return (
    <div className="add-expense-page">

      <div className="expense-header">
        <h2><FaWallet /> Expense Manager</h2>
      </div>

      <div className="expense-layout">

        {/* ================= FORM ================= */}
        <div className="expense-form-card">
          <h3><FaEdit /> {editId ? "Edit Expense" : "Add Expense"}</h3>

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <input type="file" onChange={handleImage} />

          {/* PREVIEW */}
          <div className="preview-card">
            {preview ? (
              <img src={preview} alt="preview" />
            ) : (
              <div className="no-image">No Image</div>
            )}
          </div>

          <button className="save-btn" onClick={handleSave}>
            {editId ? "Update Expense" : "Save Expense"}
          </button>
        </div>

        {/* ================= TABLE ================= */}
        <div className="expense-table-card">
          <h3><FaList /> Expense List</h3>

          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((item, index) => (
                <tr key={item._id}>
                  <td>
                    {item.image ? (
                      <img
                        src={getImageUrl(item.image)}
                        className="table-img"
                        alt="expense"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/60";
                        }}
                      />
                    ) : (
                      <div className="no-img">N/A</div>
                    )}
                  </td>

                  <td>{item.name}</td>
                  <td className="amount">₹ {item.amount}</td>
                  <td>{item.date?.substring(0, 10)}</td>

                  <td className="action-cell">
                    <BsThreeDotsVertical
                      onClick={() =>
                        setActiveMenu(activeMenu === index ? null : index)
                      }
                    />

                    {activeMenu === index && (
                      <div className="dropdown-menu">
                        <div onClick={() => handleEdit(item)}>Edit</div>
                        <div
                          className="delete"
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
  );
};

export default AddExpense;
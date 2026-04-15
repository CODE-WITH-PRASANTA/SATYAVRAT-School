import React, { useState } from "react";
import "./Admission.css";

const Admission = () => {
  const base = "admissionAdmin";

  const initialForm = {
    heading: "",
    childNameLabel: "",
    childDobLabel: "",
    parentNameLabel: "",
    parentDesignationLabel: "",
    emailLabel: "",
    phoneLabel: "",
    checkboxLabel: "",
    childNameRequired: false,
    childDobRequired: false,
    parentNameRequired: false,
    parentDesignationRequired: false,
    emailRequired: false,
    phoneRequired: false,
    checkboxRequired: false,
    buttonText: "",
    status: "Active",
  };

  const [form, setForm] = useState(initialForm);
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [openAction, setOpenAction] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const payload = {
      id: editId || Date.now(),
      childName: form.childNameLabel,
      parentName: form.parentNameLabel,
      dob: form.childDobLabel,
      email: form.emailLabel,
      phone: form.phoneLabel,
      status: form.status,
      fullData: { ...form },
    };

    if (editId) {
      setList((prev) => prev.map((item) => (item.id === editId ? payload : item)));
      setEditId(null);
    } else {
      setList((prev) => [payload, ...prev]);
    }

    handleClear();
  };

  const handleClear = () => {
    setForm(initialForm);
    setEditId(null);
    setOpenAction(null);
  };

  const handleEdit = (item) => {
    if (!item.fullData) return;
    setForm(item.fullData);
    setEditId(item.id);
    setOpenAction(null);
  };

  const handleDelete = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
    if (editId === id) {
      handleClear();
    }
    setOpenAction(null);
  };

  const handleView = (item) => {
    alert(
      `Child Name Label: ${item.childName || "-"}\nParent Name Label: ${item.parentName || "-"}\nDOB Label: ${item.dob || "-"}\nEmail Label: ${item.email || "-"}\nPhone Label: ${item.phone || "-"}`
    );
    setOpenAction(null);
  };

  const getLabel = (label, required, fallback) =>
    `${label || fallback}${required ? " (Required)" : ""}`;

  return (
    <section className={base}>
      <div className={`${base}__top`}>
        <div className={`${base}__formBox`}>
          <h2 className={`${base}__title`}>Admission Form Section</h2>

          <form className={`${base}__form`} onSubmit={handleSave}>
            <div className={`${base}__field`}>
              <label>Main Heading</label>
              <input
                type="text"
                name="heading"
                value={form.heading}
                onChange={handleChange}
                placeholder="Apply For Admission"
              />
            </div>

            <div className={`${base}__grid`}>
              <div className={`${base}__field`}>
                <label>Child's Name Label</label>
                <input
                  type="text"
                  name="childNameLabel"
                  value={form.childNameLabel}
                  onChange={handleChange}
                  placeholder="Child's Name"
                />
              </div>

              <div className={`${base}__field`}>
                <label>Child's DOB Label</label>
                <input
                  type="text"
                  name="childDobLabel"
                  value={form.childDobLabel}
                  onChange={handleChange}
                  placeholder="Child's DOB"
                />
              </div>
            </div>

            <div className={`${base}__grid`}>
              <div className={`${base}__field`}>
                <label>Parent's Name Label</label>
                <input
                  type="text"
                  name="parentNameLabel"
                  value={form.parentNameLabel}
                  onChange={handleChange}
                  placeholder="Parent's Name"
                />
              </div>

              <div className={`${base}__field`}>
                <label>Parent's Designation Label</label>
                <input
                  type="text"
                  name="parentDesignationLabel"
                  value={form.parentDesignationLabel}
                  onChange={handleChange}
                  placeholder="Parent's Designation"
                />
              </div>
            </div>

            <div className={`${base}__grid`}>
              <div className={`${base}__field`}>
                <label>Email Label</label>
                <input
                  type="text"
                  name="emailLabel"
                  value={form.emailLabel}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>

              <div className={`${base}__field`}>
                <label>Phone Number Label</label>
                <input
                  type="text"
                  name="phoneLabel"
                  value={form.phoneLabel}
                  onChange={handleChange}
                  placeholder="Phone No"
                />
              </div>
            </div>

            <div className={`${base}__field`}>
              <label>Checkbox Label</label>
              <input
                type="text"
                name="checkboxLabel"
                value={form.checkboxLabel}
                onChange={handleChange}
                placeholder="Notify Your child weekly progress"
              />
            </div>

            <div className={`${base}__field`}>
              <label>Button Text</label>
              <input
                type="text"
                name="buttonText"
                value={form.buttonText}
                onChange={handleChange}
                placeholder="Apply Now"
              />
            </div>

            <div className={`${base}__toggleBox`}>
              <p>Required Toggle</p>

              <div className={`${base}__toggleGrid`}>
                <label>
                  <input
                    type="checkbox"
                    name="childNameRequired"
                    checked={form.childNameRequired}
                    onChange={handleChange}
                  />
                  Child Name
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="childDobRequired"
                    checked={form.childDobRequired}
                    onChange={handleChange}
                  />
                  Child DOB
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="parentNameRequired"
                    checked={form.parentNameRequired}
                    onChange={handleChange}
                  />
                  Parent Name
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="parentDesignationRequired"
                    checked={form.parentDesignationRequired}
                    onChange={handleChange}
                  />
                  Parent Designation
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="emailRequired"
                    checked={form.emailRequired}
                    onChange={handleChange}
                  />
                  Email
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="phoneRequired"
                    checked={form.phoneRequired}
                    onChange={handleChange}
                  />
                  Phone
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="checkboxRequired"
                    checked={form.checkboxRequired}
                    onChange={handleChange}
                  />
                  Checkbox
                </label>
              </div>
            </div>

            <div className={`${base}__field`}>
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="New">New</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Approved">Approved</option>
              </select>
            </div>

            <div className={`${base}__buttons`}>
              <button type="submit" className={`${base}__saveBtn`}>
                {editId ? "Update" : "Save"}
              </button>

              <button
                type="button"
                className={`${base}__clearBtn`}
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        <div className={`${base}__previewBox`}>
          <h2 className={`${base}__title`}>Live Preview</h2>

          <div className={`${base}__preview`}>
            <h3>{form.heading || "Apply For Admission"}</h3>

            <div className={`${base}__previewForm`}>
              <div className={`${base}__grid`}>
                <div className={`${base}__previewField`}>
                  <label>
                    {getLabel(form.childNameLabel, form.childNameRequired, "Child's Name")}
                  </label>
                  <input
                    type="text"
                    value=""
                    readOnly
                    placeholder="Enter child name"
                  />
                </div>

                <div className={`${base}__previewField`}>
                  <label>
                    {getLabel(form.childDobLabel, form.childDobRequired, "Child's DOB")}
                  </label>
                  <input
                    type="text"
                    value=""
                    readOnly
                    placeholder="dd-mm-yyyy"
                  />
                </div>

                <div className={`${base}__previewField`}>
                  <label>
                    {getLabel(form.parentNameLabel, form.parentNameRequired, "Parent's Name")}
                  </label>
                  <input
                    type="text"
                    value=""
                    readOnly
                    placeholder="Enter parent name"
                  />
                </div>

                <div className={`${base}__previewField`}>
                  <label>
                    {getLabel(
                      form.parentDesignationLabel,
                      form.parentDesignationRequired,
                      "Parent's Designation"
                    )}
                  </label>
                  <input
                    type="text"
                    value=""
                    readOnly
                    placeholder="Enter designation"
                  />
                </div>

                <div className={`${base}__previewField`}>
                  <label>
                    {getLabel(form.emailLabel, form.emailRequired, "Email")}
                  </label>
                  <input
                    type="text"
                    value=""
                    readOnly
                    placeholder="Enter email"
                  />
                </div>

                <div className={`${base}__previewField`}>
                  <label>
                    {getLabel(form.phoneLabel, form.phoneRequired, "Phone No")}
                  </label>
                  <input
                    type="text"
                    value=""
                    readOnly
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className={`${base}__previewBottom`}>
                <label className={`${base}__check`}>
                  <input type="checkbox" checked={false} readOnly />
                  <span>
                    {getLabel(
                      form.checkboxLabel,
                      form.checkboxRequired,
                      "Notify Your child weekly progress"
                    )}
                  </span>
                </label>

                <button type="button">
                  {form.buttonText || "Apply Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${base}__tableBox`}>
        <h2 className={`${base}__title`}>Admission List Table</h2>

        <div className={`${base}__tableWrap`}>
          <table className={`${base}__table`}>
            <thead>
              <tr>
                <th>Child Name</th>
                <th>Parent Name</th>
                <th>DOB</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>View</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {list.map((item) => (
                <tr key={item.id}>
                  <td>{item.childName || "-"}</td>
                  <td>{item.parentName || "-"}</td>
                  <td>{item.dob || "-"}</td>
                  <td>{item.email || "-"}</td>
                  <td>{item.phone || "-"}</td>
                  <td>
                    <span className={`${base}__status`}>{item.status}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`${base}__smallBtn`}
                      onClick={() => handleView(item)}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <div className={`${base}__actionWrap`}>
                      <button
                        type="button"
                        className={`${base}__smallBtn`}
                        onClick={() =>
                          setOpenAction(openAction === item.id ? null : item.id)
                        }
                      >
                        Actions
                      </button>

                      {openAction === item.id && (
                        <div className={`${base}__actionMenu`}>
                          <button type="button" onClick={() => handleEdit(item)}>
                            Edit
                          </button>
                          <button type="button" onClick={() => handleDelete(item.id)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {list.length === 0 && (
                <tr>
                  <td colSpan="8" className={`${base}__empty`}>
                    No admission records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Admission;
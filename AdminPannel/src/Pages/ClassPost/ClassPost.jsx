import React, {
  useEffect,
  useState,
} from "react";

import "./ClassPost.css";

import API, {
  IMAGE_URL,
} from "../../Api/axios";

const ClassPost = () => {
  /* =========================
     STATES
  ========================= */

  const [loading, setLoading] = useState(false);

  const [tableData, setTableData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    classTitle: "",
    classDescription: "",
    yearStart: "",
    yearEnd: "",
    uploadImage: null,
    category: "",
    teacherPhone: "",
  });

  const dataPerPage = 8;

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  /* =========================
     FETCH CLASS POSTS
  ========================= */

  const fetchClassPosts = async () => {
    try {
      const res = await API.get("/class-post");

      if (res.data.success) {
        setTableData(res.data.data || []);
      }
    } catch (error) {
      console.log(
        "FETCH CLASS POSTS ERROR:",
        error
      );
    }
  };

  useEffect(() => {
    fetchClassPosts();
  }, []);

  /* =========================
     SUBMIT FORM
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const sendData = new FormData();

      sendData.append(
        "classTitle",
        formData.classTitle
      );

      sendData.append(
        "classDescription",
        formData.classDescription
      );

      sendData.append(
        "yearStart",
        formData.yearStart
      );

      sendData.append(
        "yearEnd",
        formData.yearEnd
      );

      sendData.append(
        "category",
        formData.category
      );

      sendData.append(
        "teacherPhone",
        formData.teacherPhone
      );

      sendData.append(
        "uploadImage",
        formData.uploadImage
      );

      const res = await API.post(
        "/class-post/create",
        sendData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        alert(
          "Class Post Created Successfully"
        );

        fetchClassPosts();

        setFormData({
          classTitle: "",
          classDescription: "",
          yearStart: "",
          yearEnd: "",
          uploadImage: null,
          category: "",
          teacherPhone: "",
        });
      }
    } catch (error) {
      console.log("SUBMIT ERROR:", error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     DELETE CLASS POST
  ========================= */

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete?"
      );

      if (!confirmDelete) return;

      await API.delete(`/class-post/${id}`);

      fetchClassPosts();
    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };

  /* =========================
     PAGINATION
  ========================= */

  const totalPages = Math.ceil(
    tableData.length / dataPerPage
  );

  const lastIndex = currentPage * dataPerPage;

  const firstIndex = lastIndex - dataPerPage;

  const currentData = tableData.slice(
    firstIndex,
    lastIndex
  );

  return (
    <div className="ClassPost">
      {/* =========================
          FORM SECTION
      ========================= */}

      <div className="ClassPostFormSection">
        <div className="ClassPostFormContainer">
          <h2 className="ClassPostHeading">
            Create Class Post
          </h2>

          <form
            className="ClassPostForm"
            onSubmit={handleSubmit}
          >
            {/* TITLE */}

            <div className="ClassPostInputGroup">
              <label className="ClassPostLabel">
                Class Title
              </label>

              <input
                type="text"
                name="classTitle"
                placeholder="Enter class title"
                className="ClassPostInput"
                value={formData.classTitle}
                onChange={handleChange}
                required
              />
            </div>

            {/* DESCRIPTION */}

            <div className="ClassPostInputGroup">
              <label className="ClassPostLabel">
                Class Description
              </label>

              <textarea
                name="classDescription"
                placeholder="Enter class description"
                className="ClassPostTextarea"
                value={
                  formData.classDescription
                }
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* YEAR START */}

            <div className="ClassPostInputGroup">
              <label className="ClassPostLabel">
                Year Start
              </label>

              <input
                type="number"
                name="yearStart"
                placeholder="Enter start year"
                className="ClassPostInput"
                value={formData.yearStart}
                onChange={handleChange}
                required
              />
            </div>

            {/* YEAR END */}

            <div className="ClassPostInputGroup">
              <label className="ClassPostLabel">
                Year End
              </label>

              <input
                type="number"
                name="yearEnd"
                placeholder="Enter end year"
                className="ClassPostInput"
                value={formData.yearEnd}
                onChange={handleChange}
                required
              />
            </div>

            {/* IMAGE */}

            <div className="ClassPostInputGroup">
              <label className="ClassPostLabel">
                Upload Image
              </label>

              <input
                type="file"
                name="uploadImage"
                className="ClassPostFileInput"
                onChange={handleChange}
                accept="image/*"
                required
              />
            </div>

            {/* CATEGORY */}

            <div className="ClassPostInputGroup">
              <label className="ClassPostLabel">
                Category
              </label>

              <select
                name="category"
                className="ClassPostSelect"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Category
                </option>

                <option value="Science">
                  Science
                </option>

                <option value="Mathematics">
                  Mathematics
                </option>

                <option value="Arts">
                  Arts
                </option>

                <option value="Commerce">
                  Commerce
                </option>
              </select>
            </div>

            {/* PHONE */}

            <div className="ClassPostInputGroup">
              <label className="ClassPostLabel">
                Class Teacher Phone No
              </label>

              <input
                type="text"
                name="teacherPhone"
                placeholder="Enter teacher phone number"
                className="ClassPostInput"
                value={formData.teacherPhone}
                onChange={handleChange}
                required
              />
            </div>

            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              className="ClassPostSubmitBtn"
            >
              {loading
                ? "Submitting..."
                : "Submit Class Post"}
            </button>
          </form>
        </div>
      </div>

      {/* =========================
          TABLE SECTION
      ========================= */}

      <div className="ClassPostTableSection">
        <div className="ClassPostTableContainer">
          <h2 className="ClassPostHeading">
            Class Post Table
          </h2>

          <div className="ClassPostTableWrapper">
            <table className="ClassPostTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Year Start</th>
                  <th>Year End</th>
                  <th>Image</th>
                  <th>Category</th>
                  <th>Teacher Phone</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentData.map((item) => (
                  <tr key={item._id}>
                    <td>{item.classTitle}</td>

                    <td>
                      {item.classDescription}
                    </td>

                    <td>{item.yearStart}</td>

                    <td>{item.yearEnd}</td>

                    <td>
                      <img
                        src={`${IMAGE_URL}${item.uploadImage}`}
                        alt="class"
                        width="60"
                        height="60"
                        style={{
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </td>

                    <td>{item.category}</td>

                    <td>{item.teacherPhone}</td>

                    <td>
                      <div className="ClassPostActionButtons">
                        <button className="ClassPostEditBtn">
                          Edit
                        </button>

                        <button
                          className="ClassPostDeleteBtn"
                          onClick={() =>
                            handleDelete(item._id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {currentData.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      style={{
                        textAlign: "center",
                        padding: "20px",
                      }}
                    >
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}

          <div className="ClassPostPagination">
            {Array.from(
              { length: totalPages },
              (_, index) => (
                <button
                  key={index}
                  className={`ClassPostPageBtn ${
                    currentPage === index + 1
                      ? "ClassPostActivePage"
                      : ""
                  }`}
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPost;
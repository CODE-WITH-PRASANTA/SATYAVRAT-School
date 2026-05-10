import React, {
  useEffect,
  useState,
} from "react";

import API, { IMAGE_URL,} from "../../Api/axios";

import "./AdvitesForm.css";

/* =========================
   COMPONENT
========================= */

const AdvitesForm = () => {
  const [title, setTitle] =
    useState("");

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [banners, setBanners] =
    useState([]);

  const [editId, setEditId] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  /* =========================
     FETCH BANNERS
  ========================= */

  const fetchBanners =
    async () => {
      try {
        const response =
          await API.get(
            "/banner"
          );

        if (
          response.data.success
        ) {
          setBanners(
            response.data.data
          );
        }
      } catch (error) {
        console.log(
          "Fetch Error:",
          error
        );
      }
    };

  useEffect(() => {
    fetchBanners();
  }, []);

  /* =========================
     HANDLE IMAGE
  ========================= */

  const handleImage = (e) => {
    const file =
      e.target.files[0];

    if (file) {
      setImage(file);

      setPreview(
        URL.createObjectURL(file)
      );
    }
  };

  /* =========================
     SUBMIT FORM
  ========================= */

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (!title) {
        alert(
          "Please Enter Banner Title"
        );

        return;
      }

      if (!image && !editId) {
        alert(
          "Please Upload Image"
        );

        return;
      }

      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "title",
          title
        );

        if (image) {
          formData.append(
            "image",
            image
          );
        }

        /* =================
           UPDATE
        ================= */

        if (editId) {
          await API.put(
            `/banner/update/${editId}`,
            formData
          );

          alert(
            "Banner Updated Successfully"
          );
        }

        /* =================
           CREATE
        ================= */

        else {
          await API.post(
            "/banner/create",
            formData
          );

          alert(
            "Banner Added Successfully"
          );
        }

        /* =================
           RESET
        ================= */

        setTitle("");
        setImage(null);
        setPreview("");
        setEditId(null);

        fetchBanners();
      } catch (error) {
        console.log(error);

        alert(
          error?.response?.data
            ?.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  /* =========================
     EDIT
  ========================= */

  const handleEdit = (
    banner
  ) => {
    setTitle(banner.title);

    setPreview(
      `${IMAGE_URL}${banner.image}`
    );

    setEditId(banner._id);
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete?"
        );

      if (!confirmDelete)
        return;

      try {
        await API.delete(
          `/banner/delete/${id}`
        );

        alert(
          "Banner Deleted Successfully"
        );

        fetchBanners();

        if (editId === id) {
          setTitle("");
          setPreview("");
          setEditId(null);
        }
      } catch (error) {
        console.log(error);

        alert(
          "Delete Failed"
        );
      }
    };

  return (
    <div className="advitesForm">
      {/* ======================
          LEFT PREVIEW
      ====================== */}

      <div className="advitesForm__left">
        <div className="advitesForm__banner">
          {preview ? (
            <img
              src={preview}
              alt="banner"
              className="advitesForm__bannerImage"
            />
          ) : (
            <div className="advitesForm__placeholder">
              Upload Banner Preview
            </div>
          )}

          <div className="advitesForm__overlay">
            <h2>
              {title ||
                "Banner Title"}
            </h2>
          </div>
        </div>
      </div>

      {/* ======================
          RIGHT SECTION
      ====================== */}

      <div className="advitesForm__right">
        {/* ======================
            FORM
        ====================== */}

        <form
          className="advitesForm__form"
          onSubmit={handleSubmit}
        >
          <h2 className="advitesForm__heading">
            Banner Upload
          </h2>

          {/* TITLE */}

          <div className="advitesForm__group">
            <label>
              Banner Title
            </label>

            <input
              type="text"
              placeholder="Enter Banner Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
            />
          </div>

          {/* IMAGE */}

          <div className="advitesForm__group">
            <label>
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImage
              }
            />
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="advitesForm__submitBtn"
            disabled={loading}
          >
            {loading
              ? "Please Wait..."
              : editId
              ? "Update Banner"
              : "Add Banner"}
          </button>
        </form>

        {/* ======================
            TABLE
        ====================== */}

        <div className="advitesForm__tableWrapper">
          <h2 className="advitesForm__tableHeading">
            Banner List
          </h2>

          <table className="advitesForm__table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {banners.length >
              0 ? (
                banners.map(
                  (
                    item,
                    index
                  ) => (
                    <tr
                      key={index}
                    >
                      {/* IMAGE */}

                      <td>
                        <img
                          src={`${IMAGE_URL}${item.image}`}
                          alt="banner"
                          className="advitesForm__tableImage"
                        />
                      </td>

                      {/* TITLE */}

                      <td>
                        {
                          item.title
                        }
                      </td>

                      {/* ACTIONS */}

                      <td>
                        <div className="advitesForm__actions">
                          <button
                            type="button"
                            className="advitesForm__editBtn"
                            onClick={() =>
                              handleEdit(
                                item
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="advitesForm__deleteBtn"
                            onClick={() =>
                              handleDelete(
                                item._id
                              )
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan="3">
                    No Banner Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdvitesForm;
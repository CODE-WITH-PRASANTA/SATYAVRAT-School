import React, { useState } from "react";
import "./Concessioncategory.css";
import {
  FiPlus,
  FiSearch,
  FiTrash2,
  FiX
} from "react-icons/fi";

const headsData = [
  "Transport",
  "Hostel",
  "Extra Concession",
  "Admission Fee",
  "School Fee",
  "Exam Fee",
  "Belt",
];

const dummyData = [
  {
    id: 1,
    type: "Handicap",
    description: "Student Special"
  },
  {
    id: 2,
    type: "Poor Student",
    description: "Financial Support"
  },
  {
    id: 3,
    type: "Staff",
    description: "Staff Child"
  },
  {
    id: 4,
    type: "Principal",
    description: "Principal Approval"
  },
  {
    id: 5,
    type: "Management",
    description: "Management Quota"
  },
  {
    id: 6,
    type: "Other",
    description: "Other Category"
  },
  {
    id: 7,
    type: "3rd Child",
    description: "Third Child Discount"
  }
];

const Concessioncategory = () => {
  const [data, setData] = useState(dummyData);
  const [search, setSearch] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [showModify, setShowModify] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [selected, setSelected] = useState(null);

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [page, setPage] = useState(1);

  const filtered = data.filter((item) =>
    item.type.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const currentData = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const deleteItem = () => {
    setData(data.filter((item) => item.id !== selected.id));
    setShowDelete(false);
  };

  const closePopup = () => {
  setIsClosing(true);

  setTimeout(() => {
    setShowAdd(false);
    setShowModify(false);
    setShowDelete(false);
    setIsClosing(false);
  }, 300);
};

  return (
    <div className="concessionPage">

      {/* Top Section */}

      <div className="topBar">
        <div className="searchBox">
          <FiSearch />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          className="addBtn"
          onClick={() => setShowAdd(true)}
        >
          <FiPlus />
        </button>
      </div>

      {/* TABLE */}

      <div className="tableWrapper">

        <table>

          <thead>
            <tr>
              <th>S.NO.</th>
              <th>CONCESSION TYPE ↑</th>
              <th>DESCRIPTION</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {currentData.map((item, index) => (

              <tr
                key={item.id}
                onClick={() => {
                  setSelected(item);
                  setShowModify(true);
                }}
              >
                <td>{index + 1}</td>
                <td>{item.type}</td>
                <td>{item.description}</td>

                <td
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(item);
                    setShowDelete(true);
                  }}
                >
                  <FiTrash2 className="deleteIcon" />
                </td>
              </tr>

            ))}

          </tbody>

        </table>
      </div>

      {/* PAGINATION */}

      <div className="pagination">

        <div>
          Items per page :

          <select
            value={itemsPerPage}
            onChange={(e) =>
              setItemsPerPage(Number(e.target.value))
            }
          >
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>

        <div className="pages">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ‹
          </button>

          <span>
            {page} / {totalPages || 1}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            ›
          </button>
        </div>
      </div>

      {/* ADD POPUP */}

      {showAdd && (
        <Modal
          title="FEE CONCESSION"
          close={() => setShowAdd(false)}
          buttonText="Add"
        />
      )}

      {/* MODIFY POPUP */}

      {showModify && (
        <ModifyModal
          item={selected}
          close={() => setShowModify(false)}
        />
      )}

      {/* DELETE POPUP */}

      {showDelete && (
        <div className="overlay">

          <div className="deleteBox">

            <h3>
              Are you sure you want to delete ?
            </h3>

            <div className="deleteBtns">

              <button
                className="cancelDelete"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>

              <button
                className="yesDelete"
                onClick={deleteItem}
              >
                Yes
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

const Modal = ({ title, close, buttonText }) => (
  <div className="overlay">
    <div className="popup">

      <div className="popupHeader">
        <h2>{title}</h2>
        <FiX onClick={close} />
      </div>

      <input
        placeholder="Concession Type*"
        className="inputField"
      />

      <div className="radioRow">
        <label>
          <input type="radio" name="type" defaultChecked />
          Amount
        </label>

        <label>
          <input type="radio" name="type" />
          Percentage
        </label>
      </div>

      <input
        placeholder="Description"
        className="inputField"
      />

      <div className="popupBtns">
        <button onClick={close}>Cancel</button>
        <button className="purpleBtn">
          {buttonText}
        </button>
      </div>

    </div>
  </div>
);

const ModifyModal = ({ item, close }) => (
  <div className="overlay">

    <div className="popup largePopup">

      <div className="popupHeader">
        <h2>FEE CONCESSION</h2>
        <FiX onClick={close} />
      </div>

      <input
        value={item?.type}
        readOnly
        className="inputField"
      />

      <div className="radioRow">
        <label>
          <input type="radio" defaultChecked />
          Amount
        </label>

        <label>
          <input type="radio" />
          Percentage
        </label>
      </div>

      <input
        placeholder="Description"
        className="inputField"
      />

      <table className="innerTable">

        <thead>
          <tr>
            <th>HEADS</th>
            <th>AMOUNT</th>
          </tr>
        </thead>

        <tbody>

          {headsData.map((head) => (
            <tr key={head}>
              <td>{head}</td>

              <td>
                <input
                  type="number"
                  defaultValue="0"
                  className="amountInput"
                />
              </td>
            </tr>
          ))}

        </tbody>

      </table>

      <div className="popupBtns">
        <button onClick={close}>Cancel</button>
        <button className="purpleBtn">
          Modify
        </button>
      </div>

    </div>

  </div>
);

export default Concessioncategory;
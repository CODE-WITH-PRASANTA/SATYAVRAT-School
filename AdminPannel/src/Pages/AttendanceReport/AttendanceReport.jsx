import React, { useState } from "react";
import "./AttendanceReport.css";

import {
  FaSearch,
  FaCalendarAlt,
  FaClipboardList,
  FaUserTimes,
  FaExclamationTriangle,
  FaChartBar,
  
} from "react-icons/fa";

const AttendanceReport = () => {
  const [activeReport, setActiveReport] = useState("attendance");
  const [showResult, setShowResult] = useState(false);

  const [filters, setFilters] = useState({
    class: "",
    section: "",
    month: "",
    year: "2026",
    date: "",
    fromDate: "",
    toDate: "",
  });

  const handleSearch = () => {
    setShowResult(true);
  };

  const handleReportChange = (report) => {
    setActiveReport(report);
    setShowResult(false);
  };

  const attendanceData = [
    {
      id: 1,
      student: "Abhi Kumar",
      admissionNo: "NLET9090",
      rollNo: "01",
      className: "KSV 6th (A)",
      percentage: "90%",
      present: 24,
      late: 0,
      leave: 1,
      absent: 2,
      holiday: 3,
      halfDay: 0,
    },
    {
      id: 2,
      student: "Rahul Singh",
      admissionNo: "NLET9091",
      rollNo: "02",
      className: "KSV 6th (A)",
      percentage: "85%",
      present: 22,
      late: 1,
      leave: 1,
      absent: 3,
      holiday: 3,
      halfDay: 0,
    },
  ];

  const classWiseData = [
    {
      className: "KSV 6th",
      section: "A",
      present: 25,
      absent: 3,
      leave: 1,
      total: 29,
    },
  ];

  const dateWiseData = [
    {
      admissionNo: "NLET9090",
      rollNo: "01",
      student: "Abhi Kumar",
      className: "KSV 6th",
      attendance: "Present",
    },
  ];

  const absentData = [
    {
      admissionNo: "NLET9095",
      student: "Rakesh Kumar",
      className: "KSV 6th",
      fatherName: "Mohan Kumar",
      mobile: "9876543210",
      absentFrom: "10-06-2026",
    },
  ];

  const unmarkedData = [
    {
      className: "KSV 5th",
      section: "A",
    },
  ];

  const customData = [
    {
      student: "Abhi Kumar",
      attendance: "92%",
      present: 25,
      absent: 2,
    },
  ];

  return (
    <div className="attendanceReport">

      {/* HEADER */}

      <div className="attendanceReport__header">
        <h2>Attendance Report</h2>
      </div>

      {/* DASHBOARD CARDS */}

      <div className="attendanceReport__cards">

        <div
          className={`attendanceReport__card ${
            activeReport === "attendance"
              ? "attendanceReport__card--active"
              : ""
          }`}
          onClick={() =>
            handleReportChange("attendance")
          }
        >
          <div className="attendanceReport__icon">
            <FaCalendarAlt />
          </div>

          <div>
            <h4>ATTENDANCE REPORT</h4>
            <p>Attendance Report</p>
          </div>
        </div>

        <div
          className={`attendanceReport__card ${
            activeReport === "classwise"
              ? "attendanceReport__card--active"
              : ""
          }`}
          onClick={() =>
            handleReportChange("classwise")
          }
        >
          <div className="attendanceReport__icon">
            <FaClipboardList />
          </div>

          <div>
            <h4>CLASS WISE REPORT</h4>
            <p>Class Wise Report</p>
          </div>
        </div>

        <div
          className={`attendanceReport__card ${
            activeReport === "datewise"
              ? "attendanceReport__card--active"
              : ""
          }`}
          onClick={() =>
            handleReportChange("datewise")
          }
        >
          <div className="attendanceReport__icon">
            <FaCalendarAlt />
          </div>

          <div>
            <h4>ATTENDANCE BY DATE</h4>
            <p>Attendance By Date</p>
          </div>
        </div>

        <div
          className={`attendanceReport__card ${
            activeReport === "absent"
              ? "attendanceReport__card--active"
              : ""
          }`}
          onClick={() =>
            handleReportChange("absent")
          }
        >
          <div className="attendanceReport__icon">
            <FaUserTimes />
          </div>

          <div>
            <h4>ABSENT STUDENT REPORT</h4>
            <p>Absent Student Report</p>
          </div>
        </div>

        <div
          className={`attendanceReport__card ${
            activeReport === "unmarked"
              ? "attendanceReport__card--active"
              : ""
          }`}
          onClick={() =>
            handleReportChange("unmarked")
          }
        >
          <div className="attendanceReport__icon">
            <FaExclamationTriangle />
          </div>

          <div>
            <h4>UNMARKED ATTENDANCE</h4>
            <p>Unmarked Attendance</p>
          </div>
        </div>

        <div
          className={`attendanceReport__card ${
            activeReport === "custom"
              ? "attendanceReport__card--active"
              : ""
          }`}
          onClick={() =>
            handleReportChange("custom")
          }
        >
          <div className="attendanceReport__icon">
            <FaChartBar />
          </div>

          <div>
            <h4>CUSTOM ATTENDANCE REPORT</h4>
            <p>Custom Attendance Report</p>
          </div>
        </div>

      </div>

      {/* ATTENDANCE REPORT */}

      {activeReport === "attendance" && (
        <>
          <div className="attendanceReport__filterCard">

            <div className="attendanceReport__filterHeader">
              <FaSearch />
              <span>Select Criteria</span>
            </div>

            <div className="attendanceReport__formGrid">

              <div className="attendanceReport__formGroup">
                <label>Class *</label>
                <select>
                  <option>Select</option>
                  <option>KSV 6th</option>
                </select>
              </div>

              <div className="attendanceReport__formGroup">
                <label>Section *</label>
                <select>
                  <option>Select</option>
                  <option>A</option>
                </select>
              </div>

              <div className="attendanceReport__formGroup">
                <label>Month *</label>
                <select>
                  <option>June</option>
                </select>
              </div>

              <div className="attendanceReport__formGroup">
                <label>Year *</label>
                <input
                  type="number"
                  value={filters.year}
                  readOnly
                />
              </div>

            </div>

            <div className="attendanceReport__actions">

              <button className="attendanceReport__downloadBtn">
                Download Blank PDF
              </button>

              <button
                className="attendanceReport__searchBtn"
                onClick={handleSearch}
              >
                Search
              </button>

            </div>
          </div>

          {showResult && (
            <div className="attendanceReport__tableCard">

              <div className="attendanceReport__tableHeader">
                <h3>Student Attendance List</h3>

             
              </div>

              <div className="attendanceReport__tableWrapper">

                <table>

                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Admission No</th>
                      <th>Roll No</th>
                      <th>Class</th>
                      <th>%</th>
                      <th>Present</th>
                      <th>Late</th>
                      <th>Leave</th>
                      <th>Absent</th>
                      <th>Holiday</th>
                      <th>Half Day</th>
                    </tr>
                  </thead>

                  <tbody>
                    {attendanceData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.student}</td>
                        <td>{item.admissionNo}</td>
                        <td>{item.rollNo}</td>
                        <td>{item.className}</td>
                        <td>{item.percentage}</td>
                        <td>{item.present}</td>
                        <td>{item.late}</td>
                        <td>{item.leave}</td>
                        <td>{item.absent}</td>
                        <td>{item.holiday}</td>
                        <td>{item.halfDay}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>

              <div className="attendanceReport__pagination">
                <button>Previous</button>
                <button className="active">
                  1
                </button>
                <button>Next</button>
              </div>

            </div>
          )}
        </>
      )}

    {/* =========================
    CLASS WISE REPORT
========================= */}

{activeReport === "classwise" && (
  <>
    <div className="attendanceReport__filterCard">

      <div className="attendanceReport__filterHeader">
        <FaSearch />
        <span>Select Criteria</span>
      </div>

      <div className="attendanceReport__formGrid">

        <div className="attendanceReport__formGroup">
          <label>Attendance Date *</label>
          <input type="date" />
        </div>

      </div>

      <div className="attendanceReport__actions">
        <button
          className="attendanceReport__searchBtn"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

    </div>

    {showResult && (
      <div className="attendanceReport__tableCard">

        <div className="attendanceReport__tableHeader">
          <h3>Class Wise Attendance Report</h3>

          <div className="attendanceReport__exportBtns">
            <button>
              <FaFileExcel />
            </button>

            <button>
              <FaFilePdf />
            </button>

            <button>
              <FaPrint />
            </button>
          </div>
        </div>

        <div className="attendanceReport__tableWrapper">

          <table>

            <thead>
              <tr>
                <th>Class</th>
                <th>Section</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Leave</th>
                <th>Total Student</th>
              </tr>
            </thead>

            <tbody>

              {classWiseData.map(
                (item, index) => (
                  <tr key={index}>
                    <td>{item.className}</td>
                    <td>{item.section}</td>
                    <td>{item.present}</td>
                    <td>{item.absent}</td>
                    <td>{item.leave}</td>
                    <td>{item.total}</td>
                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

        <div className="attendanceReport__pagination">
          <button>Previous</button>
          <button className="active">
            1
          </button>
          <button>Next</button>
        </div>

      </div>
    )}
  </>
)}

{/* =========================
    ATTENDANCE BY DATE
========================= */}

{activeReport === "datewise" && (
  <>
    <div className="attendanceReport__filterCard">

      <div className="attendanceReport__filterHeader">
        <FaSearch />
        <span>Select Criteria</span>
      </div>

      <div className="attendanceReport__formGrid">

        <div className="attendanceReport__formGroup">
          <label>Class *</label>
          <select>
            <option>Select</option>
            <option>KSV 6th</option>
          </select>
        </div>

        <div className="attendanceReport__formGroup">
          <label>Section *</label>
          <select>
            <option>A</option>
          </select>
        </div>

        <div className="attendanceReport__formGroup">
          <label>Attendance Date *</label>
          <input type="date" />
        </div>

      </div>

      <div className="attendanceReport__actions">

        <button
          className="attendanceReport__searchBtn"
          onClick={handleSearch}
        >
          Search
        </button>

      </div>

    </div>

    {showResult && (
      <div className="attendanceReport__tableCard">

        <div className="attendanceReport__tableHeader">

          <h3>
            Attendance By Date Report
          </h3>

          <div className="attendanceReport__exportBtns">

            <button>
              <FaFileExcel />
            </button>

            <button>
              <FaFilePdf />
            </button>

            <button>
              <FaPrint />
            </button>

          </div>

        </div>

        <div className="attendanceReport__tableWrapper">

          <table>

            <thead>

              <tr>
                <th>Admission No</th>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Attendance</th>
              </tr>

            </thead>

            <tbody>

              {dateWiseData.map(
                (item, index) => (
                  <tr key={index}>
                    <td>
                      {item.admissionNo}
                    </td>

                    <td>
                      {item.rollNo}
                    </td>

                    <td>
                      {item.student}
                    </td>

                    <td>
                      {item.className}
                    </td>

                    <td>
                      {item.attendance}
                    </td>
                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

        <div className="attendanceReport__pagination">
          <button>Previous</button>

          <button className="active">
            1
          </button>

          <button>Next</button>
        </div>

      </div>
    )}
  </>
)}

{/* =========================
    ABSENT STUDENT REPORT
========================= */}

{activeReport === "absent" && (
  <>
    <div className="attendanceReport__filterCard">

      <div className="attendanceReport__filterHeader">
        <FaSearch />
        <span>Select Criteria</span>
      </div>

      <div className="attendanceReport__formGrid">

        <div className="attendanceReport__formGroup">
          <label>Class *</label>
          <select>
            <option>Select Class</option>
            <option>KSV 6th</option>
          </select>
        </div>

        <div className="attendanceReport__formGroup">
          <label>Section *</label>
          <select>
            <option>A</option>
          </select>
        </div>

        <div className="attendanceReport__formGroup">
          <label>From Date *</label>
          <input type="date" />
        </div>

        <div className="attendanceReport__formGroup">
          <label>To Date *</label>
          <input type="date" />
        </div>

      </div>

      <div className="attendanceReport__actions">
        <button
          className="attendanceReport__searchBtn"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

    </div>

    {showResult && (
      <div className="attendanceReport__tableCard">

        <div className="attendanceReport__tableHeader">

          <h3>Absent Student Report</h3>

          <div className="attendanceReport__exportBtns">
            <button><FaFileExcel /></button>
            <button><FaFilePdf /></button>
            <button><FaPrint /></button>
          </div>

        </div>

        <div className="attendanceReport__tableWrapper">

          <table>

            <thead>
              <tr>
                <th>Admission No</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Father Name</th>
                <th>Mobile</th>
                <th>Absent From</th>
              </tr>
            </thead>

            <tbody>

              {absentData.map((item, index) => (
                <tr key={index}>
                  <td>{item.admissionNo}</td>
                  <td>{item.student}</td>
                  <td>{item.className}</td>
                  <td>{item.fatherName}</td>
                  <td>{item.mobile}</td>
                  <td>{item.absentFrom}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

        <div className="attendanceReport__pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>

      </div>
    )}
  </>
)}

{/* =========================
    UNMARKED ATTENDANCE
========================= */}

{activeReport === "unmarked" && (
  <>
    <div className="attendanceReport__filterCard">

      <div className="attendanceReport__filterHeader">
        <FaSearch />
        <span>Select Criteria</span>
      </div>

      <div className="attendanceReport__formGrid">

        <div className="attendanceReport__formGroup">
          <label>Date *</label>
          <input type="date" />
        </div>

      </div>

      <div className="attendanceReport__actions">
        <button
          className="attendanceReport__searchBtn"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

    </div>

    {showResult && (
      <div className="attendanceReport__tableCard">

        <div className="attendanceReport__tableHeader">

          <h3>Unmarked Attendance List</h3>

          <div className="attendanceReport__exportBtns">
            <button><FaFileExcel /></button>
            <button><FaFilePdf /></button>
            <button><FaPrint /></button>
          </div>

        </div>

        <div className="attendanceReport__tableWrapper">

          <table>

            <thead>
              <tr>
                <th>Class</th>
                <th>Section</th>
              </tr>
            </thead>

            <tbody>

              {unmarkedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.className}</td>
                  <td>{item.section}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

        <div className="attendanceReport__pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>

      </div>
    )}
  </>
)}

{/* =========================
    CUSTOM ATTENDANCE REPORT
========================= */}

{activeReport === "custom" && (
  <>
    <div className="attendanceReport__filterCard">

      <div className="attendanceReport__filterHeader">
        <FaSearch />
        <span>Select Criteria</span>
      </div>

      <div className="attendanceReport__formGrid">

        <div className="attendanceReport__formGroup">
          <label>Class *</label>
          <select>
            <option>Select Class</option>
            <option>KSV 6th</option>
          </select>
        </div>

        <div className="attendanceReport__formGroup">
          <label>Section *</label>
          <select>
            <option>A</option>
          </select>
        </div>

        <div className="attendanceReport__formGroup">
          <label>From Date *</label>
          <input type="date" />
        </div>

        <div className="attendanceReport__formGroup">
          <label>To Date *</label>
          <input type="date" />
        </div>

      </div>

      <div className="attendanceReport__actions">
        <button
          className="attendanceReport__searchBtn"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

    </div>

    {showResult && (
      <div className="attendanceReport__tableCard">

        <div className="attendanceReport__tableHeader">

          <h3>Custom Attendance Report</h3>

          <div className="attendanceReport__exportBtns">
            <button><FaFileExcel /></button>
            <button><FaFilePdf /></button>
            <button><FaPrint /></button>
          </div>

        </div>

        <div className="attendanceReport__tableWrapper">

          <table>

            <thead>
              <tr>
                <th>Student Name</th>
                <th>Attendance %</th>
                <th>Present</th>
                <th>Absent</th>
              </tr>
            </thead>

            <tbody>

              {customData.map((item, index) => (
                <tr key={index}>
                  <td>{item.student}</td>
                  <td>{item.attendance}</td>
                  <td>{item.present}</td>
                  <td>{item.absent}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

        <div className="attendanceReport__pagination">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>

      </div>
    )}
  </>
)}

    </div>
  );
};

export default AttendanceReport;
  


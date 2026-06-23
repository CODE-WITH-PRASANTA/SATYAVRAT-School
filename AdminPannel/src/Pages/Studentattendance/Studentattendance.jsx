import React, { useState } from "react";
import "./Studentattendance.css";
import {
  Search,
  Calendar,
  List,
  Save,
  Plane,
} from "lucide-react";

const StudentAttendance = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [attendanceType, setAttendanceType] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0] // Defaults to today's date
  );
  const [showTable, setShowTable] = useState(false);

  // Mock initial source of students
  const initialAttendanceData = [
    { id: 1, admissionNo: "ADM001", roll: "01", name: "Ankita Nayak", attendance: "Present", note: "-" },
    { id: 2, admissionNo: "ADM002", roll: "02", name: "Rahul Kumar", attendance: "Absent", note: "Sick" },
    { id: 3, admissionNo: "ADM003", roll: "03", name: "Priya Sharma", attendance: "Present", note: "-" },
    { id: 4, admissionNo: "ADM004", roll: "04", name: "Aman Das", attendance: "Late", note: "Traffic" },
    { id: 5, admissionNo: "ADM005", roll: "05", name: "Riya Singh", attendance: "Present", note: "-" },
  ];

  // Dynamic state to capture user modifications inside the table
  const [students, setStudents] = useState(initialAttendanceData);

  const classData = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
  const sectionData = ["A", "B", "C", "D"];

  // Search logic handler
  const handleSearch = () => {
    if (!selectedClass || !selectedSection) {
      alert("Please select both Class and Section criteria.");
      return;
    }

    // Filter students if specific criteria match or show all
    if (attendanceType && attendanceType !== "All") {
      const filtered = initialAttendanceData.filter(
        (student) => student.attendance === attendanceType
      );
      setStudents(filtered);
    } else {
      setStudents(initialAttendanceData);
    }

    setShowTable(true);
  };

  // Inline table dynamic changes updates the active React State
  const handleTableChange = (id, field, value) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  };

  // Mark Holiday logic
  const handleMarkHoliday = () => {
    if (students.length === 0) return;
    const confirmation = window.confirm("Mark today as a holiday for all listed students?");
    if (confirmation) {
      const holidayData = students.map((student) => ({
        ...student,
        attendance: "Absent",
        note: "Holiday",
      }));
      setStudents(holidayData);
    }
  };

  // Mark Holiday Range placeholder triggers
  const handleMarkHolidayRange = () => {
    alert("Redirecting to Holiday Schedule Matrix setup interface...");
  };

  // Save functionality package assembler
  const handleSaveAttendance = () => {
    const payload = {
      class: selectedClass,
      section: selectedSection,
      date: attendanceDate,
      records: students,
    };
    
    console.log("Saving Final Attendance Payload to database/API:", payload);
    alert(`Success! Saved attendance configurations for ${students.length} items.`);
  };

  return (
    <div className="studentAttendancePage">
      {/* Header */}
      <div className="studentAttendanceHeader">
        <div className="studentAttendanceTitle">
          <Calendar size={28} />
          <h2>Student Attendance</h2>
        </div>
        <div className="studentAttendanceBreadcrumb">
          Attendance / Student Attendance
        </div>
      </div>

      {/* Search Card */}
      <div className="studentAttendanceCard">
        <div className="studentAttendanceCardHeader">
          <div className="studentAttendanceCardTitle">
            <Search size={25} />
            <h3>Select Criteria</h3>
          </div>
          <button className="attendancePrimaryBtn" onClick={handleMarkHolidayRange}>
            Mark Holiday Range
          </button>
        </div>

        <div className="studentAttendanceForm">
          <div className="attendanceInputGroup">
            <label>Class *</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              {classData.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="attendanceInputGroup">
            <label>Section *</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="">Select Section</option>
              {sectionData.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="attendanceInputGroup">
            <label>Attendance</label>
            <select
              value={attendanceType}
              onChange={(e) => setAttendanceType(e.target.value)}
            >
              <option value="">Select Attendance</option>
              <option value="All">All</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>
          </div>

          <div className="attendanceInputGroup">
            <label>Attendance Date</label>
            <input 
              type="date" 
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
            />
          </div>
        </div>

        <div className="attendanceSearchArea">
          <button className="attendanceSearchBtn" onClick={handleSearch}>
            <Search size={18} />
            Search
          </button>
        </div>
      </div>

      {/* Table Section container showing only when flagged active */}
      {showTable && (
        <div className="studentAttendanceTableCard">
          <div className="studentAttendanceTableHeader">
            <div className="studentAttendanceTableTitle">
              <List size={25} />
              <h3>Student Attendance List</h3>
            </div>

            <div className="tableActionButtons">
              <button className="attendanceHolidayBtn" onClick={handleMarkHoliday}>
                <Plane size={18} />
                Mark As Holiday
              </button>

              <button className="attendanceSaveBtn" onClick={handleSaveAttendance}>
                <Save size={18} />
                Save Attendance
              </button>
            </div>
          </div>

          <div className="tableResponsive">
            {students.length > 0 ? (
              <table className="attendanceTable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Admission No.</th>
                    <th>Roll Number</th>
                    <th>Name</th>
                    <th>Attendance</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td>{student.admissionNo}</td>
                      <td>{student.roll}</td>
                      <td>{student.name}</td>
                      <td>
                        <select
                          className="tableSelect"
                          value={student.attendance}
                          onChange={(e) =>
                            handleTableChange(student.id, "attendance", e.target.value)
                          }
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Late">Late</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="tableNoteInput"
                          placeholder="Enter Note"
                          value={student.note === "-" ? "" : student.note}
                          onChange={(e) =>
                            handleTableChange(student.id, "note", e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="noDataFallback">No students found matching current filter parameters.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
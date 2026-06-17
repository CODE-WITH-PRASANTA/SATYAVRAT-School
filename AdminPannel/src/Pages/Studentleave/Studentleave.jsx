import React, { useState, useEffect } from 'react';
import './StudentLeave.css';

const StudentLeave = () => {
  // State to manage views: 'list' or 'form'
  const [view, setView] = useState('list');
  
  // Search and Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  
  // Tracking if we are editing an existing item
  const [editingId, setEditingId] = useState(null);

  // File picker placeholder tracking
  const [fileName, setFileName] = useState('No file chosen');

  // Form State Layout
  const [formData, setFormData] = useState({
    studentClass: '',
    section: '',
    student: '',
    applyDate: '2026-06-13',
    fromDate: '2026-06-13',
    toDate: '2026-06-14',
    description: '',
  });

  // Table Data State with realistic mock initial data
  const [leaveEntries, setLeaveEntries] = useState([
    {
      id: 1,
      name: 'Aarav Sharma',
      class: 'Class 10 (Sec-A)',
      applyDate: '12-06-2026',
      noOfDays: '2 Days',
      leaveDate: '2026-06-13 -- 2026-06-14',
      status: 'Pending',
      reply: 'Awaiting Review',
      description: 'Family emergency tracking out of station.',
    },
    {
      id: 2,
      name: 'Isha Patel',
      class: 'Class 12 (Sec-B)',
      applyDate: '10-06-2026',
      noOfDays: '1 Day',
      leaveDate: '2026-06-11 -- 2026-06-11',
      status: 'Approved',
      reply: 'Granted. Take care.',
      description: 'Severe fever and doctor-prescribed rest.',
    }
  ]);

  // Reset pagination when searching or changing page size limit
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, entriesPerPage]);

  // Handle Input Form Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // File Input Handler
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('No file chosen');
    }
  };

  // Helper calculation to figure out exact number of leave days automatically
  const calculateDays = (start, end) => {
    try {
      const d1 = new Date(start);
      const d2 = new Date(end);
      if (isNaN(d1) ||  isNaN(d2)) return '1 Day';
      
      const diffTime = d2 - d1;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays <= 0 ? '1 Day' : `${diffDays} ${diffDays === 1 ? 'Day' : 'Days'}`;
    } catch (e) {
      return '1 Day';
    }
  };

  // Form Submission Logic (Saves both New Records and Modified Records)
  const handleSaveLeave = (e) => {
    e.preventDefault();
    if (!formData.studentClass || !formData.section || !formData.student || !formData.description) {
      alert('Please fill out all required fields.');
      return;
    }

    const calculatedNoOfDays = calculateDays(formData.fromDate, formData.toDate);
    const leaveRangeString = `${formData.fromDate} -- ${formData.toDate}`;

    if (editingId) {
      // Handle Edit Update Context
      setLeaveEntries(leaveEntries.map(entry => {
        if (entry.id === editingId) {
          return {
            ...entry,
            name: formData.student,
            class: `${formData.studentClass} (${formData.section})`,
            applyDate: formData.applyDate.split('-').reverse().join('-'),
            noOfDays: calculatedNoOfDays,
            leaveDate: leaveRangeString,
            description: formData.description
          };
        }
        return entry;
      }));
      setEditingId(null);
    } else {
      // Handle Creation Context
      const newEntry = {
        id: Date.now(),
        name: formData.student,
        class: `${formData.studentClass} (${formData.section})`,
        applyDate: formData.applyDate.split('-').reverse().join('-'),
        noOfDays: calculatedNoOfDays,
        leaveDate: leaveRangeString,
        status: 'Pending',
        reply: 'System Acknowledged',
        description: formData.description,
      };
      setLeaveEntries([newEntry, ...leaveEntries]);
    }

    // Return safely to table interface
    setView('list');
    
    // Reset Form Data values
    setFormData({
      studentClass: '',
      section: '',
      student: '',
      applyDate: '2026-06-13',
      fromDate: '2026-06-13',
      toDate: '2026-06-13',
      description: '',
    });
    setFileName('No file chosen');
  };

  // Edit Action Trigger
  const handleEditTrigger = (entry) => {
    setEditingId(entry.id);
    
    // Deconstruct Class and Section safely
    let parsedClass = 'Class 10';
    let parsedSection = 'Sec-A';
    const classMatch = entry.class.match(/(.*)\s\((.*)\)/);
    if (classMatch && classMatch.length === 3) {
      parsedClass = classMatch[1];
      parsedSection = classMatch[2];
    }

    // Deconstruct Leave Dates safely
    let start = '2026-06-13';
    let end = '2026-06-14';
    const dateParts = entry.leaveDate.split('--');
    if (dateParts.length === 2) {
      start = dateParts[0].trim();
      end = dateParts[1].trim();
    }

    setFormData({
      studentClass: parsedClass,
      section: parsedSection,
      student: entry.name,
      applyDate: entry.applyDate.split('-').reverse().join('-'),
      fromDate: start,
      toDate: end,
      description: entry.description
    });

    setView('form');
  };

  // Delete Action Trigger
  const handleDeleteTrigger = (id) => {
    if (window.confirm('Are you sure you want to delete this leave entry?')) {
      setLeaveEntries(leaveEntries.filter(item => item.id !== id));
    }
  };

  // Filter functionality based on Search Input
  const filteredEntries = leaveEntries.filter((entry) =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Math Formulas
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntriesView = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage) || 1;

  // Generate individual page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="sl-dashboard-container">
      {/* Premium Header Layout Segment */}
      <header className="sl-main-header">
        <div className="sl-header-brand">
          <div className="sl-brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h1>Student Leave</h1>
        </div>
        <nav className="sl-header-nav">
          <span className="sl-nav-link" onClick={() => setView('list')}>Attendance</span>
          <span className="sl-nav-separator">/</span>
          <span className="sl-nav-link sl-nav-active">Student Leave</span>
        </nav>
      </header>

      {/* Main Content Wrapper */}
      <main className="sl-content-card">
        {view === 'list' ? (
          /* ================= UI DESIGN 1: LEAVE LIST TABLE ================= */
          <div className="sl-view-wrapper fade-in">
            <div className="sl-card-header">
              <div className="sl-card-title">
                <span className="sl-header-icon-box">☰</span>
                <h2>Student Leave List</h2>
              </div>
              <button className="sl-btn-primary" onClick={() => { setEditingId(null); setView('form'); }}>
                + Add Leave
              </button>
            </div>

            {/* Utility Toolbar Row */}
            <div className="sl-table-toolbar">
              <div className="sl-toolbar-left">
                <div className="sl-entries-selector">
                  <span className="sl-entries-label">Show</span>
                  <select 
                    value={entriesPerPage} 
                    onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                  <span className="sl-entries-label">entries</span>
                </div>
              </div>

              <div className="sl-toolbar-right">
                <div className="sl-search-box">
                  <label>Search:</label>
                  <input 
                    type="search" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Search name or class..."
                  />
                </div>
              </div>
            </div>

            {/* Premium Data Table Wrapper */}
            <div className="sl-table-responsive">
              <table className="sl-data-table">
                <thead>
                  <tr>
                    <th>NAME <span className="sl-sort-icon">⇅</span></th>
                    <th>CLASS <span className="sl-sort-icon">⇅</span></th>
                    <th>APPLY DATE <span className="sl-sort-icon">⇅</span></th>
                    <th>NO OF DAYS <span className="sl-sort-icon">⇅</span></th>
                    <th>LEAVE DATE <span className="sl-sort-icon">⇅</span></th>
                    <th>STATUS <span className="sl-sort-icon">⇅</span></th>
                    <th>REPLY <span className="sl-sort-icon">⇅</span></th>
                    <th>DESCRIPTION <span className="sl-sort-icon">⇅</span></th>
                    <th>ACTION <span className="sl-sort-icon">⇅</span></th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntriesView.length > 0 ? (
                    currentEntriesView.map((entry) => (
                      <tr key={entry.id} className="sl-table-row">
                        <td className="fw-medium sl-text-dark-blue">{entry.name}</td>
                        <td>{entry.class}</td>
                        <td>{entry.applyDate}</td>
                        <td><span className="sl-badge-days">{entry.noOfDays}</span></td>
                        <td className="sl-date-range-cell">{entry.leaveDate}</td>
                        <td>
                          <span className={`sl-status-badge ${entry.status.toLowerCase()}`}>
                            {entry.status}
                          </span>
                        </td>
                        <td className="sl-text-muted">{entry.reply}</td>
                        <td className="sl-truncate" title={entry.description}>{entry.description}</td>
                        <td>
                          <div className="sl-action-buttons">
                            <button className="sl-action-btn edit" title="Edit" onClick={() => handleEditTrigger(entry)}>✏️</button>
                            <button className="sl-action-btn delete" title="Delete" onClick={() => handleDeleteTrigger(entry.id)}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="sl-table-empty">
                        No data available in table
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Full Updated Pagination Management System Footer */}
            <div className="sl-table-footer">
              <div className="sl-pagination-info">
                Showing {filteredEntries.length > 0 ? indexOfFirstEntry + 1 : 0} to {Math.min(indexOfLastEntry, filteredEntries.length)} of {filteredEntries.length} entries
              </div>
              <div className="sl-pagination-controls">
                <button 
                  className={`sl-page-nav-btn ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                <div className="sl-page-numbers-wrapper">
                  {pageNumbers.map(number => (
                    <button
                      key={number}
                      className={`sl-page-number-btn ${currentPage === number ? 'active' : ''}`}
                      onClick={() => setCurrentPage(number)}
                    >
                      {number}
                    </button>
                  ))}
                </div>

                <button 
                  className={`sl-page-nav-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ================= UI DESIGN 2: ADD / EDIT LEAVE FORM ================= */
          <div className="sl-view-wrapper fade-in">
            <div className="sl-card-header mb-large">
              <div className="sl-card-title">
                <span className="sl-header-icon-box">📝</span>
                <h2>{editingId ? 'Modify Leave Entry' : 'Add Leave'}</h2>
              </div>
              <button className="sl-btn-secondary" onClick={() => setView('list')}>
                ← Back to List
              </button>
            </div>

            <form onSubmit={handleSaveLeave} className="sl-premium-form">
              <div className="sl-form-grid">
                
                {/* Class Dropdown */}
                <div className="sl-form-group">
                  <label className="sl-form-label required">Class</label>
                  <select 
                    name="studentClass" 
                    value={formData.studentClass} 
                    onChange={handleInputChange} 
                    required
                    className="sl-form-select"
                  >
                    <option value="">Select Class</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                </div>

                {/* Section Dropdown */}
                <div className="sl-form-group">
                  <label className="sl-form-label required">Section</label>
                  <select 
                    name="section" 
                    value={formData.section} 
                    onChange={handleInputChange} 
                    required
                    className="sl-form-select"
                  >
                    <option value="">Select Section</option>
                    <option value="Sec-A">Section A</option>
                    <option value="Sec-B">Section B</option>
                    <option value="Sec-C">Section C</option>
                  </select>
                </div>

                {/* Student Dropdown */}
                <div className="sl-form-group">
                  <label className="sl-form-label required">Student</label>
                  <select 
                    name="student" 
                    value={formData.student} 
                    onChange={handleInputChange} 
                    required
                    className="sl-form-select"
                  >
                    <option value="">Select Student</option>
                    <option value="Aarav Sharma">Aarav Sharma</option>
                    <option value="Isha Patel">Isha Patel</option>
                    <option value="Ananya Dash">Ananya Dash</option>
                    <option value="Rahul Mohanty">Rahul Mohanty</option>
                  </select>
                </div>

                {/* Apply Date Field */}
                <div className="sl-form-group">
                  <label className="sl-form-label">Apply Date</label>
                  <input 
                    type="date" 
                    name="applyDate"
                    value={formData.applyDate}
                    onChange={handleInputChange}
                    className="sl-form-input readonly-style"
                  />
                </div>

                {/* Leave From Date Field */}
                <div className="sl-form-group">
                  <label className="sl-form-label required">Leave From Date</label>
                  <input 
                    type="date" 
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleInputChange}
                    required
                    className="sl-form-input"
                  />
                </div>

                {/* Leave To Date Field */}
                <div className="sl-form-group">
                  <label className="sl-form-label required">Leave To Date</label>
                  <input 
                    type="date" 
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleInputChange}
                    required
                    min={formData.fromDate}
                    className="sl-form-input"
                  />
                </div>

                {/* Attach Document Field */}
                <div className="sl-form-group sl-width-full">
                  <label className="sl-form-label">Attach Document</label>
                  <div className="sl-file-upload-wrapper">
                    <label htmlFor="file-upload" className="sl-file-upload-btn">
                      Choose File
                    </label>
                    <input 
                      id="file-upload" 
                      type="file" 
                      className="sl-file-input-hidden" 
                      onChange={handleFileChange}
                    />
                    <span className="sl-file-name-placeholder">{fileName}</span>
                  </div>
                </div>
              </div>

              {/* Description Textarea */}
              <div className="sl-form-group sl-width-full">
                <label className="sl-form-label required">Description</label>
                <textarea 
                  name="description" 
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Enter detailed reason for leave..."
                  required
                  className="sl-form-textarea"
                ></textarea>
              </div>

              {/* Action Save Button Footer */}
              <div className="sl-form-actions">
                <button type="submit" className="sl-btn-save">
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentLeave;
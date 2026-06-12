import React, { useState } from 'react';
import './FeeEntry.css';

const FeeEntry = () => {
  // UI Toggle States
 
  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isAcClosingModalOpen, setIsAcClosingModalOpen] = useState(false);

  // Form Value States
  const [entryDate, setEntryDate] = useState('2026-06-08');
  const [closingDate, setClosingDate] = useState('2026-06-08');
  const [narrationText, setNarrationText] = useState('');

  // Column visibility checklist state for the Fee Statement modal
  const [visibleColumns, setVisibleColumns] = useState({
    recNo: true,
    recDate: true,
    createdDate: true,
    period: true,
    payMode: true,
    grossAmt: true,
    discAmt: true,
    remark: true,
    tPayableAmt: true,
    paidAmt: true,
    dueAmt: true,
    advAmt: true,
  });

  const toggleColumn = (columnKey) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  const handleAcClosingSubmit = (e) => {
    e.preventDefault();
    console.log("A/C Closing Submitted:", { date: closingDate, narration: narrationText });
    setIsAcClosingModalOpen(false);
  };

  return (
    <div className="fee-entry-container">
      {/* Top Search Bar Row */}
      <div className="fee-entry-header-row">
        <div className="search-bar-wrapper">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <button className="btn-ac-open" onClick={() => setIsAcClosingModalOpen(true)}>
          A/C Open
        </button>
      </div>

      {/* Main Form Split Layout */}
      <div className="fee-entry-main-grid">
        {/* Left Side: Student Info Profile Card */}
        <div className="student-profile-card">
          <div className="student-info-list">
            <div className="info-item"><strong>Enroll No. :</strong></div>
            <div className="info-item"><strong>Sr. No. :</strong></div>
            <div className="info-item"><strong>Adm. No. :</strong></div>
            <div className="info-item"><strong>Name :</strong></div>
            <div className="info-item"><strong>Class :</strong></div>
            <div className="info-item"><strong>Father's Name :</strong></div>
            <div className="info-item"><strong>Mother's Name :</strong></div>
            <div className="info-item"><strong>Mobile No. :</strong></div>
            <div className="info-item"><strong>Address :</strong></div>
            <div className="info-item"><strong>Document Remark :</strong></div>
            <div className="info-item"><strong>General Remark :</strong></div>
          </div>

          <div className="student-avatar-column">
            <div className="avatar-placeholder">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM4.68 11.16L12 15.16l7.32-4V15c0 .4-.14.79-.4 1.09l-5.45 6.05c-.38.42-1.03.42-1.41 0L6.6 16.09c-.26-.3-.4-.69-.4-1.09v-3.84z"/>
              </svg>
            </div>
            <div className="avatar-meta-item"><strong>Stu Type :</strong> </div>
            <div className="avatar-meta-item"><strong>Fee Type :</strong> </div>
            <div className="avatar-meta-item"><strong>Transport Status :</strong> </div>
          </div>
        </div>

        {/* Right Side: Primary Inputs Form Fields */}
        <div className="fee-inputs-form">
          <div className="form-row">
            <div className="form-group floating-label-group">
              <label>Fee Type</label>
              <select defaultValue="All" className="form-select">
                <option value="All">All</option>
                <option value="Academic">Academic Fee</option>
                <option value="Transport">Transport Fee</option>
                <option value="Hostel">Hostel Fee</option>
                <option value="Examination">Examination Fee</option>
              </select>
            </div>
            <div className="form-group floating-label-group">
              <label>Choose a date*</label>
              <input 
                type="date" 
                value={entryDate} 
                onChange={(e) => setEntryDate(e.target.value)} 
                className="form-input custom-date-picker" 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input type="text" placeholder="Receipt No." className="form-input" />
            </div>
            <div className="form-group">
              <select defaultValue="" className="form-select required-select">
                <option value="" disabled hidden>Pay Mode*</option>
                <option value="Cash">Cash</option>
                <option value="Online">Online Pay</option>
                <option value="Cheque">Cheque</option>
                <option value="DD">Demand Draft</option>
                <option value="UPI">UPI / QR Scan</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Amount & Installment Checkboxes Layout Row */}
      {/* Installment + Head Wise Fees Layout */}
<div className="fee-panels-row">

  {/* Left Installment Card */}
  <div className="installment-card">

    <div className="installment-card-title">
      Installment Months
    </div>

    <div className="installment-top-check">
      <input type="checkbox" />
    </div>

    <div className="installment-grid">

      {[
        "Apr",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb",
        "Mar",
      ].map((month) => (
        <label key={month} className="month-item">
          <input type="checkbox" />
          <span>{month}</span>
        </label>
      ))}

    </div>
  </div>

  {/* Right Fees Card */}
  <div className="fees-card">

    <div className="accordion-header-bar">
      <span className="accordion-title-text">
        Head Wise Fees
      </span>

      <div className="accordion-action-buttons-group">

      <button
  className="btn-show-receipts"
  onClick={() => setIsStatementModalOpen(true)}
>
  Show Receipts
</button>
        

        
      </div>
    </div>

    <div className="accordion-collapsible-panel">
      <div className="table-responsive-container">
        <table className="head-wise-fees-table">
          <thead>
            <tr>
              <th className="table-header-checkbox-cell">
                <input
                  type="checkbox"
                  defaultChecked
                  className="table-red-checkbox"
                />
              </th>
              <th>HEAD</th>
              <th>AMT.</th>
              <th>CONC.</th>
              <th>PAYABLE</th>
            </tr>
          </thead>

          <tbody>
            <tr className="table-summary-row">
              <td></td>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>0</strong>
              </td>
              <td>
                <strong>0</strong>
              </td>
              <td>
                <strong>0</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>

</div>

     

      {/* Calculation Form Summary Fields Row */}
      <div className="calculation-summary-dashboard-grid">
        <div className="calc-group-field">
          <label>Grand Total</label>
          <input type="text" value="0" readOnly className="calc-input-box" />
        </div>
        <div className="calc-group-field">
          <label>Advance Paid</label>
          <input type="text" value="0" readOnly className="calc-input-box" />
        </div>
        <div className="calc-group-field simple-placeholder-field">
          <input type="text" placeholder="Discount" className="calc-input-box" />
        </div>
        <div className="calc-group-field">
          <label>Payable Amou</label>
          <input type="text" value="0" readOnly className="calc-input-box" />
        </div>
        <div className="calc-group-field">
          <label>Total Paid*</label>
          <input type="text" value="0" className="calc-input-box required-border" />
        </div>
        <div className="calc-group-field">
          <label>Due Amount</label>
          <input type="text" value="0" readOnly className="calc-input-box" />
        </div>
      </div>

      {/* Action Footer Buttons Submit Bar */}
      <div className="form-action-footer-bar">
        <input type="text" placeholder="Receipt Remark" className="receipt-remark-input" />
        <button className="btn-save-form">Save</button>
      </div>

      {/* POPUP 1: Fee Statement Modal Overlay */}
      {isStatementModalOpen && (
        <div className="modal-overlay-backdrop" onClick={() => setIsStatementModalOpen(false)}>
          <div className="fee-statement-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-panel">
              <h2 className="modal-header-title">FEE STATEMENT</h2>
              <div className="modal-header-controls-group">
                <button 
                  className="btn-column-visibility-filter"
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                >
                  <svg viewBox="0 0 24 24" className="filter-icon-svg">
                    <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
                  </svg>
                </button>
                <button className="btn-modal-close-window" onClick={() => setIsStatementModalOpen(false)}>×</button>

                {isFilterDropdownOpen && (
                  <div className="column-filter-checklist-dropdown">
                    {Object.keys(visibleColumns).map((key) => (
                      <label className="checklist-item-row" key={key}>
                        <input 
                          type="checkbox" 
                          checked={visibleColumns[key]} 
                          onChange={() => toggleColumn(key)} 
                        />
                        <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-table-responsive-wrapper">
              <table className="fee-statement-data-table">
                <thead>
                  <tr>
                    <th>S.no.</th>
                    {visibleColumns.recNo && <th>Rec. No.</th>}
                    {visibleColumns.recDate && <th>Rec. Date</th>}
                    {visibleColumns.createdDate && <th>Created Date</th>}
                    {visibleColumns.period && <th>Period</th>}
                    {visibleColumns.payMode && <th>Pay Mode</th>}
                    {visibleColumns.grossAmt && <th>Gross Amt.</th>}
                    {visibleColumns.discAmt && <th>Disc Amt.</th>}
                    {visibleColumns.remark && <th>Remark</th>}
                    {visibleColumns.tPayableAmt && <th>T Payable Amt.</th>}
                    {visibleColumns.paidAmt && <th>Paid Amt.</th>}
                    {visibleColumns.dueAmt && <th>Due Amt.</th>}
                    {visibleColumns.advAmt && <th>Adv. Amt.</th>}
                  </tr>
                </thead>
                <tbody>
                  <tr className="empty-table-placeholder-row">
                    <td colSpan="14" style={{ textAlign: 'center', padding: '30px', color: '#999' }}>
                      No data records available
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 2: Fee Collection A/C Closing Modal Window */}
      {isAcClosingModalOpen && (
        <div className="modal-overlay-backdrop" onClick={() => setIsAcClosingModalOpen(false)}>
          <div className="ac-closing-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="ac-closing-header">
              <h2 className="ac-closing-title">FEE COLLECTION A/C CLOSING</h2>
              <button className="btn-ac-modal-close" onClick={() => setIsAcClosingModalOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form onSubmit={handleAcClosingSubmit} className="ac-closing-form-body">
              <div className="ac-form-group-fieldset">
                <label className="ac-fieldset-label">Date*</label>
                <input 
                  type="date" 
                  value={closingDate} 
                  onChange={(e) => setClosingDate(e.target.value)} 
                  className="ac-custom-input"
                  required
                />
              </div>

              <div className="ac-form-group-fieldset">
                <textarea 
                  placeholder="Narration" 
                  value={narrationText} 
                  onChange={(e) => setNarrationText(e.target.value)} 
                  className="ac-custom-textarea"
                />
              </div>

              <div className="ac-modal-actions-footer">
                <button type="submit" className="btn-ac-modal-submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeEntry;
import React from "react";
import "./FeeSection.css";

// Grouped by school stage
const feeGroups = [
  {
    stage: "Pre-Primary",
    rows: [
      { cls: "Nursery", fee: 900 },
      { cls: "L.K.G.", fee: 900 },
      { cls: "U.K.G.", fee: 1000 },
    ],
  },
  {
    stage: "Primary",
    rows: [
      { cls: "Class 1", fee: 1080 },
      { cls: "Class 2", fee: 1080 },
      { cls: "Class 3", fee: 1200 },
      { cls: "Class 4", fee: 1200 },
      { cls: "Class 5", fee: 1200 },
    ],
  },
  {
    stage: "Middle",
    rows: [
      { cls: "Class 6", fee: 1330 },
      { cls: "Class 7", fee: 1330 },
      { cls: "Class 8", fee: 1330 },
    ],
  },
  {
    stage: "Secondary",
    rows: [
      { cls: "Class 9", fee: 1480 },
      { cls: "Class 10", fee: 1510 },
    ],
  },
];

const noteItems = [
  "Admission",
  "Registration",
  "Annual Activity",
  "MNTC",
  "Exam",
  "Practical",
  "Computer Fee Extra",
];

const FeeSection = () => {
  return (
    <section className="fee-section">
      <div className="fee-container">
        {/* HEADER */}
        <div className="fee-header">
          <span className="fee-tag">
            <span className="fee-tagLine" aria-hidden="true" />
            Fee Structure
          </span>

          <h2>
            Fee Particulars <span>for Session 2026&ndash;27</span>
          </h2>

          <p>Transparent, month-wise fee for Nursery through Class 10</p>
        </div>

        {/* TABLE */}
        <div className="fee-tableCard">
          <div className="fee-tableHead">
            <span>Class</span>
            <span>Monthly Fee</span>
          </div>

          {feeGroups.map((group) => (
            <div className="fee-group" key={group.stage}>
              <div className="fee-groupLabel">
                <span>{group.stage}</span>
              </div>

              {group.rows.map((row) => (
                <div className="fee-row" key={row.cls}>
                  <span className="fee-className">{row.cls}</span>
                  <span className="fee-arrow" aria-hidden="true">
                    &rsaquo;
                  </span>
                  <span className="fee-amount">
                    &#8377;{row.fee.toLocaleString("en-IN")}
                    <small> / month</small>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* NOTE */}
        <div className="fee-noteCard">
          <span className="fee-noteTag">Note</span>
          <p>
            {noteItems.map((item, i) => (
              <React.Fragment key={item}>
                <span className="fee-noteItem">{item}</span>
                {i < noteItems.length - 1 && (
                  <span className="fee-noteDot" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeeSection;
import React from "react";
import "./FeeSection.css";

const feeData = [
  {
    label: "Admission & Registration Fee",
    nursery: 2500,
    lkg: 2500,
    ukg: 2500,
    c1: 2500,
    c2: 2500,
    c3: 2500,
    c4: 2500,
    c5: 2500,
    c6: 2500,
    c7: 2500,
    c8: 2500,
    c9: 2500,
    c10: 2500,
  },
  {
    label: "Annual Activity & Maintenance",
    nursery: 1300,
    lkg: 1300,
    ukg: 1300,
    c1: 1300,
    c2: 1300,
    c3: 1300,
    c4: 1300,
    c5: 1300,
    c6: 1650,
    c7: 1650,
    c8: 1650,
    c9: 1650,
    c10: 1650,
  },
  {
    label: "Exam Fee",
    nursery: 1000,
    lkg: 1000,
    ukg: 1000,
    c1: 1100,
    c2: 1100,
    c3: 1100,
    c4: 1100,
    c5: 1100,
    c6: 1200,
    c7: 1200,
    c8: 1200,
    c9: 1300,
    c10: 2500,
  },
  {
    label: "Comp. & Science Practical Fee",
    nursery: 0,
    lkg: 0,
    ukg: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    c4: 0,
    c5: 0,
    c6: 1100,
    c7: 1100,
    c8: 1100,
    c9: 1300,
    c10: 1300,
  },
  {
    label: "Monthly School Fee (10 Months)",
    nursery: 9000,
    lkg: 9000,
    ukg: 10000,
    c1: 10800,
    c2: 10800,
    c3: 12000,
    c4: 12000,
    c5: 12000,
    c6: 13300,
    c7: 13300,
    c8: 13300,
    c9: 14800,
    c10: 15100,
  },
];

const annualTotals = {
  nursery: 13800,
  lkg: 13800,
  ukg: 14800,
  c1: 15700,
  c2: 15700,
  c3: 16900,
  c4: 16900,
  c5: 16900,
  c6: 19750,
  c7: 19750,
  c8: 19750,
  c9: 21550,
  c10: 23050,
};

const FeeSection = () => {
  return (
    <section className="fee-section">
      <div className="fee-container">
        <div className="fee-header">
          <h2>School Fee Structure 2025-26</h2>
          <p>
            Complete Fee Details for Nursery to Class 10
          </p>
        </div>

        <div className="fee-table-wrapper">
          <table className="fee-table">
            <thead>
              <tr>
                <th>Fee Particular</th>
                <th>Nursery</th>
                <th>LKG</th>
                <th>UKG</th>
                <th>Class 1</th>
                <th>Class 2</th>
                <th>Class 3</th>
                <th>Class 4</th>
                <th>Class 5</th>
                <th>Class 6</th>
                <th>Class 7</th>
                <th>Class 8</th>
                <th>Class 9</th>
                <th>Class 10</th>
              </tr>
            </thead>

            <tbody>
              {feeData.map((item, index) => (
                <tr key={index}>
                  <td className="row-title">{item.label}</td>
                  <td>{item.nursery}</td>
                  <td>{item.lkg}</td>
                  <td>{item.ukg}</td>
                  <td>{item.c1}</td>
                  <td>{item.c2}</td>
                  <td>{item.c3}</td>
                  <td>{item.c4}</td>
                  <td>{item.c5}</td>
                  <td>{item.c6}</td>
                  <td>{item.c7}</td>
                  <td>{item.c8}</td>
                  <td>{item.c9}</td>
                  <td>{item.c10}</td>
                </tr>
              ))}

              <tr className="total-row">
                <td className="row-title">Annual Fee (Total)</td>
                <td>{annualTotals.nursery}</td>
                <td>{annualTotals.lkg}</td>
                <td>{annualTotals.ukg}</td>
                <td>{annualTotals.c1}</td>
                <td>{annualTotals.c2}</td>
                <td>{annualTotals.c3}</td>
                <td>{annualTotals.c4}</td>
                <td>{annualTotals.c5}</td>
                <td>{annualTotals.c6}</td>
                <td>{annualTotals.c7}</td>
                <td>{annualTotals.c8}</td>
                <td>{annualTotals.c9}</td>
                <td>{annualTotals.c10}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FeeSection;
import React, { useEffect, useState } from "react";

const LabourList = () => {
  const [labourData, setLabourData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/consultant/labourregisterview") // Adjust the endpoint if needed
      .then((res) => res.json())
      .then((data) => {
        const grouped = data.reduce((acc, curr) => {
          const type = curr.labourType;
          if (!acc[type]) {
            acc[type] = { total: 0, offsite: 0, onsite: 0 };
          }
          acc[type].total += 1;
          if (curr.labourStatus === 0) {
            acc[type].offsite += 1;
          } else if (curr.labourStatus === 1) {
            acc[type].onsite += 1;
          }
          return acc;
        }, {});

        const result = Object.entries(grouped).map(([labourType, counts]) => ({
          labourType,
          ...counts,
        }));

        setLabourData(result);
      });
  }, []);

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "2rem",
  };

  const thTdStyle = {
    padding: "1rem",
    border: "1px solid #e5e7eb",
    textAlign: "left",
  };

  const headerStyle = {
    backgroundColor: "#f3f4f6",
    fontWeight: "600",
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>
       List of Labours
      </h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thTdStyle, ...headerStyle }}>Labour Type</th>
            <th style={{ ...thTdStyle, ...headerStyle, color: "blue" }}>Total Count</th>
            <th style={{ ...thTdStyle, ...headerStyle, color: "red" }}>Offsite</th>
            <th style={{ ...thTdStyle, ...headerStyle, color: "green" }}>Onsite</th>
          </tr>
        </thead>
        <tbody>
          {labourData.map((item, index) => (
            <tr key={index}>
              <td style={{...thTdStyle, headerStyle }}>{item.labourType}</td>
              <td style={{...thTdStyle, color: "blue"}}>{item.total}</td>
              <td style={{ ...thTdStyle, color: "red" }}>{item.offsite}</td>
              <td style={{ ...thTdStyle, color: "green" }}>{item.onsite}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LabourList;

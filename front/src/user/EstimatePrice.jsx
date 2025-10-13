import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EstimatePrice = () => {
  const { planid } = useParams();
  const [estimates, setEstimates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/consultant/get-estimates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId: planid }),
    })
      .then((res) => res.json())
      .then((data) => setEstimates(data))
      .catch(() => setEstimates([]));
  }, [planid]);

  const handleAssign = (consultid) => {
    fetch("http://localhost:4000/consultant/assign-consultancy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId: planid, consultid }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Consultancy assigned successfully!");
      })
      .catch(() => {
        alert("Failed to assign consultancy.");
      });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Estimated Prices</h2>
      {estimates.length === 0 ? (
        <div>No estimates found for this plan.</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #eee", padding: "8px" }}>Consultancy</th>
              <th style={{ borderBottom: "1px solid #eee", padding: "8px" }}>Estimated Price</th>
              <th style={{ borderBottom: "1px solid #eee", padding: "8px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {estimates.map((est, idx) => (
              <tr key={idx}>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  {est.consultancyName || est.consultid || "Consultancy"}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  {est.estimateprice}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  <button
                    style={{
                      backgroundColor: "#22c55e",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleAssign(est.consultid)}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EstimatePrice;
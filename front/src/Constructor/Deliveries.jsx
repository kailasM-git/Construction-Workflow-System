import React, { useEffect, useState } from "react";

export default function Deliveries() {
  const [auth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("yourstorage"));
    } catch {
      return null;
    }
  });

  const [deliveredWorks, setDeliveredWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveredWorks = async () => {
      try {
        const res = await fetch("http://localhost:4000/consultant/getDeliveredWorks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contractorId: auth._id}),
          
        });console.log(auth._id);

        const data = await res.json();
        if (Array.isArray(data)) {
          setDeliveredWorks(data);
        } else {
          console.warn("Expected array but got:", data);
          setDeliveredWorks([]);
        }
      } catch (err) {
        console.error("Failed to fetch delivered works:", err);
        setDeliveredWorks([]);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.userid) fetchDeliveredWorks();
  }, [auth?.userid]);

  if (loading) return <p>Loading delivered works...</p>;

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20, background: "#fff", borderRadius: 12 }}>
      <h2 style={{ textAlign: "center", color: "#3C4CD0" }}>Delivered Works by Suppliers</h2>

      {deliveredWorks.length === 0 ? (
        <p>No delivered works found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Work ID</th>
              <th>Items</th>
              <th>Location</th>
              {/* <th>Supplier</th> */}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {deliveredWorks.map((work) => (
              <tr key={work._id}>
                <td>{work.items}</td>
                <td>{work.itemsrequired}</td>
                <td>{work.location}</td>
                {/* <td>{work.supplierName || "N/A"}</td> */}
                <td style={{ color: "#16a34a", fontWeight: "bold" }}>{work.deliveryStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

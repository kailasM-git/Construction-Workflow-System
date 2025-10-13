import React, { useEffect, useState } from "react";

function ViewDelivery() {
  const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")));
  const [deliveredWorks, setDeliveredWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveredWorks = async () => {
      try {
        const res = await fetch("http://localhost:4000/consultant/getSupplierDeliveredWorks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ supplierId: auth._id }),
        });
        const data = await res.json();
        setDeliveredWorks(data);
      } catch (err) {
        console.error("Failed to fetch delivered works:", err);
      } finally {
        setLoading(false);
      }
    };

    if (auth?._id) fetchDeliveredWorks();
  }, [auth?._id]);

  if (loading) return <p>Loading delivered works...</p>;

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20, background: "#fff", borderRadius: 12 }}>
      <h2 style={{ textAlign: "center", color: "#3C4CD0" }}>My Delivered Works</h2>
      {deliveredWorks.length === 0 ? (
        <p>No delivered works found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Items</th>
              <th>Location</th>
              {/* <th>Contractor</th> */}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {deliveredWorks.map((work) => (
              <tr key={work._id}>
                <td>{work.username}</td>
                <td>{work.itemsrequired}</td>
                <td>{work.location}</td>
                {/* <td>{work.constructorid?.name || "N/A"}</td> */}
                <td style={{ color: "#16a34a", fontWeight: "bold" }}>{work.deliveryStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewDelivery;
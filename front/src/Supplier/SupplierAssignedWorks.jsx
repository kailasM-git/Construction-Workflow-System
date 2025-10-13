
import React, { useEffect, useState } from "react";

export default function SupplierAssignedWorks() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("yourstorage")));
  const [assignedWorks, setAssignedWorks] = useState([]);

  useEffect(() => {
    const fetchAssignedWorks = async () => {
      try {
        const res = await fetch("http://localhost:4000/consultant/viewAssignedWorks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ supplierId: auth._id }),
        });
        const data = await res.json();
        setAssignedWorks(data);
      } catch (error) {
        console.error("Failed to fetch assigned works:", error);
      }
    };

    if (auth?._id) fetchAssignedWorks();
  }, [auth?._id]);

  const updateStatus = async (workId) => {
    try {
      const res = await fetch("http://localhost:4000/consultant/updateStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workId, status: "Delivery Completed" }),
      });

      if (res.ok) {
        alert("Status updated successfully!");
        setAssignedWorks((prev) =>
          prev.map((work) =>
            work._id === workId ? { ...work, deliveryStatus: "Delivery Completed" } : work
          )
        );
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "40px auto",
      padding: "20px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      fontFamily: "sans-serif",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
      color: "#3C4CD0",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#3C4CD0",
      color: "#fff",
      padding: "12px",
      textAlign: "left",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
    },
    button: {
      padding: "8px 12px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.heading}>My Assigned Works</div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Items</th>
            <th style={styles.th}>Location</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {assignedWorks.length === 0 ? (
            <tr>
              <td colSpan="5" style={styles.td}>No assigned works.</td>
            </tr>
          ) : (
            assignedWorks.map((work) => (
              <tr key={work._id}>
                <td style={styles.td}>{work.username}</td>
                <td style={styles.td}>{work.itemsrequired}</td>
                <td style={styles.td}>{work.location}</td>
                <td style={styles.td}>{work.deliveryStatus}</td>
                <td style={styles.td}>
                  {work.deliveryStatus !== "Delivery Completed" && (
                    <button style={styles.button} onClick={() => updateStatus(work._id)}>
                      Mark as Completed
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

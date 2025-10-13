import React, { useState, useEffect } from "react";

export default function UserPlans() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/consultant/planview")
      .then((res) => res.json())
      .then((result) => setUsers(result))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleViewPlans = (user) => {
    if (!user.userid || !user.userid._id) return;
    window.location.href = `/consultant/userplans/${user.userid._id}`;
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>User Plans</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1rem",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Username</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.userid?.name || "N/A"}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.email || "N/A"}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button
                  onClick={() => handleViewPlans(user)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  View Plans
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

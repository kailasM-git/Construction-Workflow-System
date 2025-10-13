import React, { useState, useEffect } from 'react'

function WorkStatus() {
    // const [users, setUsers] = useState([]);
    const [work, setWork] = useState([]);
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("yourstorage")));
    console.log("Auth:", auth);

    useEffect(() => {
        const fetchAssignedWorks = async () => {
            try {
                const res = await fetch("http://localhost:4000/consultant/getWork", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({ consultid: auth.userid }),
                });
                const result = await res.json();
                console.log("Assigned Works:", result);
                setWork(result);
            } catch (error) {
                console.error("Error fetching assigned works:", error);
            }
        };

        fetchAssignedWorks();
    }, [auth.userid]);
    return (
        <div style={{ padding: "2rem" }}>
            <h2>Work Status</h2>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "1rem",
                }}
            >
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Place</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Username</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Works</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {work.map((user, index) => (
                        <tr key={index}>
                             <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {user.location || "N/A"}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {user.username || "N/A"}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {user.items || "N/A"}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {/* <button
                                    // onClick={() => handleViewPlans(user)}
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
                                </button> */}

                                {user.status === 0 ? "Pending" :
                                    // user.status === 1 ? "In Progress" :
                                    user.status === 1 ? "Completed" :
                                        user.status === 3 ? "Cancelled" : "Unknown"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default WorkStatus

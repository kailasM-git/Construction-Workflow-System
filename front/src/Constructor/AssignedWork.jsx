import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ConstructorAssignedWorks() {
  const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")));
  const [assignedWorks, setAssignedWorks] = useState([]);
  const [selectedWorkId, setSelectedWorkId] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [labours, setLabours] = useState([]);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showLabourModal, setShowLabourModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedLabour, setSelectedLabour] = useState("");
  const [itemInputs, setItemInputs] = useState({});

  useEffect(() => {
    const fetchAssignedWorks = async () => {
      try {
        const res = await fetch("http://localhost:4000/consultant/getAssignedWorks", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ constructorid: auth._id }),
        });
        const result = await res.json();
        setAssignedWorks(result);
      } catch (error) {
        console.error("Error fetching assigned works:", error);
      }
    };

    fetchAssignedWorks();
  }, [auth._id]);

  const openSupplierModal = async (workId) => {
    setSelectedWorkId(workId);
    const res = await fetch("http://localhost:4000/consultant/supplierregisterview");
    const data = await res.json();
    setSuppliers(data);
    setShowSupplierModal(true);
  };

  const openLabourModal = async (workId) => {
    setSelectedWorkId(workId);
    const res = await fetch("http://localhost:4000/consultant/labourregisterview");
    const data = await res.json();
    setLabours(data);
    setShowLabourModal(true);
  };

  const assignSupplier = async () => {
    if (!selectedSupplier) return alert("Please select a supplier.");
    await fetch("http://localhost:4000/consultant/assignsupplier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ biddedWorkId: selectedWorkId, assignedSuppliers: selectedSupplier }),
    });
    alert("Supplier assigned successfully");
    setShowSupplierModal(false);
    setSelectedSupplier("");
    updateWorkStatus(selectedWorkId);
  };

  const assignLabour = async () => {
    if (!selectedLabour) return alert("Please select a labour.");
    await fetch("http://localhost:4000/consultant/assignlabour", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ biddedWorkId: selectedWorkId, labourId: selectedLabour }),
    });
    alert("Labour assigned successfully");
    setShowLabourModal(false);
    setSelectedLabour("");
    updateWorkStatus(selectedWorkId);
  };

  const updateWorkStatus = async (workId) => {
    await axios.post("http://localhost:4000/consultant/updateWork", {
      workId,
      status: 1,
    });
    const updated = await fetch("http://localhost:4000/consultant/getAssignedWorks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ constructorid: auth._id }),
    });
    const result = await updated.json();
    setAssignedWorks(result);
  };

  const handleItemChange = (id, value) => {
    setItemInputs({ ...itemInputs, [id]: value });
  };

  const saveItemsRequired = async (workId) => {
    const items = itemInputs[workId];
    if (!items) return alert("Please enter item details.");
    await axios.post("http://localhost:4000/consultant/updateItemsRequired", {
      workId,
      items,
    });
    alert("Items required saved!");
    updateWorkStatus(workId);
  };

  const styles = {
    tableContainer: {
      maxWidth: "1100px",
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
      marginRight: "8px",
      backgroundColor: "#3C4CD0",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modal: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "10px",
      width: "400px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    },
    modalHeader: {
      fontSize: "18px",
      marginBottom: "15px",
    },
    select: {
      width: "100%",
      padding: "10px",
      marginBottom: "20px",
      borderRadius: "6px",
      border: "1px solid #ccc",
    },
    input: {
      padding: "8px",
      width: "100%",
      borderRadius: "6px",
      border: "1px solid #ccc",
    },
  };

  return (
    <div style={styles.tableContainer}>
      <div style={styles.heading}>Assigned Works</div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Work Details</th>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Items Required</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignedWorks.map((work) => (
            <tr key={work._id}>
              <td style={styles.td}>{work.items}</td>
              <td style={styles.td}>{work.username}</td>
              <td style={styles.td}>
                <input
                  type="text"
                  placeholder="Enter items"
                  value={itemInputs[work._id] || ""}
                  onChange={(e) => handleItemChange(work._id, e.target.value)}
                  style={styles.input}
                />
                <button style={styles.button} onClick={() => saveItemsRequired(work._id)}>
                  Save
                </button>
              </td>
              <td style={styles.td}>
                <button
                  style={{
                    ...styles.button,
                    backgroundColor: work.assignedSupplier ? "gray" : "#3C4CD0",
                    cursor: work.assignedSupplier ? "not-allowed" : "pointer",
                  }}
                  onClick={() => !work.assignedSupplier && openSupplierModal(work._id)}
                  disabled={!!work.assignedSupplier}
                >
                  {work.assignedSupplier ? "Supplier Assigned" : "Assign Supplier"}
                </button>
                <button
                  style={{
                    ...styles.button,
                    backgroundColor: work.assignedLabour ? "gray" : "#3C4CD0",
                    cursor: work.assignedLabour ? "not-allowed" : "pointer",
                  }}
                  onClick={() => !work.assignedLabour && openLabourModal(work._id)}
                  disabled={!!work.assignedLabour}
                >
                  {work.assignedLabour ? "Labour Assigned" : "Assign Labour"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showSupplierModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>Select a Supplier</div>
            <select
              style={styles.select}
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
            >
              <option value="">-- Select Supplier --</option>
              {suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.userid.supplierName}
                </option>
              ))}
            </select>
            <button style={styles.button} onClick={assignSupplier}>Assign</button>
            <button
              style={{ ...styles.button, backgroundColor: "gray" }}
              onClick={() => setShowSupplierModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showLabourModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>Select a Labour</div>
            <select
              style={styles.select}
              value={selectedLabour}
              onChange={(e) => setSelectedLabour(e.target.value)}
            >
              <option value="">-- Select Labour --</option>
              {labours.map((labour) => (
                <option key={labour._id} value={labour._id}>
                  {labour.name}
                </option>
              ))}
            </select>
            <button style={styles.button} onClick={assignLabour}>Assign</button>
            <button
              style={{ ...styles.button, backgroundColor: "gray" }}
              onClick={() => setShowLabourModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}




import axios from "axios";
import { useState, useEffect } from "react";
import Navebar from "./Navebar";

export default function Reports() {
  const [reportList, setReportList] = useState([]);
  const [auth, setAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("yourstorage"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    fetchPayment();
  }, []);

  const fetchPayment = async () => {
    try {
      const param = { userId: auth?.userid };
      const response = await axios.post(
        "http://localhost:4000/api/payment/userPayment",
        param
      );
      const data = response.data || [];
      console.log(data);
      setReportList(data);
    } catch (error) {
      console.error("Error fetching payments", error);
    }
  };

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleString();
  };

  return (
    <>
    <Navebar/>
    
    <div style={styles.container}>
      {reportList.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        reportList.map((item, index) => {
          const paidAmounts = item.amount || item.mount || []; // fallback for typo
          const totalPaid = paidAmounts.reduce(
            (acc, val) => acc + Number(val),
            0
          );
          const totalPayable = Number(item.planId?.estimateprice || 0);
          const balanceAmount = totalPayable - totalPaid;

          return (
            <div key={item._id} style={styles.card}>
              <h3 style={styles.title}>Report #{index + 1}</h3>

              <p>
                <strong>User:</strong> {item.userId?.name}
              </p>
              <p>
                <strong>Balance Amount:</strong> ₹{balanceAmount}
              </p>
              <p>
                <strong>Amount Paid:</strong> ₹{paidAmounts.join(", ₹")}
              </p>
              <p>
                <strong>Currency:</strong> {item.currency}
              </p>
              <p>
                <strong>Total Amount to be paid:</strong> ₹{totalPayable}
              </p>
              <p>
                <strong>Completed Stages:</strong> {item.stages?.join(", ")}
              </p>
              <p>
                <strong>Verified:</strong> {item.isVerified ? "Yes" : "No"}
              </p>
              <p>
                <strong>Last Payment Done At:</strong>{" "}
                {formatDate(item.createdAt)}
              </p>
              <p>
                <strong>Report:</strong> {item.report || "No report provided"}
              </p>
            </div>
          );
        })
      )}
    </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "16px",
    backgroundColor: "#fff",
    width: "340px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    lineHeight: 1.6,
  },
  title: {
    marginBottom: "12px",
    color: "#222",
  },
};

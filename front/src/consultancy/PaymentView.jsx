import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PaymentView() {
  const [auth, setAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("yourstorage"));
    } catch {
      return null;
    }
  });

  const [payments, setPayments] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [reports, setReports] = useState({});

  useEffect(() => {
    if (auth?.userid) {
      fetchPayment();
    }
  }, [auth]);

  const fetchPayment = async () => {
    try {
      const param = { consultantId: auth.userid };
      const response = await axios.post(
        "http://localhost:4000/api/payment/viewpayment",
        param
      );
      const data = response.data || [];
      setPayments(data);
      const grouped = groupByMonth(data);
      setChartData(grouped);
      fetchPrediction(grouped);
    } catch (error) {
      console.error("Error fetching payments", error);
    }
  };

  const groupByMonth = (payments) => {
    const monthlyTotals = {};
    payments.forEach((payment) => {
      const date = dayjs(payment.createdAt);
      const key = date.format("YYYY-MM");

      const total = Array.isArray(payment.amount)
        ? payment.amount.reduce((sum, a) => sum + Number(a), 0)
        : Number(payment.amount);

      monthlyTotals[key] = (monthlyTotals[key] || 0) + total;
    });

    const now = dayjs();
    const result = [];

    for (let i = 6; i >= 0; i--) {
      const month = now.subtract(i, "month").format("YYYY-MM");
      result.push({
        month,
        revenue: monthlyTotals[month] || 0,
      });
    }

    const currentMonth = now.format("YYYY-MM");
    if (!result.find((item) => item.month === currentMonth)) {
      result.push({
        month: currentMonth,
        revenue: monthlyTotals[currentMonth] || 0,
      });
    }

    return result;
  };

  const fetchPrediction = async (monthlyData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payment/predict",
        { monthlyData }
      );
      const predicted = response.data || [];

      setChartData((prevData) => [
        ...prevData,
        ...predicted.map((p) => ({
          month: p.month,
          revenue: p.predicted_revenue,
          predicted: true,
        })),
      ]);
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  const handleReportChange = (paymentId, value) => {
    setReports((prev) => ({
      ...prev,
      [paymentId]: value,
    }));
  };

  const handleReportSubmit = async (paymentId) => {
    const reportText = reports[paymentId];
    if (!reportText) return alert("Please enter a report.");

    try {
      await axios.post("http://localhost:4000/api/payment/addreport", {
        paymentId,
        report: reportText,
      });
      alert("Report submitted successfully!");
      setReports((prev) => ({ ...prev, [paymentId]: "" }));
    } catch (error) {
      console.error("Failed to submit report", error);
      alert("Failed to submit report");
    }
  };

  return (
    <div>
      <h2>Payment Details</h2>

      {payments.length > 0 ? (
        <>
          <div style={{ width: "100%", height: 300, marginBottom: "2rem" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  dot={(props) => {
                    const isPredicted = chartData[props.index]?.predicted;
                    return (
                      <circle
                        cx={props.cx}
                        cy={props.cy}
                        r={4}
                        stroke={isPredicted ? "#f59e0b" : "#6366f1"}
                        strokeWidth={2}
                        fill="#fff"
                      />
                    );
                  }}
                  name="Actual"
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
                                                            {/* total */}
          <p>
            <h3>
              Total Amount paid: ₹
              {payments.reduce((total, payment) => {
                const amt = Array.isArray(payment.amount)
                  ? payment.amount.reduce((sum, a) => sum + Number(a), 0)
                  : Number(payment.amount);
                return total + amt;
              }, 0)}
            </h3>
          </p>

          
          <p>
          <ul>
            {payments.map((payment, index) => {
              const paidAmount = Array.isArray(payment.amount)
                ? payment.amount.reduce((sum, amt) => sum + Number(amt), 0)
                : Number(payment.amount);
              const balance = Number(payment.planId.estimateprice) - paidAmount;

              return (
                <li key={index} style={{ marginBottom: "2rem" }}>
                  <p>User: {payment.userId.name}</p>
                  <p>Balance Amount: ₹{balance >= 0 ? balance : 0}</p>
                  <p>
                    Amount Paid:{" "}
                    {Array.isArray(payment.amount)
                      ? payment.amount.map((a) => `₹${a}`).join(", ")
                      : `₹${payment.amount}`}
                  </p>
                  <p>Currency: {payment.currency}</p>
                  <p>
                    Total Amount to be paid: ₹{payment.planId.estimateprice}
                  </p>
                  <p>
                    Completed Stages:{" "}
                    {Array.isArray(payment.stages)
                      ? payment.stages.join(", ")
                      : payment.stages}
                  </p>
                  <p>Verified: {payment.isVerified ? "Yes" : "No"}</p>
                  <p>
                    Last payment done at:{" "}
                    {payment.createdAt
                      ? new Date(payment.createdAt).toLocaleString()
                      : "N/A"}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter report"
                      value={reports[payment._id] || ""}
                      onChange={(e) =>
                        handleReportChange(payment._id, e.target.value)
                      }
                      style={{ marginRight: "10px", flex: 1, padding: "6px" }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => handleReportSubmit(payment._id)}
                    >
                      Submit Report
                    </button>
                  </div>

                  <hr />
                </li>
              );
            })}
          </ul>
          </p>
        </>
      ) : (
        <p>No payment records found.</p>
      )}
    </div>
  );
}

export default PaymentView;

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentDetails() {
  const [auth, setAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("yourstorage"));
    } catch {
      return null;
    }
  });

  const [payments, setPayments] = useState([]);
  const [reports, setReports] = useState({});

  useEffect(() => {
    if (auth?.userid) {
      fetchPayments();
    }
  }, [auth]);

  const fetchPayments = async () => {
    try {
      const param = { consultantId: auth.userid };
      const response = await axios.post("http://localhost:4000/api/payment/viewpayment", param);
      const data = response.data || [];
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments", error);
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
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">CHAT</h2>

      {Array.isArray(payments) && payments.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {payments.map((payment, index) => {
            const paidAmount = Array.isArray(payment.amount)
              ? payment.amount.reduce((sum, amt) => sum + Number(amt), 0)
              : Number(payment.amount);
            const balance = Number(payment.planId?.estimateprice || 0) - paidAmount;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all"
              >
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>User:</strong> {payment.userId?.name || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Total Amount:</strong> ₹{payment.planId?.estimateprice || 0}
                  </p>
                  <p className="text-gray-700">
                    <strong>Paid:</strong>{" "}
                    {Array.isArray(payment.amount)
                      ? payment.amount.map((a) => `₹${a}`).join(", ")
                      : `₹${payment.amount}`}
                  </p>
                  <p className="text-gray-700">
                    <strong>Balance:</strong> ₹{balance >= 0 ? balance : 0}
                  </p>
                  <p className="text-gray-700">
                    <strong>Currency:</strong> {payment.currency}
                  </p>
                  <p className="text-gray-700">
                    <strong>Completed Stages:</strong>{" "}
                    {Array.isArray(payment.stages)
                      ? payment.stages.join(", ")
                      : payment.stages}
                  </p>
                  <p className="text-gray-700">
                    <strong>Verified:</strong> {payment.isVerified ? "✅ Yes" : "❌ No"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <strong>Last Payment:</strong>{" "}
                    {payment.createdAt
                      ? new Date(payment.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter report message"
                    value={reports[payment._id] || ""}
                    onChange={(e) =>
                      handleReportChange(payment._id, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleReportSubmit(payment._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm transition"
                  >
                    Send
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600">No payment records found.</p>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import Navebar from "./Navebar";
import { FaCheckCircle } from "react-icons/fa";

const PaymenFortPlan = () => {
  const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")));
  const [payments, setPayments] = useState([]);
   const [view, setView] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/consultant/getassinged",
        { params: { userid: auth.userid } }
      );

      const updatedPlans = await Promise.all(
        response.data.map(async (plan) => {
          try {
            const res = await axios.post(
              "http://localhost:4000/api/payment/verifyPayment",
              { userId: auth.userid, planId: plan._id }
            );
            return { ...plan, paymentsMade: res.data.paidStages || [] };
          } catch {
            return { ...plan, paymentsMade: [] };
          }
        })
      );



      setPayments(updatedPlans);
    } catch (err) {
      console.error("Failed to fetch payments", err);
    }
  };

  const handlePay = async (
    planId,
    stage,
    amount,
    consultantName,
    consultantId
  ) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/payment/orders",
        { amount }
      );
      initPay(data.data, consultantName, planId, stage, consultantId);
    } catch (err) {
      console.error("Failed to initiate payment", err);
    }
  };

   useEffect(() => {
    fetch('http://localhost:4000/consultant/viemyplans', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ uid: auth.userid }),
    })
      .then(res => res.json())
      .then(setView)
      .catch(err => console.error('Error fetching plans:', err));
  }, []);

  
  const initPay = (data, consultantName, planId, stage, consultantId) => {
    const options = {
      key: "rzp_test_4Ex6Tyjkp79GFy",
      amount: data.amount,
      currency: data.currency,
      name: consultantName,
      description: "Building Plan Payment",
      order_id: data.id,
      handler: async (response) => {
        try {
          await axios.post("http://localhost:4000/api/payment/verify", {
            razorpay_orderID: response.razorpay_order_id,
            razorpay_paymentID: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId: auth.userid,
            consultantId,
            planId,
            stage,
            amount: data.amount / 100,
          });

          alert("Payment Successful");
          setPayments((prev) =>
            prev.map((p) =>
              p._id === planId
                ? { ...p, paymentsMade: [...(p.paymentsMade || []), stage] }
                : p
            )
          );
        } catch (err) {
          console.error("Payment verification failed", err);
        }
      },
      theme: { color: "#3C4CD0" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const calculateBalance = (estimate, stages) => {
    const total = parseFloat(estimate);
    const paid = stages.reduce((sum, stage) => {
      if (stage === 1) return sum + total * 0.2;
      if (stage === 2) return sum + total * 0.35;
      if (stage === 3) return sum + total * 0.45;
      return sum;
    }, 0);
    return (total - paid).toFixed(2);
  };

  return (
    <>
      <Navebar />
      <div className="container" style={{ paddingTop: "120px" }}>
        <div className="card shadow-lg rounded-4 p-4 mb-5">
          <h2 className="text-center text-primary mb-4">Payment Management</h2>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="table-primary text-center">
                <tr>
                  <th>Consultant Name</th>
                  <th>plan</th>
                  <th>Estimate Price</th>
                  <th>Staged Payments</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody className="text-center align-middle">

               {view.map((user, index) => (
          
            <div>
              {user.name && <div >{user.name}</div>}

             

            </div>
          
        ))}

                {payments.map((item, idx) => {
                  const total = parseFloat(item.estimateprice);
                  const paidStages = item.paymentsMade || [];

                  return (
                    <tr key={idx}>
                      <td>{item.consultid?.name}</td>
                      <td>{item.planId?.name}</td>
                       <td>₹{item.estimateprice}</td>
                      <td>
                        {paidStages.length === 3 ? (
                          <span className="badge bg-success fs-6">
                            <FaCheckCircle className="me-1" />
                            Completed
                          </span>
                        ) : (
                          [1, 2, 3].map((stage, i) => {
                            const config = [
                              { label: "20%", value: 0.2 },
                              { label: "35%", value: 0.35 },
                              { label: "45%", value: 0.45 },
                            ][i];

                            const isPaid = paidStages.includes(stage);
                            const prevPaid =
                              stage === 1 || paidStages.includes(stage - 1);
                            const isNext = !isPaid &&
                              prevPaid &&
                              Math.min(
                                ...[1, 2, 3].filter(
                                  (s) => !paidStages.includes(s)
                                )
                              ) === stage;

                            return !isPaid ? (
                              <button
                                key={stage}
                                className={`btn btn-sm me-2 mb-2 ${
                                  isNext
                                    ? "btn-outline-success"
                                    : "btn-outline-secondary"
                                }`}
                                disabled={!isNext}
                                onClick={() =>
                                  handlePay(
                                    item._id,
                                    stage,
                                    config.value * total,
                                    item.consultid?.name,
                                    item.consultid?._id
                                  )
                                }
                              >
                                ₹{(config.value * total).toFixed(2)} (
                                {config.label})
                              </button>
                            ) : null;
                          })
                        )}
                      </td>
                      <td>
                        <strong>₹{calculateBalance(item.estimateprice, paidStages)}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymenFortPlan;



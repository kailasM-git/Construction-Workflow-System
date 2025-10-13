import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, FileText } from "lucide-react";
import url from "../user/ImageUrl";

export default function UserPlanConsultView() {
  const { userid } = useParams();
  const [plans, setPlans] = useState([]);
  const [estimatedPrices, setEstimatedPrices] = useState({});
  const [estimatesList, setEstimatesList] = useState({});
  const auth = JSON.parse(localStorage.getItem("yourstorage"));
  const consultid = auth?.userid;

  useEffect(() => {
    fetch("http://localhost:4000/consultant/userplanview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: userid }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPlans(data);
        data.forEach(plan => fetchEstimates(plan._id));
      })
      .catch((err) => console.error("Error fetching user plans:", err));
  }, [userid]);

  const fetchEstimates = (planId) => {
    fetch("http://localhost:4000/consultant/get-estimatesbyconsult", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEstimatesList((prev) => ({ ...prev, [planId]: data }));
      })
      .catch((err) => {
        console.error(`Error fetching estimates for plan ${planId}:`, err);
        setEstimatesList((prev) => ({ ...prev, [planId]: [] }));
      });
  };

  const handlePriceChange = (planId, value) => {
    setEstimatedPrices((prev) => ({
      ...prev,
      [planId]: value,
    }));
  };

  const handleSubmit = (planId) => {
    const price = estimatedPrices[planId];
    const userid = plans.find(p => p._id === planId)?.uid;

    if (!price) return alert("Please enter an estimated price.");

    fetch("http://localhost:4000/consultant/save-estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId, estimatedPrice: price, consultid, userid }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Estimated price saved!");
        fetchEstimates(planId);
        setEstimatedPrices((prev) => ({ ...prev, [planId]: "" }));
      })
      .catch(() => alert("Failed to save estimated price."));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    }),
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📄 User Plans</h2>

      {plans.length === 0 ? (
        <p className="text-gray-600">No plans found for this user.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan, i) => {
            const estimates = estimatesList[plan._id] || [];
            const hasSubmitted = estimates.some(e => e.consultid === consultid);
            const assigned = estimates.find(e => e.status === 1 || e.status === "1");

            return (
              <motion.div
                key={plan._id}
                className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all"
                variants={cardVariants}
                initial="hidden"
                animate="show"
                custom={i}
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-700">
                    {plan.buildingname || "Unnamed Plan"}
                  </h3>

                  <p className="text-sm text-gray-500">{plan.category}</p>
                  <p><strong>Location:</strong> {plan.location}</p>
                  <p><strong>Estimated Cost:</strong> ₹{plan.estimatecost || plan.vestimatecost || plan.roadestimatecost}</p>
                  <p><strong>Time:</strong> {plan.estimatetime || plan.vestimatetime || plan.roadestimatetime}</p>
                  <p><strong>Total Area:</strong> {plan.totalarea || plan.vtotalarea}</p>

                  {plan.image && (
                    <img src={url + plan.image} alt="Plan" className="w-full h-48 object-cover rounded-xl mt-3" />
                  )}
                  {plan.vimage && (
                    <img src={url + plan.vimage} alt="Villa" className="w-full h-48 object-cover rounded-xl mt-3" />
                  )}
                  {plan.roadimage && (
                    <img src={url + plan.roadimage} alt="Road" className="w-full h-48 object-cover rounded-xl mt-3" />
                  )}

                  {/* Document Preview */}
                  {["landpaper", "landpapervilla"].map((doc) => plan[doc] && (
                    <div key={doc} className="mt-3">
                      <div className="flex items-center gap-2 text-blue-600 text-sm">
                        <FileText className="w-4 h-4" />
                        <a href={url + plan[doc]} target="_blank" rel="noreferrer">
                          {plan[doc].endsWith(".pdf") ? "View PDF" : "View Image"}
                        </a>
                      </div>
                    </div>
                  ))}

                  {/* Estimate Section */}
                  <div className="mt-4 space-y-2">
                    {assigned ? (
                      <div className="bg-green-100 p-3 rounded-lg text-green-800">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Assigned Estimate</span>
                          <BadgeCheck className="w-5 h-5" />
                        </div>
                        <p className="text-sm">₹{assigned.estimateprice}</p>
                        <p className="text-xs">Consultant: {assigned.consultid?.name || assigned.consultancyName}</p>
                      </div>
                    ) : !hasSubmitted ? (
                      <>
                        <input
                          type="number"
                          placeholder="Enter price"
                          value={estimatedPrices[plan._id] || ""}
                          onChange={(e) => handlePriceChange(plan._id, e.target.value)}
                          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => handleSubmit(plan._id)}
                          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                          Save Estimated Price
                        </button>
                      </>
                    ) : null}
                  </div>

                  {/* List Other Estimates */}
                  {estimates.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-600">All Estimates</h4>
                      <ul className="text-sm text-gray-500 space-y-1 mt-1">
                        {estimates.map((est, idx) => (
                          <li key={idx}>
                            {est.consultancyName}: ₹{est.estimateprice}
                            {est.status === 1 || est.status === "1" ? (
                              <span className="text-green-600 font-medium ml-2">(Assigned)</span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

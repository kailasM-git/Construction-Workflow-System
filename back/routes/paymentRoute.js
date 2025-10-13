// const router = require("express").Router();
// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const Payment = require("../model/payment.model");
// //Creating Order
// router.post("/orders", async (req, res) => {
//   try {
//     const instance = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     const options = {
//       amount: req.body.amount * 100,
//       currency: "INR",
//       receipt: crypto.randomBytes(10).toString("hex"),
//     };
//     instance.orders.create(options, (error, order) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Something Went Wrong!" });
//       }
//       res.status(200).json({ data: order });
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error!" });
//   }
// });

// //Verifying the payment
// router.post("/verify", async (req, res) => {
//   try {
//     const {
//       razorpay_orderID,
//       razorpay_paymentID,
//       razorpay_signature,
//       userId,
//       consultantId,
//       planId,
//       stage,
//       amount,
//     } = req.body;

//     // Step 1: Verify payment signature
//     const sign = razorpay_orderID + "|" + razorpay_paymentID;
//     const expectedSign = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(sign)
//       .digest("hex");

//     const isVerified = razorpay_signature === expectedSign;

//     if (!isVerified) {
//       return res.status(400).json({ message: "Payment signature mismatch" });
//     }

//     // Step 2: Save or update payment
//     const existing = await Payment.findOne({ planId });

//     if (existing) {
//       // Update by adding new stage payment if not already present
//       if (!existing.stages) existing.stages = [];
//       if (!existing.amount) existing.amount = [];
//       if (!existing.stages.includes(stage)) {
//         existing.stages.push(stage);
//         existing.updatedAt = new Date();
//       }
//       if (!existing.amount.includes(amount)) {
//         existing.amount.push(amount);
//         existing.updatedAt = new Date();
//       }

//       await existing.save();
//     } else {
//       const payment = new Payment({
//         userId,
//         consultantId,
//         planId,
//         stage,
//         amount,
//         stages: [stage],
//         razorpay_order_id: razorpay_orderID,
//         razorpay_payment_id: razorpay_paymentID,
//         razorpay_signature,
//         isVerified: true,
//         status:1,
//         balance,
//       });

//       await payment.save();
//     }

//     return res
//       .status(200)
//       .json({ message: "Payment verified and saved successfully" });
//   } catch (error) {
//     console.error("Payment verification error:", error);
//     res.status(500).json({ message: "Internal Server Error!" });
//   }
// });

// router.post("/verifyPayment", async (req, res) => {
//   const { userId, planId } = req.body;

//   try {
//     const payments = await Payment.find({
//       userId,
//       planId,
//       isVerified: true,
//     });

//     const paidStages = payments.flatMap((p) => p.stages || []);

//     res.json({ paidStages });
//   } catch (error) {
//     console.error("Error verifying payment:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.post("/viewpayment", async (req, res) => {
//   try {
//     const { consultantId } = req.body;
//     const response = await Payment.find({ consultantId })
//       .populate("userId")
//       .populate("planId");

//     // .populate("planId"); // optional populate

//     if (!response) {
//       return res.status(404).json({ message: "No payment found" });
//     }

//     res.status(200).json(response);
//   } catch (error) {
//     console.error("Error fetching payment:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;

const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../model/payment.model");
//Creating Order
router.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

//Verifying the payment
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_orderID,
      razorpay_paymentID,
      razorpay_signature,
      userId,
      consultantId,
      planId,
      stage,
      amount,
    } = req.body;

    // Step 1: Verify payment signature
    const sign = razorpay_orderID + "|" + razorpay_paymentID;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    const isVerified = razorpay_signature === expectedSign;

    if (!isVerified) {
      return res.status(400).json({ message: "Payment signature mismatch" });
    }

    // Step 2: Save or update payment
    const existing = await Payment.findOne({ planId });

    if (existing) {
      // Update by adding new stage payment if not already present
      if (!existing.stages) existing.stages = [];
      if (!existing.amount) existing.amount = [];
      if (!existing.stages.includes(stage)) {
        existing.stages.push(stage);
        existing.updatedAt = new Date();
      }
      if (!existing.amount.includes(amount)) {
        existing.amount.push(amount);
        existing.updatedAt = new Date();
      }

      await existing.save();
    } else {
      const payment = new Payment({
        userId,
        consultantId,
        planId,
        stage,
        amount,
        stages: [stage],
        razorpay_order_id: razorpay_orderID,
        razorpay_payment_id: razorpay_paymentID,
        razorpay_signature,
        isVerified: true,
      });

      await payment.save();
    }

    return res
      .status(200)
      .json({ message: "Payment verified and saved successfully" });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.post("/verifyPayment", async (req, res) => {
  const { userId, planId } = req.body;

  try {
    const payments = await Payment.find({
      userId,
      planId,
      isVerified: true,
    });

    const paidStages = payments.flatMap((p) => p.stages || []);

    res.json({ paidStages });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/viewpayment", async (req, res) => {
  try {
    const { consultantId } = req.body;
    const response = await Payment.find({ consultantId })
      .populate("userId")
      .populate("planId");

    if (!response) {
      return res.status(404).json({ message: "No payment found" });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/userPayment", async (req, res) => {
  try {
    const { userId } = req.body;
    const response = await Payment.find({ userId })
      .populate("userId")
      .populate("planId");

    // .populate("planId"); // optional populate

    if (!response) {
      return res.status(404).json({ message: "No payment found" });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/addreport", async (req, res) => {
  const { paymentId, report } = req.body;
  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.report = report; // or payment.reports.push(report) if storing multiple
    await payment.save();

    res.json({ message: "Report saved successfully" });
  } catch (error) {
    console.error("Error saving report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

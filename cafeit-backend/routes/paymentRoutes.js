import express from "express";
import Razorpay from "razorpay";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create order endpoint
router.post("/order", async (req, res) => {
  const { amount, currency } = req.body;
  const options = { amount, currency, receipt: "receipt#1" };
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// ✅ Verify payment (optional)
router.post("/verify", async (req, res) => {
  // TODO: verify signature here
  res.json({ status: "ok" });
});

export default router;

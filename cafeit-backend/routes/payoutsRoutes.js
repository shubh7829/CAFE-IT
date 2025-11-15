import express from "express";
import Payout from "../models/Payout.js";

const router = express.Router();
router.post("/", authMiddleware, async (req,res) => {
  if(req.userRole !== "restaurant") return res.status(403).json({msg:"Forbidden"});
  const { amount, method } = req.body;
  const p = await Payout.create({ restaurantId: req.userId, amount, method });
  res.status(201).json(p);
});
router.get("/", authMiddleware, async (req,res) => {
  if(req.userRole === "restaurant") {
    const list = await Payout.find({ restaurantId: req.userId });
    return res.json(list);
  }
  // for admin: list all
  const list = await Payout.find();
  res.json(list);
});
export default router;

import express from "express";
import Coupon from "../models/Coupon.js";

const router = express.Router();
router.post("/", authMiddleware, async (req,res)=> {
  // admin or restaurant create coupon
  const { code, discountPercent, maxDiscount, validFrom, validTill } = req.body;
  const c = await Coupon.create({ code, discountPercent, maxDiscount, validFrom, validTill });
  res.status(201).json(c);
});

router.get("/validate/:code", async (req,res) => {
  const c = await Coupon.findOne({ code: req.params.code, active: true });
  if(!c) return res.status(404).json({ message: "Invalid coupon" });
  const now = new Date();
  if(c.validFrom && now < c.validFrom) return res.status(400).json({ message: "Not active yet" });
  if(c.validTill && now > c.validTill) return res.status(400).json({ message: "Expired" });
  res.json(c);
});
export default router;

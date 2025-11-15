import express from "express";
import Staff from "../models/Staff.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Add staff
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.userRole !== "restaurant") {
      return res.status(403).json({ msg: "Forbidden" });
    }

    const staff = await Staff.create({
      ...req.body,
      restaurantId: req.userId,
    });

    res.status(201).json(staff);
  } catch (err) {
    console.error("Error adding staff:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ List staff for restaurant
router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.userRole !== "restaurant") {
      return res.status(403).json({ msg: "Forbidden" });
    }

    const staff = await Staff.find({ restaurantId: req.userId });
    res.json(staff);
  } catch (err) {
    console.error("Error fetching staff:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;

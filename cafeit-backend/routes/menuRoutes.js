import express from "express";
import MenuItem from "../models/MenuItem.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create menu item (restaurant only)
router.post("/", authMiddleware, async (req,res) => {
  // authMiddleware must set req.userId and req.userRole
  if(req.userRole !== "restaurant") return res.status(403).json({msg:"Forbidden"});
  const data = { ...req.body, restaurantId: req.userId };
  const item = await MenuItem.create(data);
  res.status(201).json(item);
});

// Update / Delete similar (check restaurant owner)
router.get("/restaurant/:id", async (req,res) => {
  const items = await MenuItem.find({ restaurantId: req.params.id });
  res.json(items);
});

// Filter endpoint example:
// GET /api/menu/search?query=latte&category=Coffee&min=50&max=300
router.get("/search", async (req,res) => {
  const { query, category, min, max } = req.query;
  const q = {};
  if(query) q.title = { $regex: query, $options: "i" };
  if(category) q.category = category;
  if(min || max) q.price = {};
  if(min) q.price.$gte = Number(min);
  if(max) q.price.$lte = Number(max);
  const items = await MenuItem.find(q);
  res.json(items);
});

export default router;

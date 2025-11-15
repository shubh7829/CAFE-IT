import express from "express";
import Transaction from "../models/Transaction.js";
import json2csv from "json2csv"; // npm install json2csv

const router = express.Router();

router.get("/", async (req,res) => {
  // admin or restaurant can query by restaurantId
  const { restaurantId, from, to } = req.query;
  const q = {};
  if(restaurantId) q.restaurantId = restaurantId;
  if(from || to) q.created_at = {};
  if(from) q.created_at.$gte = new Date(from);
  if(to) q.created_at.$lte = new Date(to);
  const txns = await Transaction.find(q).sort({ created_at: -1 });
  res.json(txns);
});

// Export CSV
router.get("/export", async (req,res) => {
  const txns = await Transaction.find({ /*...filters...*/ }).lean();
  const csv = json2csv.parse(txns);
  res.header("Content-Type", "text/csv");
  res.attachment("transactions.csv");
  res.send(csv);
});
export default router;

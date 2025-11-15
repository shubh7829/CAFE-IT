import mongoose from "mongoose";
const payoutSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  method: String,
  status: { type: String, enum: ["Pending","Paid","Rejected"], default: "Pending" },
  requested_at: { type: Date, default: Date.now },
  paid_at: Date,
  adminNote: String
});
export default mongoose.model("Payout", payoutSchema);

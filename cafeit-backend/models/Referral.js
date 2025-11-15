import mongoose from "mongoose";
const referralSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uses: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});
export default mongoose.model("Referral", referralSchema);

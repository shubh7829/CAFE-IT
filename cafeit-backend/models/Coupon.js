import mongoose from "mongoose";
const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercent: Number,
  maxDiscount: Number,
  active: { type: Boolean, default: true },
  validFrom: Date,
  validTill: Date,
  usageCount: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});
export default mongoose.model("Coupon", couponSchema);

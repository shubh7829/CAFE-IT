import mongoose from "mongoose";
const staffSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  role: String, // Chef, Barista, Waiter
  phone: String,
  rating: { type: Number, default: 0 }, // Average rating
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  profilePic: String,
  email: String,
  joined_at: { type: Date, default: Date.now }
});
export default mongoose.model("Staff", staffSchema);

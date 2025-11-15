import mongoose from "mongoose";
const menuSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  category: { type: String, required: true }, // e.g. Coffee, Tea, Dessert
  description: String,
  price: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  available: { type: Boolean, default: true },
  image : String, // URL to image
  created_at: { type: Date, default: Date.now }
});
export default mongoose.model("MenuItem", menuSchema);

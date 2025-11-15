import mongoose from "mongoose";

const txnSchema = new mongoose.Schema({
  restaurantId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  // For order transactions
  items: [
    {
      menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
      title: { type: String, required: true },
      qty: { type: Number, default: 1 },
      price: { type: Number, required: true }
    }
  ],

  // Payment info
  amount: { type: Number, required: true },
  paymentMethod: { 
    type: String, 
    enum: ["card", "upi", "cash"], 
    default: "card" 
  },

  // Transaction status
  status: { 
    type: String, 
    enum: ["pending", "completed", "failed"], 
    default: "pending" 
  },

  // Extra details if needed
  metadata: { type: Object, default: {} }

}, { timestamps: true }); // auto adds createdAt + updatedAt

export default mongoose.model("Transaction", txnSchema);

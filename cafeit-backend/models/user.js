import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    password: { type: String, required: true }, // hash later
    role: { type: String, enum: ["user", "restaurant","admin"], required: true },
    restaurantName: { type: String },
    address: { type: String },
    profilePic: { String },
    dob: { type: Date },
    referralCode: { type: String },
    refferedBy: { type: String },
    created_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model("User", userSchema);

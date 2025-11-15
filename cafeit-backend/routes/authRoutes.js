import express from "express";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import User from "../models/user.js";
import Referral from "../models/referral.js";

const router = express.Router();

// ✅ Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password, role, restaurantName, address } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (role === "restaurant" && (!restaurantName || !address)) {
      return res.status(400).json({ message: "Restaurant must have name and address" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    // Hash password with Argon2
    const hash = await argon2.hash(password);

    const user = new User({
      name,
      email,
      phone,
      password: hash,
      role,
      restaurantName: role === "restaurant" ? restaurantName : undefined,
      address: role === "restaurant" ? address : undefined,
    });

    await user.save();

    // Create JWT token after signup
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "Signup successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Verify password
    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

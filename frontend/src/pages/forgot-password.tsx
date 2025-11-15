"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Coffee } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      alert("⚠️ Please enter your email!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Password reset link sent to your email!");
      } else {
        alert(`❌ ${data.message || "Failed to send reset link"}`);
      }
    } catch (err) {
      console.error(err);
      alert("🚨 Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex items-center justify-center mb-6">
          <Coffee className="h-8 w-8 text-amber-700" />
          <span className="ml-2 text-2xl font-semibold text-amber-800">
            CAFE'IT
          </span>
        </div>

        <h2 className="text-center text-xl font-bold text-amber-900 mb-4">
          Forgot Your Password?
        </h2>
        <p className="text-center text-sm text-amber-700 mb-6">
          Enter your registered email and we’ll send you a password reset link.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border p-3 mb-4"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-xl bg-amber-700 p-3 text-white hover:bg-amber-800 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="mt-4 text-center text-sm text-amber-700">
          <Link to="/login" className="underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

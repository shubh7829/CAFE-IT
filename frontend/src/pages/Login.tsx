"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Coffee } from "lucide-react";

type AccountType = "user" | "restaurant";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [accountType, setAccountType] = useState<AccountType>("user");
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("⚠️ Please enter both email and password!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, accountType }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Login Successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("accountType", accountType);

        navigate(accountType === "user" ? "/Dashboard" : "/restaurant-dashboard");
      } else {
        alert(`❌ Login Failed: ${data.message || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("🚨 Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex items-center justify-center mb-6">
          <Coffee className="h-8 w-8 text-amber-700" />
          <span className="ml-2 text-2xl font-semibold text-amber-800">
            CAFE'IT
          </span>
        </div>

        <h2 className="text-center text-xl font-bold text-amber-900 mb-4">
          Login to your account
        </h2>

        {/* Account Type Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setAccountType("user")}
            className={`px-4 py-2 rounded-xl ${
              accountType === "user"
                ? "bg-amber-700 text-white"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setAccountType("restaurant")}
            className={`px-4 py-2 rounded-xl ${
              accountType === "restaurant"
                ? "bg-amber-700 text-white"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            Restaurant
          </button>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />

          {/* Forgot Password link */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-amber-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-6 rounded-xl bg-amber-700 p-3 text-white hover:bg-amber-800 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center text-sm text-amber-700">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-medium underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

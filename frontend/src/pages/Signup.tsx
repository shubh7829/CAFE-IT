"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Coffee } from "lucide-react";

type AccountType = "user" | "restaurant" | "admin";

interface UserSignupForm {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface RestaurantSignupForm {
  ownerName: string;
  restaurantName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export default function SignupPage() {
  const [accountType, setAccountType] = useState<AccountType>("user");
  const [userForm, setUserForm] = useState<UserSignupForm>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [restForm, setRestForm] = useState<RestaurantSignupForm>({
    ownerName: "",
    restaurantName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserForm({ ...userForm, [e.target.name]: e.target.value });

  const handleChangeRest = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRestForm({ ...restForm, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    try {
      const endpoint = "http://localhost:5000/api/auth/signup";

      const payload =
        accountType === "user"
          ? {
              name: userForm.name,
              email: userForm.email,
              phone: userForm.phone,
              password: userForm.password,
              role: "user",
            }
          : {
              name: restForm.ownerName,
              email: restForm.email,
              phone: restForm.phone,
              password: restForm.password,
              role: "restaurant",
              // restaurantName and address are currently not stored in the backend model
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Signup failed");
      }

      alert("Signup successful! You can now log in.");
    } catch (error: any) {
      alert(error?.message || "Something went wrong during signup.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex items-center justify-center mb-6">
          <Coffee className="h-8 w-8 text-amber-700" />
          <span className="ml-2 text-2xl font-semibold text-amber-800">CAFE'IT</span>
        </div>

        <h2 className="text-center text-xl font-bold text-amber-900 mb-4">
          Create a new account
        </h2>

        {/* Account Type Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setAccountType("user")}
            className={`px-4 py-2 rounded-xl ${
              accountType === "user" ? "bg-amber-700 text-white" : "bg-amber-100 text-amber-800"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setAccountType("restaurant")}
            className={`px-4 py-2 rounded-xl ${
              accountType === "restaurant" ? "bg-amber-700 text-white" : "bg-amber-100 text-amber-800"
            }`}
          >
            Restaurant
          </button>
        </div>

        {/* User Form */}
        {accountType === "user" ? (
          <div className="space-y-4">
            <input name="name" placeholder="Full Name" value={userForm.name} onChange={handleChangeUser} className="w-full rounded-xl border p-3" />
            <input name="phone" placeholder="Phone Number" value={userForm.phone} onChange={handleChangeUser} className="w-full rounded-xl border p-3" />
            <input name="email" placeholder="Email" value={userForm.email} onChange={handleChangeUser} className="w-full rounded-xl border p-3" />
            <input name="password" type="password" placeholder="Password" value={userForm.password} onChange={handleChangeUser} className="w-full rounded-xl border p-3" />
          </div>
        ) : (
          /* Restaurant Form */
          <div className="space-y-4">
            <input name="ownerName" placeholder="Owner Name" value={restForm.ownerName} onChange={handleChangeRest} className="w-full rounded-xl border p-3" />
            <input name="restaurantName" placeholder="Restaurant Name" value={restForm.restaurantName} onChange={handleChangeRest} className="w-full rounded-xl border p-3" />
            <input name="phone" placeholder="Phone Number" value={restForm.phone} onChange={handleChangeRest} className="w-full rounded-xl border p-3" />
            <input name="email" placeholder="Email" value={restForm.email} onChange={handleChangeRest} className="w-full rounded-xl border p-3" />
            <input name="address" placeholder="Restaurant Address" value={restForm.address} onChange={handleChangeRest} className="w-full rounded-xl border p-3" />
            <input name="password" type="password" placeholder="Password" value={restForm.password} onChange={handleChangeRest} className="w-full rounded-xl border p-3" />
          </div>
        )}

        <button onClick={handleSignup} className="w-full mt-6 rounded-xl bg-amber-700 p-3 text-white hover:bg-amber-800">
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm text-amber-700">
          Already have an account? <Link to="/" className="font-medium underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

export default function ParkingSlotPage(): JSX.Element {
  // Form state
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!vehicleNumber || !vehicleType || !date || !time || !location) {
      toast.error("Please complete all booking details");
      return;
    }

    toast.success("Parking slot reserved successfully!", {
      description: `Vehicle: ${vehicleNumber}, Type: ${vehicleType}, Location: ${location}`,
    });

    // Reset form (optional)
    setVehicleNumber("");
    setVehicleType("");
    setDate("");
    setTime("");
    setLocation("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fefefe] text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-20 px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="max-w-6xl mx-auto mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="list-reset flex">
            <li>
              <a href="/" className="text-amber-600 hover:underline">Home</a>
            </li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-800 font-medium">Parking Reservation</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Smart <span className="text-amber-600">Parking Reservations</span>
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Skip the hassle of circling around! Pre-book your parking slot at your chosen cafe and enjoy a seamless visit every time.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              alt="parking"
              src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop"
              className="w-full h-64 object-cover md:h-96"
            />
          </div>
        </section>

        {/* Booking Form */}
        <section className="max-w-5xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6">Reserve Your Parking Slot</h2>
          <form onSubmit={handleReservation} className="grid gap-4 bg-white p-6 rounded-xl shadow">
            <input
              type="text"
              placeholder="Vehicle Number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="border p-3 rounded-md"
            />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="border p-3 rounded-md"
            >
              <option value="">Vehicle Type</option>
              <option>2-Wheeler</option>
              <option>4-Wheeler</option>
            </select>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-3 rounded-md"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border p-3 rounded-md"
            />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border p-3 rounded-md"
            >
              <option value="">Select Cafe Location</option>
              <option>Cafe Aroma - Downtown</option>
              <option>Mocha Vibes - City Center</option>
              <option>Latte & Lights - Riverside</option>
            </select>
            <button type="submit" className="bg-amber-600 text-white py-3 rounded-md hover:scale-[1.01] transition">
              Reserve Slot
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

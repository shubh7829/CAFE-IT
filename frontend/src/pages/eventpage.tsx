import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function EventPage(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf6] text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-20 px-6 md:px-12">
        {/* Hero */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Plan Memorable <span className="text-amber-600">Events</span> with CAFE'IT
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              From birthdays to business meetups, CAFE'IT makes event planning simple, stylish, and stress-free. 
              Find the perfect cafe, customize your needs, and let us handle the rest.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              alt="event"
              src="https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1200&auto=format&fit=crop"
              className="w-full h-64 object-cover md:h-96"
            />
          </div>
        </section>

        {/* Booking Form */}
        <section className="max-w-5xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6">Book Your Event</h2>
          <form className="grid gap-4 bg-white p-6 rounded-xl shadow">
            <input type="text" placeholder="Event Title" className="border p-3 rounded-md" />
            <input type="date" className="border p-3 rounded-md" />
            <input type="time" className="border p-3 rounded-md" />
            <select className="border p-3 rounded-md">
              <option>Select Cafe Venue</option>
              <option>Cafe Aroma</option>
              <option>Mocha Vibes</option>
              <option>Latte & Lights</option>
            </select>
            <textarea placeholder="Special Requests (Decor, Music, Catering)" className="border p-3 rounded-md"></textarea>
            <button className="bg-amber-600 text-white py-3 rounded-md hover:scale-[1.01] transition">
              Book Event
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

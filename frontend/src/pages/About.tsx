import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AboutCafeIt(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf6] text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-20 px-6 md:px-12">
        {/* Breadcrumb (Optional) */}
        <nav className="max-w-6xl mx-auto mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="list-reset flex">
            <li>
              <a href="/" className="text-amber-600 hover:underline">Home</a>
            </li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-800 font-medium">About CAFE'IT</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Welcome to <span className="text-amber-600">CAFE'IT</span>
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Where cozy corners meet exceptional coffee and easy bookings. We connect you with the best cafés and restaurants for every mood — study, date, meetup, or celebration.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="p-3 bg-white/80 rounded-lg shadow-sm">Real-time seat availability</li>
              <li className="p-3 bg-white/80 rounded-lg shadow-sm">Instant table & event bookings</li>
              <li className="p-3 bg-white/80 rounded-lg shadow-sm">Menu previews & photos</li>
              <li className="p-3 bg-white/80 rounded-lg shadow-sm">Secure payments & receipts</li>
            </ul>

            <div className="mt-6 flex gap-4">
              <a href="/book" className="inline-block px-5 py-3 bg-amber-600 text-white rounded-lg shadow hover:scale-[1.01] transition">Book a Table</a>
              <a href="/explore" className="inline-block px-5 py-3 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition">Explore Cafés</a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img alt="cozy cafe" src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop" className="w-full h-64 object-cover md:h-96" />
          </div>
        </section>

        {/* Mission & Values */}
        <section className="max-w-6xl mx-auto mt-12 grid gap-8 md:grid-cols-3">
          <article className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold text-xl">Our Mission</h3>
            <p className="mt-3 text-sm text-gray-600">To make discovering and booking the perfect cafe effortless — one warm cup and happy customer at a time.</p>
          </article>

          <article className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold text-xl">What We Value</h3>
            <p className="mt-3 text-sm text-gray-600">Local flavors, great ambience, fairness to small businesses, and delightful user experiences.</p>
          </article>

          <article className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold text-xl">How It Works</h3>
            <ol className="mt-3 text-sm text-gray-600 list-decimal list-inside space-y-2">
              <li>Search cafés by location, vibe, or cuisine.</li>
              <li>View live availability and menus.</li>
              <li>Reserve instantly and receive digital confirmation.</li>
            </ol>
          </article>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto mt-12">
          <h2 className="text-2xl font-bold">Features that make CAFE'IT special</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Live Availability", desc: "Know when a cafe is busy or free." },
              { title: "Event Creation", desc: "Plan birthdays, meetups, study groups." },
              { title: "Smart Recommendations", desc: "Personalized picks based on your mood." },
              { title: "Secure Payments", desc: "Multiple payment options and receipts." },
            ].map((f) => (
              <div key={f.title} className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold">{f.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-center">What people say</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { name: "Yana", text: "Found the perfect cosy study spot — 10/10!" },
              { name: "Ravi", text: "Easy booking and great offers for students." },
              { name: "Meera", text: "I hosted my birthday through CAFE'IT and it was flawless." },
            ].map((t) => (
              <blockquote key={t.name} className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-700">“{t.text}”</p>
                <footer className="mt-3 text-xs text-gray-500">— {t.name}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Team + CTA */}
        <section className="max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold">Meet the team</h3>
            <p className="mt-3 text-sm text-gray-600">A small team of product lovers, coffee enthusiasts and devs building experiences for people who love good food and great company.</p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Shubh", role: "Founder" },
                { name: "Anya", role: "Product" },
                { name: "Karan", role: "Engineering" },
              ].map((m) => (
                <li key={m.name} className="text-sm text-gray-700">
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-xs text-gray-500">{m.role}</div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="bg-amber-50 p-6 rounded-2xl shadow text-center">
            <h4 className="font-semibold">Ready to discover?</h4>
            <p className="mt-3 text-sm text-gray-600">Join thousands of cafe lovers. Get special launch offers and priority booking.</p>
            <a href="/signup" className="mt-4 inline-block px-4 py-2 bg-amber-600 text-white rounded-lg">Create Account</a>
          </aside>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

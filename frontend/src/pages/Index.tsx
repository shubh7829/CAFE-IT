
import React from 'react';
import { ArrowRight, Coffee, Calendar, MapPin, Calculator, ChefHat, Car, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-6 bg-gradient-to-b from-cafeit-beige-50 to-cafeit-beige-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-3 py-1 rounded-full bg-cafeit-beige-200 text-cafeit-accent-terracotta text-sm font-medium">
                Simplify Your Experience
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-cafeit-beige-900 leading-tight">
                Book, Create, Park <br />
                <span className="text-cafeit-accent-terracotta">All in One Place</span>
              </h1>
              <p className="text-lg text-cafeit-beige-800 max-w-xl">
                CAFE'IT streamlines restaurant bookings, event planning, and parking reservations with our elegant platform designed for modern convenience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/bookings" className="btn-primary">
                  Make a Reservation
                </Link>
                <Link to="/about" className="btn-outline">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in animate-delay-300">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1000&auto=format&fit=crop" 
                  alt="CAFE'IT Experience" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-2xl overflow-hidden shadow-xl animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1000&auto=format&fit=crop" 
                  alt="Cafe Experience" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-2xl overflow-hidden shadow-xl animate-float animate-delay-200">
                <img 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop" 
                  alt="Cafe Experience" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-cafeit-beige-900 mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-cafeit-beige-700 max-w-2xl mx-auto">
              CAFE'IT offers a comprehensive suite of features designed to enhance your dining and event experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-cafeit-beige-100 flex items-center justify-center mb-6">
                <Coffee className="w-6 h-6 text-cafeit-accent-terracotta" />
              </div>
              <h3 className="text-xl font-serif font-bold text-cafeit-beige-900 mb-3">
                Restaurant Bookings
              </h3>
              <p className="text-cafeit-beige-700 mb-6">
                Easily reserve tables at your favorite restaurants with our intuitive booking system.
              </p>
              <Link to="/bookings" className="inline-flex items-center text-cafeit-accent-terracotta hover:text-cafeit-accent-terracotta/80">
                <span className="mr-2">Make a Reservation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-cafeit-beige-100 flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-cafeit-accent-terracotta" />
              </div>
              <h3 className="text-xl font-serif font-bold text-cafeit-beige-900 mb-3">
                Event Creation
              </h3>
              <p className="text-cafeit-beige-700 mb-6">
                Plan and organize events with our comprehensive event management tools.
              </p>
              <Link to="/events" className="inline-flex items-center text-cafeit-accent-terracotta hover:text-cafeit-accent-terracotta/80">
                <span className="mr-2">Create an Event</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-cafeit-beige-100 flex items-center justify-center mb-6">
                <Car className="w-6 h-6 text-cafeit-accent-terracotta" />
              </div>
              <h3 className="text-xl font-serif font-bold text-cafeit-beige-900 mb-3">
                Parking Reservations
              </h3>
              <p className="text-cafeit-beige-700 mb-6">
                Reserve parking spots in advance to ensure a seamless experience.
              </p>
              <Link to="/parking" className="inline-flex items-center text-cafeit-accent-terracotta hover:text-cafeit-accent-terracotta/80">
                <span className="mr-2">Reserve Parking</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-cafeit-beige-100 flex items-center justify-center mb-6">
                <Calculator className="w-6 h-6 text-cafeit-accent-terracotta" />
              </div>
              <h3 className="text-xl font-serif font-bold text-cafeit-beige-900 mb-3">
                Cost Calculator
              </h3>
              <p className="text-cafeit-beige-700 mb-6">
                Estimate your expenses with our simple and accurate cost calculator.
              </p>
              <Link to="/calculator" className="inline-flex items-center text-cafeit-accent-terracotta hover:text-cafeit-accent-terracotta/80">
                <span className="mr-2">Calculate Costs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Feature 5 */}
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-cafeit-beige-100 flex items-center justify-center mb-6">
                <ChefHat className="w-6 h-6 text-cafeit-accent-terracotta" />
              </div>
              <h3 className="text-xl font-serif font-bold text-cafeit-beige-900 mb-3">
                User Profiles
              </h3>
              <p className="text-cafeit-beige-700 mb-6">
                Manage your preferences, bookings, and history from your personalized dashboard.
              </p>
              <Link to="/profile" className="inline-flex items-center text-cafeit-accent-terracotta hover:text-cafeit-accent-terracotta/80">
                <span className="mr-2">View Your Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Feature 6 */}
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-cafeit-beige-100 flex items-center justify-center mb-6">
                <Map className="w-6 h-6 text-cafeit-accent-terracotta" />
              </div>
              <h3 className="text-xl font-serif font-bold text-cafeit-beige-900 mb-3">
                Real-time Tracking
              </h3>
              <p className="text-cafeit-beige-700 mb-6">
                Track routes, receive alerts, and plan your journey with our interactive map.
              </p>
              <Link to="/tracking" className="inline-flex items-center text-cafeit-accent-terracotta hover:text-cafeit-accent-terracotta/80">
                <span className="mr-2">Explore Tracking</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-cafeit-beige-100">
        <div className="container mx-auto">
          <div className="rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cafeit-accent-terracotta/90 to-cafeit-accent-terracotta/70"></div>
            <img 
              src="https://images.unsplash.com/photo-1482275548304-a58859dc31b7?q=80&w=1000&auto=format&fit=crop" 
              alt="CAFE'IT Experience" 
              className="w-full h-full object-cover"
            />
            <div className="relative p-12 md:p-20 text-white">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 max-w-xl">
                Ready to Enhance Your Dining Experience?
              </h2>
              <p className="text-white/90 mb-8 max-w-xl">
                Join CAFE'IT today and discover a new way to book restaurants, create events, and reserve parking spaces.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/bookings" className="px-6 py-3 bg-white text-cafeit-accent-terracotta font-medium rounded-full hover:bg-opacity-90 transition-colors inline-block text-center">
                  Get Started Now
                </Link>
                <Link to="/about" className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors inline-block text-center">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-cafeit-beige-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-cafeit-beige-700 max-w-2xl mx-auto">
              Hear from people who have transformed their dining and event experiences with CAFE'IT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-cafeit-beige-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://randomuser.me/api/portraits/women/12.jpg" 
                    alt="Sarah Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-cafeit-beige-900">Sarah Johnson</h4>
                  <p className="text-cafeit-beige-600 text-sm">Regular User</p>
                </div>
              </div>
              <p className="text-cafeit-beige-700 italic">
                "CAFE'IT has made restaurant bookings so easy! I love being able to reserve a table and parking in one go. The interface is beautiful and intuitive."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-cafeit-beige-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Michael Chen" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-cafeit-beige-900">Michael Chen</h4>
                  <p className="text-cafeit-beige-600 text-sm">Event Planner</p>
                </div>
              </div>
              <p className="text-cafeit-beige-700 italic">
                "As an event planner, CAFE'IT has revolutionized how I organize corporate gatherings. The event creation tools are comprehensive yet simple to use."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-cafeit-beige-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://randomuser.me/api/portraits/women/68.jpg" 
                    alt="Emily Rodriguez" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-cafeit-beige-900">Emily Rodriguez</h4>
                  <p className="text-cafeit-beige-600 text-sm">Restaurant Owner</p>
                </div>
              </div>
              <p className="text-cafeit-beige-700 italic">
                "CAFE'IT has helped my restaurant increase bookings by 30%. The system is reliable, and my customers appreciate the seamless experience it provides."
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

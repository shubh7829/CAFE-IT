
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cafeit-beige-900 text-cafeit-beige-100 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and description */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img 
                src="/lovable-uploads/3a88150b-7487-4cb3-af28-1c15f2366cc2.png" 
                alt="CAFE'IT Logo" 
                className="h-12"
              />
            </Link>
            <p className="text-cafeit-beige-200 mb-6">
              Simplifying restaurant bookings, event planning, and parking reservations with modern technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cafeit-beige-100 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/cafeit305/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-cafeit-beige-100 hover:text-white transition-colors"
                >
                 <Instagram className="w-5 h-5" />
              </a>

              <a href="#" className="text-cafeit-beige-100 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-serif text-xl mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-cafeit-beige-200 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/bookings" className="text-cafeit-beige-200 hover:text-white transition-colors">Bookings</Link>
              </li>
              <li>
                <Link to="/events" className="text-cafeit-beige-200 hover:text-white transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/parking" className="text-cafeit-beige-200 hover:text-white transition-colors">Parking</Link>
              </li>
              <li>
                <Link to="/about" className="text-cafeit-beige-200 hover:text-white transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-serif text-xl mb-5">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/bookings" className="text-cafeit-beige-200 hover:text-white transition-colors">Restaurant Booking</Link>
              </li>
              <li>
                <Link to="/events" className="text-cafeit-beige-200 hover:text-white transition-colors">Event Creation</Link>
              </li>
              <li>
                <Link to="/parking" className="text-cafeit-beige-200 hover:text-white transition-colors">Parking Reservation</Link>
              </li>
              <li>
                <Link to="/calculator" className="text-cafeit-beige-200 hover:text-white transition-colors">Cost Calculator</Link>
              </li>
              <li>
                <Link to="/tracking" className="text-cafeit-beige-200 hover:text-white transition-colors">Route Planning</Link>
              </li>
            </ul>
          </div>

          {/* Contact information */}
          <div>
            <h3 className="text-white font-serif text-xl mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-cafeit-accent-terracotta shrink-0 mt-0.5" />
                <span className="text-cafeit-beige-200">
                  cafe'it , vadodara (390019)
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-cafeit-accent-terracotta shrink-0" />
                <span className="text-cafeit-beige-200">+91 9104665922</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-cafeit-accent-terracotta shrink-0" />
                <span className="text-cafeit-beige-200">cafeit305@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cafeit-beige-800 mt-12 pt-8 text-center text-cafeit-beige-300">
          <p>© {new Date().getFullYear()} CAFE'IT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

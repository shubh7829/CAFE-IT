
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Coffee } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 items-center justify-center bg-cafeit-beige-50 px-4 pt-20">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <img 
              src="/lovable-uploads/3a88150b-7487-4cb3-af28-1c15f2366cc2.png" 
              alt="CAFE'IT Logo" 
              className="h-24"
            />
          </div>
          
          <h1 className="text-6xl font-serif font-bold text-cafeit-beige-900 mb-4">404</h1>
          <p className="text-xl text-cafeit-beige-700 mb-8">
            Oops! We couldn't find the page you're looking for.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="btn-primary flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              <span>Return Home</span>
            </Link>
            
            <Link 
              to="/bookings" 
              className="btn-outline flex items-center justify-center"
            >
              <Coffee className="w-4 h-4 mr-2" />
              <span>Make a Booking</span>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;

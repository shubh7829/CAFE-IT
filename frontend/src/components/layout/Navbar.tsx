
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/ac28524c-21d8-4226-a28f-7061437f1f42.png" 
              alt="CAFE'IT Logo" 
              className="h-14 w-auto md:h-16 object-contain"
              style={{ 
                filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))',
                maxWidth: '200px' 
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/bookings" className="nav-link">Bookings</Link>
            <Link to="/events" className="nav-link">Events</Link>
            <Link to="/parking" className="nav-link">Parking</Link>
            <Link to="/about" className="nav-link">About</Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="flex items-center text-cafeit-beige-900 hover:text-cafeit-accent-terracotta">
              <LogIn className="w-4 h-4 mr-1" />
              <span>Login</span>
            </Link>
            <Link to="/profile" className="btn-primary flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>Profile</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-cafeit-beige-900 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 top-[60px] bg-white z-40 flex flex-col transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-6 space-y-6">
          <Link to="/" className="text-xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/bookings" className="text-xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>Bookings</Link>
          <Link to="/events" className="text-xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
          <Link to="/parking" className="text-xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>Parking</Link>
          <Link to="/about" className="text-xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          
          <div className="pt-6 flex flex-col space-y-4">
            <Link 
              to="/login" 
              className="py-3 px-4 border border-cafeit-beige-200 rounded-lg text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/profile" 
              className="py-3 px-4 bg-cafeit-accent-terracotta text-white rounded-lg text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

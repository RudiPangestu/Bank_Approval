import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, CreditCard, DollarSign } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <CreditCard className="h-8 w-8 text-gold-500" />
            <span className="text-2xl font-bold text-navy-800">SecureBank</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'text-gold-500' : 'text-navy-800'}`}>
              Home
            </Link>
            <Link to="/#services" className="nav-link text-navy-800">
              Services
            </Link>
            <Link to="/#about" className="nav-link text-navy-800">
              About Us
            </Link>
            <Link to="/#testimonials" className="nav-link text-navy-800">
              Testimonials
            </Link>
            <Link to="/apply" className="btn btn-primary flex items-center">
              <DollarSign className="h-5 w-5 mr-1" />
              Apply for Loan
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-navy-800 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg fade-in">
            <div className="flex flex-col space-y-4 px-4">
              <Link 
                to="/" 
                className={`py-2 ${location.pathname === '/' ? 'text-gold-500' : 'text-navy-800'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/#services" 
                className="py-2 text-navy-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/#about" 
                className="py-2 text-navy-800"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/#testimonials" 
                className="py-2 text-navy-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link 
                to="/apply" 
                className="btn btn-primary text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply for Loan
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
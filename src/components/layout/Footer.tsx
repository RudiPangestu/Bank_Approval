import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="h-8 w-8 text-gold-500" />
              <span className="text-2xl font-bold">SecureBank</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted financial partner since 2010. Providing innovative banking solutions with security and reliability.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gold-500 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold-500 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold-500 transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold-500 transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gold-500 transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link to="/#services" className="text-gray-300 hover:text-gold-500 transition-colors duration-300">Services</Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-300 hover:text-gold-500 transition-colors duration-300">About Us</Link>
              </li>
              <li>
                <Link to="/#testimonials" className="text-gray-300 hover:text-gold-500 transition-colors duration-300">Testimonials</Link>
              </li>
              <li>
                <Link to="/apply" className="text-gray-300 hover:text-gold-500 transition-colors duration-300">Apply for Loan</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-gold-500 transition-colors duration-300">
                <a href="#">Personal Banking</a>
              </li>
              <li className="text-gray-300 hover:text-gold-500 transition-colors duration-300">
                <a href="#">Business Banking</a>
              </li>
              <li className="text-gray-300 hover:text-gold-500 transition-colors duration-300">
                <a href="#">Loans & Mortgages</a>
              </li>
              <li className="text-gray-300 hover:text-gold-500 transition-colors duration-300">
                <a href="#">Investment Services</a>
              </li>
              <li className="text-gray-300 hover:text-gold-500 transition-colors duration-300">
                <a href="#">Online Banking</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gold-500 mr-2 mt-0.5" />
                <span className="text-gray-300">123 Finance Street, Banking District, 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gold-500 mr-2" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gold-500 mr-2" />
                <span className="text-gray-300">contact@securebank.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 SecureBank. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-gold-500 text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gold-500 text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-gold-500 text-sm transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
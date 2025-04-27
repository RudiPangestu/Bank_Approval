import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ParticleBackground from '../ui/ParticleBackground';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-r from-navy-900 to-navy-800 text-white overflow-hidden">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
              Secure Your Financial <span className="text-gold-500">Future</span> With Us
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">
              At SecureBank, we provide innovative banking solutions to help you achieve your financial goals with confidence and security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/apply" className="btn btn-primary flex items-center justify-center">
                Apply for Loan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="#services" className="btn bg-transparent border-2 border-white hover:bg-white/10 text-white flex items-center justify-center">
                Our Services
              </a>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-gold-500 text-2xl md:text-3xl font-bold">15+</h3>
                <p className="text-gray-300">Years of Service</p>
              </div>
              <div className="text-center">
                <h3 className="text-gold-500 text-2xl md:text-3xl font-bold">100k+</h3>
                <p className="text-gray-300">Happy Customers</p>
              </div>
              <div className="text-center">
                <h3 className="text-gold-500 text-2xl md:text-3xl font-bold">99%</h3>
                <p className="text-gray-300">Satisfaction Rate</p>
              </div>
            </div>
          </div>
          
          <div className="relative slide-up hidden lg:block">
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-gold-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 -right-10 w-72 h-72 bg-navy-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-32 right-20 w-72 h-72 bg-navy-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Quick Loan Calculator</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">Loan Amount</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-300">$</span>
                    <input
                      type="text"
                      defaultValue="25,000"
                      className="input-field pl-8 bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">Loan Term (years)</label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    defaultValue="15"
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-300 mt-1">
                    <span>1 yr</span>
                    <span>15 yrs</span>
                    <span>30 yrs</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">Interest Rate</label>
                  <input
                    type="text"
                    defaultValue="3.25%"
                    className="input-field bg-white/5 border-white/20 text-white"
                  />
                </div>
                <div className="bg-navy-700/50 p-4 rounded-lg mt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Monthly Payment</span>
                    <span className="font-semibold text-white">$175.25</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Interest</span>
                    <span className="font-semibold text-white">$6,545.00</span>
                  </div>
                </div>
                <Link to="/apply" className="btn btn-primary w-full mt-2">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
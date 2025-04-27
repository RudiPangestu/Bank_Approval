import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CallToAction: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-navy-700 to-navy-900 py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-navy-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Take the Next Step?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Apply for a loan today and let us help you achieve your financial goals with our competitive rates and personalized service.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/apply" className="btn btn-primary flex items-center justify-center">
              Apply for Loan Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a href="#services" className="btn bg-white hover:bg-gray-100 text-navy-900 flex items-center justify-center">
              Learn More About Our Services
            </a>
          </div>
          
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-gold-500 text-lg font-semibold mb-2">Fast Approval</h3>
                <p className="text-gray-300">Get your loan approved within 24 hours of application</p>
              </div>
              <div className="text-center">
                <h3 className="text-gold-500 text-lg font-semibold mb-2">Low Interest Rates</h3>
                <p className="text-gray-300">Enjoy competitive interest rates starting from 3.5%</p>
              </div>
              <div className="text-center">
                <h3 className="text-gold-500 text-lg font-semibold mb-2">Flexible Terms</h3>
                <p className="text-gray-300">Choose from flexible repayment terms of 1-30 years</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
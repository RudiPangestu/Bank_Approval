import React from 'react';
import LoanForm from '../components/loan/LoanForm';
import { motion } from 'framer-motion';

const LoanApplication: React.FC = () => {
  return (
    <div className="bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-navy-900">Loan Application</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Complete the form below to apply for a loan. We'll review your information and provide a decision based on your credit score and financial profile.
          </p>
        </motion.div>
        
        <LoanForm />
      </div>
    </div>
  );
};

export default LoanApplication;
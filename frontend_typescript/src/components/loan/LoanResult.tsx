import React from 'react';
import { CheckCircle, XCircle, ArrowRight, Download, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LoanResultProps {
  approved: boolean | null;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  totalAssets: number;
}

const LoanResult: React.FC<LoanResultProps> = ({
  approved,
  loanAmount,
  interestRate,
  loanTerm,
  monthlyPayment,
  totalAssets
}) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const applicationId = `SB${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div>
      {approved === true && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-success-50 p-4 rounded-full">
              <CheckCircle className="h-16 w-16 text-success-500" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-navy-900 mb-4">Congratulations!</h2>
          <p className="text-xl text-gray-600 mb-8">Your loan application has been pre-approved.</p>
          
          <div className="bg-navy-50 rounded-lg p-6 mb-8 max-w-xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-navy-800">Loan Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Application ID:</span>
                <span className="font-medium">{applicationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Application Date:</span>
                <span className="font-medium">{currentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Amount:</span>
                <span className="font-medium">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Interest Rate:</span>
                <span className="font-medium">{interestRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Term:</span>
                <span className="font-medium">{loanTerm} {loanTerm === 1 ? 'year' : 'years'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Payment:</span>
                <span className="font-semibold text-lg">{formatCurrency(monthlyPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Assets Value:</span>
                <span className="font-medium">{formatCurrency(totalAssets)}</span>
              </div>
            </div>
          </div>
          
          <div className="text-gray-600 mb-8">
            <p>A SecureBank representative will contact you within 24-48 hours to finalize your loan.</p>
            <p>Please have your identification and additional documentation ready.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn bg-navy-700 hover:bg-navy-800 text-white flex items-center justify-center">
              <Download className="h-5 w-5 mr-2" />
              Download Approval Letter
            </button>
            <button className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center justify-center">
              <Printer className="h-5 w-5 mr-2" />
              Print Details
            </button>
          </div>
        </motion.div>
      )}

      {approved === false && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-error-50 p-4 rounded-full">
              <XCircle className="h-16 w-16 text-error-500" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-navy-900 mb-4">We're Sorry</h2>
          <p className="text-xl text-gray-600 mb-8">Your loan application could not be approved at this time.</p>
          
          <div className="bg-navy-50 rounded-lg p-6 mb-8 max-w-xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-navy-800">Application Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Application ID:</span>
                <span className="font-medium">{applicationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Application Date:</span>
                <span className="font-medium">{currentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Requested Amount:</span>
                <span className="font-medium">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Assets Value:</span>
                <span className="font-medium">{formatCurrency(totalAssets)}</span>
              </div>
            </div>
          </div>
          
          <div className="text-gray-600 mb-8 max-w-2xl mx-auto">
            <p className="mb-4">There could be several reasons for this decision, including:</p>
            <ul className="list-disc list-inside space-y-2 text-left mb-4">
              <li>Credit score below our minimum requirements</li>
              <li>Insufficient income relative to the requested loan amount</li>
              <li>Insufficient assets or collateral</li>
              <li>High number of dependents relative to income</li>
            </ul>
            <p>We encourage you to review your financial situation and consider applying with a different loan amount or after improving your credit score.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn bg-navy-700 hover:bg-navy-800 text-white flex items-center justify-center">
              <Download className="h-5 w-5 mr-2" />
              Download Application Details
            </button>
            <Link to="/" className="btn btn-primary flex items-center justify-center">
              Return to Home
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LoanResult;
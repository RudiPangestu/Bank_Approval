import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Clock, PieChart } from 'lucide-react';

interface LoanCalculatorProps {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  onCalculate: (monthlyPayment: number, totalPayment: number, totalInterest: number) => void;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ 
  loanAmount, 
  loanTerm, 
  interestRate, 
  onCalculate 
}) => {
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, loanTerm, interestRate]);

  const calculateLoan = () => {
    // Convert annual interest rate to monthly and decimal form
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate monthly payment using the loan formula
    if (monthlyInterestRate === 0) {
      // Simple division for 0% interest loans
      const monthly = loanAmount / numberOfPayments;
      setMonthlyPayment(monthly);
      setTotalPayment(monthly * numberOfPayments);
      setTotalInterest(0);
    } else {
      const x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
      const monthly = (loanAmount * x * monthlyInterestRate) / (x - 1);
      
      setMonthlyPayment(monthly);
      setTotalPayment(monthly * numberOfPayments);
      setTotalInterest((monthly * numberOfPayments) - loanAmount);
    }

    // Send results to parent component
    onCalculate(
      monthlyPayment,
      totalPayment,
      totalInterest
    );
  };

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-4 text-navy-800">
        <Calculator className="h-6 w-6 mr-2 text-gold-500" />
        <h3 className="text-xl font-semibold">Loan Summary</h3>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-navy-600" />
            <span className="text-gray-600">Loan Amount</span>
          </div>
          <span className="font-semibold">{formatCurrency(loanAmount)}</span>
        </div>

        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-navy-600" />
            <span className="text-gray-600">Loan Term</span>
          </div>
          <span className="font-semibold">{loanTerm} {loanTerm === 1 ? 'year' : 'years'}</span>
        </div>

        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div className="flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-navy-600" />
            <span className="text-gray-600">Interest Rate</span>
          </div>
          <span className="font-semibold">{interestRate}%</span>
        </div>
      </div>

      <div className="mt-6 bg-navy-50 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-gray-600 text-sm">Monthly Payment</p>
            <p className="text-navy-800 font-bold text-lg">{formatCurrency(monthlyPayment)}</p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 text-sm">Total Payment</p>
            <p className="text-navy-800 font-bold text-lg">{formatCurrency(totalPayment)}</p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 text-sm">Total Interest</p>
            <p className="text-navy-800 font-bold text-lg">{formatCurrency(totalInterest)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
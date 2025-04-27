import React, { useState } from 'react';
import { DollarSign, Clock, Award, Building, Home, Car, Briefcase, Users } from 'lucide-react';
import LoanCalculator from './LoanCalculator';
import LoanResult from './LoanResult';
import { motion } from 'framer-motion';

interface FormData {
  no_of_dependents: number;
  education: string;
  self_employed: string;
  income_annum: number;
  loan_amount: number;
  loan_term: number;
  cibil_score: number;
  residential_assets_value: number;
  commercial_assets_value: number;
  luxury_assets_value: number;
  bank_asset_value: number;
}

const LoanForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    no_of_dependents: 0,
    education: 'graduate',
    self_employed: 'no',
    income_annum: 0,
    loan_amount: 25000,
    loan_term: 5,
    cibil_score: 750,
    residential_assets_value: 0,
    commercial_assets_value: 0,
    luxury_assets_value: 0,
    bank_asset_value: 0
  });
  
  const [loanResults, setLoanResults] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0
  });
  
  const [approved, setApproved] = useState<boolean | null>(null);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (name === 'loan_amount' || name === 'income_annum' || name === 'loan_term' || name === 'cibil_score' ||
        name === 'residential_assets_value' || name === 'commercial_assets_value' || 
        name === 'luxury_assets_value' || name === 'bank_asset_value' || name === 'no_of_dependents') {
      const numValue = parseFloat(value);
      setFormData(prev => ({ ...prev, [name]: isNaN(numValue) ? 0 : numValue }));
      
      if (name === 'cibil_score') {
        updateInterestRate(numValue, formData.loan_amount);
      } else if (name === 'loan_amount') {
        updateInterestRate(formData.cibil_score, numValue);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const updateInterestRate = (cibilScore: number, loanAmount: number) => {
    let rate = 10;
    
    if (cibilScore >= 800) {
      rate -= 3.5;
    } else if (cibilScore >= 750) {
      rate -= 2.5;
    } else if (cibilScore >= 700) {
      rate -= 1.5;
    } else if (cibilScore >= 650) {
      rate -= 0.5;
    }
    
    if (loanAmount >= 50000) {
      rate -= 0.25;
    }
    if (loanAmount >= 100000) {
      rate -= 0.25;
    }
    
    setInterestRate(Math.max(3, rate));
  };

  const handleCalculatorUpdate = (monthly: number, total: number, interest: number) => {
    setLoanResults({
      monthlyPayment: monthly,
      totalPayment: total,
      totalInterest: interest
    });
  };

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (stepNumber === 1) {
      if (formData.no_of_dependents < 0) newErrors.no_of_dependents = 'Number of dependents cannot be negative';
      if (!formData.education) newErrors.education = 'Education is required';
      if (!formData.self_employed) newErrors.self_employed = 'Employment status is required';
      if (!formData.income_annum || formData.income_annum <= 0) newErrors.income_annum = 'Annual income must be greater than 0';
    } else if (stepNumber === 2) {
      if (!formData.loan_amount || formData.loan_amount <= 0) newErrors.loan_amount = 'Loan amount must be greater than 0';
      if (!formData.loan_term || formData.loan_term <= 0) newErrors.loan_term = 'Loan term must be greater than 0';
      if (!formData.cibil_score || formData.cibil_score < 300 || formData.cibil_score > 900) {
        newErrors.cibil_score = 'CIBIL score must be between 300 and 900';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prevStep => prevStep + 1);
    }
  };

  const prevStep = () => {
    setStep(prevStep => Math.max(1, prevStep - 1));
  };

  const submitForm = () => {
    const totalAssets = formData.residential_assets_value + 
                       formData.commercial_assets_value + 
                       formData.luxury_assets_value + 
                       formData.bank_asset_value;
                       
    const incomeToLoanRatio = formData.income_annum / formData.loan_amount;
    const assetsToLoanRatio = totalAssets / formData.loan_amount;
    const isCibilGood = formData.cibil_score >= 700;
    const isIncomeAdequate = incomeToLoanRatio >= 0.3;
    const hasStrongAssets = assetsToLoanRatio >= 1.5;
    
    let isApproved = false;
    
    if (isCibilGood && isIncomeAdequate) {
      isApproved = true;
    } else if (formData.cibil_score >= 750 && (isIncomeAdequate || hasStrongAssets)) {
      isApproved = true;
    } else if (formData.cibil_score >= 650 && isIncomeAdequate && hasStrongAssets) {
      isApproved = true;
    }
    
    setApproved(isApproved);
    setStep(4);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  stepNumber < step 
                    ? 'bg-gold-500 text-white' 
                    : stepNumber === step 
                    ? 'bg-navy-700 text-white' 
                    : 'bg-gray-200 text-gray-600'
                } font-bold text-lg transition-colors duration-300`}
              >
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div 
                  className={`w-16 h-1 ${
                    stepNumber < step ? 'bg-gold-500' : 'bg-gray-200'
                  } transition-colors duration-300`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-navy-900">Personal & Employment Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="no_of_dependents">
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-navy-600" />
                    Number of Dependents
                  </span>
                </label>
                <input
                  type="number"
                  id="no_of_dependents"
                  name="no_of_dependents"
                  value={formData.no_of_dependents}
                  onChange={handleChange}
                  className={`input-field ${errors.no_of_dependents ? 'border-error-500 ring-1 ring-error-500' : ''}`}
                  min="0"
                />
                {errors.no_of_dependents && <p className="text-error-500 text-sm mt-1">{errors.no_of_dependents}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="education">
                  <span className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-navy-600" />
                    Education
                  </span>
                </label>
                <select
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className={`input-field ${errors.education ? 'border-error-500 ring-1 ring-error-500' : ''}`}
                >
                  <option value="graduate">Graduate</option>
                  <option value="not_graduate">Not Graduate</option>
                </select>
                {errors.education && <p className="text-error-500 text-sm mt-1">{errors.education}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="self_employed">
                  <span className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-navy-600" />
                    Self Employed
                  </span>
                </label>
                <select
                  id="self_employed"
                  name="self_employed"
                  value={formData.self_employed}
                  onChange={handleChange}
                  className={`input-field ${errors.self_employed ? 'border-error-500 ring-1 ring-error-500' : ''}`}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.self_employed && <p className="text-error-500 text-sm mt-1">{errors.self_employed}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="income_annum">
                  <span className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-navy-600" />
                    Annual Income
                  </span>
                </label>
                <input
                  type="number"
                  id="income_annum"
                  name="income_annum"
                  value={formData.income_annum || ''}
                  onChange={handleChange}
                  className={`input-field ${errors.income_annum ? 'border-error-500 ring-1 ring-error-500' : ''}`}
                  min="0"
                />
                {errors.income_annum && <p className="text-error-500 text-sm mt-1">{errors.income_annum}</p>}
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="btn btn-primary"
              >
                Next Step
              </button>
            </div>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-navy-900">Loan Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="loan_amount">
                  <span className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-navy-600" />
                    Loan Amount
                  </span>
                </label>
                <input
                  type="number"
                  id="loan_amount"
                  name="loan_amount"
                  value={formData.loan_amount || ''}
                  onChange={handleChange}
                  className={`input-field ${errors.loan_amount ? 'border-error-500 ring-1 ring-error-500' : ''}`}
                  min="1000"
                  max="1000000"
                />
                {errors.loan_amount && <p className="text-error-500 text-sm mt-1">{errors.loan_amount}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="loan_term">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-navy-600" />
                    Loan Term (years)
                  </span>
                </label>
                <input
                  type="number"
                  id="loan_term"
                  name="loan_term"
                  value={formData.loan_term || ''}
                  onChange={handleChange}
                  className={`input-field ${errors.loan_term ? 'border-error-500 ring-1 ring-error-500' : ''}`}
                  min="1"
                  max="30"
                />
                {errors.loan_term && <p className="text-error-500 text-sm mt-1">{errors.loan_term}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="cibil_score">
                  <span className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-navy-600" />
                    CIBIL Score
                  </span>
                </label>
                <input
                  type="number"
                  id="cibil_score"
                  name="cibil_score"
                  value={formData.cibil_score || ''}
                  onChange={handleChange}
                  className={`input-field ${errors.cibil_score ? 'border-error-500 ring-1 ring-error-500' : ''}`}
                  min="300"
                  max="900"
                />
                {errors.cibil_score && <p className="text-error-500 text-sm mt-1">{errors.cibil_score}</p>}
                <p className="text-sm text-gray-500 mt-1">Score ranges from 300-900</p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn btn-primary"
              >
                Next Step
              </button>
            </div>
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-navy-900">Asset Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="residential_assets_value">
                  <span className="flex items-center">
                    <Home className="h-4 w-4 mr-2 text-navy-600" />
                    Residential Assets Value
                  </span>
                </label>
                <input
                  type="number"
                  id="residential_assets_value"
                  name="residential_assets_value"
                  value={formData.residential_assets_value || ''}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="commercial_assets_value">
                  <span className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-navy-600" />
                    Commercial Assets Value
                  </span>
                </label>
                <input
                  type="number"
                  id="commercial_assets_value"
                  name="commercial_assets_value"
                  value={formData.commercial_assets_value || ''}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="luxury_assets_value">
                  <span className="flex items-center">
                    <Car className="h-4 w-4 mr-2 text-navy-600" />
                    Luxury Assets Value
                  </span>
                </label>
                <input
                  type="number"
                  id="luxury_assets_value"
                  name="luxury_assets_value"
                  value={formData.luxury_assets_value || ''}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="bank_asset_value">
                  <span className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-navy-600" />
                    Bank Assets Value
                  </span>
                </label>
                <input
                  type="number"
                  id="bank_asset_value"
                  name="bank_asset_value"
                  value={formData.bank_asset_value || ''}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                />
              </div>
            </div>

            <div className="mt-8">
              <LoanCalculator 
                loanAmount={formData.loan_amount}
                loanTerm={formData.loan_term}
                interestRate={interestRate}
                onCalculate={handleCalculatorUpdate}
              />
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Back
              </button>
              <button
                type="button"
                onClick={submitForm}
                className="btn btn-primary"
              >
                Submit Application
              </button>
            </div>
          </motion.div>
        );
        
      case 4:
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <LoanResult 
              approved={approved}
              loanAmount={formData.loan_amount}
              interestRate={interestRate}
              loanTerm={formData.loan_term}
              monthlyPayment={loanResults.monthlyPayment}
              totalAssets={
                formData.residential_assets_value +
                formData.commercial_assets_value +
                formData.luxury_assets_value +
                formData.bank_asset_value
              }
            />
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {step < 4 && renderStepIndicator()}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        {renderForm()}
      </div>
    </div>
  );
};

export default LoanForm;
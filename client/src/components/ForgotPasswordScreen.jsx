import React, { useState } from 'react';
import { FileText, Scale, ArrowRight } from 'lucide-react';
import '../components/ForgotPasswordScreen.css'; // Import your CSS file

const ForgotPasswordScreen = ({ onBack, onComplete }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsSubmitted(true);
    
    // Simulate sending code
    setTimeout(() => {
      setIsSubmitted(false);
      onComplete(); // Navigate to create new password screen
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="Logo text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-8">
          <img src="./logo-dark.svg" alt="" className="h-20 w-30" /> 
          <img src="./court-dark.svg" alt="" className="h-20 w-30" />
          </div>
        </div>

        <div className="FG_pswrd bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Forgot password
          </h1>
          
          <p className="text-gray-600 text-center mb-8">
            Enter your registered email address to recover your password
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className={`w-full px-4 py-4 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                  error ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                disabled={isSubmitted}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full bg-gray-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-800 transition-colors duration-200 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitted ? 'Sending Code...' : 'Send Code'}</span>
              {!isSubmitted && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onBack}
              className="text-green-800 hover:underline font-medium"
            >
              Back to Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
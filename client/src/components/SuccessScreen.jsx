import React from 'react';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SuccessScreen = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        {/* Success Icon with Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-green-800 rounded-full flex items-center justify-center mx-auto relative overflow-hidden">
            <CheckCircle className="h-12 w-12 text-white" />
            
            {/* Celebration Particles */}
            <div className="absolute -top-2 -left-2 animate-bounce delay-100">
              <Sparkles className="h-4 w-4 text-yellow-400" />
            </div>
            <div className="absolute -top-1 -right-3 animate-bounce delay-300">
              <Sparkles className="h-3 w-3 text-pink-400" />
            </div>
            <div className="absolute -bottom-2 -left-3 animate-bounce delay-500">
              <Sparkles className="h-3 w-3 text-blue-400" />
            </div>
            <div className="absolute -bottom-1 -right-2 animate-bounce delay-700">
              <Sparkles className="h-4 w-4 text-purple-400" />
            </div>
          </div>
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full border-4 border-green-800 opacity-20 animate-ping"></div>
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Account Created<br />
          Successfully
        </h1>

        <p className="text-lg text-gray-700 mb-12 leading-relaxed">
          Your CasePort account has been successfully created.<br />
          Continue to set up your personal information
        </p>

        <div className="border-t border-green-300 pt-8 mb-8"></div>

        <Link
          to="/personal-info"
          className="w-full bg-green-800 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-green-900 transition-all duration-200 flex items-center justify-center space-x-3 group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <span>Continue</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* User Info Preview */}

      </div>
    </div>
  );
};

export default SuccessScreen;
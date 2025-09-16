import React, { useState } from 'react';
import { FileText, Scale, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { loginUser } from '/src/authService.js';



const LoginScreen = ({ onNavigate, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    const { token, user } = await loginUser(formData);
    localStorage.setItem('token', token);
    onLoginSuccess(); // Navigate to dashboard
  } catch (err) {
    const msg =
      err?.response?.data?.message || 'Invalid email or password';
    setErrors({ api: msg });
  }
};

const handleAuthSuccess = (user) => {
  navigate('/dashboard');   // react-router example
};

  return (
    <div className="Background min-h-screen flex" style={{
      backgroundImage: 'url(./Court-img.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'left',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Left Panel with overlay */}
      <div className="Login-Text w-1/2 bg-black bg-opacity-70 text-white p-12 flex flex-col justify-between">
        <div className="flex items-center space-x-3">
          <div className="">
          <div className="logos">
              <img src="./logo.svg" alt="" className="h-20 w-30" /> 
              <img src="./court.svg" alt="" className="h-20 w-30" />
            </div>
          </div>
        </div>

        <div className='Login_Text1'>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Login to your<br />
            CasePort<br />
            account
          </h1>
          
          <p className="text-xl leading-relaxed opacity-90 mb-12">
            Access your filings, queries and service records...
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Contact Us</span>
            </div>
            <p className="text-green-400 text-sm ml-5">support@caseport.co</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address or Unique User ID
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-4 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full px-4 py-4 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors pr-12 ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <span className="text-sm">{showPassword ? 'Hide' : 'Show'}</span>
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-green-800 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-900 transition-colors duration-200 flex items-center justify-center space-x-2 group"
            >
              <span>Access my filings</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-between text-sm pt-4">
              <button 
                type="button" 
                onClick={() => onNavigate('forgot-password')}
                className="text-gray-900 hover:underline font-medium underline"
              >
                Forgot Password?
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">New User?</span>
                <button 
                  type="button" 
                  onClick={() => onNavigate('create-account')}
                  className="text-green-800 hover:underline font-medium"
                >
                  Create Account
                </button>
              </div>
            </div>
            
            {errors.api && <p className="text-red-500 text-sm">{errors.api}</p>}

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
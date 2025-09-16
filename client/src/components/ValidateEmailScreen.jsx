import React, { useState, useEffect } from 'react';
import { FileText, Scale } from 'lucide-react';

const ValidateEmailScreen = ({ formData, onValidate, validateError }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(59);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Form data received:', formData);
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
    
    if (error) setError('');
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleValidate = () => {
    const enteredCode = code.join('');
    if (enteredCode.length !== 6) {

      console.error('Validation error: Code must be 6 digits');

      setError('Please enter the complete 6-digit code');
      return;
    }
    console.log('Validating code:', enteredCode);
    onValidate(enteredCode); // This triggers the parent handler
  };

  const maskEmail = (email) => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.substring(0, 4) + '*'.repeat(username.length - 4);
    return `${maskedUsername}@${domain}`;
  };

  return (
    <div>
      {/* Right Panel */}
      <div className=" Vali w-3/5 bg-white p-12 flex flex-col justify-center">
        <div className="max-w-lg mx-auto w-full">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Validate email<br />
            address
          </h1>
          
          <p className="text-gray-600 mb-8">
            A 6 DIGIT code has been sent to your email address<br />
            {formData?.email ? maskEmail(formData.email) : '***********@example.com'}
          </p>

          <div className="space-y-6">
            <div className="flex space-x-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  maxLength={1}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-red-500 font-medium">
                {timeLeft > 0 ? `0${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}` : '00:00'}
              </div>
              {timeLeft === 0 && (
                <button 
                  onClick={() => setTimeLeft(59)}
                  className="text-green-800 hover:underline font-medium"
                >
                  Resend Code
                </button>
              )}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {validateError && <p className="text-red-500 text-sm">{validateError}</p>}

            <button
              onClick={handleValidate}
              className="w-full bg-gray-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Validate
            </button>
          </div>
        </div>
      </div>

      <div>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
        {/* ...rest of your modal... */}
      </div>

      {/* {showValidateModal && (
  <div className="fixed inset-0 ...">
    <ValidateEmailScreen
      formData={formData}
      onValidate={handleEmailValidated}
    />
  </div>
)} */}
    </div>
  );
};

export default ValidateEmailScreen;
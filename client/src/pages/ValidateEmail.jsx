import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserbyId } from "../authService";
import API from "../api";


const ValidateEmail = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
   const [timeLeft, setTimeLeft] = useState(59);
   const [error, setError] = useState('');
   const [userEmail, setUserEmail] = useState("");
   const navigate = useNavigate();

  

    useEffect(() => {
    const email = localStorage.getItem("verify-email")
    if(email) {
      setUserEmail(email)
    }else{
      navigate("/create-account")
    }
   }, []);
 
   useEffect(() => {
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
 
   const handleValidate =  async () => {
     const enteredCode = code.join('');
     if (enteredCode.length !== 6) {
 
       console.error('Validation error: Code must be 6 digits');
 
       setError('Please enter the complete 6-digit code');
       return;
     }

    try {
      const res = await API.post("/auth/verify-registration", {
        email: userEmail,
        otp: enteredCode,
      });
      localStorage.setItem("token", res?.data?.access_token)
      localStorage.setItem("user", JSON.stringify(res?.data?.user))
      navigate("/account-created-successfully")
    
    } catch (err) {
      setError(err?.response?.data?.message || "Validation failed");
      console.error("Email validation failed:", err);
      return false;

    }
  
  }
 
   const maskEmail = (email) => {
     const [username, domain] = email.split('@');
     const maskedUsername = username.substring(0, 4) + '*'.repeat(username.length - 4);
     return `${maskedUsername}@${domain}`;
   };
 

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className=" Left-panel w-2/5  text-white p-12 flex flex-col justify-center">
        <div className=" Left-panel-div mb-8">
          <div className="flex items-center space-x-3 mb-12">
            <div className="logos">
              <img src="./logo.svg" alt="" className="h-20 w-30" />
              <img src="./court.svg" alt="" className="h-20 w-30" />
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Create
            <br />
            account
          </h1>

          <p className="text-lg leading-relaxed opacity-90 mb-12">
            Create your official CasePort profile to begin
            <br />
            filing appeals and legal documents across
            <br />
            Court of Appeal divisions.
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4 opacity-50">
               <div className="flex-shrink-0 w-8 h-8 border-2 border-white border-dashed rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm text-green-800">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Create Account</h3>
                <p className="text-sm opacity-75">
                  Create a personal CasePort account
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8  bg-green-900 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm text-green-800">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Validate</h3>
                <p className="text-sm opacity-75">
                  Validate your email address
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 opacity-30">
              <div className="flex-shrink-0 w-8 h-8 border-2 border-white border-dashed rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Complete Profile Setup
                </h3>
                <p className="text-sm opacity-75">
                  Help us secure your account and identity
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-3/5 bg-white p-12 flex flex-col justify-center">
      <div className="max-w-lg mx-auto w-full">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Validate email<br />
            address
          </h1>
          
          <p className="text-gray-600 mb-8">
            A 6 DIGIT code has been sent to your email address<br />
            {/* {formData?.email ? maskEmail(formData.email) : '***********@example.com'} */}
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


            <button
              onClick={handleValidate}
              className="w-full bg-gray-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Validate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidateEmail;

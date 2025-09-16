import React, { useState } from "react";
import { FileText, Scale, ArrowRight, Eye, EyeOff } from "lucide-react";
import { registerUser } from "../authService.js";
import { Link, useNavigate } from "react-router-dom";

const CreateAccountScreen = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const {email} = await registerUser({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phone, 
        password: formData.password,
      }); 
      localStorage.setItem("verify-email", email)
      navigate(`/verify-email`)
      console.log("Registration successful:", email);
    } catch (err) {
      // 🔥 THIS is the key line you needed
      console.log(
        " register error",
        err?.response?.status,
        err?.response?.data
      );

      const msg =
        err?.response?.data?.message || // common message field
        err?.response?.data?.error || // sometimes used
        err?.response?.data?.errors?.[0] || // if it’s an array
        "Registration failed. Try again.";

      setErrors({ api: msg }); // Show error to user
    }
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
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-green-800 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Create Account</h3>
                <p className="text-sm opacity-75">
                  Create a personal CasePort account
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 opacity-50">
              <div className="flex-shrink-0 w-8 h-8 border-2 border-white border-dashed rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">2</span>
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
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Register as a<br />
              Legal Practitioner
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={`w-full px-4 py-4 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                  errors.fullName
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              />
              <p className="text-sm text-gray-500 mt-1">
                Exactly as it appears on your NBA Certificate
              </p>
              {errors.fullName && (
                <p className="text-green-900 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-4 py-4 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                  errors.email
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="0700-000-000"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`w-full px-4 py-4 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                  errors.phone
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full px-4 py-4 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors pr-12 ${
                    errors.password
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Caps, Number, Character
              </p>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}

              {/* Password strength indicator */}
              <div className="flex space-x-1 mt-2">
                <div
                  className={`h-1 flex-1 rounded ${
                    formData.password.length >= 2
                      ? "bg-green-400"
                      : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`h-1 flex-1 rounded ${
                    formData.password.length >= 4
                      ? "bg-green-600"
                      : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`h-1 flex-1 rounded ${
                    formData.password.length >= 6
                      ? "bg-green-800"
                      : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`h-1 flex-1 rounded ${
                    formData.password.length >= 8
                      ? "bg-green-900"
                      : "bg-gray-200"
                  }`}
                ></div>
              </div>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className={`w-full px-4 py-4 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors pr-12 ${
                  errors.confirmPassword
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-800 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-900 transition-colors duration-200 flex items-center justify-center space-x-2 group"
            >
              <span>Register</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-sm text-gray-600 leading-relaxed">
              By clicking "Register", you agree to our existing terms and
              <br />
              condition as a practicing lawyer in the Federal Republic of
              <br />
              Nigeria.
            </p>

            <div className="flex items-center justify-between text-sm">
              <Link
            
                to="/forgot-password"
                className="text-green-800 hover:underline font-medium"
              >
                Forgot Password?
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">I already have an account</span>
                <Link
                  to="/login"
                  className="text-green-800 hover:underline font-medium"
                >
                  Log in
                </Link>
              </div>
            </div>
            {errors.api && <p className="text-red-500 text-sm">{errors.api}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountScreen;

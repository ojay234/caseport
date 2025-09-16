import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import API from "./api";
import WelcomeScreen from "./components/WelcomeScreen";
import CreateAccountScreen from "./components/CreateAccountScreen";
import SuccessScreen from "./components/SuccessScreen";
import ForgotPasswordScreen from "./components/ForgotPasswordScreen";
import ValidateEmailScreen from "./components/ValidateEmailScreen";
import PersonalInfoScreen from "./components/PersonalInfoScreen";
import LoginScreen from "./components/LoginScreen";
import CreateNewPasswordScreen from "./components/CreateNewPasswordScreen";
import DashboardScreen from "./components/Dashboard/DashboardHome";
import ValidateEmail from "./pages/ValidateEmail";

function App() {
  const [showValidateModal, setShowValidateModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [emailToken, setEmailToken] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [validateError, setValidateError] = useState("");

  const handleFormSubmit = (data) => {
    setFormData(data);
    console.log("Form submitted:", formData);
  };


  const handleEmailValidated = async (code) => {

    try {
      const res = await API.post("/auth/validate-email-token", {
        email: formData.email,
        code,
      });
      if (res.data.success) {
        setShowValidateModal(false);
        setValidateError("");
        return true;
      } else {
        setValidateError(res.data.message || "Invalid code");
        return false;
      }
    } catch (err) {
      setValidateError(err?.response?.data?.message || "Validation failed");
      console.error("Email validation failed:", err);
      return false;
    }
  };


  
  const handleAccountCreated = async (user) => {
    setFormData(user);
    console.log("Account created:", formData);
    setShowValidateModal(true);

    try {
      await API.post("/auth/send-email-token", { email: user.email });
    } catch (err) {
      console.error("Failed to send email token:", err, formData);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/create-account"
            element={
              <CreateAccountScreen />
            }
          />
          <Route path="/verify-email" element={<ValidateEmail/>} />
          <Route
            path="/account-created-successfully"
            element={
              <SuccessScreen />
            }
          />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/personal-info" element={<PersonalInfoScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route
            path="/create-new-password"
            element={<CreateNewPasswordScreen />}
          />
        </Routes>

       
      </div>
    </Router>
  );
}

export default App;

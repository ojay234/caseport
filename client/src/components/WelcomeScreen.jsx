import React from "react";
import { FileText, Scale, ArrowRight } from "lucide-react";
import "../components/WelcomeScreen.css";
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="Left-panel w-1/2  text-white p-12 flex flex-col justify-center">
        <div className="Left-panel-div mb-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="logos">
              <img src="./logo.svg" alt="" className="h-20 w-30" />
              <img src="./court.svg" alt="" className="h-20 w-30" />
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-6 leading-tight">
            The Official E-Filing
            <br />
            System of the Court of
            <br />
            Appeal
          </h1>

          <div className="w-24 h-1 bg-white mb-8"></div>

          <p className="text-xl leading-relaxed opacity-90">
            Only legal practitioners accredited by the
            <br />
            Nigerian Bar Association (NBA) may use
            <br />
            this platform for filing.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className=" Right-panel w-1/2 bg-white p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="logos">
                <img src="./logo-dark.svg" alt="" className="h-20 w-30" />
                <img src="./court-dark.svg" alt="" className="h-20 w-30" />
              </div>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to
              <br />
              Case<span className="text-green-800">Port</span>
            </h2>

            <p className="text-gray-600 text-lg">
              File appeals, track motions and manage
              <br />
              case documents securely and efficiently
              <br />
              across all 26 divisions.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate("/create-account")}
              className="w-full bg-white border-2 border-green-800 border-dashed text-green-800 py-4 px-6 rounded-lg hover:bg-green-50 transition-colors duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="font-semibold text-lg">
                    Create Lawyer Account
                  </div>
                  <div className="text-sm opacity-75">
                    To have access to the features of this app, you must have an
                    <br />
                    account with CasePort.
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-green-800 flex-shrink-0"></div>
              </div>
            </button>

            <button
              onClick={() => navigate("/login")}
              className="w-full bg-gray-50 text-gray-700 py-4 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="font-semibold text-lg">Login to Continue</div>
                  <div className="text-sm opacity-75">
                    If you already have an account with us, login to access your
                    <br />
                    dashboard
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

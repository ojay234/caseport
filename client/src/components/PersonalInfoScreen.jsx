import React, { useState } from 'react';
import { FileText, Scale, ArrowRight, Upload, X, Search, Check } from 'lucide-react';

const PersonalInfoScreen = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    profilePhoto: null,
    uniqueId: '',
    fullName: '',
    email: '',
    phone: '',
    courtLocation: '',
    electronicSignature: null
  });

  const [errors, setErrors] = useState({});
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');

  // All 26 Court of Appeal divisions in Nigeria
  const courtLocations = [
    { id: 'abuja-shehu', name: 'Abuja Division', address: 'Shehu Shagari Way', fullName: 'Abuja Division - Shehu Shagari Way' },
    { id: 'abuja-cbd', name: 'Abuja Division', address: 'Central Business District', fullName: 'Abuja Division - Central Business District' },
    { id: 'benin', name: 'Benin Division', address: 'Benin City, Edo State', fullName: 'Benin Division - Benin City, Edo State' },
    { id: 'calabar', name: 'Calabar Division', address: 'Calabar, Cross River State', fullName: 'Calabar Division - Calabar, Cross River State' },
    { id: 'enugu', name: 'Enugu Division', address: 'Enugu, Enugu State', fullName: 'Enugu Division - Enugu, Enugu State' },
    { id: 'ibadan', name: 'Ibadan Division', address: 'Ibadan, Oyo State', fullName: 'Ibadan Division - Ibadan, Oyo State' },
    { id: 'ilorin', name: 'Ilorin Division', address: 'Ilorin, Kwara State', fullName: 'Ilorin Division - Ilorin, Kwara State' },
    { id: 'jos', name: 'Jos Division', address: 'Jos, Plateau State', fullName: 'Jos Division - Jos, Plateau State' },
    { id: 'kaduna', name: 'Kaduna Division', address: 'Kaduna, Kaduna State', fullName: 'Kaduna Division - Kaduna, Kaduna State' },
    { id: 'kano', name: 'Kano Division', address: 'Kano, Kano State', fullName: 'Kano Division - Kano, Kano State' },
    { id: 'lagos', name: 'Lagos Division', address: 'Lagos, Lagos State', fullName: 'Lagos Division - Lagos, Lagos State' },
    { id: 'makurdi', name: 'Makurdi Division', address: 'Makurdi, Benue State', fullName: 'Makurdi Division - Makurdi, Benue State' },
    { id: 'owerri', name: 'Owerri Division', address: 'Owerri, Imo State', fullName: 'Owerri Division - Owerri, Imo State' },
    { id: 'port-harcourt', name: 'Port Harcourt Division', address: 'Port Harcourt, Rivers State', fullName: 'Port Harcourt Division - Port Harcourt, Rivers State' },
    { id: 'sokoto', name: 'Sokoto Division', address: 'Sokoto, Sokoto State', fullName: 'Sokoto Division - Sokoto, Sokoto State' },
    { id: 'yola', name: 'Yola Division', address: 'Yola, Adamawa State', fullName: 'Yola Division - Yola, Adamawa State' },
    { id: 'bauchi', name: 'Bauchi Division', address: 'Bauchi, Bauchi State', fullName: 'Bauchi Division - Bauchi, Bauchi State' },
    { id: 'gombe', name: 'Gombe Division', address: 'Gombe, Gombe State', fullName: 'Gombe Division - Gombe, Gombe State' },
    { id: 'lafia', name: 'Lafia Division', address: 'Lafia, Nasarawa State', fullName: 'Lafia Division - Lafia, Nasarawa State' },
    { id: 'lokoja', name: 'Lokoja Division', address: 'Lokoja, Kogi State', fullName: 'Lokoja Division - Lokoja, Kogi State' },
    { id: 'maiduguri', name: 'Maiduguri Division', address: 'Maiduguri, Borno State', fullName: 'Maiduguri Division - Maiduguri, Borno State' },
    { id: 'minna', name: 'Minna Division', address: 'Minna, Niger State', fullName: 'Minna Division - Minna, Niger State' },
    { id: 'akure', name: 'Akure Division', address: 'Akure, Ondo State', fullName: 'Akure Division - Akure, Ondo State' },
    { id: 'abeokuta', name: 'Abeokuta Division', address: 'Abeokuta, Ogun State', fullName: 'Abeokuta Division - Abeokuta, Ogun State' },
    { id: 'umuahia', name: 'Umuahia Division', address: 'Umuahia, Abia State', fullName: 'Umuahia Division - Umuahia, Abia State' },
    { id: 'uyo', name: 'Uyo Division', address: 'Uyo, Akwa Ibom State', fullName: 'Uyo Division - Uyo, Akwa Ibom State' }
  ];

  const filteredLocations = courtLocations.filter(location =>
    location.fullName.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const generateUniqueId = () => {
    const prefix = 'CA/ABJ/';
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    return prefix + randomNum.toString().padStart(6, '0');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (field, file) => {
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    }
  };

  const handleLocationSelect = (location) => {
    setFormData(prev => ({ ...prev, courtLocation: location.fullName }));
    setShowLocationDropdown(false);
    setLocationSearch('');
    if (errors.courtLocation) {
      setErrors(prev => ({ ...prev, courtLocation: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.profilePhoto) {
          newErrors.profilePhoto = 'Profile photo is required';
        }
        break;
      case 2:
        // Unique ID is auto-generated, no validation needed
        break;
      case 3:
        if (!formData.fullName.trim()) {
          newErrors.fullName = 'Full name is required';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        }
        if (!formData.courtLocation) {
          newErrors.courtLocation = 'Court location is required';
        }
        break;
      case 4:
        if (!formData.electronicSignature) {
          newErrors.electronicSignature = 'Electronic signature is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1) {
        // Generate unique ID when moving from step 1 to step 2
        const uniqueId = generateUniqueId();
        setFormData(prev => ({ ...prev, uniqueId }));
      }
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleComplete = async () => {
    if (validateStep(4)) {
      try {
        await API.post('/user/profile', formData);
        onComplete(); // Call navigation to Login
      } catch (err) {
        setErrors({ api: 'Failed to save profile. Try again.' });
      }
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Upload Your Profile Photo
        </h2>
        <p className="text-gray-600">
          For your safety and personal verification, we require that you<br />
          complete this simple setup.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="relative">
          {formData.profilePhoto ? (
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-500 relative">
              <img
                src={URL.createObjectURL(formData.profilePhoto)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleInputChange('profilePhoto', null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:border-green-500 transition-colors cursor-pointer">
              <div className="text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload Photo</p>
              </div>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={(e) => handleFileUpload('profilePhoto', e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-blue-600 mb-1">JPG or PNG</p>
        <p className="text-sm text-blue-600">Max 2MB</p>
      </div>

      {errors.profilePhoto && (
        <p className="text-red-500 text-sm text-center">{errors.profilePhoto}</p>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleNext}
          className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your Unique User ID
        </h2>
        <p className="text-gray-600">
          This is your unique identifier for the CasePort system
        </p>
      </div>

      <div className="flex justify-center">
        <div className="bg-gray-100 px-6 py-4 rounded-lg border-2 border-gray-200">
          <p className="text-2xl font-bold text-gray-900 text-center">{formData.uniqueId}</p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Please save this ID for future reference
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleNext}
          className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Personal Information
        </h2>
        <p className="text-gray-600">
          Enter your details exactly as they appear on your NBA Certificate
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
              errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          />
          <p className="text-sm text-gray-500 mt-1">Exactly as it appears on your NBA Certificate</p>
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
              errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="relative">
          <div
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className={`w-full px-4 py-3 border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
              errors.courtLocation ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {formData.courtLocation || 'Select Court Location'}
          </div>
          <p className="text-sm text-gray-500 mt-1">Where are you attached to?</p>
          {errors.courtLocation && <p className="text-red-500 text-sm mt-1">{errors.courtLocation}</p>}

          {showLocationDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search locations..."
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredLocations.map((location) => (
                  <div
                    key={location.id}
                    onClick={() => handleLocationSelect(location)}
                    className="p-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{location.name}</div>
                      <div className="text-sm text-gray-600">{location.address}</div>
                    </div>
                    {formData.courtLocation === location.fullName && (
                      <Check className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleNext}
          className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Electronic Signature
        </h2>
        <p className="text-gray-600">
          Upload your electronic signature for document authentication
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md">
          {formData.electronicSignature ? (
            <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{formData.electronicSignature.name}</p>
                  <p className="text-sm text-gray-600">
                    {(formData.electronicSignature.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => handleInputChange('electronicSignature', null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">Upload Electronic Signature</p>
              <p className="text-sm text-gray-600 mb-4">
                PDF, JPEG, or PNG format accepted
              </p>
              <input
                type="file"
                accept=".pdf,.jpeg,.jpg,.png"
                onChange={(e) => handleFileUpload('electronicSignature', e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h4 className="font-medium text-orange-800 mb-2">What is a digital signature?</h4>
        <p className="text-sm text-orange-700">
          This is simply a digital image of a handwritten signature, like a photo or a scan. It's a 
          visual representation of your physical signature.
        </p>
      </div>

      {errors.electronicSignature && (
        <p className="text-red-500 text-sm text-center">{errors.electronicSignature}</p>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleComplete}
          className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors flex items-center space-x-2"
        >
          <span>Save and Proceed to Dashboard</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="w-2/5 bg-gradient-to-br from-green-800 to-green-900 text-white p-12 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-12">
          <img src="./logo.svg" alt="" className="h-20 w-30" /> 
          <img src="./court.svg" alt="" className="h-20 w-30" />
          </div>

          <div className="space-y-6">
            <div className={`flex items-start space-x-4 ${currentStep >= 1 ? '' : 'opacity-50'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep > 1 ? 'bg-white' : currentStep === 1 ? 'bg-white' : 'border-2 border-white border-dashed'
              }`}>
                <span className={`font-bold text-sm ${
                  currentStep > 1 ? 'text-green-800' : currentStep === 1 ? 'text-green-800' : 'text-white'
                }`}>
                  {currentStep > 1 ? '✓' : '1'}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Create Account</h3>
                <p className="text-sm opacity-75">Create a personal CasePort account</p>
              </div>
            </div>

            <div className={`flex items-start space-x-4 ${currentStep >= 2 ? '' : 'opacity-50'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep > 2 ? 'bg-white' : currentStep === 2 ? 'bg-white' : 'border-2 border-white border-dashed'
              }`}>
                <span className={`font-bold text-sm ${
                  currentStep > 2 ? 'text-green-800' : currentStep === 2 ? 'text-green-800' : 'text-white'
                }`}>
                  {currentStep > 2 ? '✓' : '2'}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Validate</h3>
                <p className="text-sm opacity-75">Validate your email address</p>
              </div>
            </div>

            <div className={`flex items-start space-x-4 ${currentStep >= 3 ? '' : 'opacity-30'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? 'bg-white' : 'border-2 border-white border-dashed'
              }`}>
                <span className={`font-bold text-sm ${
                  currentStep >= 3 ? 'text-green-800' : 'text-white'
                }`}>
                  3
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Complete Profile Setup</h3>
                <p className="text-sm opacity-75">Help us secure your account and identity</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-700 bg-opacity-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm font-medium">Contact Us</span>
          </div>
          <p className="text-green-300 text-sm">support@caseport.co</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-3/5 bg-white p-12 flex flex-col justify-center">
        <div className="max-w-lg mx-auto w-full">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoScreen;
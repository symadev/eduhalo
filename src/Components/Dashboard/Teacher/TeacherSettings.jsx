import React, { useState } from 'react';
import { Mail, Save, CheckCircle, User, Settings } from 'lucide-react';

const TeacherSettings = () => {
  const [email, setEmail] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Email save function
  const handleSaveEmail = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Please enter an email address';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setCurrentEmail(email);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] p-4">
      

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 backdrop-blur-sm bg-opacity-95">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-3 rounded-full shadow-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">Teacher Settings</h1>
              <p className="text-gray-600">Update your contact information</p>
            </div>
          </div>
        </div>

        {/* Email Setting Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 backdrop-blur-sm bg-opacity-95">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full">
              <Mail className="h-6 w-6 text-pink-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Contact Email</h2>
          </div>

          {/* Current Email Display */}
          {currentEmail && (
            <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-pink-500" />
                <span className="text-pink-800 font-medium">Current Email:</span>
              </div>
              <p className="text-pink-700 mt-1 ml-7">{currentEmail}</p>
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className={`w-full px-4 py-3 pl-12 border rounded-lg  bg-[#FFEBE5] focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveEmail}
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Save Email</span>
            </button>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mt-4 p-4 bg-gradient-to-r from-pink-100 to-orange-100 border border-pink-300 text-pink-700 rounded-lg flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-pink-500" />
              <span>Email saved successfully!</span>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-lg p-6 mt-6">
          <div className="flex items-start space-x-3">
            <User className="h-6 w-6 text-pink-500 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-pink-800 mb-2">Important Information</h3>
              <ul className="text-pink-700 space-y-1 text-sm">
                <li>• This email address will be visible to Parents</li>
                <li>• Parents can contact you through this email</li>
                <li>• Please check your email regularly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSettings;
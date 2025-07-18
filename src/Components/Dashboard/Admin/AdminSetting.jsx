import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/teacher-1.png"
import { User, Mail, Lock, Save, Shield, Settings, Eye, EyeOff, CheckCircle } from "lucide-react";

const AdminSettings = () => {
  const [adminData, setAdminData] = useState({ name: "", email: "" });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock useEffect for demonstration - replace with your actual axios calls
  useEffect(() => {
    // Simulate loading admin data
    setTimeout(() => {
      setAdminData({ name: "Admin User", email: "admin@school.edu" });
    }, 1000);
  }, []);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!adminData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!adminData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (password && password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const payload = { ...adminData };
      if (password) payload.password = password;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccess(true);
      setPassword("");
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      
    } catch (err) {
      console.error("Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] p-4">
     

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className=" rounded-lg shadow-lg p-6 mb-6 backdrop-blur-sm bg-opacity-95">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full shadow-lg">
              <img src={logo} className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent">
                Admin Settings
              </h1>
              <p className="text-gray-600">Manage your administrative profile</p>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] rounded-lg shadow-lg p-6 backdrop-blur-sm bg-opacity-95">
          <div className="flex items-center space-x-3 mb-6">
           
            <h2 className="text-xl font-bold text-gray-700">Profile Information</h2>
          </div>

          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={adminData.name}
                  onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-purple-50 ${
                    errors.name ? 'border-pink-300 bg-purple-200' : 'border-gray-300 hover:border-purple-300'
                  }`}
                />
                <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={adminData.email}
                  onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-purple-50 ${
                    errors.email ? 'border-pink-300 bg-purple-200' : 'border-gray-300 hover:border-purple-300'
                  }`}
                />
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password (Optional)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className={`w-full px-4 py-3 pl-12 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-purple-50 ${
                    errors.password ? 'border-pink-300 bg-purple-200' : 'border-gray-300 hover:border-purple-300'
                  }`}
                />
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-purple-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.password}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Leave blank to keep current password
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Update Profile</span>
                </>
              )}
            </button>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 text-green-700 rounded-lg flex items-center space-x-2 animate-fade-in">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Profile updated successfully!</span>
            </div>
          )}
        </div>


      </div>
    </div>
  );
};

export default AdminSettings;
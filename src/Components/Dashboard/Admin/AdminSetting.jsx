import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Shield, Settings, Save, AlertCircle, CheckCircle } from 'lucide-react';

const AdminSetting= () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentAdmin, setCurrentAdmin] = useState(null);

  // Load current admin data on component mount
  useEffect(() => {
    fetchCurrentAdmin();
  }, []);

  const fetchCurrentAdmin = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/admin/current', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` // Adjust based on your auth system
        }
      });

      if (response.ok) {
        const adminData = await response.json();
        setCurrentAdmin(adminData);
        setFormData(prev => ({
          ...prev,
          name: adminData.name || '',
          email: adminData.email || ''
        }));
      } else {
        console.error('Failed to fetch admin data');
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
      // Fallback to mock data for development
      const mockCurrentAdmin = {
        name: "John Doe",
        email: "admin@eduhalo.com"
      };
      setCurrentAdmin(mockCurrentAdmin);
      setFormData(prev => ({
        ...prev,
        name: mockCurrentAdmin.name,
        email: mockCurrentAdmin.email
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation (only if password is provided)
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');
    setErrors({});

    try {
      // Prepare data for API call
      const updateData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: 'admin' // Ensure role is set to admin
      };

      // Only include password if it's provided
      if (formData.password) {
        updateData.password = formData.password;
      }

      // Make API call to update admin
      const response = await fetch('/api/admin/update', {
        method: 'PUT', // or 'PATCH' depending on your API design
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` // Adjust based on your auth system
        },
        body: JSON.stringify(updateData)
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Admin settings updated successfully!');
        
        // Update current admin data
        setCurrentAdmin(prev => ({
          ...prev,
          name: formData.name,
          email: formData.email
        }));
        
        // Clear password field after successful update
        setFormData(prev => ({
          ...prev,
          password: ''
        }));
      } else {
        setErrors({ submit: result.message || 'Failed to update settings. Please try again.' });
      }
      
    } catch (error) {
      console.error('Error updating admin:', error);
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (currentAdmin) {
      setFormData({
        name: currentAdmin.name || '',
        email: currentAdmin.email || '',
        password: ''
      });
    }
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] py-8">
      

      <div className="max-w-2xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-4">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent">
              Admin Settings
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            Update admin credentials and manage account settings
          </p>
        </div>

        {/* Current Admin Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-pink-100 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Current Admin</h3>
              <p className="text-gray-600 text-sm">Currently logged in as</p>
            </div>
          </div>
          {currentAdmin && (
            <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl p-4">
              <p className="font-semibold text-gray-800">{currentAdmin.name}</p>
              <p className="text-gray-600">{currentAdmin.email}</p>
              <p className="text-sm text-pink-600 font-medium">Role: Admin</p>
            </div>
          )}
        </div>

        {/* Settings Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-pink-100 shadow-lg">
          <div className="space-y-6">
            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700">{successMessage}</span>
              </div>
            )}

            {/* Error Message */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700">{errors.submit}</span>
              </div>
            )}

            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 ${
                    errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white/70'
                  }`}
                  placeholder="Enter full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white/70'
                  }`}
                  placeholder="Enter email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <p className="text-sm text-gray-600 mb-3">Leave blank to keep current password</p>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 ${
                    errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white/70'
                  }`}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 group relative px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Update Settings
                    </>
                  )}
                </span>
              </button>
              
              <button
                onClick={handleReset}
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-white/90 text-gray-700 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                Reset Changes
              </button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-pink-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-pink-800 mb-2">Security Notice</h4>
              <p className="text-pink-700 text-sm leading-relaxed">
                Admin credentials will be updated with admin role privileges. Make sure to save your new credentials securely. 
                All changes are automatically saved to the database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSetting;
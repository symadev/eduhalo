import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle, User, Settings, AlertTriangle, Star, Mail } from 'lucide-react';

const ParentSettings = () => {
  const [feedbackType, setFeedbackType] = useState('feedback');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!subject.trim()) {
      newErrors.subject = 'Please enter a subject';
    }

    if (!message.trim()) {
      newErrors.message = 'Please enter your message';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    if (feedbackType === 'feedback' && rating === 0) {
      newErrors.rating = 'Please provide a rating';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log({
        type: feedbackType,
        subject,
        message,
        rating: feedbackType === 'feedback' ? rating : null
      });

      // Reset form
      setSubject('');
      setMessage('');
      setRating(0);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  // Star rating component
  const StarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`p-1 rounded transition-colors ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } hover:text-yellow-400`}
          >
            <Star className="h-6 w-6 fill-current" />
          </button>
        ))}
      </div>
    );
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">Parent Settings</h1>
              <p className="text-gray-600">Share your feedback or file a complaint</p>
            </div>
          </div>
        </div>

        {/* Feedback/Complaint Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 backdrop-blur-sm bg-opacity-95">
          {/* Form Type Selection */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">How can we help you?</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => setFeedbackType('feedback')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  feedbackType === 'feedback'
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <MessageSquare className="h-5 w-5" />
                <span>Give Feedback</span>
              </button>
              <button
                onClick={() => setFeedbackType('complaint')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  feedbackType === 'complaint'
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <AlertTriangle className="h-5 w-5" />
                <span>File Complaint</span>
              </button>
            </div>
          </div>

          {/* Rating (only for feedback) */}
          {feedbackType === 'feedback' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate our service?
              </label>
              <StarRating />
              {errors.rating && (
                <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
              )}
            </div>
          )}

          {/* Subject Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={feedbackType === 'feedback' ? 'What would you like to share?' : 'What is your concern about?'}
              className={`w-full px-4 py-3 border  bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent ${
                errors.subject ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
            )}
          </div>

          {/* Message Textarea */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700  mb-2">
              {feedbackType === 'feedback' ? 'Your Feedback' : 'Complaint Details'}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder={feedbackType === 'feedback' 
                ? 'Please share your thoughts, suggestions, or experiences...' 
                : 'Please describe your complaint in detail...'}
              className={`w-full px-4 py-3 border rounded-lg  bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent resize-none ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {message.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <Send className="h-5 w-5" />
            <span>
              {feedbackType === 'feedback' ? 'Submit Feedback' : 'Submit Complaint'}
            </span>
          </button>

          {/* Success Message */}
          {showSuccess && (
            <div className="mt-4 p-4 bg-gradient-to-r from-pink-100 to-orange-100 border border-pink-300 text-pink-700 rounded-lg flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-pink-500" />
              <span>
                {feedbackType === 'feedback' 
                  ? 'Thank you for your feedback! We appreciate your input.' 
                  : 'Your complaint has been submitted. We will review it and get back to you soon.'}
              </span>
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
                <li>• Your feedback helps us improve our services</li>
                <li>• All complaints are reviewed by our admin team</li>
                <li>• We typically respond within 24-48 hours</li>
                <li>• Your privacy and concerns are important to us</li>
              </ul>
            </div>
          </div>
        </div>

     
      </div>
    </div>
  );
};

export default ParentSettings;
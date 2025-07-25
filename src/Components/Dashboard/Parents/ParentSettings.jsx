import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { MessageSquare, Send, CheckCircle, AlertTriangle, Star } from 'lucide-react';


const CREATE_FEEDBACK_OR_COMPLAINT = gql`
  mutation CreateFeedbackOrComplaint($input: FeedbackInput!) {
    createFeedbackOrComplaint(input: $input) {
      success
      message
    }
  }
`;

const ParentSettings = () => {
  const [feedbackType, setFeedbackType] = useState('feedback');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Use mutation hook
  const [createFeedbackOrComplaint, { loading, error }] = useMutation(CREATE_FEEDBACK_OR_COMPLAINT);

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

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const { data } = await createFeedbackOrComplaint({
        variables: {
          input: {
            type: feedbackType,
            subject,
            message,
            rating: feedbackType === 'feedback' ? rating : null,
          },
        },
      });

      if (data.createFeedbackOrComplaint.success) {
        setSubject('');
        setMessage('');
        setRating(0);
        setShowSuccess(true);
        setErrors({});
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        // handle failure, show error message if you want
        alert(data.createFeedbackOrComplaint.message || 'Failed to submit');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('An error occurred while submitting your request.');
    }
  };

  const StarRating = () => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          className={`p-1 rounded transition-colors ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          } hover:text-yellow-400`}
          type="button"
        >
          <Star className="h-6 w-6 fill-current" />
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] p-4">
      <div className="max-w-2xl mx-auto z-10">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6  p-10 justify-center">
          <div className=" rounded-full shadow-lg">
            <img className="w-16 h-16" src="/assets/parent-logo.png" alt="" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent">
              Parent Settings
            </h1>
            <p className="text-gray-700">Share your feedback or file a complaint</p>
          </div>
        </div>

        {/* Form */}
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
                type="button"
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
                type="button"
              >
                <AlertTriangle className="h-5 w-5" />
                <span>File Complaint</span>
              </button>
            </div>
          </div>

          {/* Rating */}
          {feedbackType === 'feedback' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate our service?
              </label>
              <StarRating />
              {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating}</p>}
            </div>
          )}

          {/* Subject */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={
                feedbackType === 'feedback'
                  ? 'What would you like to share?'
                  : 'What is your concern about?'
              }
              className={`w-full px-4 py-3 border bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent ${
                errors.subject ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {feedbackType === 'feedback' ? 'Your Feedback' : 'Complaint Details'}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder={
                feedbackType === 'feedback'
                  ? 'Please share your thoughts, suggestions, or experiences...'
                  : 'Please describe your complaint in detail...'
              }
              className={`w-full px-4 py-3 border rounded-lg bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent resize-none ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            <p className="mt-1 text-sm text-gray-500">{message.length}/500 characters</p>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
            <span>
              {feedbackType === 'feedback' ? 'Submit Feedback' : 'Submit Complaint'}
            </span>
          </button>

          {/* Success message */}
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

          {/* Error message */}
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              Error submitting your request. Please try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentSettings;

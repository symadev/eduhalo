import React, { useEffect, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import MarqueeBanner from "./MarqueeBanner";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch reviews from JSON file
  useEffect(() => {
    fetch('review.json')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(error => {
        console.error('Error fetching reviews:', error);
        // Fallback to empty array if fetch fails
        setReviews([]);
      });
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={20}
        className={`${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        } transition-colors duration-300`}
      />
    ));
  };

  if (reviews.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-[#FFEBE5]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#FFEBE5] py-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-orange-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-12 h-12 bg-pink-300 rounded-full opacity-25 animate-bounce"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-600 rounded-full text-sm font-semibold mb-4 shadow-sm">
            💬 What People Say
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hear from our amazing community of parents, teachers, and students who trust EduHalo
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="relative bg-[#FFF0EA] backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-pink-200">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Testimonial Content */}
            <div className={`text-center transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
              {/* User Avatar */}
              <div className="mb-6">
                <img 
                  className="w-20 h-20 rounded-full mx-auto shadow-lg ring-4 ring-pink-100 object-cover" 
                  src={reviews[currentIndex]?.image} 
                  alt={reviews[currentIndex]?.name}
                />
              </div>

              {/* Star Rating */}
              <div className="flex justify-center mb-6 space-x-1">
                {renderStars(reviews[currentIndex]?.rating)}
              </div>

              {/* Review Message */}
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 italic">
                "{reviews[currentIndex]?.message}"
              </p>

              {/* User Info */}
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                  {reviews[currentIndex]?.name}
                </h3>
                <p className="text-gray-500 font-medium uppercase tracking-wide text-sm">
                  {reviews[currentIndex]?.role}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50"
            >
              <ChevronLeft className="w-6 h-6 text-pink-500" />
            </button>

            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6 text-pink-500" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

      
      </div>
       <MarqueeBanner></MarqueeBanner>
    </div>
  );
};

export default Testimonial;
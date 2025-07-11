import { useState } from "react";

const FeatureDetails = ({ card }) => {
  const { icon, title, description } = card;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full bg-[#FFEBE5] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 border border-gray-100 overflow-hidden">
        {/* Gradient Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Animated Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0.5 bg-white rounded-2xl"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Icon Section */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Icon Container */}
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <img
                  src={icon}
                  alt={title}
                  className="w-14 h-14 object-contain filter group-hover:brightness-110 transition-all duration-300"
                />
              </div>
              
              {/* Floating Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
              
              {/* Floating Particles */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse delay-200"></div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center group-hover:text-purple-600 transition-colors duration-300 leading-tight">
            {title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-center leading-relaxed flex-grow group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>

          {/* Learn More Button */}
          <div className="mt-6 flex justify-center">
            <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:shadow-lg">
              Learn More
            </button>
          </div>

          {/* Animated Progress Bar */}
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-4 right-4 w-8 h-8 border-2 border-purple-200 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-180">
          <div className="absolute inset-1 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-50"></div>
        </div>
        
        <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-pink-200 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 group-hover:rotate-180">
          <div className="absolute inset-1 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full opacity-50"></div>
        </div>

        {/* Ripple Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full group-hover:w-96 group-hover:h-96 transition-all duration-1000 opacity-10"></div>
        </div>

        {/* Floating Number Badge */}
        <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FeatureDetails;
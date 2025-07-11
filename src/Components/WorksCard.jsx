import { useState } from "react";

const WorksCard = ({ card, index }) => {
  const { icon, title, description } = card;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Step Number */}
      <div className="absolute -top-4 -left-4 z-10">
        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
          {index}
        </div>
      </div>

      {/* Main Card */}
      <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-100 overflow-hidden">
        {/* Gradient Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Icon Section */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-orange-100 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-500">
                <img
                  src={icon}
                  alt={title}
                  className="w-12 h-12 object-contain filter group-hover:brightness-110 transition-all duration-300"
                />
              </div>
              
              {/* Floating decoration */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center group-hover:text-pink-600 transition-colors duration-300">
            {title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>

          {/* Animated bottom border */}
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating particles effect */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-pink-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-orange-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300 delay-200"></div>
      </div>

      {/* Connection Line (for desktop) */}
      {index < 4 && (
        <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-0">
          <div className="w-8 h-0.5 bg-gradient-to-r from-pink-300 to-orange-300 relative">
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-pink-400 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorksCard;
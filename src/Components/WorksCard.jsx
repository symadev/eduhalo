import { useState } from "react";

const WorksCard = ({ card, index }) => {
  const { icon, title, description } = card;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative flex items-start gap-6 p-6 rounded-2xl transition-all duration-300 ${
        isHovered ? 'bg-gradient-to-br from-pink-50 via-white to-orange-50 transform -translate-y-1' : 'bg-white'
      } shadow-lg hover:shadow-2xl border border-gray-100`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    
      
      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-3">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className={`w-12 h-12 bg-gradient-to-br from-pink-100 to-orange-100 rounded-xl flex items-center justify-center transition-transform duration-300 ${isHovered ? 'rotate-6' : ''}`}>
              <img
                src={icon}
                alt={title}
                className="w-6 h-6 object-contain filter transition-all duration-300"
              />
            </div>
          </div>
          
          {/* Title */}
          <h3 className={`text-xl font-bold transition-colors duration-300 ${isHovered ? 'text-pink-600' : 'text-gray-800'}`}>
            {title}
          </h3>
        </div>
        
        {/* Description */}
        <p className={`text-gray-600 leading-relaxed transition-colors duration-300 ${isHovered ? 'text-gray-700' : ''}`}>
          {description}
        </p>
      </div>

      {/* Hover Effects */}
      <div className={`absolute inset-0 bg-gradient-to-br from-pink-500/5 to-orange-500/5 rounded-2xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      
      {/* Animated bottom border */}
      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-orange-500 transition-transform duration-500 origin-left ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>
      
      {/* Floating particles effect */}
      <div className={`absolute top-4 right-4 w-2 h-2 bg-pink-300 rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100 animate-ping' : 'opacity-0'}`}></div>
      <div className={`absolute bottom-4 left-4 w-1 h-1 bg-orange-300 rounded-full transition-opacity duration-300 delay-200 ${isHovered ? 'opacity-100 animate-ping' : 'opacity-0'}`}></div>
    </div>
  );
};

export default WorksCard;
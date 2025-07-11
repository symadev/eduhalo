import { useEffect, useState } from "react";
import FeatureDetails from "../Components/FeatureDetails";

const Feature = () => {
  const [cards, setCards] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch('feature.json')
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(error => console.error('Error fetching features:', error));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('feature-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div id="feature-section" className="relative bg-[#FFEBE5] py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-20 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-10 left-20 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute top-1/3 left-10 w-20 h-20 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 right-10 w-24 h-24 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full opacity-15 animate-bounce delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 rounded-full text-sm font-semibold shadow-sm">
              🚀 Powerful Features
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Our Features
            </span>
          </h1>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Discover the comprehensive suite of tools and features designed to enhance your educational experience and keep you connected with your child's academic journey.
          </p>
          
          {/* Decorative elements */}
          <div className="flex justify-center mt-8 space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse delay-200"></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse delay-400"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {cards.map((card, index) => (
            <div
              key={card._id}
              className={`transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <FeatureDetails card={card} />
            </div>
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default Feature;
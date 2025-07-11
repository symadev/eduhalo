import { useEffect, useState } from "react";
import WorksCard from "./WorksCard";

const Works = () => {
  const [cards, setCards] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch('works.json')
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(error => console.error('Error fetching works:', error));
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

    const section = document.getElementById('works-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div id="works-section" className="relative bg-[#FFEBE5] py-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-gray-50 via-white to-pink-100 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-600 rounded-full text-sm font-semibold shadow-sm">
              ⚡ Simple Process
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-gray-800 via-purple-700 to-pink-600 bg-clip-text text-transparent">
              How It Works
            </span>
          </h1>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Get started with EduHalo in just a few simple steps. Our streamlined process makes it easy to connect with your child's education.
          </p>
          
          {/* Decorative line */}
          <div className="flex justify-center mt-8">
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {cards.map((card, index) => (
            <div
              key={card._id}
              className={`transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <WorksCard card={card} index={index + 1} />
            </div>
          ))}
        </div>

      
      </div>
    </div>
  );
};

export default Works;
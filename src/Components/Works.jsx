import { useEffect, useState } from "react";
import WorksCard from "./WorksCard";
import image from "../assets/images/teacher.png"

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
    <div id="works-section" className="relative bg-[#FFEBE5] py-12 overflow-hidden">
      {/* Enhanced Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-8 w-72 h-72 bg-gradient-to-br from-orange-300 to-pink-300 rounded-full opacity-40 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-80 h-80 bg-gradient-to-br from-purple-300 to-blue-300 rounded-full opacity-40 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-300 to-indigo-300 rounded-full opacity-30 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-orange-400 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-pink-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-5 h-5 bg-purple-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Enhanced Image */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-lg">
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-orange-400 to-purple-400 rounded-3xl opacity-20 blur-lg"></div>
              
              {/* Main image container */}
              <div className=" transform hover:scale-105 transition-transform duration-300">
                <img
                  src={image}
                  alt="How it works illustration"
                  className="w-full h-full object-contain"
                />
               
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full shadow-lg animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>

          {/* Right Side - Steps */}
          <div className="space-y-6">
            {/* Header Section */}
            <div className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-block mb-4">
                <span className="px-6 py-3 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-600 rounded-full text-sm font-semibold shadow-lg border border-pink-200 hover:shadow-xl transition-shadow duration-300">
                  ⚡ Simple Process
                </span>
              </div>
             
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
                <span className="text-gray-900">How To </span>
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Works</span>
              </h1>
             
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Get started with EduHalo in just a few simple steps. Our streamlined process makes it easy to connect with your child's education.
              </p>
             
              {/* Enhanced decorative line */}
              <div className="flex justify-center lg:justify-start mb-2">
                <div className="w-32 h-1 bg-gradient-to-r from-pink-500 via-orange-500 to-purple-500 rounded-full relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-orange-500 to-purple-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Steps Cards */}
            <div className="space-y-4">
              {cards.map((card, index) => (
                <div
                  key={card._id}
                  className={`transition-all duration-700 transform hover:scale-105 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <WorksCard card={card} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
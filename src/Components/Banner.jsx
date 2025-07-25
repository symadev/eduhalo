
import { useState, useEffect } from 'react';

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] py-20 mt-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-pink-300 rounded-full opacity-25 animate-bounce delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-10 flex flex-col-reverse md:flex-row items-center gap-12 relative z-10">
        {/* Left text content */}
        <div className={`md:w-1/2 text-center md:text-left m-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-600 rounded-full text-sm font-semibold mb-4 shadow-sm">
              🎓 Educational Excellence
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            <span className="bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent">
              Stay Connected
            </span>
            <br />
            <span className="text-[#111430]">With Your</span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              Children's Education
            </span>
          </h1>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-lg">
            Stay connected with your school — view results, class updates, and teacher content all in one place with
            <span className="font-semibold text-pink-600"> EduHalo</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => {
                const section = document.getElementById("works");//use here the dom , which is find the element by the id
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                See How To Works
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>



          </div>


        </div>

        {/* Right image */}
        <div className={`md:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative group">
            {/* Floating Elements */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-pink-400 to-orange-400 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>

            {/* Main Image Container */}
            <div className="relative p-4  group-hover:shadow-3xl transition-all duration-300 transform group-hover:scale-105">
              <img
                src="/assets/banner.png"
                alt="Educational Platform"
                className="w-full h-auto "
              />

              {/* Overlay gradient */}
              <div className="absolute inset-4 bg-gradient-to-t from-black/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Floating notification cards */}
              <div className="absolute top-8 right-8 bg-white rounded-lg shadow-lg p-3 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600">New Assignment</span>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 bg-white rounded-lg shadow-lg p-3 transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600">Grade Updated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
import { Link } from "react-router-dom";
import image from "../assets/images/hat.png";
import { useState } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  // Modal visibility states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Functions to open/close modals
  const openLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const openRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const closeLogin = () => setShowLoginModal(false);
  const closeRegister = () => setShowRegisterModal(false);

  return (
    <div className="bg-gradient-to-r from-[#FFF8F5] via-[#FFF0EA] to-[#FFF8F5] shadow-lg backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-pink-100">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <img
              className="w-12 h-12 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 drop-shadow-md"
              src={image}
              alt="Logo"
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 bg-clip-text text-transparent leading-tight tracking-wide">
            EduHalo
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-2 items-center">
          <a
            href="#home"
            className="relative px-4 py-2 text-gray-700 font-medium transition-all duration-300 hover:text-pink-600 group"
          >
            <span className="relative z-10">Home</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-orange-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>

          <a
            href="#features"
            className="relative px-4 py-2 text-gray-700 font-medium transition-all duration-300 hover:text-pink-600 group"
          >
            <span className="relative z-10">Features</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-orange-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>

          <a
            href="#contact"
            className="relative px-4 py-2 px-4 py-2 text-gray-700 font-medium transition-all duration-300 hover:text-pink-600 group "
            onClick={() => setIsMenuOpen(false)} // for mobile
          >
            Contact
          </a>

          <button
            onClick={openLogin}
            className="ml-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-pink-600 hover:to-orange-600"
          >
            Login/SignUp
          </button>
        </div>


        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1 p-2 rounded-lg hover:bg-pink-50 transition-colors duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>
      </div>





      {/* Login Modal */}
      <Login
        isOpen={showLoginModal}
        onRequestClose={closeLogin}
        openRegister={openRegister} // So Login modal can open Register modal
      />

      {/* Register Modal */}
      <SignUp
        isOpen={showRegisterModal}
        onRequestClose={closeRegister}
        openLogin={openLogin} // So Register modal can open Login modal
      />

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t border-pink-100 transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 py-4 space-y-2">
          <a
            href="#home"
            className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 hover:text-pink-600 transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            HOME
          </a>
          <a
            href="#features"
            className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 hover:text-pink-600 transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#contact"
            className="..."
            onClick={() => setIsMenuOpen(false)} // for mobile
          >
            Contact
          </a>
          <Link
            to="/login"
            className="block mx-4 mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-full text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Login/SignUp
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
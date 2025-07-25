import { Link } from "react-router-dom";

import { useState, useContext } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { AuthContext } from "./Context/AuthContext";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const { user } = useContext(AuthContext);
  const role = user?.role;

  const dashboardRoute =
    role === "parent"
      ? "/dashboard/parent"
      : role === "teacher"
        ? "/dashboard/teacher"
        : role === "admin"
          ? "/dashboard/admin"
          : "/";

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="bg-gradient-to-r from-[#FFF8F5] via-[#FFF0EA] to-[#FFF8F5] shadow-lg backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-pink-100">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <img
              className="w-12 h-12 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 drop-shadow-md"
              src="/assets/hat.png"
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
          <a href="#home" className="px-4 py-2 text-gray-700 font-medium hover:text-pink-600 transition">
            Home
          </a>
          <a href="#features" className="px-4 py-2 text-gray-700 font-medium hover:text-pink-600 transition">
            Features
          </a>
          <a href="#testimonials" className="px-4 py-2 text-gray-700 font-medium hover:text-pink-600 transition">
            Testimonials
          </a>
          <a href="#contact" className="px-4 py-2 text-gray-700 font-medium hover:text-pink-600 transition">
            Contact
          </a>

          {user ? (
            <>
              {user && user.role === "parent" && <NotificationBell />}

              <Link
                to={dashboardRoute}
                className="px-4 py-2 text-gray-700 font-medium hover:text-pink-600 transition"
              >
                Dashboard ({role})
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 bg-red-400 text-white rounded-full hover:bg-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={openLogin}
              className="ml-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-pink-600 hover:to-orange-600"
            >
              Login/SignUp
            </button>
          )}
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

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t border-pink-100 transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 py-4 space-y-2">
          <a href="#home" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-pink-600">Home</a>
          <a href="#features" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-pink-600">Features</a>
          <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-pink-600">Testimonials</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-pink-600">Contact</a>

          {user ? (
            <>
              {user && user.role === "parent" && <NotificationBell />}

              <Link
                to={dashboardRoute}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:text-pink-600"
              >
                Dashboard ({role})
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                openLogin();
                setIsMenuOpen(false);
              }}
              className="block mx-4 mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-full text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Login/SignUp
            </button>
          )}
        </div>
      </div>

      {/* Modals */}
      <Login
        isOpen={showLoginModal}
        onRequestClose={closeLogin}
        openRegister={openRegister}
      />
      <SignUp
        isOpen={showRegisterModal}
        onRequestClose={closeRegister}
        openLogin={openLogin}
      />
    </div>
  );
};

export default Navbar;

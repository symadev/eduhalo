import Modal from "react-modal";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

import { Link, useNavigate } from "react-router-dom";

// here root is the main dom element of my app
Modal.setAppElement("#root");

const Login = ({ isOpen, onRequestClose, openRegister }) => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signIn(email, password); 
      toast.success("Login Successful");
      onRequestClose();
      navigate("/");
    } catch (err) {
      toast.error("Login Failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login"
      overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
      className="bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] text-gray-800 p-6 rounded-2xl w-full max-w-sm border border-pink-200/50 relative shadow-xl"
    >
      <button
        onClick={onRequestClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-pink-600 text-xl transition-colors duration-200"
      >
        &times;
      </button>

      <div className="text-center mb-6">
        <div className="inline-block p-2 rounded-full bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 mb-3 shadow-md">
          <img className="w-8 h-8" src="/assets/hat.png" alt="logo" />
        </div>
        <h2 className="text-2xl font-bold text-[#111430] mb-1">
          Welcome to EduHalo
        </h2>
        <p className="text-sm text-gray-600">Access your educational portal</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-3 py-2 bg-white/80 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 text-gray-800"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full px-3 py-2 bg-white/80 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 text-gray-800"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-md"
        >
          Login to EduHalo
        </button>
      </form>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <Link to="/forgot-password" className="hover:text-pink-600 transition-colors duration-200">
          Forgot Password?
        </Link>
        <button
          type="button"
          onClick={() => {
            onRequestClose();
            openRegister();
          }}
          className="hover:text-pink-600 transition-colors duration-200"
        >
          Sign Up
        </button>
      </div>
    </Modal>
  );
};

export default Login;

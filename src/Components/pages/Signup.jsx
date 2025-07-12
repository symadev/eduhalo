import Modal from "react-modal";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

import { toast } from "react-toastify";
import logo from "../../assets/images/hat.png"

Modal.setAppElement("#root");

const SignUp = ({ isOpen, onRequestClose, openLogin }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();


 // SignUp.jsx
const { createUser } = useContext(AuthContext);

const onSubmit = async (data) => {
  try {
    const res = await createUser(data.name, data.email, data.password, data.role);
    if (res.success) {
      toast.success("SignUp Done!");
      reset();
      onRequestClose();
      navigate("/");
    } else {
      toast.error("Signup failed: " + res.message);
    }
  } catch (err) {
    toast.error("Signup error: " + err.message);
  }
};



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Register"
      overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
      className="bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] text-gray-800 p-6 rounded-2xl w-full max-w-sm border border-pink-200/50 relative shadow-xl"
    >
      <button
        onClick={onRequestClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-pink-600 text-xl transition-colors duration-200"
      >
        &times;
      </button>

      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-block p-2 rounded-full bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 mb-3 shadow-md">
         <img className="w-8 h-8" src={logo} alt="" />
           
         
        </div>
        <h2 className="text-2xl font-bold text-[#111430] mb-1">
          Join EduHalo
        </h2>
        <p className="text-sm text-gray-600">
          Create your educational account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm text-gray-700 mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="John Doe"
            className="w-full px-3 py-2 bg-white/80 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 text-gray-800"
          />
          {errors.name && <p className="text-pink-600 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-700 mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="you@example.com"
            className="w-full px-3 py-2 bg-white/80 border border-pink-200 rounded-lg  focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 text-gray-800"
          />
          {errors.email && <p className="text-pink-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-700 mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            placeholder="••••••••"
            className="w-full px-3 py-2 bg-white/80 border border-pink-200 rounded-lg  focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 text-gray-800"
          />
          {errors.password && <p className="text-pink-600 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-md"
        >
           SignUp
        </button>
      </form>

      {/* Redirect to Login */}
      <p className="text-center text-sm mt-4 text-gray-600">
        Already have an account?
        <button
          type="button"
          onClick={() => {
            onRequestClose();
            openLogin();
          }}
          className="ml-1 underline text-pink-600 hover:text-pink-700 transition-colors duration-200"
        >
          Login
        </button>
      </p>
    </Modal>
  );
};

export default SignUp;
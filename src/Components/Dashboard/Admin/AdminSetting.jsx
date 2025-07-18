import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UseAxiosSecure from "../../Context/UseAxiosSecure";

const AdminSettings = () => {
  const [adminData, setAdminData] = useState({ name: "", email: "", role: "admin" });
  const [password, setPassword] = useState("");

  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/admin/current")
      .then((res) => {
        setAdminData({ name: res.data.name, email: res.data.email, role: res.data.role });
      })
      .catch(() => toast.error("Failed to load admin info"));
  }, []);

 const handleAssignAdmin = async (e) => {
  e.preventDefault();
  try {
    const res = await axiosSecure.put("/admin/assign-admin", { email: adminData.email });
    toast.success(res.data.message || "Admin role assigned successfully");
  } catch (error) {
    toast.error("Failed to assign admin role");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-6">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-gray-800">Admin</span>{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Settings</span>
          </h1>
          <p className="text-gray-600 text-lg">Manage your account settings and preferences</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-3xl">A</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleAssignAdmin} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">N</span>
                </div>
                <input
                  type="text"
                  value={adminData.name}
                  onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
                  placeholder="Name"
                  className="w-full pl-14 pr-4 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-purple-400 to-orange-400 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">@</span>
                </div>
                <input
                  type="email"
                  value={adminData.email}
                  onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                  placeholder="Email"
                  className="w-full pl-14 pr-4 py-4 bg-gradient-to-r from-purple-50 to-orange-50 border border-purple-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">New Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-pink-400 to-orange-400 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">🔒</span>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password (optional)"
                  className="w-full pl-14 pr-4 py-4 bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2 ml-2">Leave blank to keep current password</p>
            </div>

            {/* Submit */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold px-12 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

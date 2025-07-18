import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UseAxiosSecure from "../../Context/UseAxiosSecure";

const ManageParents = () => {
  const axiosSecure = UseAxiosSecure();

  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setIsVisible(true);
    fetchParents();
  }, []);

  // Fetch parents from backend
  const fetchParents = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/admin/parents");
      setParents(res.data);
    } catch (err) {
      toast.error("Failed to fetch parents");
    }
    setLoading(false);
  };

  // Add new parent
  const handleAddParent = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error("Name and email are required");
      return;
    }

    try {
      await axiosSecure.post("/admin/parents", {
        name,
        email,
        phone,
        password: "123456", // set password by default
      });

      toast.success("Parent added successfully!");
      setName("");
      setEmail("");
      setPhone("");
      fetchParents();
    } catch (err) {
      toast.error(err.response?.data?.message || "Add failed");
    }
  };

  // Delete parent
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this parent?")) return;

    try {
      await axiosSecure.delete(`/admin/parents/${id}`);

      toast.success("Parent deleted");
      fetchParents();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-pink-300 rounded-full opacity-25 animate-bounce delay-500"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-pink-100 to-orange-100 rounded-full opacity-10 animate-pulse delay-700"></div>
        <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full opacity-15 animate-pulse delay-300"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-600 rounded-full text-sm font-semibold shadow-sm">
              👨‍👩‍👧‍👦 Parent Management
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            <span className="bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent">
              Manage Parents
            </span>
          </h1>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Connect and manage parent accounts with 
            <span className="font-semibold text-pink-600"> EduHalo's</span> comprehensive parent management system.
          </p>
        </div>

        {/* Add Parent Form */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
              Add New Parent
            </h2>
            
            <form onSubmit={handleAddParent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-gray-700 font-semibold text-sm">Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter parent's full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-pink-100 rounded-xl focus:border-pink-300 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-gray-700 font-semibold text-sm">Email Address *</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-pink-100 rounded-xl focus:border-pink-300 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-gray-700 font-semibold text-sm">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter phone number (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-pink-100 rounded-xl focus:border-pink-300 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                />
              </div>
              
              <div className="flex items-end">
                <button
                  type="submit"
                  className="group relative w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Add Parent
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </form>
            
            {/* Info Box */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Default Password Info</p>
                  <p className="text-xs text-gray-600">New parent accounts will be created with default password: <span className="font-mono bg-gray-100 px-2 py-1 rounded">123456</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parents List */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-100 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-orange-500 px-8 py-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Registered Parents
                <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-sm">
                  {parents.length} {parents.length === 1 ? 'Parent' : 'Parents'}
                </span>
              </h3>
            </div>
            
            <div className="p-8">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                  <span className="ml-3 text-gray-600">Loading parents...</span>
                </div>
              ) : parents.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <p className="text-gray-600 text-lg">No parents found</p>
                  <p className="text-gray-500 text-sm mt-2">Add your first parent using the form above</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-pink-100 to-orange-100">
                        <th className="px-6 py-4 text-left text-gray-700 font-semibold rounded-tl-xl">Name</th>
                        <th className="px-6 py-4 text-left text-gray-700 font-semibold">Email</th>
                        <th className="px-6 py-4 text-left text-gray-700 font-semibold">Phone</th>
                        <th className="px-6 py-4 text-left text-gray-700 font-semibold">Status</th>
                        <th className="px-6 py-4 text-left text-gray-700 font-semibold rounded-tr-xl">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-100">
                      {parents.map((parent, index) => (
                        <tr key={parent._id} className="hover:bg-pink-50/50 transition-colors duration-200 group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold">
                                {parent.name?.charAt(0)?.toUpperCase() || 'P'}
                              </div>
                              <span className="font-medium text-gray-900">{parent.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span className="text-gray-600">{parent.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {parent.phone ? (
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-gray-600">{parent.phone}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400 italic">Not provided</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-medium">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDelete(parent._id)}
                              className="group/btn relative px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden"
                            >
                              <span className="relative z-10 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageParents;
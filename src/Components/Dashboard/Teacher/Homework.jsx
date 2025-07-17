import React, { useState, useContext } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../../Context/AuthContext";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const ADD_HOMEWORK = gql`
  mutation AddHomework($input: HomeworkInput!) {
    addHomework(input: $input) {
      _id
      subject
      class
      description
      dueDate
      createdBy {
        name
      }
    }
  }
`;

const GET_HOMEWORKS = gql`
  query HomeworksByTeacher($teacherId: ID!) {
    homeworksByTeacher(teacherId: $teacherId) {
      _id
      subject
      description
      class
      dueDate
      createdBy {
        name
      }
    }
  }
`;

const DELETE_HOMEWORK = gql`
  mutation DeleteHomework($id: ID!) {
    deleteHomework(id: $id) {
      success
      message
    }
  }
`;

const Homework = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading user info...</div>;
  }

  const [formData, setFormData] = useState({
    subject: "",
    class: "",
    description: "",
    dueDate: "",
    createdBy: user._id,
  });

  const { data, loading, error, refetch } = useQuery(GET_HOMEWORKS, {
    variables: { teacherId: user._id },
    skip: !user._id,
  });

  const [addHomework, { loading: adding }] = useMutation(ADD_HOMEWORK);
  const [deleteHomework] = useMutation(DELETE_HOMEWORK);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addHomework({ variables: { input: formData } });
      toast.success("Homework added successfully");
      setFormData({
        subject: "",
        class: "",
        description: "",
        dueDate: "",
        createdBy: user._id,
      });
      await refetch({ teacherId: user._id });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add homework");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHomework({ variables: { id } });
      toast.success("Homework deleted");
      await refetch({ teacherId: user._id });
    } catch (err) {
      toast.error("Failed to delete homework");
    }
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error loading homeworks</div>;

  return (
    <div className="relative bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] py-10  overflow-hidden">
      

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-600 rounded-full text-sm font-semibold mb-4 shadow-sm">
              📝 Homework Management
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            <span className="bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent">
              Homework
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              Assignment Hub
            </span>
          </h1>
          
          <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            Create and manage homework assignments for your students. Keep track of due dates and 
            <span className="font-semibold text-pink-600"> organize your teaching workflow</span>.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative bg-white/70 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-pink-200/50 mb-8 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-300/20 to-orange-300/20 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-300/20 to-pink-300/20 rounded-full -ml-12 -mb-12"></div>
          
         

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <label className="flex items-center gap-2 text-sm text-[#111430] mb-3 font-semibold">
                  <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Subject
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g., Mathematics, Science, English"
                    className="w-full px-5 py-4 bg-white/90 border-2 border-pink-200/50 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-400/30 focus:border-pink-400 transition-all duration-300 text-gray-800 shadow-lg hover:shadow-xl group-hover:border-pink-300"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              
              <div className="group">
                <label className="flex items-center gap-2 text-sm text-[#111430] mb-3 font-semibold">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Class
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g., Grade 5A, Class 10B"
                    className="w-full px-5 py-4 bg-white/90 border-2 border-pink-200/50 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-400/30 focus:border-pink-400 transition-all duration-300 text-gray-800 shadow-lg hover:shadow-xl group-hover:border-pink-300"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    required
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>
            
            <div className="group">
              <label className="flex items-center gap-2 text-sm text-[#111430] mb-3 font-semibold">
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Assignment Description
              </label>
              <div className="relative">
                <textarea
                  placeholder="Provide detailed instructions for the homework assignment. Include learning objectives, required materials, and submission guidelines..."
                  className="w-full px-5 py-4 bg-white/90 border-2 border-pink-200/50 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-400/30 focus:border-pink-400 transition-all duration-300 text-gray-800 h-40 resize-none shadow-lg hover:shadow-xl group-hover:border-pink-300"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
            
            <div className="group">
              <label className="flex items-center gap-2 text-sm text-[#111430] mb-3 font-semibold">
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Due Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full px-5 py-4 bg-white/90 border-2 border-pink-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-400/30 focus:border-pink-400 transition-all duration-300 text-gray-800 shadow-lg hover:shadow-xl group-hover:border-pink-300"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  required
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="group relative w-full py-5 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={adding}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {adding ? (
                    <>
                      <Loader2 className="animate-spin w-6 h-6" />
                      Creating Assignment...
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create Homework Assignment
                      <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Button shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </div>
              </button>
            </div>
          </form>
        </div>

        {/* Homework List */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#111430]">My Homework Assignments</h3>
          </div>
          
          {data?.homeworksByTeacher.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-block p-4 rounded-full bg-gradient-to-r from-pink-100 to-orange-100 mb-4">
                <svg className="w-16 h-16 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No homework assignments yet</p>
              <p className="text-gray-400 text-sm mt-2">Create your first assignment using the form above</p>
            </div>
          ) : (
            <div className="space-y-4">
              {data?.homeworksByTeacher.map((hw) => (
                <div key={hw._id} className="group bg-white/80 border border-pink-200/50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:border-pink-300">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-600 rounded-full text-sm font-semibold shadow-sm">
                          {hw.subject}
                        </span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-[#111430] font-semibold bg-white/80 px-2 py-1 rounded-lg">
                          {hw.class}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">{hw.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium">Due: {hw.dueDate}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="font-medium">By: {hw.createdBy?.name}</span>
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(hw._id)}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 hover:bg-red-50 p-3 rounded-xl transition-all duration-300 transform hover:scale-110"
                      title="Delete Homework"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homework;
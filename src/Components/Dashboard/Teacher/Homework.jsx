import React, { useState, useContext } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../../Context/AuthContext";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const ADD_HOMEWORK = gql`
  mutation AddHomework($input: AddHomeworkInput!) {
    addHomework(input: $input) {
      _id
      title
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
      title
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

  const [formData, setFormData] = useState({
    title: "",
    class: "",
    description: "",
    dueDate: "",
  });

  const { data, loading, error, refetch } = useQuery(GET_HOMEWORKS, {
    variables: { teacherId: user?._id },
    skip: !user?._id,
  });

  const [addHomework, { loading: adding }] = useMutation(ADD_HOMEWORK);
  const [deleteHomework] = useMutation(DELETE_HOMEWORK);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addHomework({
        variables: {
          input: { ...formData, createdBy: user._id },
        },
      });
      toast.success("Homework added successfully");
      setFormData({
        title: "",
        class: "",
        description: "",
        dueDate: "",
      });
      await refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add homework");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHomework({ variables: { id } });
      toast.success("Homework deleted");
      await refetch();
    } catch (err) {
      toast.error("Failed to delete homework");
    }
  };

  if (!user) return <div>Loading user info...</div>;
  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error loading homeworks</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] rounded-2xl shadow-xl mt-6 border border-pink-200/50">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block p-3 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 mb-4 shadow-md">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-[#111430] mb-2">Add Homework</h2>
        <p className="text-gray-600">Create and manage homework assignments</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1 font-medium">title</label>
            <input
              type="text"
              placeholder="Mathematics"
              className="w-full px-3 py-2 bg-white/80 border border-pink-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 text-gray-800"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1 font-medium">Class</label>
            <input
              type="text"
              placeholder="Grade 5A"
              className="w-full px-3 py-2 bg-white/80 border border-pink-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 text-gray-800"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-gray-700 mb-1 font-medium">Description</label>
          <textarea
            placeholder="Homework description..."
            className="w-full px-3 py-2 bg-white/80 border border-pink-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 text-gray-800 h-24 resize-none"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-700 mb-1 font-medium">Due Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 bg-white/80 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 text-gray-800"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={adding}
        >
          {adding ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-5 h-5" />
              Adding...
            </span>
          ) : (
            "📝 Add Homework"
          )}
        </button>
      </form>

      {/* Homework List */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
        <h3 className="text-2xl font-bold text-[#111430] mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          My Homeworks
        </h3>
        
        {data?.homeworksByTeacher.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>No homework assignments yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data?.homeworksByTeacher.map((hw) => (
              <div key={hw._id} className="bg-white/80 border border-pink-200/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-2 py-1 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-600 rounded-full text-xs font-semibold">
                        {hw.title}
                      </span>
                      <span className="text-sm text-gray-500">Class:</span>
                      <span className="text-sm text-gray-600 font-medium">{hw.class}</span>
                    </div>
                    <p className="text-gray-800 mb-2">{hw.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Due: {hw.dueDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        By: {hw.createdBy?.name}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(hw._id)}
                    className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                    title="Delete Homework"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homework;
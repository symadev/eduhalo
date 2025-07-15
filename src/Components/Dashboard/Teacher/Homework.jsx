import { useState, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { AuthContext } from "../../Context/AuthContext";

// GraphQL Queries & Mutations
const GET_HOMEWORKS = gql`
  query {
    homeworks {
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

const ADD_HOMEWORK = gql`
  mutation AddHomework($input: AddHomeworkInput!) {
    addHomework(input: $input) {
      _id
      title
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
  const [form, setForm] = useState({
    title: "",
    description: "",
    class: "",
    dueDate: "",
  });

  const { data, loading, error, refetch } = useQuery(GET_HOMEWORKS);
  const [addHomework] = useMutation(ADD_HOMEWORK);
  const [deleteHomework] = useMutation(DELETE_HOMEWORK);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addHomework({
        variables: {
          input: {
            ...form,
            createdBy: user._id,
          },
        },
      });
      setForm({ title: "", description: "", class: "", dueDate: "" });
      refetch();
    } catch (err) {
      console.error("Add Homework Error", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this homework?")) return;
    try {
      const res = await deleteHomework({ variables: { id } });
      if (res?.data?.deleteHomework?.success) {
        refetch();
      } else {
        alert("Delete failed: " + (res?.data?.deleteHomework?.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Delete Homework Error", err.message);
    }
  };

  if (loading) return (
    <div className="bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] min-h-screen p-8">
      <p className="text-pink-600 font-semibold text-lg">Loading...</p>
    </div>
  );

  if (error) return (
    <div className="bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] min-h-screen p-8">
      <p className="text-red-500 font-semibold text-lg">Error fetching homeworks</p>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-600 rounded-full text-sm font-semibold mb-4 shadow-sm">
          📝 Assignment Manager
        </span>
        <h1 className="text-4xl font-extrabold">
          <span className="bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent">
            Homework Manager
          </span>
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-pink-100/50 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#111430]">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter homework title"
              required
              className="w-full bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#111430]">Class</label>
            <input
              type="text"
              value={form.class}
              onChange={(e) => setForm({ ...form, class: e.target.value })}
              placeholder="Enter class name"
              required
              className="w-full bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#111430]">Due Date</label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              required
              className="w-full bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:bg-white"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-[#111430]">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Enter homework description"
              required
              rows="4"
              className="w-full bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:bg-white resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg"
        >
          Add Homework
        </button>
      </form>

      {/* Homework List */}
      <div>
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 rounded-full text-sm font-semibold mb-4 shadow-sm">
            📋 Assignment List
          </span>
          <h2 className="text-2xl font-bold text-[#111430]">Current Assignments</h2>
        </div>

        {data?.homeworks?.length > 0 ? (
          <div className="space-y-4">
            {data.homeworks.map((hw) => (
              <div
                key={hw._id}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-pink-100/50"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        {hw.title.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#111430]">{hw.title}</h3>
                        <span className="text-sm text-pink-600 font-medium">Class {hw.class}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-gray-600">
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                        <strong className="text-[#111430]">Due:</strong> {hw.dueDate}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                        <strong className="text-[#111430]">Description:</strong> {hw.description}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        <strong className="text-[#111430]">By:</strong> {hw.createdBy?.name || 'Unknown'}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(hw._id)}
                    className="ml-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl font-medium shadow-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-pink-100/50 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No homework assigned yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homework;
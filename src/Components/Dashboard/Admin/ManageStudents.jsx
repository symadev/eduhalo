
import {  useEffect, useState } from "react";


import UseAxiosSecure from "../../Context/UseAxiosSecure";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [parents, setParents] = useState([]);
    const axiosSecure = UseAxiosSecure ();

  const [form, setForm] = useState({
    name: "",
    class: "",
    roll: "",
    section: "",
    assignedTeacher: "",
    assignedParent: "",
  });

  

  // Fetch teachers and parents
useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axiosSecure.get("/users?role=teacher");
        setTeachers(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
      }
    };

    const fetchParents = async () => {
      try {
        const res = await axiosSecure.get("/users?role=parent");
        setParents(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch parents:", error);
      }
    };

    fetchTeachers();
    fetchParents();
  }, [axiosSecure]);
  

  //  Add new student
  const handleAddStudent = (e) => {
    e.preventDefault();

    try {
      const newStudent = {
        _id: Date.now().toString(),
        ...form
      };
      setStudents((prev) => [...prev, newStudent]);

      // Reset form
      setForm({
        name: "",
        class: "",
        roll: "",
        section: "",
        assignedTeacher: "",
        assignedParent: "",
      });
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };

  // ✅ Delete student
  const handleDelete = (id) => {
    try {
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] py-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-pink-300 rounded-full opacity-25"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-600 rounded-full text-sm font-semibold mb-4 shadow-sm">
            🎓 Student Management
          </span>
          <h2 className="text-4xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent">
              Manage Students
            </span>
          </h2>
        </div>

        {/* Student Form */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-pink-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Student Name</label>
                <input
                  type="text"
                  placeholder="Enter student name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Class</label>
                <input
                  type="text"
                  placeholder="Enter class"
                  value={form.class}
                  onChange={(e) => setForm({ ...form, class: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Roll</label>
                <input
                  type="text"
                  placeholder="Enter roll number"
                  value={form.roll}
                  onChange={(e) => setForm({ ...form, roll: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Section</label>
                <input
                  type="text"
                  placeholder="Enter section"
                  value={form.section}
                  onChange={(e) => setForm({ ...form, section: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Assigned Teacher</label>
                <select
                  value={form.assignedTeacher}
                  onChange={(e) => setForm({ ...form, assignedTeacher: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Assigned Parent</label>
                <select
                  value={form.assignedParent}
                  onChange={(e) => setForm({ ...form, assignedParent: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select Parent</option>
                  {parents.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button 
                onClick={handleAddStudent}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full font-semibold shadow-lg"
              >
                <span className="flex items-center gap-2">
                  Add Student
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="space-y-4">
          {Array.isArray(students) && students.length > 0 ? (
            students.map((s) => (
              <div
                key={s._id}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-pink-100"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-[#111430] to-purple-600 bg-clip-text text-transparent mb-2">
                      {s.name}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        Class: {s.class}
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        Roll: {s.roll}
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        Section: {s.section}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(s._id)} 
                    className="px-6 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-full font-semibold shadow-md"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No students available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;
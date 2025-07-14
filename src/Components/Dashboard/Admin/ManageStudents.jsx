import { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_STUDENTS = gql`
  query {
    students {
      _id
      name
      class
      roll
      section
      assignedTeacher { name }
      assignedParent { name }
    }
  }
`;

const ADD_STUDENT = gql`
  mutation AddStudent($input: AddStudentInput!) {
    addStudent(input: $input) {
      _id
      name
    }
  }
`;

const GET_TEACHERS = gql`
  query {
    teachers {
      _id
      name
    }
  }
`;

const GET_PARENTS = gql`
  query {
    parents {
      _id
      name
    }
  }
`;



const ManageStudents = () => {
  const [form, setForm] = useState({
    name: "",
    class: "",
    roll: "",
    section: "",
    assignedTeacher: "",
    assignedParent: "",
  });

  const { data: studentData, refetch } = useQuery(GET_STUDENTS);
  const { data: teacherData } = useQuery(GET_TEACHERS);
  const { data: parentData } = useQuery(GET_PARENTS);
  const [addStudent] = useMutation(ADD_STUDENT);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await addStudent({
        variables: { input: form },
        onCompleted: () => {
          refetch();
          setForm({
            name: "",
            class: "",
            roll: "",
            section: "",
            assignedTeacher: "",
            assignedParent: "",
          });
        },
      });
    } catch (error) {
      console.error("Add Student Error", error);
    }
  };

  const handleDelete = (id) => {
    // You can implement deleteStudent mutation similarly
    alert("Delete mutation not implemented yet");
  };

  const students = studentData?.students || [];
  const teachers = teacherData?.teachers || [];
  const parents = parentData?.parents || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] py-8">
      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
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

        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-pink-100">
            <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Student Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="px-4 py-3 border-3 border-pink-200  bg-[#FFEBE5] rounded-xl border" />
              <input type="text" placeholder="Class" value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })} required className="px-4 py-3  border-3 border-pink-200 bg-[#FFEBE5] rounded-xl border" />
              <input type="text" placeholder="Roll" value={form.roll} onChange={(e) => setForm({ ...form, roll: e.target.value })} required className="px-4 py-3 border-3 border-pink-200 bg-[#FFEBE5] rounded-xl border" />
              <input type="text" placeholder="Section" value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} required className="px-4 py-3 border-3 border-pink-200 bg-[#FFEBE5] rounded-xl border" />

              <select value={form.assignedTeacher} onChange={(e) => setForm({ ...form, assignedTeacher: e.target.value })} required className="px-4 py-3 bg-[#FFEBE5] border-3 border-pink-200 rounded-xl border">
                <option value="">Select Teacher</option>
                {teachers.map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
              <select value={form.assignedParent} onChange={(e) => setForm({ ...form, assignedParent: e.target.value })} required className="px-4 py-3 border-3 border-pink-200 bg-[#FFEBE5] rounded-xl border">
                <option value="">Select Parent</option>
                {parents.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
              </select>

              <button type="submit" className="col-span-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full px-8 py-4 font-semibold shadow-lg">
                Add Student
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-4">
          {students.length > 0 ? (
            students.map((s) => (
              <div key={s._id} className="bg-white/80 p-6 rounded-2xl shadow-lg border">
                <div className="flex justify-between items-center ">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{s.name}</h3>
                    <p className="text-gray-600">Class: {s.class}, Roll: {s.roll}, Section: {s.section}</p>
                    <p className="text-gray-500">Teacher: {s.assignedTeacher?.name || "N/A"}</p>
                    <p className="text-gray-500">Parent: {s.assignedParent?.name || "N/A"}</p>
                  </div>
                  <button onClick={() => handleDelete(s._id)} className="bg-red-500 text-white px-4 py-2 rounded-full">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;

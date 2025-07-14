// MyClass.jsx
import { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { AuthContext } from "../../Context/AuthContext";

const GET_ASSIGNED_STUDENTS = gql`
  query GetStudentsByUser($userId: ID!, $role: String!) {
    studentsByUser(userId: $userId, role: $role) {
      _id
      name
      class
      roll
      section
      assignedParent {
        name
        email
      }
    }
  }
`;

const MyClass = () => {
  const { user } = useContext(AuthContext);
  console.log("Logged in user:", user);
  
  const { loading, error, data } = useQuery(GET_ASSIGNED_STUDENTS, {
    variables: {
      userId: user?._id,
      role: "teacher",
    },
    skip: !user,
  });

  if (loading) return (
    <div className="bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] p-8 rounded-2xl">
      <p className="text-pink-600 font-semibold">Loading students...</p>
    </div>
  );
  
  if (error) return (
    <div className="bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] p-8 rounded-2xl">
      <p className="text-red-500 font-semibold">Error: {error.message}</p>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] p-8 rounded-2xl relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-12 h-12 bg-orange-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-10 left-20 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-8 h-8 bg-pink-300 rounded-full opacity-25 animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-600 rounded-full text-sm font-semibold mb-4 shadow-sm">
            📚 Teaching Dashboard
          </span>
          <h2 className="text-3xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent">
              My Class
            </span>
            <span className="text-[#111430]"> (Students)</span>
          </h2>
        </div>

        {/* Student Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {data?.studentsByUser.map((student, index) => (
            <div 
              key={student._id} 
              className="group relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-pink-100/50"
            >
              {/* Card Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              
              {/* Student Info */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#111430] text-lg">{student.name}</h3>
                    <span className="text-sm text-pink-600 font-medium">Roll: {student.roll}</span>
                  </div>
                </div>
                
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    <strong className="text-[#111430]">Class:</strong> {student.class}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    <strong className="text-[#111430]">Section:</strong> {student.section}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <strong className="text-[#111430]">Parent:</strong> {student.assignedParent?.name}
                  </p>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-gradient-to-r from-pink-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyClass;
import { useQuery, gql } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import AddResultForm from "./AddResultForm";

const GET_STUDENTS_BY_TEACHER = gql`
  query StudentsByUser($userId: ID!, $role: String!) {
    studentsByUser(userId: $userId, role: $role) {
      _id
      name
    }
  }
`;

const AddResultPage = () => {
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useQuery(GET_STUDENTS_BY_TEACHER, {
    variables: { userId: user?._id, role: "teacher" },
    skip: !user,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Loading students...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold">❌ Error loading students</p>
      </div>
    );
  }

  const student = data?.studentsByUser?.[0];

  if (!student) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">No students assigned to you.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-2">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent">
            Add Result for
          </span>
          <br />
          <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            {student.name}
          </span>
        </h1>
        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
          Please fill in the assessment details. All required fields must be completed.
        </p>
      </header>

   
      <AddResultForm studentId={student._id} />

    
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-gray-600 text-sm shadow">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>System ready for result submission</span>
        </div>
      </div>
    </div>
  );
};

export default AddResultPage;

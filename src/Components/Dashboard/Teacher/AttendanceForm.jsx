import { useState, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../../Context/AuthContext';

const MARK_ATTENDANCE = gql`
  mutation MarkAttendance($input: AddAttendanceInput!) {
    addAttendance(input: $input) {
      success
      message
    }
  }
`;
//we here pass the student id as a props for 
// AttendanceForm শুধুমাত্র একটি ফর্ম — তার কাজ হলো attendance মার্ক করে ফেলা।

//  তাই, student ID কোথা থেকে আসবে সেটা তার দায়িত্ব না।
// এই দায়িত্ব AttendancePage-এর যেটা পুরো পেজের data নিয়ন্ত্রণ করে।





const AttendanceForm = ({ selectedDate, studentId }) => {
  const { user } = useContext(AuthContext); // Teacher info
  const [status, setStatus] = useState('present');
  const [addAttendance, { loading }] = useMutation(MARK_ATTENDANCE);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId || !user?._id) {
      alert("Student or Teacher information missing!");
      console.error(" Missing studentId or user._id");
      return;
    }

    try {
      const res = await addAttendance({
        variables: {
          input: {
            date: selectedDate.toISOString(),
            student: studentId,
            status,
            markedBy: user._id,
          },
        },
      });

      if (res.data?.addAttendance?.success) {
        alert(" Attendance marked successfully!");
      } else {
        alert(" Failed to mark attendance: " + res.data?.addAttendance?.message);
      }
    } catch (err) {
      console.error(" Error marking attendance:", err.message);
      alert(" Attendance failed: " + err.message);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] overflow-hidden">
      <form onSubmit={handleSubmit} className="relative z-10 bg-white/80 backdrop-blur-sm p-6 mt-4 rounded-lg border border-pink-100 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent">
          Mark Attendance for {selectedDate.toDateString()}
        </h2>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-pink-200 px-4 py-3 rounded-md mb-6 w-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/90"
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="group relative px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-md font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10">
            {loading ? "Marking..." : "Submit Attendance"}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;

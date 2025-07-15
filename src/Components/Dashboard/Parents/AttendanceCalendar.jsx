import { gql, useQuery } from "@apollo/client";
import Calendar from "react-calendar";
import { useContext, useState } from "react";
import { ChildContext } from "./ParentDashboard";

// Import default and custom calendar styles
import 'react-calendar/dist/Calendar.css';
import '../../../styles/AttendanceCalendar.css'; // Make sure this path matches your project structure

const GET_ATTENDANCE = gql`
  query AttendanceByChild($childId: ID!) {
    attendanceByChild(childId: $childId) {
      date
      status
    }
  }
`;

const AttendanceCalendar = () => {
  const { childId } = useContext(ChildContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data, loading, error } = useQuery(GET_ATTENDANCE, {
    variables: { childId },
    skip: !childId,
  });

  if (loading) return <p className="text-center text-gray-500 py-4">Loading attendance...</p>;
  if (error) return <p className="text-center text-red-500 py-4">Failed to load attendance</p>;

  // Create attendance map
  const attendanceMap = new Map();
  data?.attendanceByChild?.forEach((entry) => {
    attendanceMap.set(new Date(entry.date).toDateString(), entry.status);
  });

  const tileContent = ({ date }) => {
    const status = attendanceMap.get(date.toDateString());
    if (status === "present") return <span className="text-green-600 text-xs font-bold">✔</span>;
    if (status === "absent") return <span className="text-red-600 text-xs font-bold">✖</span>;
    if (status === "late") return <span className="text-yellow-600 text-xs font-bold">⧗</span>;
    return null;
  };

  const tileClassName = ({ date }) => {
    const status = attendanceMap.get(date.toDateString());
    let baseClass = "hover:bg-gray-50 transition-colors duration-200";

    if (status === "present") baseClass += " bg-green-50 border-green-200";
    if (status === "absent") baseClass += " bg-red-50 border-red-200";
    if (status === "late") baseClass += " bg-yellow-50 border-yellow-200";

    return baseClass;
  };

  const formatSelectedDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-3xl shadow-lg max-w-2xl mx-auto mt-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
          📅 Attendance Calendar
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          tileContent={tileContent}
          tileClassName={tileClassName}
          className="rounded-xl w-full"
          locale="en-US"
          showNeighboringMonth={false}
          navigationLabel={({ date }) => 
            `${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
          }
        />
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
        <p className="text-gray-600 text-sm mb-1">Selected Date:</p>
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 font-bold text-lg">
          {formatSelectedDate(selectedDate)}
        </p>
      </div>

      <div className="flex justify-center space-x-6 mt-6 text-sm">
        <div className="flex items-center bg-white rounded-full px-3 py-2 shadow-md">
          <span className="text-green-600 font-bold mr-2">✔</span>
          <span className="text-gray-700">Present</span>
        </div>
        <div className="flex items-center bg-white rounded-full px-3 py-2 shadow-md">
          <span className="text-red-600 font-bold mr-2">✖</span>
          <span className="text-gray-700">Absent</span>
        </div>
        <div className="flex items-center bg-white rounded-full px-3 py-2 shadow-md">
          <span className="text-yellow-600 font-bold mr-2">⧗</span>
          <span className="text-gray-700">Late</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;

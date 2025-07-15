import { useQuery, gql } from '@apollo/client';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import AttendanceCalendar from './AttendanceCalendar';
import AttendanceForm from './AttendanceForm';

const GET_STUDENTS_BY_TEACHER = gql`
  query StudentsByUser($userId: ID!, $role: String!) {
    studentsByUser(userId: $userId, role: $role) {
      _id
      name
    }
  }
`;

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useContext(AuthContext); // teacher user

  const { data, loading, error } = useQuery(GET_STUDENTS_BY_TEACHER, {
    variables: { userId: user?._id, role: 'teacher' },
    skip: !user,
  });

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error loading students</p>;

  const student = data?.studentsByUser?.[0]; // pick the first student for now

  if (!student) return <p>No students found</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <AttendanceCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <AttendanceForm selectedDate={selectedDate} studentId={student._id} />
    </div>
  );
};

export default AttendancePage;

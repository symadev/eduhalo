import { useState } from "react";
import {
  FaChalkboardTeacher,
  FaPen,
  FaChartBar,
  FaFileAlt,
 
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const TeacherDashboard = () => {
  const [active, setActive] = useState("myclass");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Or navigate to login
  };

  const menuItems = [
    {
      id: "myclass",
      label: "My Class",
      icon: <FaChalkboardTeacher />,
      to: "/dashboard/teacher/myclass",
    },
    {
      id: "homework",
      label: "Assign Homework",
      icon: <FaPen />,
      to: "/dashboard/teacher/homework",
    },
    {
      id: "attendance",
      label: "Mark Attendance",
      icon: <FaChartBar />,
      to: "/dashboard/teacher/attendance",
    },
    {
      id: "result",
      label: "Add Result",
      icon: <FaFileAlt />,
      to: "/dashboard/teacher/result",
    },
   
  ];

  return (
    <div className="flex min-h-screen bg-[#FFF8F5] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-100 to-pink-100 p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-purple-600 mb-6">🎓 Teacher Panel</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                active === item.id
                  ? "bg-white text-purple-600 font-semibold shadow-md"
                  : "hover:bg-white/60"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Divider */}
          <div className="h-1 bg-purple-300 my-4  w-2/4 rounded"></div>

          {/* Home Link */}
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-white/60 transition-all"
          >
            <FaHome />
            <span>Home</span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-white mt-6 w-full"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherDashboard;

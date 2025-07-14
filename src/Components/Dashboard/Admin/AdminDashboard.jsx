// AdminDashboard.jsx
import { useState } from "react";
import {
  FaUsers,
  FaUserTie,
  FaUserFriends,
  FaSchool,
  FaCog,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [active, setActive] = useState("teachers");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Or navigate to login
  };

  const menuItems = [
    {
      id: "teachers",
      label: "Manage Teachers",
      icon: <FaUserTie />,
      to: "/dashboard/admin/teachers",
    },
    {
      id: "parents",
      label: "Manage Parents",
      icon: <FaUsers />,
      to: "/dashboard/admin/parents",
    },
    {
      id: "students",
      label: "Manage Students",
      icon: <FaUserFriends />,
      to: "/dashboard/admin/students",
    },
    {
      id: "school",
      label: "School Profile",
      icon: <FaSchool />,
      to: "/admin/school",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <FaCog />,
      to: "/admin/settings",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#FFF8F5] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-pink-100 to-orange-100 p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-pink-600 mb-6">⚡ Admin Panel</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                active === item.id
                  ? "bg-white text-pink-600 font-semibold shadow-md"
                  : "hover:bg-white/60"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Divider */}
          <div className="h-1 bg-pink-400 my-4 rounded"></div>

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
            className="flex items-center gap-3 px-4 py-2 text-red-600 rounded-lg hover:bg-red-100 mt-6 w-full"
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

export default AdminDashboard;

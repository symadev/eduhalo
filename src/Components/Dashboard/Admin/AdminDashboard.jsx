import { useState } from "react";
import {
  FaUsers,
  FaUserTie,
  FaUserFriends,
  FaCog,
  FaSignOutAlt,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [active, setActive] = useState("teachers");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
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
      id: "settings",
      label: "Settings",
      icon: <FaCog />,
      to: "/dashboard/admin/setting",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FFF8F5] text-gray-800">
      {/* Mobile Navbar */}
      <div className="flex items-center justify-between p-4 bg-pink-100 shadow-md lg:hidden">
        <h2 className="text-xl font-bold text-pink-600">⚡ Admin Panel</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl text-pink-600">
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block w-full lg:w-64 bg-gradient-to-b from-pink-100 to-orange-100 p-6 shadow-xl transition-all duration-300 z-20`}
      >
        <h2 className="text-2xl font-bold text-pink-600 mb-6 hidden lg:block">⚡ Admin Panel</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              onClick={() => {
                setActive(item.id);
                setSidebarOpen(false); // Auto-close on mobile
              }}
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
          <div className="h-1 bg-pink-300 my-4 w-2/4 rounded"></div>

          {/* Home Link */}
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-white/60 transition-all"
          >
            <FaHome />
            <span>Home</span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={() => {
              handleLogout();
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-white mt-6 w-full"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;

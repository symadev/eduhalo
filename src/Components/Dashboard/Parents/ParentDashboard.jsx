// ParentDashboard.jsx
import { useLocation, Outlet, Link } from "react-router-dom";
import { FaClipboardList, FaCalendarAlt, FaBell, FaCog, FaSignOutAlt, FaFileAlt, FaChild } from "react-icons/fa";

const ParentDashboard = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // You can also redirect or reset context state
  };

  const menuItems = [
    { id: "mychild", label: "My Child", icon: <FaChild />, to: "/dashboard/parent/child" },
    { id: "homework", label: "Homework", icon: <FaClipboardList />, to: "/dashboard/parent/homework" },
    { id: "attendance", label: "Attendance Calendar", icon: <FaCalendarAlt />, to: "/dashboard/parent/attendance" },
    { id: "report", label: "Report Card", icon: <FaFileAlt />, to: "/dashboard/parent/report" },
    { id: "notifications", label: "Notifications", icon: <FaBell />, to: "/dashboard/parent/notifications" },
    { id: "settings", label: "Settings", icon: <FaCog />, to: "/dashboard/parent/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-[#FFF8F5] text-gray-800">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-pink-100 to-orange-100 p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-pink-600 mb-6">🎓 Parent Panel</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === item.to
                  ? "bg-white text-pink-600 font-semibold shadow-md"
                  : "hover:bg-white/60"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 text-red-600 rounded-lg hover:bg-red-100 mt-6 w-full"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default ParentDashboard;

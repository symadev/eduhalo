import { useLocation, Outlet, Link } from "react-router-dom";
import { FaClipboardList, FaCalendarAlt, FaBell, FaCog, FaSignOutAlt, FaFileAlt, FaChild, FaHome } from "react-icons/fa";
import { useQuery, gql } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext"; // adjust if needed
import { createContext } from "react";

// GraphQL Query to get child by parent ID
const GET_MY_CHILD = gql`
  query MyChild($parentId: ID!) {
    myChild(parentId: $parentId) {
      _id
      name
    }
  }
`;

// ✅ Create a context to share childId across nested components
export const ChildContext = createContext(null);

const ParentDashboard = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const { data, loading, error } = useQuery(GET_MY_CHILD, {
    variables: { parentId: user?._id },
    skip: !user,
  });

  const child = data?.myChild;

  const menuItems = [
    { id: "mychild", label: "My Child", icon: <FaChild />, to: "/dashboard/parent/mychild" },
    { id: "homework", label: "Homework", icon: <FaClipboardList />, to: "/dashboard/parent/homework" },
    { id: "attendance", label: "Attendance Calendar", icon: <FaCalendarAlt />, to: "/dashboard/parent/attendance" },
    { id: "report", label: "Report Card", icon: <FaFileAlt />, to: "/dashboard/parent/report" },
   
    { id: "settings", label: "Settings", icon: <FaCog />, to: "/dashboard/parent/settings" },
  ];

  if (loading) return (
    <div className="bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] p-8 rounded-2xl">
      <p className="text-pink-600 font-semibold">Loading Child Data</p>
    </div>
  );
 if (error || !child) return <div className="text-red-500 text-center">No child data found</div>;

  return (
    <ChildContext.Provider value={{ childId: child._id }}>
      <div className="flex min-h-screen bg-[#FFF8F5] text-gray-800">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-pink-100 to-orange-100 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-pink-600 mb-6">🎓 Parent Panel</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${location.pathname === item.to
                    ? "bg-white text-pink-600 font-semibold shadow-md"
                    : "hover:bg-white/60"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Divider */}
            <div className="h-1 bg-pink-400  w-2/4 my-4 rounded"></div>

            {/* Home Link */}
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-white/60 transition-all"
            >
              <FaHome />
              <span>Home</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-white mt-6 w-full"
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
    </ChildContext.Provider>
  );
};

export default ParentDashboard;

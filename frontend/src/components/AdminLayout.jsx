import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Home,
  CalendarDays,
  BookOpen,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";
import { logout } from "../redux/authSlice";

const AdminLayout = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <div className="w-64 h-screen sticky top-0 bg-gradient-to-b from-red-600 to-red-400 text-white p-4 shadow-lg self-start">
        {/* Logo and Greeting */}
        <div className="flex flex-col items-center mb-10">
          <div className="text-3xl mb-2">🎉</div>
          <h2 className="text-xl font-bold">Krish Events</h2>
          <p className="text-sm text-white mt-1">
            Welcome, {user?.name || "Admin"}
          </p>
        </div>

        {/* Navigation */}
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                location.pathname === "/admin/dashboard"
                  ? "bg-white bg-opacity-20 font-semibold text-red"
                  : "hover:bg-white hover:bg-opacity-10 hover:text-red-600"
              }`}
            >
              <Home size={18} /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/admin/events"
              className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                location.pathname === "/admin/events"
                  ? "bg-white bg-opacity-20 font-semibold text-red-600"
                  : "hover:bg-white hover:bg-opacity-10 text-white hover:text-red-600"
              }`}
            >
              <CalendarDays size={18} /> Events
            </Link>
          </li>
          <li>
            <Link
              to="/admin/bookings"
              className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                location.pathname === "/admin/bookings"
                  ? "bg-white bg-opacity-20 font-semibold text-red-600"
                  : "hover:bg-white hover:bg-opacity-10 text-white hover:text-red-600"
              }`}
            >
              <BookOpen size={18} /> Bookings
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                location.pathname === "/admin/users"
                  ? "bg-white bg-opacity-20 font-semibold text-red-600"
                  : "hover:bg-white hover:bg-opacity-10 hover:text-red-600"
              }`}
            >
              <Users size={18} /> Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/reports"
              className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                location.pathname === "/admin/reports"
                  ? "bg-white bg-opacity-20 font-semibold text-red-600"
                  : "hover:bg-white hover:bg-opacity-10 hover:text-red-600"
              }`}
            >
              <BarChart3 size={18} /> Reports
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:text-red-600 hover:bg-white hover:bg-opacity-10 w-full text-left"
            >
              <LogOut size={18} /> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">{children}</div>
    </div>
  );
};

export default AdminLayout;

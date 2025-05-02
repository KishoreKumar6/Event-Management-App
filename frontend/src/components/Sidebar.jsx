import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import {
  Home,
  CalendarDays,
  BookOpen,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-gray-100 p-4 shadow-lg">
      <h2 className="text-2xl font-bold text-red-600 mb-4">SHEY EVENTS</h2>
      <p className="text-gray-700 mb-8">{user?.name || "Admin"}</p>
      <ul className="space-y-4">
        <li>
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Home /> Home
          </Link>
        </li>
        <li>
          <Link to="/admin/events" className="flex items-center gap-2">
            <CalendarDays /> Events
          </Link>
        </li>
        <li>
          <Link to="/admin/bookings" className="flex items-center gap-2">
            <BookOpen /> Bookings
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="flex items-center gap-2">
            <Users /> Users
          </Link>
        </li>
        <li>
          <Link to="/admin/reports" className="flex items-center gap-2">
            <BarChart3 /> Reports
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="flex items-center gap-2 ">
            <LogOut /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

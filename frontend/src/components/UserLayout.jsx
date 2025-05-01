import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Home, UserCircle, BookOpen, LogOut } from "lucide-react";
import { logout } from "../redux/authSlice";

const UserLayout = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const navItems = [
    { path: "/user/dashboard", label: "Home", icon: <Home size={20} /> },
    { path: "/user/profile", label: "Profile", icon: <UserCircle size={20} /> },
    { path: "/user/bookings", label: "Bookings", icon: <BookOpen size={20} /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-gradient-to-b from-red-600 to-red-400 text-white p-6">
        <div className="text-center mb-10">
          <div className="text-3xl mb-1">🎉</div>
          <h2 className="text-xl font-extrabold">Krish Events</h2>
          <p className="text-sm mt-1">Welcome, {user?.name || "User"}</p>
        </div>

        <nav>
          <ul className="space-y-6 text-base">
            {navItems.map(({ path, label, icon }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                    location.pathname === path
                      ? "bg-white bg-opacity-20 font-semibold text-red-600"
                      : "hover:bg-white hover:bg-opacity-10 hover:text-red-600"
                  }`}
                >
                  {icon} {label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-10 transition hover:text-red-600"
              >
                <LogOut size={20} /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
};

export default UserLayout;

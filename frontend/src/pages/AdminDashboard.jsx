import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { logout } from "../redux/authSlice";
import {
  Home,
  CalendarDays,
  BookOpen,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";

const AdminDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [bookings, setBookings] = useState([]);

  const isBookingsPage = location.pathname === "/admin/bookings";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "https://event-management-app-2-21xj.onrender.com/api/events"
        );
        setEvents(res.data);
        setFilteredEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    if (!isBookingsPage) fetchEvents();
  }, [isBookingsPage]);

  useEffect(() => {
    if (isBookingsPage) {
      const fetchBookings = async () => {
        try {
          const res = await axios.get(
            "https://event-management-app-2-21xj.onrender.com/api/bookings"
          );
          setBookings(res.data);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      };
      fetchBookings();
    }
  }, [isBookingsPage]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleFilter = () => {
    const filtered = events.filter((event) => {
      const matchesName = event.name
        .toLowerCase()
        .includes(eventName.toLowerCase());
      const matchesDate = eventDate
        ? event.date.slice(0, 10) === eventDate
        : true;
      return matchesName && matchesDate;
    });
    setFilteredEvents(filtered);
  };

  const clearFilters = () => {
    setEventName("");
    setEventDate("");
    setFilteredEvents(events);
  };

  const navLinks = [
    { path: "/admin/dashboard", label: "Home", icon: <Home size={20} /> },
    {
      path: "/admin/events",
      label: "Events",
      icon: <CalendarDays size={20} />,
    },
    {
      path: "/admin/bookings",
      label: "Bookings",
      icon: <BookOpen size={20} />,
    },
    { path: "/admin/users", label: "Users", icon: <Users size={20} /> },
    { path: "/admin/reports", label: "Reports", icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-gradient-to-b from-red-600 to-red-400 text-white p-6">
        <div className="text-center mb-10">
          <div className="text-3xl mb-1">🎉</div>
          <h2 className="text-xl font-extrabold">Krish Events</h2>
          <p className="text-sm mt-1">Welcome, {user?.name || "Admin"}</p>
        </div>
        <nav>
          <ul className="space-y-5 text-base">
            {navLinks.map(({ path, label, icon }) => (
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
      <main className="flex-1 p-8 bg-gray-50">
        {isBookingsPage ? (
          <section>
            <h2 className="text-2xl font-bold mb-6">All Bookings</h2>
            {bookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                  <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                    <tr>
                      <th className="px-4 py-3 text-left">Booking ID</th>
                      <th className="px-4 py-3 text-left">Event</th>
                      <th className="px-4 py-3 text-left">User Name</th>
                      <th className="px-4 py-3 text-left">User Email</th>
                      <th className="px-4 py-3 text-left">Tickets</th>
                      <th className="px-4 py-3 text-left">Total Price</th>
                      <th className="px-4 py-3 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 text-sm">
                    {bookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="border-b hover:bg-gray-100"
                      >
                        <td className="px-4 py-3">{booking._id}</td>
                        <td className="px-4 py-3">
                          {booking.event?.name || "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          {booking.user?.name || "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          {booking.user?.email || "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          {booking.numberOfTickets || booking.ticketCount}
                        </td>
                        <td className="px-4 py-3">
                          ₹{booking.totalPrice || booking.totalAmount}
                        </td>
                        <td className="px-4 py-3">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500">No bookings found.</p>
            )}
          </section>
        ) : (
          <section>
            <h2 className="text-2xl font-bold mb-6">
              Welcome, {user?.name || "Admin"}!!!
            </h2>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 mb-8">
              <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="border p-2 rounded w-full sm:w-1/3"
              />
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="border p-2 rounded w-full sm:w-1/3"
              />
              <button
                onClick={clearFilters}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition"
              >
                Clear
              </button>
              <button
                onClick={handleFilter}
                className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded transition"
              >
                Apply
              </button>
            </div>

            {/* Events Display */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
                  >
                    <h3 className="font-semibold text-lg mb-2">{event.name}</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={`https://event-management-app-2-21xj.onrender.com${event.image}`}
                        alt={event.name}
                        className="w-40 h-40 object-cover rounded"
                      />
                      <div className="flex flex-col justify-between">
                        <p className="text-gray-600 text-sm mb-2">
                          📅 {new Date(event.date).toLocaleDateString("en-GB")}{" "}
                          | 📍 {event.location}
                        </p>
                        <p className="text-gray-700 mb-3">
                          {event.description}
                        </p>
                        <Link to={`/events/${event._id}`}>
                          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No events found.</p>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

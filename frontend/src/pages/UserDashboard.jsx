import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { logout } from "../redux/authSlice";
import { Home, UserCircle, BookOpen, LogOut, Pencil } from "lucide-react";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  let currentView = "";
  if (location.pathname === "/user/dashboard") currentView = "home";
  else if (location.pathname === "/user/profile") currentView = "profile";
  else if (location.pathname === "/user/bookings") currentView = "bookings";
  else currentView = "home";

  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

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
        toast.error("Failed to load events.");
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `https://event-management-app-2-21xj.onrender.com/api/bookings/user/${user?._id}`
        );
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        toast.error("Failed to load your bookings.");
      }
    };
    if (user?._id) fetchBookings();
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
    navigate("/");
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
    toast.info("Filters cleared.");
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gradient-to-b from-red-600 to-red-400 p-5 shadow-xl text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">🎉 Krish Events</h2>
        <p className="text-sm mb-8 text-center">Welcome, {user?.name}</p>

        <ul className="space-y-3">
          <li>
            <Link
              to="/user/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-white hover:text-red-600 transition"
            >
              <Home /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/user/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-white hover:text-red-600 transition"
            >
              <UserCircle /> Profile
            </Link>
          </li>
          <li>
            <Link
              to="/user/bookings"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-white hover:text-red-600 transition"
            >
              <BookOpen /> Bookings
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-md hover:bg-white hover:text-red-600 transition"
            >
              <LogOut /> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        {currentView === "home" && (
          <>
            <h2 className="text-3xl font-semibold mb-2 text-gray-800">
              Hello, {user?.name} 👋
            </h2>
            <p className="text-gray-600 mb-6">
              Browse and book upcoming events.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="border border-gray-300 p-2 rounded w-1/3"
              />
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="border border-gray-300 p-2 rounded w-1/3"
              />
              <button
                onClick={clearFilters}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
              >
                Clear
              </button>
              <button
                onClick={handleFilter}
                className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded"
              >
                Filter
              </button>
            </div>

            <div className="space-y-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                  >
                    <h3 className="text-lg font-bold mb-2">{event.name}</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={`https://event-management-app-2-21xj.onrender.com${event.image}`}
                        alt={event.name}
                        className="w-40 h-40 rounded object-cover"
                      />
                      <div className="flex flex-col justify-between">
                        <p className="text-sm text-gray-600 mb-2">
                          📅 {new Date(event.date).toLocaleDateString()} | 📍{" "}
                          {event.location}
                        </p>
                        <p className="text-gray-700">{event.description}</p>
                        <Link to={`/events/${event._id}`} className="mt-4">
                          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-red-500">No events found.</p>
              )}
            </div>
          </>
        )}

        {currentView === "profile" && (
          <div className="bg-white p-6 rounded shadow max-w-xl">
            <h2 className="text-xl font-bold mb-4">Your Profile</h2>
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Role:</strong> {user?.role}
            </p>
            <button className="flex items-center gap-2 mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
              <Pencil size={16} /> Edit Profile
            </button>
          </div>
        )}

        {currentView === "bookings" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white p-4 mb-4 rounded shadow"
                >
                  <h3 className="font-bold text-lg">{booking.event?.name}</h3>
                  <p>📍 {booking.event?.location}</p>
                  <p>📅 {new Date(booking.event?.date).toLocaleDateString()}</p>
                  <p>🎟️ Tickets: {booking.ticketCount}</p>
                  <p>💰 Total: ₹{booking.totalAmount}</p>
                </div>
              ))
            ) : (
              <p>You haven't booked any events yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

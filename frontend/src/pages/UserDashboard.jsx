import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { logout } from "../redux/authSlice";
import { Home, UserCircle, BookOpen, LogOut, Pencil } from "lucide-react";
import { toast } from "react-toastify";
import bgImage from "../Images/blurImage.jpg";

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
          "https://event-management-app-3-vs67.onrender.com/api/events"
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
          `https://event-management-app-3-vs67.onrender.com/api/bookings/user/${user?._id}`
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
      <div className="w-64 h-screen sticky top-0 bg-gradient-to-b from-red-600 to-red-400 text-white p-4 shadow-lg self-start">
        <h2 className="text-2xl font-bold mb-4 text-center">🎉 Krish Events</h2>
        <p className="text-sm mb-8 text-center">Welcome, {user?.name}</p>

        <ul className="space-y-3">
          <li>
            <Link
              to="/user/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white hover:text-red-600 transition font-semibold"
            >
              <Home /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/user/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white hover:text-red-600 transition font-semibold"
            >
              <UserCircle /> Profile
            </Link>
          </li>
          <li>
            <Link
              to="/user/bookings"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white hover:text-red-600 transition font-semibold"
            >
              <BookOpen /> Bookings
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white hover:text-red-600 transition font-semibold"
            >
              <LogOut /> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <main
        className="flex-1 p-8 overflow-auto"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {currentView === "home" && (
          <>
            <h2 className="text-3xl font-semibold mb-2 text-white">
              Hello, {user?.name} 👋
            </h2>
            <p className="text-white mb-6">Browse and book upcoming events.</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="border border-gray-300 p-2 rounded w-1/3 text-gray-100"
              />
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="border border-gray-300 p-2 rounded w-1/3 text-black"
              />
              <button
                onClick={clearFilters}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-black"
              >
                Clear
              </button>
              <button
                onClick={handleFilter}
                className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded"
              >
                Apply
              </button>
            </div>

            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEvents.map((event) => (
                  <div
                    key={event._id}
                    className="bg-opacity-50  rounded-lg shadow transition-shadow duration-300 hover:shadow-[0_4px_30px_rgba(0,0,0,0.9)] border border-amber-50 p-4 text-white flex flex-col"
                  >
                    <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                    <div className="flex items-center text-sm text-white mb-2">
                      <span className="mr-2">
                        📅 {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span>📍 {event.location}</span>
                    </div>
                    <img
                      src={`https://event-management-app-3-vs67.onrender.com${event.image}`}
                      alt={event.name}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <p className="text-sm mb-4">{event.description}</p>
                    <Link to={`/events/${event._id}`}>
                      <button className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded w-fit">
                        View Details
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-200">No events found.</p>
            )}
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
            <h2 className="text-xl font-bold mb-4 text-white">
              Your Bookings
            </h2>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white p-4 mb-4 rounded shadow"
                >
                  <h3 className="font-bold text-lg">
                    {booking.event?.name}
                  </h3>
                  <p>📍 {booking.event?.location}</p>
                  <p>📅 {new Date(booking.event?.date).toLocaleDateString()}</p>
                  <p>🎟️ Tickets: {booking.ticketCount}</p>
                  <p>💰 Total: ₹{booking.totalAmount}</p>
                </div>
              ))
            ) : (
              <p className="text-white">You haven't booked any events yet.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;

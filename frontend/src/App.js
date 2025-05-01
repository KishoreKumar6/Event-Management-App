import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminEvents from "./pages/AdminEvents";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";
import UserProfile from "./pages/UserProfile";
import UserBookings from "./pages/UserBookings";
import AdminBookings from "./pages/admin/AdminBookings";
import UsersList from "./pages/admin/UserList";
import { ToastContainer } from "react-toastify";
import Reports from "./pages/admin/Reports";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected User Routes */}
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute allowedRole="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <PrivateRoute allowedRole="user">
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/bookings"
          element={
            <PrivateRoute allowedRole="user">
              <UserBookings />
            </PrivateRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <PrivateRoute allowedRole="admin">
              <AdminEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/events/create"
          element={
            <PrivateRoute allowedRole="admin">
              <CreateEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <PrivateRoute allowedRole="admin">
              <AdminBookings />
            </PrivateRoute>
          }
        />

        {/* Public Event and Payment Routes */}
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;

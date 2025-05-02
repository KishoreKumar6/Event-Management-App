import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("📦 Token from localStorage:", token);

        const response = await axios.get(
          "https://event-management-app-2-21xj.onrender.com/api/admin/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setBookings(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch bookings",
          error.response?.data || error.message
        );

        // If 403 Forbidden
        if (error.response && error.response.status === 403) {
          setError("Access denied. Admins only.");
        } else {
          setError("Failed to fetch bookings. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-red-600 text-lg font-semibold animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">User Bookings</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Event Name</th>
                <th className="py-2 px-4">Ticket Count</th>
                <th className="py-2 px-4">Ticket Type</th>
                <th className="py-2 px-4">Paid Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id} className="text-center border-b">
                    <td className="py-2 px-4">{booking.user?.name}</td>
                    <td className="py-2 px-4">{booking.user?.email}</td>
                    <td className="py-2 px-4">{booking.event?.name}</td>
                    <td className="py-2 px-4">{booking.numberOfTickets}</td>
                    <td className="py-2 px-4">{booking.ticketType}</td>
                    <td className="py-2 px-4">₹{booking.totalPrice}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBookings;

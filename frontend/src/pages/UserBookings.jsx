import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import UserLayout from "../components/UserLayout";
import { toast, ToastContainer } from "react-toastify"; // ✅ You missed this
import "react-toastify/dist/ReactToastify.css";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/bookings/user/${user._id}`
        );
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    if (user?._id) fetchBookings();
  }, [user]);

  const handleCancel = async (bookingId, eventName) => {
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel ${eventName}?`
    );
    if (!confirmCancel) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/bookings/cancel/${bookingId}`
      );

      if (response.status === 200) {
        toast.success(`Booking for ${eventName} cancelled successfully!`);
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b._id === bookingId ? { ...b, isCancelled: true } : b
          )
        );
      } else {
        toast.error(response.data.message || "Cancellation failed");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <UserLayout>
      <div className="max-w-6xl mx-auto mt-20 p-4">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">
          Your Bookings
        </h2>

        {bookings.length > 0 ? (
          <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
            <table className="min-w-full bg-white">
              <thead className="bg-yellow-100 text-gray-700">
                <tr>
                  <th className="text-left py-4 px-6 font-medium">Event</th>
                  <th className="text-left py-4 px-6 font-medium">Date</th>
                  <th className="text-left py-4 px-6 font-medium">Location</th>
                  <th className="text-left py-4 px-6 font-medium">Tickets</th>
                  <th className="text-left py-4 px-6 font-medium">
                    Total Price
                  </th>
                  <th className="text-left py-4 px-6 font-medium">Status</th>
                  <th className="text-left py-4 px-6 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-6">
                      {booking.event?.name || "No Event Name"}
                    </td>
                    <td className="py-4 px-6">
                      {booking.event?.date
                        ? new Date(booking.event.date).toLocaleDateString()
                        : "No Date"}
                    </td>
                    <td className="py-4 px-6">
                      {booking.event?.location || "No Location"}
                    </td>
                    <td className="py-4 px-6">{booking.numberOfTickets}</td>
                    <td className="py-4 px-6 font-semibold text-gray-800">
                      ₹{booking.totalPrice}
                    </td>
                    <td className="py-4 px-6">
                      {booking.isCancelled ? (
                        <span className="text-red-500 font-medium">
                          Cancelled
                        </span>
                      ) : (
                        <span className="text-green-600 font-medium">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {!booking.isCancelled && (
                        <button
                          onClick={() =>
                            handleCancel(
                              booking._id,
                              booking.event?.name || "this event"
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow font-semibold transition"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 mt-8">No bookings found.</p>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </UserLayout>
  );
};

export default UserBookings;

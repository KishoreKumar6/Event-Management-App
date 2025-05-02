import Booking from "../models/Booking.js";

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email") // Get user name and email
      .populate("event", "name") // Get event name
      .exec();

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings", error);
    res.status(500).json({ message: "Server Error" });
  }
};

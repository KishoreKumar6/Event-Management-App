import Booking from "../models/Booking.js";
import { sendCancellationEmail } from "../utils/sendCancellationEmail.js";

export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Populate user and event so we can access their details
    const booking = await Booking.findById(bookingId)
      .populate("user")
      .populate("event");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const userEmail = booking.user?.email;
    const eventName = booking.event?.name;

    if (userEmail && eventName) {
      console.log("📨 Sending cancellation email to:", userEmail);
      await sendCancellationEmail(userEmail, eventName);
    } else {
      console.warn("⚠️ Email or Event Name missing. Skipping email.");
    }

    booking.isCancelled = true;
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("❌ Error cancelling booking:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

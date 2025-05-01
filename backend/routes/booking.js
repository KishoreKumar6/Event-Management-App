import express from "express";
import Booking from "../models/Booking.js";
import { sendCancellationEmail } from "../utils/sendCancellationEmail.js";
import { cancelBooking } from "../controllers/bookingController.js";

const router = express.Router();

// ✅ Get all bookings for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate("event");
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Create a new booking
router.post("/", async (req, res) => {
  try {
    const { user, event, ticketType, ticketCount, totalAmount } = req.body;

    const newBooking = new Booking({
      user,
      event,
      ticketType,
      numberOfTickets: ticketCount,
      totalPrice: totalAmount,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Cancel a booking and send cancellation email
router.delete("/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Find and populate event and user to get required details
    const booking = await Booking.findById(bookingId).populate("event").populate("user");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const userEmail = booking.user?.email;
    const eventName = booking.event?.name;

    console.log("🔍 Booking ID:", bookingId);
    console.log("📤 Sending cancellation email to:", userEmail);
    console.log("🎫 Event Name:", eventName);

    if (userEmail && eventName) {
      console.log("📨 Sending cancellation email to:", userEmail); // ✅ Add this log
      await sendCancellationEmail(userEmail, eventName);
    } else {
      console.warn("Email or Event Name missing, skipping email.");
    }

    // Instead of deleting, you can mark as cancelled (safer)
    await Booking.findByIdAndUpdate(bookingId, { isCancelled: true });

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("❌ Cancellation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Optional cancel booking logic if needed
router.put("/cancel/:id", cancelBooking);

export default router;

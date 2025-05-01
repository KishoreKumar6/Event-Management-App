import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  numberOfTickets: Number,
  totalPrice: Number,
  ticketType: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isCancelled: {
    type: Boolean,
    default: false,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

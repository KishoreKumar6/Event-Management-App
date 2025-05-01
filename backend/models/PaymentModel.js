import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  email: String,
  amount: Number,
  eventId: String,
  userId: String,
  status: String,
});

export default mongoose.model("Payment", paymentSchema);

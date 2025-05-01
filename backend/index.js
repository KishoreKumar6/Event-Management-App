// index.js (or server.js)
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/booking.js";
import bodyParser from "body-parser";
import emailRoutes from "./routes/email.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import webhookRouter from "./routes/stripeWebhook.js";

dotenv.config(); // ✅ Load .env

const app = express();

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to MongoDB: ${process.env.MONGO_URI}`))
  .catch((err) => console.log("MongoDB connection error:", err));

// ✅ Allow frontend connection
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ✅ Serve static uploads
app.use("/uploads", express.static("uploads"));

// ✅ Stripe webhook must use raw body parsing BEFORE json middleware
app.use("/webhook", bodyParser.raw({ type: "application/json" }), webhookRouter);

// ✅ Now apply regular JSON body parsing for the rest of the app
app.use(express.json());

// ✅ Set up all other API routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventRoutes);
app.use("/api", emailRoutes);
app.use("/api", userRoutes); // Avoid duplicate if userRoutes already used above
app.use("/api/bookings", bookingRoutes);
app.use("/api", paymentRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));

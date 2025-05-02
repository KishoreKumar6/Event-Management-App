import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";

import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/booking.js";
import emailRoutes from "./routes/email.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import webhookRouter from "./routes/stripeWebhook.js";

dotenv.config();

const app = express();

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`✅ Connected to MongoDB`))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ✅ CORS config
const allowedOrigins = [
  "http://localhost:3000",
  "https://event-management-platform1.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Raw body parser for Stripe webhook
app.use(
  "/api/stripe/webhook",
  bodyParser.raw({ type: "application/json" }),
  webhookRouter
);

// ✅ Standard JSON parser (must come after webhook)
app.use(express.json());

// ✅ Static file serving
app.use("/uploads", express.static("uploads"));

// ✅ Log and register each route to help trace crashing point
console.log("🔌 Mounting: /api/users");
app.use("/api/users", userRoutes);

console.log("🔌 Mounting: /api/admin");
app.use("/api/admin", adminRoutes);

console.log("🔌 Mounting: /api/events");
app.use("/api/events", eventRoutes);

console.log("🔌 Mounting: /api/bookings");
app.use("/api/bookings", bookingRoutes);

console.log("🔌 Mounting: /api/email");
app.use("/api", emailRoutes);

console.log("🔌 Mounting: /api/payments");
app.use("/api", paymentRoutes);

// ✅ 404 fallback for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Error handler (optional)
app.use((err, req, res, next) => {
  console.error("❌ Express error:", err);
  res.status(500).json({ message: err.message || "Server Error" });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));

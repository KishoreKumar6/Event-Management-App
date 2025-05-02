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
    credentials: true, // if you're using cookies or auth
  })
);
app.options("*", cors());

// ✅ Serve static uploads
app.use("/uploads", express.static("uploads"));

app.use(
  "/api/stripe/webhook",
  bodyParser.raw({ type: "application/json" }),
  webhookRouter
);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventRoutes);
app.use("/api", emailRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api", paymentRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));

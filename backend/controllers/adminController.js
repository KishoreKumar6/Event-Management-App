import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Booking from "../models/Booking.js";

// Helper to generate token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Admin Login Controller
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(admin._id, "admin");

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getReports = async (req, res) => {
  try {
    const { event, startDate, endDate } = req.query;

    let filters = {};

    if (event && event !== "All") {
      filters.event = event;
    }

    if (startDate && endDate) {
      filters.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const bookings = await Booking.find(filters);

    let totalBookings = 0;
    let cancelledBookings = 0;
    let totalRevenue = 0;
    let refundedAmount = 0;
    let ticketsSold = 0;
    let ticketsCancelled = 0;

    bookings.forEach((booking) => {
      if (booking.isCancelled) {
        cancelledBookings += 1;
        refundedAmount += booking.totalPrice;
        ticketsCancelled += booking.numberOfTickets;
      } else {
        totalBookings += 1;
        totalRevenue += booking.totalPrice;
        ticketsSold += booking.numberOfTickets;
      }
    });

    res.json({
      totalBookings,
      cancelledBookings,
      totalRevenue,
      refundedAmount,
      ticketsSold,
      ticketsCancelled,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

import express from "express";
import bcrypt from "bcryptjs";
// import jwt from 'jsonwebtoken';
import Admin from "../models/Admin.js";
import { getAllBookings } from "../controllers/adminBookingController.js";
import { verifyAdmin } from "../middlewares/authMiddleware.js"; // protect route
import { adminLogin } from "../controllers/adminController.js";
import { protect } from "../middlewares/protect.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import User from "../models/User.js";
import { getReports } from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hash });

    res.status(201).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

router.post("/login", adminLogin);

router.get("/bookings", verifyAdmin, getAllBookings);

router.get("/bookings", protect, isAdmin, getAllBookings);

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/admins", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    let user = await User.findById(id);

    if (user) {
      if (updates.role && updates.role.toLowerCase() === "admin") {
        const existingAdmin = await Admin.findOne({ email: user.email });

        if (!existingAdmin) {
          await Admin.create({
            name: user.name,
            email: user.email,
            password: user.password,
          });
        }

        await User.findByIdAndDelete(id);

        return res.json({
          message: "User promoted to Admin and removed from User collection",
        });
      } else {
        // Just update status etc
        const updatedUser = await User.findByIdAndUpdate(id, updates, {
          new: true,
        });
        return res.json(updatedUser);
      }
    } else {
      // Not found in User collection, check Admin
      const admin = await Admin.findById(id);

      if (!admin) {
        return res.status(404).json({ message: "User/Admin not found" });
      }

      if (updates.role && updates.role.toLowerCase() === "user") {
        // Demote to User
        const existingUser = await User.findOne({ email: admin.email });

        if (!existingUser) {
          await User.create({
            name: admin.name,
            email: admin.email,
            password: admin.password, // already hashed
          });
        }

        await Admin.findByIdAndDelete(id);

        return res.json({
          message: "Admin demoted to User and removed from Admin collection",
        });
      } else {
        // Just update Admin status etc
        const updatedAdmin = await Admin.findByIdAndUpdate(id, updates, {
          new: true,
        });
        return res.json(updatedAdmin);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during user/admin update" });
  }
});

router.get("/reports", getReports);

export default router;

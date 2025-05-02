import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { updateUserProfile } from "../controllers/userController.js";
import { registerUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/users/register", registerUser);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token, // ✅ token
      _id: user._id, // ✅ id
      name: user.name, // ✅ name
      email: user.email, // ✅ email
      role: user.role, // ✅ role
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/users/:id", updateUserProfile);

export default router;

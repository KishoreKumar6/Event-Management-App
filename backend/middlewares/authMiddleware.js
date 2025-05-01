import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js"; // ✅ Import Admin model

export const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log('⚡ Headers received:', req.headers); // log headers
    console.log('⚡ Authorization Header:', authHeader); // log authHeader

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(' ')[1];
    console.log('⚡ Token extracted:', token); // log token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('⚡ Token decoded:', decoded); // log decoded payload

    let user;

    // 👇 Check role and search correct collection
    if (decoded.role === "admin") {
      user = await Admin.findById(decoded.id); // ✅ Check Admins collection
    } else {
      user = await User.findById(decoded.id); // ✅ Fallback to Users collection
    }

    console.log('⚡ User/Admin fetched from DB:', user); // log user/admin info

    if (!user || decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.user = user; // ✅ Attach the found user/admin to request
    next();
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

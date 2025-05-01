import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js'; // ✅ Add Admin import

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 👇👇 Check role to decide which collection to search
        let user;
        if (decoded.role === 'admin') {
          user = await Admin.findById(decoded.id); // ✅ search in Admin collection
        } else {
          user = await User.findById(decoded.id); // ✅ search in User collection
        }

        if (!user) {
          return res.status(401).json({ message: "Not authorized, user/admin not found" });
        }

        req.user = user;
        req.isAdmin = decoded.role === "admin";
        next();
      } catch (error) {
        console.error("Auth error:", error);
        res.status(401).json({ message: "Not authorized, token failed" });
      }
    }

    if (!token) {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export { protect };

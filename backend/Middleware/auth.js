import jwt from "jsonwebtoken";
import User from "../Model/UserSchema.js";
import dotenv from "dotenv";
dotenv.config();

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("-password");
    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed", error: err.message });
  }
};

// middleware to check whether subscription is active
export const checkSubscriptionActive = (req, res, next) => {
  const now = new Date();
  if (now <= new Date(req.user.subscriptionEnd)) {
    return next();
  }
  return res.status(403).json({ message: "Subscription expired. Please renew to access this service." });
};

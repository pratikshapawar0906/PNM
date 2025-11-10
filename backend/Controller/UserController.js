import User from "../Model/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const calcEndDate = (start, duration) => {
  const end = new Date(start);
  if (duration === "monthly") end.setMonth(end.getMonth() + 1);
  else end.setFullYear(end.getFullYear() + 1);
  return end;
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
      isNewUser: user.isNewUser
    });

    // Optional: update isNewUser = false after first login
    if (user.isNewUser) {
      user.isNewUser = false;
      await user.save();
    }

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const registerUser = async (req, res) => {
  const { name, email, password, subscriptionStart, duration } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ success: false, message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const start = subscriptionStart ? new Date(subscriptionStart) : new Date();
    const end = calcEndDate(start, duration || "monthly");

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      subscriptionStart: start,
      subscriptionEnd: end,
      duration: duration || "monthly"
    });

    res.status(201).json({
      success: true,
      message: "Signup successful.",
      userId: newUser._id
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const CheckStatusPublic=  async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(404).json({ message: "User not found" });
  const now = new Date();
  const status = now <= user.subscriptionEnd ? "Active" : "Expired";
  res.json({
    email: user.email,
    subscriptionStart: user.subscriptionStart,
    subscriptionEnd: user.subscriptionEnd,
    status
  });
};

export const RenewSubscription=  async (req, res) => {
  try {
    const { duration } = req.body; // optional override
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If user is active, renew from existing end; if expired, start from now
    const now = new Date();
    const base = now <= user.subscriptionEnd ? new Date(user.subscriptionEnd) : now;
    const newEnd = (duration || user.duration) === "yearly"
      ? new Date(base.setFullYear(base.getFullYear() + 1))
      : new Date(base.setMonth(base.getMonth() + 1));

    user.subscriptionEnd = newEnd;
    user.subscriptionStart = user.subscriptionStart || now;
    user.duration = duration || user.duration;
    await user.save();
    res.json({ message: "Subscription renewed", subscriptionEnd: user.subscriptionEnd });
  } catch (err) {
    res.status(500).json({ message: "Renewal failed", error: err.message });
  }
};

export const ProtectedService=(req, res) => {
  // actual service logic here
  res.json({ message: "Access granted to protected service for " + req.user.email });
};


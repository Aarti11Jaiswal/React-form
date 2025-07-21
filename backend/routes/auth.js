// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("--- INSECURE REGISTER ATTEMPT (PLAIN TEXT) ---");
  console.log("Received data:", { name, email, password: "[PLAIN TEXT]" });

  try {
    // Check if user with email already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(
        "Registration failed: User already exists with email:",
        email
      );
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }
    console.log("Email is unique.");

    const user = new User({
      name,
      email,
      password: password,
    });

    await user.save();
    console.log(
      "User registered and saved to DB (plain text password):",
      user.email
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("--- INSECURE LOGIN ATTEMPT (PLAIN TEXT) ---");
  console.log("Received data:", { email, password: "[PLAIN TEXT]" });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Login failed: User not found for email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("User found:", user.email);
    console.log("Stored plain text password from DB:", user.password);

    const isMatch = password === user.password;
    console.log("Plain text comparison result (isMatch):", isMatch);

    if (!isMatch) {
      console.log("Login failed: Passwords do not match for user:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("Password matched successfully.");

    // Generate JWT
    const payload = { userId: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); // Token expires in 1 hour
    console.log("JWT generated for user:", user.email);

    res.json({ token, userEmail: user.email });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;

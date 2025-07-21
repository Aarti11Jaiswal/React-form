const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");

router.get("/me", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).send("Server error");
  }
});

router.get("/all", fetchUser, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

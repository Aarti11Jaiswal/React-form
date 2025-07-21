const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const fetchUser = require("../middleware/fetchUser");

router.post("/", fetchUser, async (req, res) => {
  const { name, email, message } = req.body;
  const userId = req.userId;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const contact = new Contact({
      userId,
      name,
      email,
      message,
    });

    await contact.save();
    res
      .status(201)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Error in contact route (POST):", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", fetchUser, async (req, res) => {
  const userId = req.userId;

  try {
    const contacts = await Contact.find({ userId }).sort({ createdAt: -1 });
    res.json({ contacts });
  } catch (err) {
    console.error("Error in contact route (GET current user):", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/all", fetchUser, async (req, res) => {
  try {
    const allContacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ contacts: allContacts });
  } catch (err) {
    console.error("Error in contact route (GET all contacts):", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formMessage, setFormMessage] = useState(""); // For displaying form submission messages
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setFormMessage("You must be logged in to send a message.");
      navigate("/");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        { name, email, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormMessage(res.data.message || "Message sent successfully!");
      setName("");
      setMessage("");
    } catch (err) {
      console.error(
        "Error sending message:",
        err.response?.data?.message || err.message
      );
      setFormMessage(
        err.response?.data?.message ||
          "Error sending message. Please try again."
      );
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        navigate("/");
      }
    }
  };

  return (
    <div className="mt-6 text-center  p-4">
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 mr-5">
            Your Name
          </label>
          <input
            type="text"
            id="contactName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 mr-5">
            Your Email
          </label>
          <input
            type="email"
            id="contactEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 justify center">
            Message
          </label>
          <textarea
            id="contactMessage"
            rows="2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            required
          ></textarea>
        </div>

        <button type="submit">Send Message</button>
      </form>
      {formMessage && (
        <p
          className={`mt-4 text-center text-sm ${
            formMessage.includes("successfully")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {formMessage}
        </p>
      )}
    </div>
  );
}

export default ContactPage;

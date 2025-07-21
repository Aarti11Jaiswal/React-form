// frontend/src/pages/RegisterPage.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // For displaying success or error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      setMessage(res.data.message || "Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
      // Redirect to login page after a short delay
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(
        "Registration error:",
        err.response?.data?.message || err.message
      );
      setMessage(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="container text-center">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-6 text-center mb-3 ml=4 mr=5">
          <label className="mt-6 text-center block text-sm font-medium text-gray-700 ">
            Name
          </label>
          <input
            type="text"
            id="name"
            className=" ml=4 mr=5"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <label className="mt-6 text-center block text-sm font-medium text-gray-700 mb-3">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-6 block text-sm font-medium text-gray-700 ml-5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          />
        </div>
        <div>
          <label className="mt-6 text-center block text-sm font-medium text-gray-700 mb-3">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center text-sm ${
            message.includes("successful") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
      <p className="mt-6 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/" className="text-blue-600 hover:underline font-medium">
          Login here
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;

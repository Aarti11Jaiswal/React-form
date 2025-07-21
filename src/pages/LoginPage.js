import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", res.data.userEmail);
      setMessage("Login successful!");
      setTimeout(() => navigate("/contact"), 1000);
    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message);
      setMessage(
        err.response?.data?.message ||
          "Login failed. Invalid email or password."
      );
    }
  };

  return (
    <div className="container mt-6 text-center">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 mr-5">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 mr-5">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && (
        <p
          style={{
            color: message.includes("successful") ? "green" : "red",
            marginTop: "10px",
          }}
        >
          {message}
        </p>
      )}

      <p style={{ marginTop: "15px" }}>
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline font-medium"
        >
          Register here
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;

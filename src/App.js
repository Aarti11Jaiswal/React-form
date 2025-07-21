// frontend/src/App.js
import React, { useState, useEffect } from "react"; // Corrected: Only one import for React and hooks
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";

// Main App Component
export default function App() {
  // State to manage the current route/page (This is no longer needed with react-router-dom)
  // const [route, setRoute] = useState('login');
  // State to store authentication token and user email
  // These states are now managed by localStorage and accessed directly in components
  // const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
  // const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null);

  // With react-router-dom, the App component primarily handles the routing setup.
  // Individual components will manage their own state and interact with localStorage.

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col font-inter antialiased">
        <Navbar /> {/* Navbar will be visible on all pages */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Protected Routes */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Simple No Match Component for 404
const NoMatch = () => {
  const navigate = useNavigate(); // Use useNavigate hook here

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-gray-600">
          The page you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate("/")} // Use navigate for redirection
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

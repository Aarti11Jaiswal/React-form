import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const [allUsers, setAllUsers] = useState([]); // State to store all registered users
  const [allContactMessages, setAllContactMessages] = useState([]); // State to store all contact messages
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in. Redirecting to login...");
        setTimeout(() => navigate("/"), 1500);
        return;
      }

      try {
        // Fetch ALL registered users
        const usersRes = await axios.get(
          "http://localhost:5000/api/users/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAllUsers(usersRes.data);

        // Fetch ALL contact messages
        const contactsRes = await axios.get(
          "http://localhost:5000/api/contact/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAllContactMessages(contactsRes.data.contacts);
      } catch (err) {
        console.error(
          "Dashboard data fetch error:",
          err.response?.data?.message || err.message
        );
        setError(
          err.response?.data?.message || "Failed to load dashboard data."
        );
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          setTimeout(() => navigate("/"), 1500);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center"></div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center bg-gray-100 p-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Dashboard
      </h2>
      <h3 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
        All Submitted Contact Messages
      </h3>

      {allContactMessages.length === 0 ? (
        <p className="text-gray-500 text-center">
          No contact messages submitted yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full max-w-5xl mx-auto bg-white border border-gray-300 rounded-lg shadow-md text-center">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal px-12">
                <th className="py-15 px-12 border border-gray-300 ">
                  Sender Name
                </th>
                <th className="py-4 px-8 border border-gray-300 w-50">
                  Sender Email
                </th>
                <th className="py-4 px-8 border border-gray-300 w-50">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {allContactMessages.map((msg) => (
                <tr key={msg._id} className="hover:bg-gray-50">
                  <td className="py-4 px-12 border border-gray-300">
                    {msg.name}
                  </td>
                  <td className="py-4 px-8 border border-gray-300">
                    {msg.email}
                  </td>
                  <td className="py-4 px-8 border border-gray-300">
                    {msg.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;

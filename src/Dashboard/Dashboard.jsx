import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaUserPlus } from "react-icons/fa";
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Replace with actual auth logic
  const username = "ABC"; // Replace with dynamic username

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-teal-600 via-teal-700 to-blue-800 text-white flex flex-col">
        {/* Logo or Title */}
        <div className="p-6 text-2xl font-bold border-b border-teal-700">
          Dashboard
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 text-base font-medium">
          <NavLink
            to="/home"
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
            activeClassName="bg-teal-800"
          >
            <FaHome className="text-lg" />
            <span>Home</span>
          </NavLink>

          {isLoggedIn && (
            <>
              <NavLink
                to="/profile"
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
                activeClassName="bg-teal-800"
              >
                <FaUser className="text-lg" />
                <span>Welcome, {username}</span>
              </NavLink>
              <NavLink
                to="/configuration"
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
                activeClassName="bg-teal-800"
              >
                <FaUserPlus className="text-lg" />
                <span>Configuration</span>
              </NavLink>
            </>
          )}
        </nav>

        {/* Login / Logout Button */}
        <div className="p-4 border-t border-teal-700">
          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsLoggedIn(false);
                // Replace with actual logout logic (e.g., clear tokens)
              }}
              className="w-full px-4 py-2 text-sm font-semibold bg-gray-500 rounded-lg hover:bg-red-500 transition-colors"
            >
              Log Out
            </button>
          ) : (
            <NavLink
              to="/login"
              className="block w-full px-4 py-2 text-center text-sm font-semibold bg-green-600 rounded-md hover:bg-green-500 transition-colors"
            >
              Log In
            </NavLink>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-semibold text-gray-800">
          Dashboard Content
        </h1>
        <p className="mt-2 text-gray-600">
          Your main content will appear here.
        </p>
      </main>

      {/* Render nested route content here */}
      <Outlet />
    </div>
  );
};

export default Dashboard;

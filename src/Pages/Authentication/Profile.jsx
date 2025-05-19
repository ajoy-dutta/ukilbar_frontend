// src/Pages/Profile/ProfilePage.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AxiosInstance from "../../Components/AxiosInstance";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.access);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      const response = await AxiosInstance.post("change-password/",
        {
          old_password: currentPassword,
          new_password: newPassword,
        },
        
      );

      setMessage("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error(error);
      setMessage("Failed to change password.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Profile</h2>
      <div className="mb-4">
        <strong>Username:</strong> {user?.username}
      </div>
      <div className="mb-4">
        <strong>Email:</strong> {user?.email}
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2">Change Password</h3>
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Change Password
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default Profile;

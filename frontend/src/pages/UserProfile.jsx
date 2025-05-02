import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserLayout from "../components/UserLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "user",
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `https://event-management-app-3-vs67.onrender.com/api/users/${user._id}`,
        formData
      );
      setIsEditing(false);
      toast.success("Profile updated! Please log in again.");
      dispatch({ type: "LOGOUT" });
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      await axios.put(
        `https://event-management-app-3-vs67.onrender.com/api/users/${user._id}/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }
      );
      toast.success("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password."
      );
    }
  };

  return (
    <UserLayout>
      <ToastContainer />
      <div className="max-w-lg mx-auto  bg-white p-8 rounded-2xl shadow-xl border border-yellow-300">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Profile Details
        </h2>

        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Email"
            />
            <div className="flex justify-between mt-6">
              <p className="text-gray-500">
                Logout and Login it will Updated 😊
              </p>
              <button
                className="bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded-lg text-white font-medium shadow"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 transition px-5 py-2 rounded-lg text-white font-medium shadow"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Role:</strong> {user?.role}
            </p>

            <div className="mt-6 space-x-3">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 transition px-5 py-2 rounded-lg text-white font-medium shadow"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg text-white font-medium shadow"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                {showPasswordForm ? "Cancel" : "Change Password"}
              </button>
            </div>
          </div>
        )}

        {showPasswordForm && (
          <div className="mt-10 space-y-4 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800">
              Change Password
            </h3>

            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg text-white font-medium shadow"
              onClick={handleChangePassword}
            >
              Update Password
            </button>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default UserProfile;

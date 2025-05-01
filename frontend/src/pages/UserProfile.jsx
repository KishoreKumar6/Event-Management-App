import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserLayout from "../components/UserLayout"; // adjust path if needed

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${user._id}`, formData);
      setIsEditing(false);
      dispatch({ type: "LOGOUT" });
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto mt-32 bg-white p-8 rounded-2xl shadow-xl border border-yellow-300">
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
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-between mt-6">
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
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>

            <button
              className="mt-6 bg-yellow-500 hover:bg-yellow-600 transition px-5 py-2 rounded-lg text-white font-medium shadow"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default UserProfile;

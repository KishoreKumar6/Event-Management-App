import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../components/AdminLayout";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch both Users and Admins
      const [userRes, adminRes] = await Promise.all([
        axios.get(
          "https://event-management-app-2-21xj.onrender.com/api/admin/users"
        ),
        axios.get(
          "https://event-management-app-2-21xj.onrender.com/api/admin/admins"
        ),
      ]);

      const usersData = userRes.data.map((user) => ({
        ...user,
        role: "User",
      }));

      const adminsData = adminRes.data.map((admin) => ({
        ...admin,
        role: "Admin",
      }));

      setUsers([...usersData, ...adminsData]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users/admins");
    }
    setLoading(false);
  };

  const updateUser = async (id, field, value) => {
    try {
      await axios.put(
        `https://event-management-app-2-21xj.onrender.com/api/admin/users/${id}`,
        { [field]: value }
      );
      toast.success("Updated successfully!");
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Users Management</h1>

        {loading ? (
          <div className="flex items-center justify-center h-screen bg-white">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-red-600 text-lg font-semibold animate-pulse">
                Loading...
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr className="bg-gray-400 text-gray-800 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Joined At</th>
                  <th className="py-3 px-6 text-left">Role</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-dark">
                {users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-200">
                    <td className="py-3 px-6">{user._id}</td>
                    <td className="py-3 px-6">{user.name}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-6">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          updateUser(user._id, "role", e.target.value)
                        }
                        className="border rounded p-1"
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UsersList;

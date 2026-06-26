"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

export default function AdminManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/admin/users`);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRole = async (id, currentRole) => {
    const newRole = currentRole === "lawyer" ? "user" : "lawyer";
    setTogglingId(id);
    try {
      const res = await axios.patch(`${BASE_URL}/admin/change-role/${id}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        setUsers(prev =>
          prev.map(u => u._id === id ? { ...u, role: newRole } : u)
        );
      }
    } catch (err) {
      console.error("Role change failed:", err);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    setDeletingId(id);
    try {
      const res = await axios.delete(`${BASE_URL}/admin/users/${id}`); // ✅ ঠিক করা হয়েছে
      if (res.data.deletedCount > 0) {
        setUsers(prev => prev.filter(u => u._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading users...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Manage System Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-gray-400">{index + 1}</td>
                <td className="p-3">{user.name || "—"}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
                    ${user.role === "admin" ? "bg-purple-100 text-purple-700" :
                      user.role === "lawyer" ? "bg-green-100 text-green-700" :
                      "bg-gray-100 text-gray-600"}`}>
                    {user.role || "user"}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  {user.role !== "admin" && (
                    <>
                      <button
                        onClick={() => handleChangeRole(user._id, user.role)}
                        disabled={togglingId === user._id}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                      >
                        {togglingId === user._id ? "Updating..." :
                          user.role === "lawyer" ? "→ User" : "→ Lawyer"}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        disabled={deletingId === user._id}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50"
                      >
                        {deletingId === user._id ? "Deleting..." : "Delete"}
                      </button>
                    </>
                  )}
                  {user.role === "admin" && (
                    <span className="text-xs text-gray-400 italic">Protected</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
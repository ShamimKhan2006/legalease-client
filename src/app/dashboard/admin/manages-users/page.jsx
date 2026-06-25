"use client";
import { useEffect, useState } from "react";
import axios from "react-nav";

export default function AdminManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/admin/users").then(res => setUsers(res.data));
  }, []);

  const handleChangeRole = async (id, currentRole) => {
    const newRole = currentRole === "user" ? "lawyer" : "user";
    const res = await axios.patch(`http://localhost:8000/admin/change-role/${id}`, { role: newRole });
    if (res.data.modifiedCount > 0) {
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role: newRole } : u));
    }
  };

  const handleDeleteUser = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const res = await axios.delete(`http://localhost:8000/admin/users/${id}`);
      if (res.data.deletedCount > 0) {
        setUsers(prev => prev.filter(u => u._id !== id));
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Manage System Users</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3 capitalize font-medium">{user.role || 'user'}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => handleChangeRole(user._id, user.role)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  Toggle Role
                </button>
                <button onClick={() => handleDeleteUser(user._id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
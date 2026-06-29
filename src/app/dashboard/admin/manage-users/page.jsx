

"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

const AVATAR_COLORS = [
  "bg-[#1e1d3a] text-[#7f77dd]",
  "bg-[#0e2820] text-[#1d9e75]",
  "bg-[#0c1e35] text-[#378add]",
  "bg-[#2e1510] text-[#d85a30]",
  "bg-[#28111e] text-[#d4537e]",
  "bg-[#251a08] text-[#ba7517]",
];

function initials(name) {
  if (!name) return "?";
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

function Avatar({ name, index }) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium flex-shrink-0 ${color}`}>
      {initials(name)}
    </div>
  );
}

function RoleBadge({ role }) {
  const styles = {
    lawyer: "bg-[#0e2820] text-[#1d9e75] border border-[rgba(29,158,117,0.2)]",
    user:   "bg-[#0c1e35] text-[#378add] border border-[rgba(55,138,221,0.2)]",
    admin:  "bg-[#1e1d3a] text-[#7f77dd] border border-[rgba(127,119,221,0.2)]",
  };
  const dotColors = {
    lawyer: "bg-[#1d9e75]",
    user:   "bg-[#378add]",
    admin:  "bg-[#7f77dd]",
  };
  const s = styles[role] || styles.user;
  const dot = dotColors[role] || dotColors.user;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${s}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {role}
    </span>
  );
}

function Toast({ message, type, visible }) {
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-[#0a0c10] border border-white/10 rounded-lg px-4 py-2.5 text-sm shadow-xl transition-all duration-200
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
    >
      <span className={type === "success" ? "text-[#1d9e75]" : "text-[#378add]"}>
        {type === "success" ? "✓" : "ℹ"}
      </span>
      <span className="text-[#c4c2f8]">{message}</span>
    </div>
  );
}

export default function AdminManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  useEffect(() => { fetchUsers(); }, []);

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
  };

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
        setUsers((prev) => prev.map((u) => u._id === id ? { ...u, role: newRole } : u));
        showToast(`Role updated to ${newRole}`, "success");
      }
    } catch (err) {
      console.error("Role change failed:", err);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm) return;
    setDeletingId(id);
    try {
      const res = await axios.delete(`${BASE_URL}/admin/users/${id}`);
      if (res.data.deletedCount > 0) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
        ("User removed", "info");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (u.name || "").toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  const counts = { admin: 0, lawyer: 0, user: 0 };
  users.forEach((u) => { if (counts[u.role] !== undefined) counts[u.role]++; });

  if (loading) {
    return (
      // <div className="flex items-center justify-center h-48 text-sm text-[#6b6b80]">
      //   Loading users…
      // </div>

      <div className="flex min-h-screen items-center justify-center">
      <div className="relative h-20 w-20">
        <span className="absolute inset-0 rounded-full border-[5px] border-indigo-500 border-t-transparent animate-spin"></span>

        <span
          className="absolute inset-3 rounded-full border-[5px] border-violet-500 border-b-transparent animate-spin"
          style={{
            animationDirection: "reverse",
            animationDuration: "1.2s",
          }}
        ></span>
      </div>
    </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-[#3d3d52] mb-1">
            Administration
          </p>
          <h2 className="text-xl font-medium text-[#e8e6ff]">System users</h2>
        </div>
        <div className="flex gap-2">
          {[
            { label: "total",   value: users.length },
            { label: "lawyers", value: counts.lawyer },
            { label: "users",   value: counts.user },
          ].map(({ label, value }) => (
            <span
              key={label}
              className="text-[11px] px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.05] text-[#6b6b80]"
            >
              <span className="font-medium text-[#c4c2f8]">{value}</span> {label}
            </span>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 border border-white/[0.08] rounded-[10px] px-3 h-9 bg-white/[0.04] mb-4">
        <svg className="w-3.5 h-3.5 text-[#3d3d52] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email…"
          className="flex-1 bg-transparent text-sm outline-none text-[#c4c2f8] placeholder:text-[#3d3d52]"
        />
      </div>

      {/* Table */}
      <div className="border border-white/[0.07] rounded-xl overflow-hidden bg-white/[0.03]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["#", "User", "Email", "Role", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-[10px] font-medium uppercase tracking-widest text-[#3d3d52]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-sm text-[#3d3d52]">
                  No users match your search.
                </td>
              </tr>
            ) : (
              filtered.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.025] transition-colors"
                >
                  {/* # */}
                  <td className="px-4 py-2.5 text-xs text-[#2e2e42] font-medium tabular-nums">
                    {index + 1}
                  </td>

                  {/* User */}
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={user.name} index={index} />
                      <span className="text-sm font-medium text-[#d0cef8]">{user.name || "—"}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-4 py-2.5 text-sm text-[#4a4a62]">{user.email}</td>

                  {/* Role */}
                  <td className="px-4 py-2.5">
                    <RoleBadge role={user.role} />
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-2.5">
                    {user.role === "admin" ? (
                      <span className="text-xs text-[#3d3d52] italic">Protected</span>
                    ) : (
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleChangeRole(user._id, user.role)}
                          disabled={togglingId === user._id}
                          className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-md
                            border border-white/[0.08] bg-white/[0.03] text-[#6b6b80]
                            hover:text-[#c4c2f8] hover:border-white/[0.15] hover:bg-white/[0.06]
                            disabled:opacity-40 transition-all"
                        >
                          {togglingId === user._id
                            ? "Updating…"
                            : user.role === "lawyer" ? "→ user" : "→ lawyer"}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          disabled={deletingId === user._id}
                          className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-md
                            border border-[rgba(229,115,115,0.12)] bg-[rgba(229,115,115,0.04)] text-[#6b3838]
                            hover:text-[#f87171] hover:border-[rgba(248,113,113,0.3)] hover:bg-[rgba(248,113,113,0.08)]
                            disabled:opacity-40 transition-all"
                        >
                          {deletingId === user._id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  );
}
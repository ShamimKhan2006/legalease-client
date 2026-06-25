"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";

export default function LawyerHiringRequests() {
  const { data: session } = authClient.useSession();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      axios.get(`http://localhost:8000/lawyer/hiring-requests?email=${session.user.email}`)
        .then(res => setRequests(res.data));
    }
  }, [session]);

  const updateStatus = async (id, status) => {
    const res = await axios.patch(`http://localhost:8000/lawyer/hiring-status/${id}`, { status });
    if (res.data.modifiedCount > 0) {
      setRequests(prev => prev.map(req => req._id === id ? { ...req, status } : req));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Client Hiring Requests</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3">Client Name</th>
            <th className="p-3">Client Email</th>
            <th className="p-3">Request Date</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id} className="border-b">
              <td className="p-3">{req.clientName}</td>
              <td className="p-3">{req.clientEmail}</td>
              <td className="p-3">{new Date(req.hiringDate).toLocaleDateString()}</td>
              <td className="p-3">
                {req.status === "pending" ? (
                  <div className="flex gap-2">
                    <button onClick={() => updateStatus(req._id, 'accepted')} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Accept</button>
                    <button onClick={() => updateStatus(req._id, 'rejected')} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Reject</button>
                  </div>
                ) : (
                  <span className="capitalize font-semibold text-sm">{req.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
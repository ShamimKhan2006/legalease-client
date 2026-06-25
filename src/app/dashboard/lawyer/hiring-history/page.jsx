"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { History, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function LawyerHiringRequests() {
  const { data: session } = authClient.useSession();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      axios.get(`http://localhost:8000/lawyer/hiring-requests?email=${session.user.email}`)
        .then(res => setRequests(res.data))
        .catch(err => toast.error("Failed to load requests"));
    }
  }, [session]);

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.patch(`http://localhost:8000/lawyer/hiring-status/${id}`, { status });
      if (res.data.modifiedCount > 0) {
        setRequests(prev => prev.map(req => req._id === id ? { ...req, status } : req));
        toast.success(`Request ${status} successfully!`);
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] p-6 md:p-10 text-slate-200">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
          <div className="p-3 bg-indigo-600/20 rounded-2xl border border-indigo-500/30">
            <History className="text-indigo-400 w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-white">Hiring History</h2>
            <p className="text-indigo-300/60 text-sm">Manage incoming client requests</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#111827] rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
                <th className="p-6">Client Name</th>
                <th className="p-6">Client Email</th>
                <th className="p-6">Request Date</th>
                <th className="p-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {requests.map((req) => (
                <tr key={req._id} className="hover:bg-white/5 transition">
                  <td className="p-6 font-medium text-white">{req.clientName}</td>
                  <td className="p-6 text-slate-400">{req.clientEmail}</td>
                  <td className="p-6 text-slate-400">{new Date(req.hiringDate).toLocaleDateString()}</td>
                  <td className="p-6">
                    {req.status === "pending" ? (
                      <div className="flex justify-center gap-3">
                        <button onClick={() => updateStatus(req._id, 'accepted')} className="text-emerald-500 hover:text-emerald-400 transition">
                          <CheckCircle2 size={24} />
                        </button>
                        <button onClick={() => updateStatus(req._id, 'rejected')} className="text-rose-500 hover:text-rose-400 transition">
                          <XCircle size={24} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          req.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {requests.length === 0 && (
            <div className="text-center py-20 text-slate-500">No hiring requests found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
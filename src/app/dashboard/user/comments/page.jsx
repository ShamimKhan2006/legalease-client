"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { Pencil, Trash2, Check, X, Star, MessageSquare, Loader2 } from "lucide-react";

export default function UserComments() {
  const { data: session } = authClient.useSession();
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      axios
        .get(`${process.env.NEXT_PUBLIC_URL}/user/comments?email=${session.user.email}`)
        .then((res) => {
          setComments(res.data);
          setLoading(false);
        });
    }
  }, [session]);

  const handleEdit = (comment) => {
    setEditingId(comment._id);
    setEditText(comment.commentText);
  };

  const handleSaveEdit = async (id) => {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_URL}/user/comments/${id}`, {
      commentText: editText,
    });
    if (res.data.modifiedCount > 0) {
      setComments((prev) =>
        prev.map((c) => (c._id === id ? { ...c, commentText: editText } : c))
      );
      setEditingId(null);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/user/comments/${id}`);
    if (res.data.deletedCount > 0) {
      setComments((prev) => prev.filter((c) => c._id !== id));
    }
    setDeletingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-10">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-indigo-600/20 border border-indigo-500/30 rounded-xl flex items-center justify-center">
            <MessageSquare size={14} className="text-indigo-400" />
          </div>
          <span className="text-slate-500 text-sm">Dashboard</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">My Reviews</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your feedback and comments</p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="text-indigo-400 animate-spin" />
        </div>
      )}

      {/* Empty State */}
      {!loading && comments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center">
            <MessageSquare size={24} className="text-slate-600" />
          </div>
          <p className="text-slate-400 font-semibold">No reviews yet</p>
          <p className="text-slate-600 text-sm">Your reviews will appear here after hiring a lawyer</p>
        </div>
      )}

      {/* Comments Grid */}
      <div className="grid grid-cols-1 gap-4">
        {comments.map((comment, i) => (
          <div
            key={comment._id}
            className="relative bg-white/5 border border-white/10 rounded-2xl p-5 overflow-hidden group hover:border-white/20 transition-all duration-300"
          >
            {/* Glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-4">
              
              {/* Left Content */}
              <div className="flex-1">
                {/* Lawyer name & index */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-indigo-600/20 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 text-xs font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Review for</p>
                    <p className="text-white text-sm font-semibold">
                      {comment.lawyerName || "Unknown Lawyer"}
                    </p>
                  </div>
                  {/* Star Rating */}
                  {comment.rating && (
                    <div className="ml-auto flex items-center gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={12}
                          className={idx < comment.rating ? "fill-amber-400 text-amber-400" : "text-slate-700"}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Comment Text or Edit Input */}
                {editingId === comment._id ? (
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full bg-white/5 border border-indigo-500/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all resize-none h-24"
                  />
                ) : (
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {comment.commentText}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {editingId === comment._id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(comment._id)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-xl text-xs font-semibold transition-all"
                    >
                      <Check size={13} />
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 text-slate-400 hover:text-white rounded-xl text-xs font-semibold transition-all"
                    >
                      <X size={13} />
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(comment)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 rounded-xl text-xs font-semibold transition-all"
                    >
                      <Pencil size={13} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(comment._id)}
                      disabled={deletingId === comment._id}
                      className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 disabled:opacity-50 rounded-xl text-xs font-semibold transition-all"
                    >
                      {deletingId === comment._id ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : (
                        <Trash2 size={13} />
                      )}
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
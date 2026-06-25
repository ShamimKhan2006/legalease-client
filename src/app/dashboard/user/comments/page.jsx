"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";

export default function UserComments() {
  const { data: session } = authClient.useSession();
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (session?.user?.email) {
      axios.get(`http://localhost:8000/user/comments?email=${session.user.email}`)
        .then(res => setComments(res.data));
    }
  }, [session]);

  const handleEdit = (comment) => {
    setEditingId(comment._id);
    setEditText(comment.commentText);
  };

  const handleSaveEdit = async (id) => {
    const res = await axios.put(`http://localhost:8000/user/comments/${id}`, { commentText: editText });
    if (res.data.modifiedCount > 0) {
      setComments(prev => prev.map(c => c._id === id ? { ...c, commentText: editText } : c));
      setEditingId(null);
      alert("Comment updated!");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this comment?")) {
      const res = await axios.delete(`http://localhost:8000/user/comments/${id}`);
      if (res.data.deletedCount > 0) {
        setComments(prev => prev.filter(c => c._id !== id));
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">My Comments & Reviews</h2>
      <div className="grid grid-cols-1 gap-4">
        {comments.map((comment) => (
          <div key={comment._id} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
            <div className="flex-1 mr-4">
              <p className="text-xs text-gray-500 mb-1">Lawyer: {comment.lawyerName}</p>
              {editingId === comment._id ? (
                <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="w-full p-1 border rounded" />
              ) : (
                <p className="text-gray-800">{comment.commentText}</p>
              )}
            </div>
            <div className="flex gap-2">
              {editingId === comment._id ? (
                <button onClick={() => handleSaveEdit(comment._id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Save</button>
              ) : (
                <button onClick={() => handleEdit(comment)} className="bg-amber-500 text-white px-3 py-1 rounded text-sm">Edit</button>
              )}
              <button onClick={() => handleDelete(comment._id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
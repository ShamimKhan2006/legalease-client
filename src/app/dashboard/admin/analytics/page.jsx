"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/admin/analytics").then(res => setAnalytics(res.data));
  }, []);

  if (!analytics) return <p>Loading Analytics...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Analytics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-gray-500 font-medium">Total Users</p>
          <h3 className="text-3xl font-bold mt-2">{analytics.totalUsers}</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-gray-500 font-medium">Total Lawyers</p>
          <h3 className="text-3xl font-bold mt-2">{analytics.totalLawyers}</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <p className="text-gray-500 font-medium">Total Hires</p>
          <h3 className="text-3xl font-bold mt-2">{analytics.totalHires}</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-gray-500 font-medium">Total Revenue</p>
          <h3 className="text-3xl font-bold mt-2">{analytics.totalRevenue} BDT</h3>
        </div>
      </div>
    </div>
  );
}
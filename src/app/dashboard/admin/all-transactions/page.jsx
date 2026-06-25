"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/admin/all-transactions")
      .then(res => setTransactions(res.data));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">All Transaction History</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3">Transaction ID</th>
            <th className="p-3">User Email</th>
            <th className="p-3">Lawyer Email</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id} className="border-b text-sm">
              <td className="p-3 font-mono text-blue-600">{tx.transactionId}</td>
              <td className="p-3">{tx.userEmail}</td>
              <td className="p-3">{tx.lawyerEmail}</td>
              <td className="p-3 font-semibold text-green-600">{tx.amount} BDT</td>
              <td className="p-3">{new Date(tx.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
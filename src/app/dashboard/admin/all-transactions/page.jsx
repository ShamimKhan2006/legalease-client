"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_URL}/admin/all-transactions`)
      .then((res) => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Could not load transactions. Check your API connection.");
        setLoading(false);
      });
  }, []);

  const BDT_TO_USD = 110;
  const toUSD = (bdt) => (bdt / BDT_TO_USD).toFixed(2);

  const totalVolume = transactions.reduce((sum, tx) => sum + (tx.amount || 0), 0);

  if (loading) {
    return (
      <div className="bg-[#0d0f14] rounded-[20px] p-6 animate-pulse space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 bg-[#1a1f28] rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0d0f14] rounded-[20px] p-6 text-center">
        <p className="text-[#c04040] text-sm font-mono">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0d0f14] rounded-[20px] p-6">

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-[15px] font-bold text-[#e8eaf0] tracking-tight">
            Transaction ledger
          </h2>
          <p className="font-mono text-[11px] text-[#40485a] uppercase tracking-widest mt-0.5">
            Admin — all records
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[18px] font-bold text-[#3daa60]">
            ${Number(toUSD(totalVolume)).toLocaleString()} USD
          </p>
          <p className="text-[10px] text-[#40485a] uppercase tracking-widest mt-0.5">
            Total volume
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: "560px" }}>
          <thead>
            <tr className="border-b border-[#1a1f28]">
              {["Transaction ID", "User", "Lawyer", "Amount (USD)", "Date"].map((h) => (
                <th
                  key={h}
                  className="pb-3 px-3 text-[10px] font-semibold text-[#40485a] uppercase tracking-widest text-left whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-[#30384a] text-sm font-mono">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="border-b border-[#13171f] last:border-none hover:bg-[#111520] transition-colors"
                >
                  <td className="px-3 py-3">
                    <span className="font-mono text-[11px] text-[#3a6aa0]">
                      {tx.transactionId}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-[12px] text-[#8090a8]">{tx.userEmail}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-[12px] text-[#8090a8]">{tx.lawyerEmail}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="font-mono text-[12px] font-bold text-[#3daa60]">
                      ${toUSD(tx.amount)}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="font-mono text-[11px] text-[#404858]">
                      {new Date(tx.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-[#13171f] flex justify-between items-center">
        <span className="font-mono text-[11px] text-[#2a3040]">
          {transactions.length} transactions
        </span>
        <span className="font-mono text-[11px] text-[#2a3040]">
          LEDGER-{new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}
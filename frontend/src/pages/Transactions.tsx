import React, { useEffect, useState } from "react";
import api from "../lib/api";

export default function Transactions() {
  const [txns, setTxns] = useState<any[]>([]);

  useEffect(() => {
    fetchTxns();
  }, []);

  const fetchTxns = async () => {
    try {
      const res = await api.get("/transactions");
      setTxns(res.data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };

  const handleExport = async () => {
    try {
      const res = await api.get("/transactions/export", {
        responseType: "blob", // important for CSV
      });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "txns.csv";
      a.click();
    } catch (err) {
      console.error("Failed to export CSV:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <button
        onClick={handleExport}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Export CSV
      </button>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {txns.map((txn) => (
            <tr key={txn._id}>
              <td className="border p-2">{txn._id}</td>
              <td className="border p-2">₹{txn.amount}</td>
              <td className="border p-2">{txn.status}</td>
              <td className="border p-2">
                {new Date(txn.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

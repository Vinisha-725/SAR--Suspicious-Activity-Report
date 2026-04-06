"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({});
  const [report, setReport] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/generate-report", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setReport(data.report);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>SAR Generator</h1>

      <input placeholder="Customer ID" onChange={e => setForm({...form, customer_id: e.target.value})} />
      <input placeholder="Account Number" onChange={e => setForm({...form, account_number: e.target.value})} />
      <input placeholder="Transaction ID" onChange={e => setForm({...form, transaction_id: e.target.value})} />
      <input placeholder="Amount" onChange={e => setForm({...form, amount: Number(e.target.value)})} />
      <input placeholder="Transaction Type" onChange={e => setForm({...form, transaction_type: e.target.value})} />
      <input placeholder="Location" onChange={e => setForm({...form, location: e.target.value})} />
      <input placeholder="Flag (optional)" onChange={e => setForm({...form, flag: e.target.value})} />
      <textarea placeholder="Notes" onChange={e => setForm({...form, raw_notes: e.target.value})} />

      <button onClick={handleSubmit}>Generate Report</button>

      <pre>{report}</pre>
    </div>
  );
}
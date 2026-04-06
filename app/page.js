"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    customer_id: "",
    account_number: "",
    transaction_id: "",
    amount: "",
    transaction_type: "Transfer",
    location: "",
    flag: "",
    raw_notes: "",
  });

  const [report, setReport] = useState("");
  const [structured, setStructured] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const res = await fetch("/api/generate-report", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        amount: Number(form.amount),
      }),
    });

    const data = await res.json();
    setReport(data.report);
    setStructured(data.structured);
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>SAR Report Generator</h1>

      <div style={styles.form}>
        {/* Customer Info */}
        <h3>Customer Details</h3>
        <input
          placeholder="Customer ID"
          style={styles.input}
          onChange={(e) => handleChange("customer_id", e.target.value)}
        />
        <input
          placeholder="Account Number"
          style={styles.input}
          onChange={(e) => handleChange("account_number", e.target.value)}
        />

        {/* Transaction Info */}
        <h3>Transaction Details</h3>
        <input
          placeholder="Transaction ID"
          style={styles.input}
          onChange={(e) => handleChange("transaction_id", e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount (INR)"
          style={styles.input}
          onChange={(e) => handleChange("amount", e.target.value)}
        />

        <select
          style={styles.input}
          onChange={(e) => handleChange("transaction_type", e.target.value)}
        >
          <option>Transfer</option>
          <option>Withdrawal</option>
          <option>Deposit</option>
          <option>Online Payment</option>
        </select>

        <input
          placeholder="Location"
          style={styles.input}
          onChange={(e) => handleChange("location", e.target.value)}
        />

        {/* Suspicion Flags */}
        <h3>Flags</h3>
        <select
          style={styles.input}
          onChange={(e) => handleChange("flag", e.target.value)}
        >
          <option value="">None</option>
          <option value="High Frequency Transactions">
            High Frequency Transactions
          </option>
          <option value="Unusual Amount">Unusual Amount</option>
          <option value="Foreign Transfer">Foreign Transfer</option>
        </select>

        {/* Notes */}
        <h3>Additional Notes</h3>
        <textarea
          placeholder="Describe anything unusual..."
          style={styles.textarea}
          onChange={(e) => handleChange("raw_notes", e.target.value)}
        />

        <button style={styles.button} onClick={handleSubmit}>
          {loading ? "Generating..." : "Generate SAR"}
        </button>
      </div>

      {/* Output */}
      {report && (
        <div style={styles.output}>
          <h2>SAR Report</h2>
          
          <p>
            <b>Risk Level:</b> {structured?.risk_level}
          </p>
          <p>
            <b>Incident:</b> {structured?.incident_type}
          </p>

          <h3>Summary</h3>
          <p>{structured?.summary}</p>

          <h3>Audit Trail</h3>
          <p>{structured?.audit_trail}</p>

          <h3>Recommended Action</h3>
          <p>{structured?.recommended_action}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial",
    background: "#f5f7fb",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    maxWidth: "500px",
    margin: "auto",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginTop: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  output: {
    maxWidth: "700px",
    margin: "30px auto",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
  },
};

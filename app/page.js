export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{
        textAlign: "center",
        maxWidth: "600px",
        width: "100%"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#1e293b",
          marginBottom: "1rem"
        }}>
          SAR Portal
        </h1>
        <p style={{
          fontSize: "1.1rem",
          color: "#64748b",
          marginBottom: "2rem"
        }}>
          Suspicious Activity Reporting System
        </p>
        <div style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          <a href="/sar-filing" style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#3b82f6",
            color: "white",
            textDecoration: "none",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            fontWeight: "500",
            transition: "all 0.2s ease"
          }}>
            File New SAR
          </a>
          <a href="/dashboard" style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#64748b",
            color: "white",
            textDecoration: "none",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            fontWeight: "500",
            transition: "all 0.2s ease"
          }}>
            Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}

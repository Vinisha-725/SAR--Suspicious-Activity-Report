"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Alerts() {
  const router = useRouter();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState(null);

  useEffect(() => {
    // Simulate loading alerts data
    setTimeout(() => {
      setAlerts([
        {
          id: "ALT-2024-001",
          type: "High Value Transaction",
          severity: "High",
          customerId: "CUST-123456",
          customerName: "John Doe",
          accountId: "ACC-789012",
          amount: "$150,000",
          description: "Transaction amount exceeds $100,000 threshold",
          timestamp: "2024-01-18 14:30:00",
          status: "Active",
          assignedTo: "Sarah Johnson",
          ruleTriggered: "High Value Transaction Rule",
          riskScore: 95
        },
        {
          id: "ALT-2024-002",
          type: "Unusual Pattern",
          severity: "Medium",
          customerId: "CUST-234567",
          customerName: "Jane Smith",
          accountId: "ACC-345678",
          amount: "$25,000",
          description: "Multiple transactions detected within short timeframe",
          timestamp: "2024-01-18 13:15:00",
          status: "Under Review",
          assignedTo: "Mike Chen",
          ruleTriggered: "Frequency Pattern Rule",
          riskScore: 72
        },
        {
          id: "ALT-2024-003",
          type: "Geographic Anomaly",
          severity: "High",
          customerId: "CUST-345678",
          customerName: "Acme Corp",
          accountId: "ACC-901234",
          amount: "$75,000",
          description: "Transaction from high-risk geographic location",
          timestamp: "2024-01-18 12:45:00",
          status: "Active",
          assignedTo: "Emily Davis",
          ruleTriggered: "Geographic Risk Rule",
          riskScore: 88
        },
        {
          id: "ALT-2024-004",
          type: "Structuring Activity",
          severity: "High",
          customerId: "CUST-456789",
          customerName: "Robert Wilson",
          accountId: "ACC-567890",
          amount: "$9,500",
          description: "Multiple transactions just below reporting threshold",
          timestamp: "2024-01-18 11:20:00",
          status: "Investigating",
          assignedTo: "Sarah Johnson",
          ruleTriggered: "Structuring Detection Rule",
          riskScore: 91
        },
        {
          id: "ALT-2024-005",
          type: "Unusual Time",
          severity: "Low",
          customerId: "CUST-567890",
          customerName: "Tech Solutions Inc",
          accountId: "ACC-234567",
          amount: "$15,000",
          description: "Transaction outside normal business hours",
          timestamp: "2024-01-18 10:30:00",
          status: "Resolved",
          assignedTo: "Mike Chen",
          ruleTriggered: "Time Pattern Rule",
          riskScore: 45
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredAlerts = alerts.filter(alert => {
    return filter === "all" || 
           (filter === "high" && alert.severity === "High") ||
           (filter === "medium" && alert.severity === "Medium") ||
           (filter === "low" && alert.severity === "Low") ||
           (filter === "active" && alert.status === "Active") ||
           (filter === "review" && alert.status === "Under Review") ||
           (filter === "investigating" && alert.status === "Investigating") ||
           (filter === "resolved" && alert.status === "Resolved");
  });

  const getSeverityColor = (severity) => {
    switch(severity) {
      case "High": return "#ef4444";
      case "Medium": return "#f59e0b";
      case "Low": return "#10b981";
      default: return "#6b7280";
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Active": return "#ef4444";
      case "Under Review": return "#f59e0b";
      case "Investigating": return "#3b82f6";
      case "Resolved": return "#10b981";
      default: return "#6b7280";
    }
  };

  const getRiskScoreColor = (score) => {
    if (score >= 80) return "#ef4444";
    if (score >= 60) return "#f59e0b";
    if (score >= 40) return "#10b981";
    return "#6b7280";
  };

  const openAlertDetails = (alert) => {
    setSelectedAlert(alert);
  };

  const closeAlertDetails = () => {
    setSelectedAlert(null);
  };

  const updateAlertStatus = (alertId, newStatus) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: newStatus } : alert
    ));
    setSelectedAlert(prev => prev ? { ...prev, status: newStatus } : null);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading alerts...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <button 
            style={styles.backButton}
            onClick={() => router.push("/dashboard")}
          >
            {"\u2190"} Back to Dashboard
          </button>
          <h1 style={styles.title}>Alerts & Notifications</h1>
        </div>
      </header>

      <div style={styles.controlsContainer}>
        <div style={styles.filterContainer}>
          <select
            style={styles.filterSelect}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Alerts</option>
            <option value="high">High Severity</option>
            <option value="medium">Medium Severity</option>
            <option value="low">Low Severity</option>
            <option value="active">Active</option>
            <option value="review">Under Review</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <button style={styles.primaryButton}>
          Configure Rules
        </button>
      </div>

      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>{alerts.filter(a => a.status === "Active").length}</h3>
          <p style={styles.statLabel}>Active Alerts</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>{alerts.filter(a => a.severity === "High").length}</h3>
          <p style={styles.statLabel}>High Severity</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>{alerts.filter(a => a.status === "Under Review").length}</h3>
          <p style={styles.statLabel}>Under Review</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>{Math.round(alerts.reduce((sum, a) => sum + a.riskScore, 0) / alerts.length)}</h3>
          <p style={styles.statLabel}>Avg Risk Score</p>
        </div>
      </div>

      <div style={styles.alertsContainer}>
        {filteredAlerts.map(alert => (
          <div key={alert.id} style={styles.alertCard}>
            <div style={styles.alertHeader}>
              <div style={styles.alertInfo}>
                <h3 style={styles.alertTitle}>{alert.type}</h3>
                <span style={styles.alertId}>{alert.id}</span>
              </div>
              <div style={styles.alertMeta}>
                <span 
                  style={{
                    ...styles.severityBadge,
                    backgroundColor: getSeverityColor(alert.severity)
                  }}
                >
                  {alert.severity}
                </span>
                <span 
                  style={{
                    ...styles.statusBadge,
                    backgroundColor: getStatusColor(alert.status)
                  }}
                >
                  {alert.status}
                </span>
              </div>
            </div>

            <div style={styles.alertContent}>
              <p style={styles.alertDescription}>{alert.description}</p>
              
              <div style={styles.alertDetails}>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Customer:</span>
                  <span style={styles.detailValue}>{alert.customerName}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Account:</span>
                  <span style={styles.detailValue}>{alert.accountId}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Amount:</span>
                  <span style={styles.detailValue}>{alert.amount}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Risk Score:</span>
                  <span 
                    style={{
                      ...styles.riskScore,
                      color: getRiskScoreColor(alert.riskScore)
                    }}
                  >
                    {alert.riskScore}/100
                  </span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Time:</span>
                  <span style={styles.detailValue}>{alert.timestamp}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Assigned To:</span>
                  <span style={styles.detailValue}>{alert.assignedTo}</span>
                </div>
              </div>
            </div>

            <div style={styles.alertActions}>
              <button 
                style={styles.actionButton}
                onClick={() => openAlertDetails(alert)}
              >
                View Details
              </button>
              <button 
                style={styles.actionButton}
                onClick={() => router.push('/sar-filing')}
              >
                Create SAR
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedAlert && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Alert Details: {selectedAlert.id}</h2>
              <button 
                style={styles.closeButton}
                onClick={closeAlertDetails}
              >
                {"\u2715"}
              </button>
            </div>
            
            <div style={styles.modalContent}>
              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Alert Information</h3>
                <div style={styles.modalGrid}>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Alert Type:</span>
                    <span style={styles.modalValue}>{selectedAlert.type}</span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Severity:</span>
                    <span 
                      style={{
                        ...styles.badge,
                        backgroundColor: getSeverityColor(selectedAlert.severity)
                      }}
                    >
                      {selectedAlert.severity}
                    </span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Status:</span>
                    <span 
                      style={{
                        ...styles.badge,
                        backgroundColor: getStatusColor(selectedAlert.status)
                      }}
                    >
                      {selectedAlert.status}
                    </span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Risk Score:</span>
                    <span 
                      style={{
                        ...styles.modalValue,
                        color: getRiskScoreColor(selectedAlert.riskScore),
                        fontWeight: "700"
                      }}
                    >
                      {selectedAlert.riskScore}/100
                    </span>
                  </div>
                </div>
              </div>

              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Customer Information</h3>
                <div style={styles.modalGrid}>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Customer Name:</span>
                    <span style={styles.modalValue}>{selectedAlert.customerName}</span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Customer ID:</span>
                    <span style={styles.modalValue}>{selectedAlert.customerId}</span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Account ID:</span>
                    <span style={styles.modalValue}>{selectedAlert.accountId}</span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Transaction Amount:</span>
                    <span style={styles.modalValue}>{selectedAlert.amount}</span>
                  </div>
                </div>
              </div>

              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Alert Details</h3>
                <p style={styles.modalText}>{selectedAlert.description}</p>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Rule Triggered:</span>
                  <span style={styles.detailValue}>{selectedAlert.ruleTriggered}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Timestamp:</span>
                  <span style={styles.detailValue}>{selectedAlert.timestamp}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Assigned To:</span>
                  <span style={styles.detailValue}>{selectedAlert.assignedTo}</span>
                </div>
              </div>

              <div style={styles.modalActions}>
                <select 
                  style={styles.statusSelect}
                  value={selectedAlert.status}
                  onChange={(e) => updateAlertStatus(selectedAlert.id, e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Investigating">Investigating</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <div style={styles.actionButtons}>
                  <button style={styles.secondaryButton}>Dismiss Alert</button>
                  <button 
                    style={styles.primaryButton}
                    onClick={() => router.push('/sar-filing')}
                  >
                    Create SAR Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "400px",
    color: "#64748b"
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "16px"
  },
  header: {
    backgroundColor: "white",
    borderBottom: "1px solid #e2e8f0",
    padding: "16px 24px"
  },
  headerContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  backButton: {
    backgroundColor: "transparent",
    border: "1px solid #d1d5db",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#6b7280"
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    margin: "0",
    color: "#1e293b"
  },
  controlsContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  filterContainer: {
    minWidth: "200px"
  },
  filterSelect: {
    width: "100%",
    padding: "10px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "white",
    cursor: "pointer"
  },
  primaryButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },
  statsContainer: {
    maxWidth: "1400px",
    margin: "0 auto 24px",
    padding: "0 24px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px"
  },
  statCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    textAlign: "center"
  },
  statNumber: {
    fontSize: "28px",
    fontWeight: "700",
    margin: "0 0 4px 0",
    color: "#1e293b"
  },
  statLabel: {
    fontSize: "14px",
    color: "#64748b",
    margin: 0
  },
  alertsContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 24px 24px",
    display: "grid",
    gap: "16px"
  },
  alertCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    borderLeft: "4px solid #3b82f6"
  },
  alertHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px"
  },
  alertInfo: {
    flex: 1
  },
  alertTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 4px 0",
    color: "#1e293b"
  },
  alertId: {
    fontSize: "12px",
    color: "#64748b",
    fontFamily: "monospace"
  },
  alertMeta: {
    display: "flex",
    gap: "8px"
  },
  severityBadge: {
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  statusBadge: {
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  alertContent: {
    marginBottom: "16px"
  },
  alertDescription: {
    fontSize: "14px",
    color: "#475569",
    margin: "0 0 16px 0",
    lineHeight: "1.5"
  },
  alertDetails: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px"
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between"
  },
  detailLabel: {
    fontSize: "12px",
    color: "#64748b",
    fontWeight: "500"
  },
  detailValue: {
    fontSize: "12px",
    color: "#1e293b",
    fontWeight: "600"
  },
  riskScore: {
    fontSize: "14px",
    fontWeight: "700"
  },
  alertActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end"
  },
  actionButton: {
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "1px solid #e2e8f0",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "800px",
    maxHeight: "90vh",
    overflow: "auto"
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px",
    borderBottom: "1px solid #e2e8f0"
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: "600",
    margin: 0,
    color: "#1e293b"
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#6b7280",
    padding: "4px"
  },
  modalContent: {
    padding: "24px"
  },
  modalSection: {
    marginBottom: "24px"
  },
  modalSectionTitle: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "0 0 16px 0",
    color: "#1e293b"
  },
  modalGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px"
  },
  modalItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalLabel: {
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "500"
  },
  modalValue: {
    fontSize: "14px",
    color: "#1e293b",
    fontWeight: "600"
  },
  modalText: {
    fontSize: "14px",
    color: "#475569",
    lineHeight: "1.6",
    margin: "0 0 16px 0"
  },
  badge: {
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "24px",
    borderTop: "1px solid #e2e8f0"
  },
  statusSelect: {
    padding: "8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    backgroundColor: "white",
    cursor: "pointer"
  },
  actionButtons: {
    display: "flex",
    gap: "12px"
  },
  secondaryButton: {
    backgroundColor: "white",
    color: "#6b7280",
    border: "1px solid #d1d5db",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  }
};
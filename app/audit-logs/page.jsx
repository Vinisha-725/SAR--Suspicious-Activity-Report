"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuditLogs() {
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    // Simulate loading audit logs data
    setTimeout(() => {
      setLogs([
        {
          id: "LOG-2024-001",
          timestamp: "2024-01-18 14:35:22",
          userId: "sarah.johnson",
          action: "SAR Report Generated",
          details: "SAR-2024-001 generated for customer John Doe (ACC-789012)",
          ipAddress: "192.168.1.105",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          severity: "Info",
          category: "SAR Operations",
          affectedEntity: "SAR-2024-001",
          previousValue: null,
          newValue: "Report Generated"
        },
        {
          id: "LOG-2024-002",
          timestamp: "2024-01-18 14:30:15",
          userId: "system",
          action: "Alert Triggered",
          details: "High Value Transaction Alert triggered for $150,000 transaction",
          ipAddress: "system",
          userAgent: "Automated System",
          severity: "Warning",
          category: "Alert System",
          affectedEntity: "ALT-2024-001",
          previousValue: null,
          newValue: "Alert Active"
        },
        {
          id: "LOG-2024-003",
          timestamp: "2024-01-18 13:45:33",
          userId: "mike.chen",
          action: "Case Status Updated",
          details: "Case SAR-2024-002 status changed from 'Pending' to 'Under Review'",
          ipAddress: "192.168.1.112",
          userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
          severity: "Info",
          category: "Case Management",
          affectedEntity: "SAR-2024-002",
          previousValue: "Pending",
          newValue: "Under Review"
        },
        {
          id: "LOG-2024-004",
          timestamp: "2024-01-18 13:20:18",
          userId: "emily.davis",
          action: "User Login",
          details: "User logged in successfully",
          ipAddress: "192.168.1.108",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          severity: "Info",
          category: "Authentication",
          affectedEntity: "emily.davis",
          previousValue: null,
          newValue: "Logged In"
        },
        {
          id: "LOG-2024-005",
          timestamp: "2024-01-18 12:55:41",
          userId: "system",
          action: "Data Export",
          details: "Monthly compliance report exported",
          ipAddress: "system",
          userAgent: "Automated System",
          severity: "Info",
          category: "Reports",
          affectedEntity: "Compliance Report",
          previousValue: null,
          newValue: "Exported"
        },
        {
          id: "LOG-2024-006",
          timestamp: "2024-01-18 12:30:27",
          userId: "sarah.johnson",
          action: "Case Created",
          details: "New case SAR-2024-003 created for customer Acme Corp",
          ipAddress: "192.168.1.105",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          severity: "Info",
          category: "Case Management",
          affectedEntity: "SAR-2024-003",
          previousValue: null,
          newValue: "Case Created"
        },
        {
          id: "LOG-2024-007",
          timestamp: "2024-01-18 11:45:12",
          userId: "admin",
          action: "System Configuration Updated",
          details: "Alert threshold for high-value transactions updated from $100,000 to $150,000",
          ipAddress: "192.168.1.100",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          severity: "Warning",
          category: "System Administration",
          affectedEntity: "Alert Configuration",
          previousValue: "$100,000",
          newValue: "$150,000"
        },
        {
          id: "LOG-2024-008",
          timestamp: "2024-01-18 11:15:33",
          userId: "mike.chen",
          action: "Alert Dismissed",
          details: "Alert ALT-2024-005 dismissed as false positive",
          ipAddress: "192.168.1.112",
          userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
          severity: "Info",
          category: "Alert System",
          affectedEntity: "ALT-2024-005",
          previousValue: "Active",
          newValue: "Dismissed"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === "all" || 
                        (filter === "sar" && log.category === "SAR Operations") ||
                        (filter === "cases" && log.category === "Case Management") ||
                        (filter === "alerts" && log.category === "Alert System") ||
                        (filter === "auth" && log.category === "Authentication") ||
                        (filter === "system" && log.category === "System Administration") ||
                        (filter === "reports" && log.category === "Reports") ||
                        (filter === "warning" && log.severity === "Warning") ||
                        (filter === "info" && log.severity === "Info");
    
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.affectedEntity.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getSeverityColor = (severity) => {
    switch(severity) {
      case "Warning": return "#f59e0b";
      case "Error": return "#ef4444";
      case "Critical": return "#dc2626";
      case "Info": return "#3b82f6";
      default: return "#6b7280";
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case "SAR Operations": return "#8b5cf6";
      case "Alert System": return "#f59e0b";
      case "Case Management": return "#3b82f6";
      case "Authentication": return "#10b981";
      case "System Administration": return "#ef4444";
      case "Reports": return "#6366f1";
      default: return "#6b7280";
    }
  };

  const openLogDetails = (log) => {
    setSelectedLog(log);
  };

  const closeLogDetails = () => {
    setSelectedLog(null);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading audit logs...</p>
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
          <h1 style={styles.title}>Audit Logs</h1>
        </div>
      </header>

      <div style={styles.controlsContainer}>
        <div style={styles.searchContainer}>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="Search logs by action, user, or details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div style={styles.filterContainer}>
          <select
            style={styles.filterSelect}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Logs</option>
            <option value="sar">SAR Operations</option>
            <option value="cases">Case Management</option>
            <option value="alerts">Alert System</option>
            <option value="auth">Authentication</option>
            <option value="system">System Administration</option>
            <option value="reports">Reports</option>
            <option value="warning">Warnings Only</option>
            <option value="info">Info Only</option>
          </select>
        </div>

        <button style={styles.primaryButton}>
          Export Logs
        </button>
      </div>

      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>{logs.length}</h3>
          <p style={styles.statLabel}>Total Logs</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>{logs.filter(l => l.severity === "Warning").length}</h3>
          <p style={styles.statLabel}>Warnings</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>{logs.filter(l => l.category === "SAR Operations").length}</h3>
          <p style={styles.statLabel}>SAR Operations</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>{new Set(logs.map(l => l.userId)).size}</h3>
          <p style={styles.statLabel}>Active Users</p>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableHeaderCell}>Timestamp</th>
              <th style={styles.tableHeaderCell}>User</th>
              <th style={styles.tableHeaderCell}>Action</th>
              <th style={styles.tableHeaderCell}>Category</th>
              <th style={styles.tableHeaderCell}>Severity</th>
              <th style={styles.tableHeaderCell}>Entity</th>
              <th style={styles.tableHeaderCell}>Details</th>
              <th style={styles.tableHeaderCell}>IP Address</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} style={styles.tableRow}>
                <td style={styles.tableCell}>
                  <div style={styles.timestamp}>{log.timestamp}</div>
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.userInfo}>
                    <div style={styles.userId}>{log.userId}</div>
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.action}>{log.action}</div>
                </td>
                <td style={styles.tableCell}>
                  <span 
                    style={{
                      ...styles.categoryBadge,
                      backgroundColor: getCategoryColor(log.category)
                    }}
                  >
                    {log.category}
                  </span>
                </td>
                <td style={styles.tableCell}>
                  <span 
                    style={{
                      ...styles.severityBadge,
                      backgroundColor: getSeverityColor(log.severity)
                    }}
                  >
                    {log.severity}
                  </span>
                </td>
                <td style={styles.tableCell}>
                  <span style={styles.entityId}>{log.affectedEntity}</span>
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.details} title={log.details}>
                    {log.details.length > 50 ? log.details.substring(0, 50) + "..." : log.details}
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <span style={styles.ipAddress}>{log.ipAddress}</span>
                </td>
                <td style={styles.tableCell}>
                  <button 
                    style={styles.actionButton}
                    onClick={() => openLogDetails(log)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedLog && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Log Entry: {selectedLog.id}</h2>
              <button 
                style={styles.closeButton}
                onClick={closeLogDetails}
              >
                {"\u2715"}
              </button>
            </div>
            
            <div style={styles.modalContent}>
              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Log Information</h3>
                <div style={styles.modalGrid}>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Timestamp:</span>
                    <span style={styles.modalValue}>{selectedLog.timestamp}</span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>User ID:</span>
                    <span style={styles.modalValue}>{selectedLog.userId}</span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Action:</span>
                    <span style={styles.modalValue}>{selectedLog.action}</span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Category:</span>
                    <span 
                      style={{
                        ...styles.badge,
                        backgroundColor: getCategoryColor(selectedLog.category)
                      }}
                    >
                      {selectedLog.category}
                    </span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Severity:</span>
                    <span 
                      style={{
                        ...styles.badge,
                        backgroundColor: getSeverityColor(selectedLog.severity)
                      }}
                    >
                      {selectedLog.severity}
                    </span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Affected Entity:</span>
                    <span style={styles.modalValue}>{selectedLog.affectedEntity}</span>
                  </div>
                </div>
              </div>

              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Technical Details</h3>
                <div style={styles.modalGrid}>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>IP Address:</span>
                    <span style={styles.modalValue}>{selectedLog.ipAddress}</span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>User Agent:</span>
                    <span style={styles.modalValue}>{selectedLog.userAgent}</span>
                  </div>
                  {selectedLog.previousValue && (
                    <>
                      <div style={styles.modalItem}>
                        <span style={styles.modalLabel}>Previous Value:</span>
                        <span style={styles.modalValue}>{selectedLog.previousValue}</span>
                      </div>
                      <div style={styles.modalItem}>
                        <span style={styles.modalLabel}>New Value:</span>
                        <span style={styles.modalValue}>{selectedLog.newValue}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Full Details</h3>
                <p style={styles.modalText}>{selectedLog.details}</p>
              </div>

              <div style={styles.modalActions}>
                <button style={styles.secondaryButton}>Export Entry</button>
                <button style={styles.secondaryButton}>Related Logs</button>
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
    maxWidth: "1600px",
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
    maxWidth: "1600px",
    margin: "0 auto",
    padding: "24px",
    display: "flex",
    gap: "16px",
    alignItems: "center",
    flexWrap: "wrap"
  },
  searchContainer: {
    flex: 1,
    minWidth: "300px"
  },
  searchInput: {
    width: "100%",
    padding: "10px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px"
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
    cursor: "pointer",
    whiteSpace: "nowrap"
  },
  statsContainer: {
    maxWidth: "1600px",
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
  tableContainer: {
    maxWidth: "1600px",
    margin: "0 auto",
    padding: "0 24px 24px"
  },
  table: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
  },
  tableHeader: {
    backgroundColor: "#f8fafc",
    borderBottom: "1px solid #e2e8f0"
  },
  tableHeaderCell: {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  tableRow: {
    borderBottom: "1px solid #f1f5f9",
    transition: "background-color 0.2s"
  },
  tableCell: {
    padding: "16px",
    fontSize: "14px",
    color: "#374151",
    verticalAlign: "top"
  },
  timestamp: {
    fontSize: "12px",
    color: "#64748b",
    fontFamily: "monospace"
  },
  userInfo: {
    display: "flex",
    alignItems: "center"
  },
  userId: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1e293b"
  },
  action: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151"
  },
  categoryBadge: {
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "10px",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  severityBadge: {
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "10px",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  entityId: {
    fontSize: "12px",
    color: "#6b7280",
    fontFamily: "monospace"
  },
  details: {
    fontSize: "13px",
    color: "#475569",
    maxWidth: "200px",
    lineHeight: "1.4"
  },
  ipAddress: {
    fontSize: "12px",
    color: "#6b7280",
    fontFamily: "monospace"
  },
  actionButton: {
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "1px solid #e2e8f0",
    padding: "6px 12px",
    borderRadius: "4px",
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
    maxWidth: "900px",
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
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px"
  },
  modalItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "column"
  },
  modalLabel: {
    fontSize: "12px",
    color: "#64748b",
    fontWeight: "500",
    marginBottom: "4px"
  },
  modalValue: {
    fontSize: "14px",
    color: "#1e293b",
    fontWeight: "600",
    wordBreak: "break-all"
  },
  modalText: {
    fontSize: "14px",
    color: "#475569",
    lineHeight: "1.6",
    margin: 0,
    backgroundColor: "#f8fafc",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #e2e8f0"
  },
  badge: {
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "10px",
    fontWeight: "600",
    textTransform: "uppercase",
    alignSelf: "flex-start"
  },
  modalActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    paddingTop: "24px",
    borderTop: "1px solid #e2e8f0"
  },
  secondaryButton: {
    backgroundColor: "white",
    color: "#6b7280",
    border: "1px solid #d1d5db",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  }
};
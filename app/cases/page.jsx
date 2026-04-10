"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from '../../lib/supabaseClient';

export default function Cases() {
  const router = useRouter();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  useEffect(() => {
    // Fetch real cases data from database
    const fetchCases = async () => {
      try {
        // Try to fetch from reports table first (where SARs are actually stored)
        console.log("Fetching from reports table...");
        const { data: reportsData, error } = await supabase
          .from('reports')
          .select('*')
          .order('created_at', { ascending: false });

        console.log("Reports data:", reportsData);
        console.log("Reports error:", error);

        if (error) {
          console.log('Reports table not found, using mock data:', error.message);
          // Fallback to mock data if table doesn't exist
          setCases([
            {
              id: "SAR-2024-001",
              customerName: "John Doe",
              accountId: "ACC-123456",
              riskLevel: "High",
              status: "Under Investigation",
              createdDate: "2024-01-15",
              lastUpdated: "2024-01-18",
              assignedTo: "Sarah Johnson",
              suspiciousActivity: "Unusual transaction pattern detected",
              amount: "$125,000",
              priority: "High"
            },
            {
              id: "SAR-2024-002", 
              customerName: "Jane Smith",
              accountId: "ACC-789012",
              riskLevel: "Medium",
              status: "Pending Review",
              createdDate: "2024-01-16",
              lastUpdated: "2024-01-17",
              assignedTo: "Mike Chen",
              suspiciousActivity: "Structuring activity",
              amount: "$45,000",
              priority: "Medium"
            },
            {
              id: "SAR-2024-003",
              customerName: "Acme Corporation",
              accountId: "ACC-345678",
              riskLevel: "Low",
              status: "Closed",
              createdDate: "2024-01-10",
              lastUpdated: "2024-01-14",
              assignedTo: "Emily Davis",
              suspiciousActivity: "Minor reporting discrepancy",
              amount: "$8,500",
              priority: "Low"
            },
            {
              id: "SAR-2024-004",
              customerName: "Robert Wilson",
              accountId: "ACC-901234",
              riskLevel: "High",
              status: "Under Investigation",
              createdDate: "2024-01-17",
              lastUpdated: "2024-01-18",
              assignedTo: "Sarah Johnson",
              suspiciousActivity: "Potential money laundering",
              amount: "$250,000",
              priority: "Critical"
            }
          ]);
        } else {
          // Use real data from database - map reports table to cases format
          const mappedCases = (reportsData || []).map(report => ({
            id: report.report_id || `SAR-${report.id}`,
            customerName: report.customer_name || 'Unknown Customer',
            accountId: report.account_number || 'Unknown Account',
            riskLevel: report.risk_level || 'Medium',
            status: report.status || 'Under Investigation',
            createdDate: report.created_at ? new Date(report.created_at).toLocaleDateString() : 'Unknown',
            lastUpdated: report.created_at ? new Date(report.created_at).toLocaleDateString() : 'Unknown',
            assignedTo: 'Admin User',
            suspiciousActivity: report.raw_notes || 'No activity specified',
            amount: report.amount ? `$${report.amount.toLocaleString()}` : '$0',
            priority: report.risk_level === 'High' ? 'High' : report.risk_level === 'Medium' ? 'Medium' : 'Low'
          }));
          setCases(mappedCases);
        }
      } catch (err) {
        console.log('Error fetching cases:', err.message);
        // Set empty array on error
        setCases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const filteredCases = cases.filter(case_ => {
    const matchesFilter = filter === "all" || 
                         (filter === "high" && case_.riskLevel === "High") ||
                         (filter === "medium" && case_.riskLevel === "Medium") ||
                         (filter === "low" && case_.riskLevel === "Low") ||
                         (filter === "investigation" && case_.status === "Under Investigation") ||
                         (filter === "pending" && case_.status === "Pending Review") ||
                         (filter === "closed" && case_.status === "Closed");
    
    const matchesSearch = case_.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.accountId.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case "Under Investigation": return "#f59e0b";
      case "Pending Review": return "#3b82f6";
      case "Closed": return "#10b981";
      default: return "#6b7280";
    }
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case "High": return "#ef4444";
      case "Medium": return "#f59e0b";
      case "Low": return "#10b981";
      default: return "#6b7280";
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "Critical": return "#dc2626";
      case "High": return "#ef4444";
      case "Medium": return "#f59e0b";
      case "Low": return "#10b981";
      default: return "#6b7280";
    }
  };

  const openCaseDetails = (case_) => {
    setSelectedCase(case_);
  };

  const closeCaseDetails = () => {
    setSelectedCase(null);
  };

  const downloadSAR = (case_) => {
    // Generate SAR report content
    const sarContent = `
SUSPICIOUS ACTIVITY REPORT (SAR)
===============================

Case ID: ${case_.id}
Customer Name: ${case_.customerName}
Account Number: ${case_.accountId}
Amount: ${case_.amount}
Risk Level: ${case_.riskLevel}
Status: ${case_.status}

SUSPICIOUS ACTIVITY:
${case_.suspiciousActivity}

ASSIGNED TO: ${case_.assignedTo}
CREATED: ${case_.createdDate}
LAST UPDATED: ${case_.lastUpdated}

================================
Generated on: ${new Date().toLocaleDateString()}
    `.trim();

    // Create and download file
    const blob = new Blob([sarContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SAR-${case_.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const updateCaseStatus = async (case_, newStatus) => {
    try {
      // Update in database
      const { error } = await supabase
        .from('reports')
        .update({ status: newStatus })
        .eq('report_id', case_.id);

      if (error) {
        console.error('Error updating status:', error);
        alert('Error updating status: ' + error.message);
        return;
      }

      // Update local state
      setCases(prevCases => 
        prevCases.map(c => 
          c.id === case_.id ? { ...c, status: newStatus } : c
        )
      );

      // Update selected case if in modal
      if (selectedCase && selectedCase.id === case_.id) {
        setSelectedCase({ ...selectedCase, status: newStatus });
      }

      alert('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status: ' + error.message);
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === "admin123") {
      setIsAdmin(true);
      setShowPasswordInput(false);
      setAdminPassword("");
      alert("Admin access granted! You can now update case details.");
    } else {
      alert("Incorrect password. Access denied.");
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading cases...</p>
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
          <h1 style={styles.title}>Case Management</h1>
        </div>
      </header>

      <div style={styles.controlsContainer}>
        <div style={styles.searchContainer}>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="Search cases by customer name, case ID, or account..."
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
            <option value="all">All Cases</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
            <option value="investigation">Under Investigation</option>
            <option value="pending">Pending Review</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <button 
          style={styles.primaryButton}
          onClick={() => router.push('/sar-filing')}
        >
          + New SAR Case
        </button>
      </div>

      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>{cases.length}</h3>
          <p style={styles.statLabel}>Total Cases</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>{cases.filter(c => c.status === "Under Investigation").length}</h3>
          <p style={styles.statLabel}>Under Investigation</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>{cases.filter(c => c.riskLevel === "High").length}</h3>
          <p style={styles.statLabel}>High Risk</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>{cases.filter(c => c.status === "Pending Review").length}</h3>
          <p style={styles.statLabel}>Pending Review</p>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableHeaderCell}>Case ID</th>
              <th style={styles.tableHeaderCell}>Customer</th>
              <th style={styles.tableHeaderCell}>Account</th>
              <th style={styles.tableHeaderCell}>Risk Level</th>
              <th style={styles.tableHeaderCell}>Status</th>
              <th style={styles.tableHeaderCell}>Priority</th>
              <th style={styles.tableHeaderCell}>Amount</th>
              <th style={styles.tableHeaderCell}>Assigned To</th>
              <th style={styles.tableHeaderCell}>Last Updated</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((case_) => (
              <tr key={case_.id} style={styles.tableRow}>
                <td style={styles.tableCell}>
                  <span style={styles.caseId}>{case_.id}</span>
                </td>
                <td style={styles.tableCell}>{case_.customerName}</td>
                <td style={styles.tableCell}>{case_.accountId}</td>
                <td style={styles.tableCell}>
                  <span 
                    style={{
                      ...styles.badge,
                      backgroundColor: getRiskColor(case_.riskLevel)
                    }}
                  >
                    {case_.riskLevel}
                  </span>
                </td>
                <td style={styles.tableCell}>
                  <span 
                    style={{
                      ...styles.badge,
                      backgroundColor: getStatusColor(case_.status)
                    }}
                  >
                    {case_.status}
                  </span>
                </td>
                <td style={styles.tableCell}>
                  <span 
                    style={{
                      ...styles.badge,
                      backgroundColor: getPriorityColor(case_.priority)
                    }}
                  >
                    {case_.priority}
                  </span>
                </td>
                <td style={styles.tableCell}>{case_.amount}</td>
                <td style={styles.tableCell}>{case_.assignedTo}</td>
                <td style={styles.tableCell}>{case_.lastUpdated}</td>
                <td style={styles.tableCell}>
                  <button 
                    style={styles.actionButton}
                    onClick={() => openCaseDetails(case_)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCase && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Case Details: {selectedCase.id}</h2>
              <button 
                style={styles.closeButton}
                onClick={closeCaseDetails}
              >
                {"\u2715"}
              </button>
            </div>
            
            <div style={styles.modalContent}>
              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Customer Information</h3>
                <div style={styles.modalGrid}>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Customer Name:</span>
                    <span style={styles.modalValue}>{selectedCase.customerName}</span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Account ID:</span>
                    <span style={styles.modalValue}>{selectedCase.accountId}</span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Case Amount:</span>
                    <span style={styles.modalValue}>{selectedCase.amount}</span>
                  </div>
                </div>
              </div>

              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Case Details</h3>
                <div style={styles.modalGrid}>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Risk Level:</span>
                    <span 
                      style={{
                        ...styles.badge,
                        backgroundColor: getRiskColor(selectedCase.riskLevel)
                      }}
                    >
                      {selectedCase.riskLevel}
                    </span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Status:</span>
                    <span 
                      style={{
                        ...styles.badge,
                        backgroundColor: getStatusColor(selectedCase.status)
                      }}
                    >
                      {selectedCase.status}
                    </span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Priority:</span>
                    <span 
                      style={{
                        ...styles.badge,
                        backgroundColor: getPriorityColor(selectedCase.priority)
                      }}
                    >
                      {selectedCase.priority}
                    </span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Assigned To:</span>
                    <span style={styles.modalValue}>{selectedCase.assignedTo}</span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Created Date:</span>
                    <span style={styles.modalValue}>{selectedCase.createdDate}</span>
                  </div>
                  <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Last Updated:</span>
                    <span style={styles.modalValue}>{selectedCase.lastUpdated}</span>
                  </div>
                </div>
              </div>

              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Suspicious Activity</h3>
                <p style={styles.modalText}>{selectedCase.suspiciousActivity}</p>
              </div>

              <div style={styles.modalActions}>
                <button 
                  style={styles.secondaryButton}
                  onClick={() => downloadSAR(selectedCase)}
                >
                  Download SAR Report
                </button>
                
                {isAdmin ? (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <select
                      style={{
                        ...styles.filterSelect,
                        padding: '6px 12px',
                        fontSize: '12px'
                      }}
                      value={selectedCase.status}
                      onChange={(e) => updateCaseStatus(selectedCase, e.target.value)}
                    >
                      <option value="Under Investigation">Under Investigation</option>
                      <option value="Pending Review">Pending Review</option>
                      <option value="Closed">Closed</option>
                    </select>
                    <button 
                      style={{
                        ...styles.secondaryButton,
                        backgroundColor: '#ef4444',
                        color: 'white'
                      }}
                      onClick={() => {
                        setIsAdmin(false);
                        alert("Admin access revoked.");
                      }}
                    >
                      Logout Admin
                    </button>
                  </div>
                ) : (
                  <button 
                    style={styles.primaryButton}
                    onClick={() => setShowPasswordInput(true)}
                  >
                    Admin Access
                  </button>
                )}
              </div>

              {showPasswordInput && (
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2000
                }}>
                  <div style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '8px',
                    width: '300px'
                  }}>
                    <h3 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Admin Login</h3>
                    <input
                      type="password"
                      placeholder="Enter admin password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        marginBottom: '16px',
                        fontSize: '14px'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        style={{
                          ...styles.primaryButton,
                          flex: 1
                        }}
                        onClick={handleAdminLogin}
                      >
                        Login
                      </button>
                      <button
                        style={{
                          ...styles.secondaryButton,
                          flex: 1
                        }}
                        onClick={() => {
                          setShowPasswordInput(false);
                          setAdminPassword("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
    minWidth: "150px"
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
  tableContainer: {
    maxWidth: "1400px",
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
    color: "#374151"
  },
  caseId: {
    fontFamily: "monospace",
    fontWeight: "600",
    color: "#1e293b"
  },
  badge: {
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase"
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
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
    margin: 0
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
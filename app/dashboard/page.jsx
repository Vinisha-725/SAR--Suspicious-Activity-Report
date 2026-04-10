"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalSARs: 0,
    highRisk: 0,
    pendingReview: 0,
    monthlyChange: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading dashboard data
    setTimeout(() => {
      setStats({
        totalSARs: 127,
        highRisk: 23,
        pendingReview: 8,
        monthlyChange: 12.5
      });
      
      setRecentActivity([
        {
          id: 1,
          type: "SAR Filed",
          description: "High-value transaction flagged",
          risk: "High",
          time: "2 hours ago",
          customer: "John Doe"
        },
        {
          id: 2,
          type: "Case Updated",
          description: "Investigation completed",
          risk: "Medium",
          time: "4 hours ago",
          customer: "Jane Smith"
        },
        {
          id: 3,
          type: "Alert Triggered",
          description: "Unusual pattern detected",
          risk: "High",
          time: "6 hours ago",
          customer: "Acme Corp"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getRiskColor = (risk) => {
    switch(risk) {
      case "High": return "#ef4444";
      case "Medium": return "#f59e0b";
      case "Low": return "#10b981";
      default: return "#6b7280";
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>SAR Dashboard</h1>
        <div style={styles.headerActions}>
          <button 
            style={styles.primaryButton}
            onClick={() => router.push('/sar-filing')}
          >
            + New SAR Report
          </button>
        </div>
      </header>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>{"\ud83d\udcca"}</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.totalSARs}</h3>
            <p style={styles.statLabel}>Total SAR Reports</p>
            <span style={styles.statChange}>+{stats.monthlyChange}% this month</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>{"\u26a0\ufe0f"}</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.highRisk}</h3>
            <p style={styles.statLabel}>High Risk Cases</p>
            <span style={styles.statChange}>Requires immediate attention</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>{"\u23f3"}</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.pendingReview}</h3>
            <p style={styles.statLabel}>Pending Review</p>
            <span style={styles.statChange}>Awaiting analyst review</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>{"\ud83d\udcc8"}</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.monthlyChange}%</h3>
            <p style={styles.statLabel}>Monthly Change</p>
            <span style={styles.statChange}>vs last month</span>
          </div>
        </div>
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Recent Activity</h2>
          <div style={styles.activityList}>
            {recentActivity.map(activity => (
              <div key={activity.id} style={styles.activityItem}>
                <div style={styles.activityHeader}>
                  <span style={styles.activityType}>{activity.type}</span>
                  <span style={styles.activityTime}>{activity.time}</span>
                </div>
                <p style={styles.activityDescription}>{activity.description}</p>
                <div style={styles.activityFooter}>
                  <span style={styles.activityCustomer}>{activity.customer}</span>
                  <span 
                    style={{
                      ...styles.riskBadge,
                      backgroundColor: getRiskColor(activity.risk)
                    }}
                  >
                    {activity.risk} Risk
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Quick Actions</h2>
          <div style={styles.quickActions}>
            <button 
              style={styles.actionButton}
              onClick={() => router.push('/sar-filing')}
            >
              <span style={styles.actionIcon}>{"\ud83d\udcdd"}</span>
              <span>File New SAR</span>
            </button>
            <button 
              style={styles.actionButton}
              onClick={() => router.push('/cases')}
            >
              <span style={styles.actionIcon}>{"\ud83d\udcc1"}</span>
              <span>View Cases</span>
            </button>
            <button 
              style={styles.actionButton}
              onClick={() => router.push('/alerts')}
            >
              <span style={styles.actionIcon}>{"\ud83d\udd14"}</span>
              <span>View Alerts</span>
            </button>
            <button 
              style={styles.actionButton}
              onClick={() => router.push('/audit-logs')}
            >
              <span style={styles.actionIcon}>{"\ud83d\udcdc"}</span>
              <span>Audit Logs</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: "16px"
  },
  headerActions: {
    display: "flex",
    gap: "12px"
  },
  primaryButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    marginBottom: "32px"
  },
  statCard: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  statIcon: {
    fontSize: "32px",
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: "12px"
  },
  statContent: {
    flex: 1
  },
  statNumber: {
    fontSize: "32px",
    fontWeight: "700",
    margin: "0 0 4px 0",
    color: "#1e293b"
  },
  statLabel: {
    fontSize: "14px",
    color: "#64748b",
    margin: "0 0 4px 0"
  },
  statChange: {
    fontSize: "12px",
    color: "#10b981",
    fontWeight: "500"
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "24px"
  },
  section: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 20px 0",
    color: "#1e293b"
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  activityItem: {
    padding: "16px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    backgroundColor: "#f8fafc"
  },
  activityHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  },
  activityType: {
    fontWeight: "600",
    color: "#1e293b",
    fontSize: "14px"
  },
  activityTime: {
    fontSize: "12px",
    color: "#94a3b8"
  },
  activityDescription: {
    fontSize: "14px",
    color: "#475569",
    margin: "0 0 12px 0"
  },
  activityFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  activityCustomer: {
    fontSize: "13px",
    color: "#64748b"
  },
  riskBadge: {
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "600"
  },
  quickActions: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "12px"
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    backgroundColor: "white",
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "left"
  },
  actionIcon: {
    fontSize: "20px"
  }
};

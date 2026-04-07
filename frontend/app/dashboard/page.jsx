"use client";

import React from 'react';
import styles from './page.module.css';
import layoutStyles from './layout.module.css';

export default function DashboardPage() {
  const kpis = [
    { title: 'Total Alerts', value: '1,248', trend: '+12% this week', trendType: 'trendPositive' },
    { title: 'High Risk Cases', value: '47', trend: '+3 since yesterday', trendType: 'trendPositive' },
    { title: 'Pending SAR Filings', value: '12', trend: '-2 this week', trendType: 'trendNegative' },
    { title: 'Overdue Reviews', value: '5', trend: 'Requires immediate action', trendType: 'trendPositive' },
  ];

  const recentCases = [
    { id: 'CAS-8921-X', entity: 'Stark Industries Ltd', risk: 'High', status: 'Under Review', amount: '$4.2M' },
    { id: 'CAS-8919-Y', entity: 'Jonathan Doe', risk: 'Medium', status: 'Pending Info', amount: '$45K' },
    { id: 'CAS-8918-A', entity: 'Global Ventures LLC', risk: 'High', status: 'SAR Drafted', amount: '$1.1M' },
    { id: 'CAS-8915-B', entity: 'Jane Smith', risk: 'Low', status: 'Closed - False Positive', amount: '$12K' },
  ];

  return (
    <div className={layoutStyles.pageContent}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>Operations Dashboard</h1>
          <p className={styles.pageSubtitle}>System-wide overview of suspicious activity and compliance queue</p>
        </div>
        <div className={styles.actionsRow}>
          <button className={`${styles.actionButton} ${styles.btnPrimary}`}>+ Create SAR</button>
          <button className={`${styles.actionButton} ${styles.btnSecondary}`}>Assign Investigator</button>
          <button className={`${styles.actionButton} ${styles.btnSecondary}`}>Export Report</button>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        {kpis.map((kpi, index) => (
          <div key={index} className={styles.kpiCard}>
            <div className={styles.kpiTitle}>{kpi.title}</div>
            <div className={styles.kpiValue}>{kpi.value}</div>
            <div className={`${styles.kpiTrend} ${styles[kpi.trendType]}`}>
              {kpi.trend}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Alert Trend (Last 30 Days)</div>
          <div className={styles.mockChartArea}>
            {[40, 60, 45, 80, 50, 90, 70].map((height, i) => (
              <div key={i} className={styles.barCol} style={{ height: `${height}%` }}>
                <span className={styles.barLabel}>Week {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Risk Distribution</div>
          <div className={styles.riskDistribution}>
            <div className={styles.riskItem}>
              <div className={styles.riskLabel}><div className={`${styles.riskDot} ${styles.dotHigh}`}></div> High</div>
              <div className={styles.riskBarContainer}>
                <div className={styles.riskBarFiller} style={{ width: '25%', backgroundColor: '#ef4444' }}></div>
              </div>
              <div className={styles.riskValue}>15%</div>
            </div>
            <div className={styles.riskItem}>
              <div className={styles.riskLabel}><div className={`${styles.riskDot} ${styles.dotMedium}`}></div> Medium</div>
              <div className={styles.riskBarContainer}>
                <div className={styles.riskBarFiller} style={{ width: '45%', backgroundColor: '#f59e0b' }}></div>
              </div>
              <div className={styles.riskValue}>45%</div>
            </div>
            <div className={styles.riskItem}>
              <div className={styles.riskLabel}><div className={`${styles.riskDot} ${styles.dotLow}`}></div> Low</div>
              <div className={styles.riskBarContainer}>
                <div className={styles.riskBarFiller} style={{ width: '40%', backgroundColor: '#3b82f6' }}></div>
              </div>
              <div className={styles.riskValue}>40%</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Recent Suspicious Cases</div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Entity / Subject</th>
                <th>Risk Score</th>
                <th>Involved Amount</th>
                <th>Current Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentCases.map((c, i) => (
                <tr key={i}>
                  <td className={styles.tableId}>{c.id}</td>
                  <td>{c.entity}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[`bg${c.risk}`]}`}>
                      {c.risk}
                    </span>
                  </td>
                  <td>{c.amount}</td>
                  <td>{c.status}</td>
                  <td>
                    <button className={`${styles.actionButton} ${styles.btnSecondary}`} style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

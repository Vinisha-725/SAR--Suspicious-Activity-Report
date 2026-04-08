'use client';
import { useEffect, useState } from 'react';
import Sidebar from '../../../components/layout/Sidebar';
import Topbar from '../../../components/layout/Topbar';
import PageHeader from '../../../components/layout/PageHeader';
import KpiCard from '../../../components/dashboard/KpiCard';
import AlertsTrendChart from '../../../components/dashboard/AlertsTrendChart';
import RiskDistributionChart from '../../../components/dashboard/RiskDistributionChart';
import RecentCasesTable from '../../../components/dashboard/RecentCasesTable';
import QuickActions from '../../../components/dashboard/QuickActions';
import { api } from '../../../lib/api';
import styles from './page.module.css';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [trend, setTrend] = useState([]);
  const [riskDist, setRiskDist] = useState([]);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getDashboardStats(),
      api.getAlertsTrend(),
      api.getRiskDistribution(),
      api.getRecentCases(),
    ]).then(([s, t, r, c]) => {
      setStats(s);
      setTrend(t);
      setRiskDist(r);
      setCases(c);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar />
        <div className={styles.content}>
          <PageHeader
            title="Dashboard"
            subtitle="Operational overview as of today"
          />

          {loading ? (
            <div className={styles.loading}>Loading data...</div>
          ) : (
            <>
              <div className={styles.kpiGrid}>
                <KpiCard label="Open Alerts" value={stats?.openAlerts ?? '—'} delta="+12%" status="down" />
                <KpiCard label="Active Cases" value={stats?.activeCases ?? '—'} delta="-3%" status="up" />
                <KpiCard label="SARs Filed (MTD)" value={stats?.sarsFiled ?? '—'} delta="+5%" status="neutral" />
                <KpiCard label="Avg. Risk Score" value={stats?.avgRiskScore ?? '—'} delta="+2.1 pts" status="down" />
              </div>

              <div className={styles.midRow}>
                <div className={styles.chartCard}>
                  <p className={styles.chartTitle}>Alerts Trend (30 Days)</p>
                  <AlertsTrendChart data={trend} />
                </div>
                <div className={styles.sidePanel}>
                  <div className={styles.chartCard}>
                    <p className={styles.chartTitle}>Risk Distribution</p>
                    <RiskDistributionChart data={riskDist} />
                  </div>
                  <div className={styles.chartCard}>
                    <p className={styles.chartTitle}>Quick Actions</p>
                    <QuickActions />
                  </div>
                </div>
              </div>

              <div className={styles.chartCard}>
                <p className={styles.chartTitle}>Recent Cases</p>
                <RecentCasesTable cases={cases} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
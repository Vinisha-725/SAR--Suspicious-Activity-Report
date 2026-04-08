'use client';
import { useEffect, useState } from 'react';
import Sidebar from '../../../components/layout/Sidebar';
import Topbar from '../../../components/layout/Topbar';
import PageHeader from '../../../components/layout/PageHeader';
import AlertFilters from '../../../components/alerts/AlertFilters';
import AlertsTable from '../../../components/alerts/AlertsTable';
import { api } from '../../../lib/api';
import styles from './page.module.css';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load(filters = {}) {
    setLoading(true);
    try {
      const data = await api.getAlerts(filters);
      setAlerts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar />
        <div className={styles.content}>
          <PageHeader
            title="Alerts"
            subtitle={`${alerts.length} alerts returned`}
          />
          <AlertFilters onFilter={load} />
          {loading ? (
            <p className={styles.loading}>Loading alerts...</p>
          ) : (
            <AlertsTable alerts={alerts} />
          )}
        </div>
      </div>
    </div>
  );
}
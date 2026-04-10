'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now
    setAlerts([
      {
        id: 1,
        severity: 'high',
        status: 'open',
        type: 'aml',
        title: 'Suspicious Transaction Pattern',
        description: 'Multiple high-value transactions detected',
        createdAt: new Date().toISOString()
      }
    ]);
    setLoading(false);
  }, []);

  return (
    <div className={styles.alertsPage}>
      <h1>Alerts</h1>
      <p>Monitor and manage financial alerts</p>
      {loading ? (
        <p>Loading alerts...</p>
      ) : (
        <div>
          {alerts.map(alert => (
            <div key={alert.id} style={{ border: '1px solid #ccc', padding: '16px', margin: '8px 0' }}>
              <h3>{alert.title}</h3>
              <p>{alert.description}</p>
              <p>Severity: {alert.severity}</p>
              <p>Status: {alert.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

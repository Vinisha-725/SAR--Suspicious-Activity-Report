'use client';
import { useEffect, useState } from 'react';
import Sidebar from '../../../components/layout/Sidebar';
import Topbar from '../../../components/layout/Topbar';
import PageHeader from '../../../components/layout/PageHeader';
import { api } from '../../../lib/api';
import styles from './page.module.css';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAuditLogs().then(setLogs).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar />
        <div className={styles.content}>
          <PageHeader
            title="Audit Logs"
            subtitle="Immutable record of all system actions"
          />
          {loading ? (
            <p className={styles.loading}>Loading audit logs...</p>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Resource</th>
                    <th>Resource ID</th>
                    <th>IP Address</th>
                    <th>Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td className={styles.mono}>{fmtDatetime(log.timestamp)}</td>
                      <td className={styles.user}>{log.user}</td>
                      <td>{log.action}</td>
                      <td>{log.resource}</td>
                      <td className={styles.mono}>{log.resourceId || '—'}</td>
                      <td className={styles.mono}>{log.ipAddress}</td>
                      <td>
                        <span className={[styles.outcome, log.outcome === 'success' ? styles.success : styles.failure].join(' ')}>
                          {log.outcome}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function fmtDatetime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}
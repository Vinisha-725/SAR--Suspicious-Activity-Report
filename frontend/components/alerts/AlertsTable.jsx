import SeverityBadge from './SeverityBadge';
import Button from '../common/Button';
import styles from './AlertsTable.module.css';

export default function AlertsTable({ alerts = [], onAssign, onView }) {
  if (!alerts.length) return <p className={styles.empty}>No alerts match the selected filters.</p>;

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Alert ID</th>
            <th>Severity</th>
            <th>Type</th>
            <th>Entity</th>
            <th>Amount</th>
            <th>Generated</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td className={styles.mono}>{alert.alertId}</td>
              <td><SeverityBadge severity={alert.severity} /></td>
              <td className={styles.type}>{alert.type}</td>
              <td className={styles.entity}>{alert.entity}</td>
              <td className={styles.mono}>{alert.amount ? `$${Number(alert.amount).toLocaleString()}` : '—'}</td>
              <td className={styles.mono}>{fmtDate(alert.createdAt)}</td>
              <td>
                <span className={[styles.statusBadge, styles[alert.status]].join(' ')}>
                  {alert.status}
                </span>
              </td>
              <td>
                <div className={styles.rowActions}>
                  <Button size="sm" variant="ghost" onClick={() => onView?.(alert)}>View</Button>
                  <Button size="sm" variant="secondary" onClick={() => onAssign?.(alert)}>Assign</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
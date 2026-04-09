import Link from 'next/link';
import styles from './RecentCasesTable.module.css';

const STATUS_LABELS = {
  open: { label: 'Open', cls: 'open' },
  under_review: { label: 'Under Review', cls: 'review' },
  escalated: { label: 'Escalated', cls: 'escalated' },
  closed: { label: 'Closed', cls: 'closed' },
};

export default function RecentCasesTable({ cases = [] }) {
  if (!cases.length) return <p className={styles.empty}>No recent cases</p>;

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Subject</th>
            <th>Risk Score</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => {
            const s = STATUS_LABELS[c.status] || { label: c.status, cls: 'neutral' };
            return (
              <tr key={c.id}>
                <td>
                  <Link href={`/cases/${c.id}`} className={styles.caseLink}>
                    {c.caseId}
                  </Link>
                </td>
                <td className={styles.subject}>{c.subject}</td>
                <td>
                  <span className={[styles.riskScore, getRiskCls(c.riskScore)].join(' ')}>
                    {c.riskScore}
                  </span>
                </td>
                <td>
                  <span className={[styles.statusBadge, styles[s.cls]].join(' ')}>{s.label}</span>
                </td>
                <td className={styles.assignee}>{c.assignedTo || '—'}</td>
                <td className={styles.date}>{formatDate(c.updatedAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function getRiskCls(score) {
  if (score >= 80) return styles.riskCritical;
  if (score >= 60) return styles.riskHigh;
  if (score >= 40) return styles.riskMedium;
  return styles.riskLow;
}

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
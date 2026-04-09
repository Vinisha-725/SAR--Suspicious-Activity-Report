import styles from './CaseSummaryCard.module.css';

const STATUS_MAP = {
  open: { label: 'Open', cls: 'open' },
  under_review: { label: 'Under Review', cls: 'review' },
  escalated: { label: 'Escalated', cls: 'escalated' },
  sar_filed: { label: 'SAR Filed', cls: 'sarFiled' },
  closed: { label: 'Closed', cls: 'closed' },
};

export default function CaseSummaryCard({ caseData }) {
  if (!caseData) return null;
  const s = STATUS_MAP[caseData.status] || { label: caseData.status, cls: 'open' };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <p className={styles.caseId}>{caseData.caseId}</p>
          <p className={styles.title}>{caseData.title}</p>
        </div>
        <span className={[styles.status, styles[s.cls]].join(' ')}>{s.label}</span>
      </div>
      <div className={styles.grid}>
        <Field label="Assigned To" value={caseData.assignedTo || 'Unassigned'} />
        <Field label="Priority" value={caseData.priority} />
        <Field label="Date Opened" value={fmtDate(caseData.createdAt)} />
        <Field label="Last Activity" value={fmtDate(caseData.updatedAt)} />
        <Field label="Alert Count" value={caseData.alertCount ?? '—'} />
        <Field label="SAR Reference" value={caseData.sarRef || 'Not Filed'} />
      </div>
      {caseData.description && (
        <p className={styles.desc}>{caseData.description}</p>
      )}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className={styles.field}>
      <p className={styles.fieldLabel}>{label}</p>
      <p className={styles.fieldValue}>{value}</p>
    </div>
  );
}

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
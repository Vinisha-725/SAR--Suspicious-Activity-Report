import styles from './SeverityBadge.module.css';

const MAP = {
  critical: { label: 'Critical', cls: 'critical' },
  high: { label: 'High', cls: 'high' },
  medium: { label: 'Medium', cls: 'medium' },
  low: { label: 'Low', cls: 'low' },
};

export default function SeverityBadge({ severity }) {
  const s = MAP[severity?.toLowerCase()] || { label: severity, cls: 'neutral' };
  return (
    <span className={[styles.badge, styles[s.cls]].join(' ')}>
      <span className={styles.dot} />
      {s.label}
    </span>
  );
}
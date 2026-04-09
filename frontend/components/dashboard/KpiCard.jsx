import styles from './KpiCard.module.css';

export default function KpiCard({ label, value, delta, status, icon }) {
  const statusColor = { up: styles.up, down: styles.down, neutral: styles.neutral }[status || 'neutral'];
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <p className={styles.label}>{label}</p>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
      <p className={styles.value}>{value}</p>
      {delta && (
        <p className={[styles.delta, statusColor].join(' ')}>
          {delta}
        </p>
      )}
    </div>
  );
}
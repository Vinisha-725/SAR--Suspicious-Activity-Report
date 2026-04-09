import styles from './StatCard.module.css';

export default function StatCard({ label, value, delta, deltaLabel, accent = false }) {
  const isPositive = delta > 0;
  return (
    <div className={[styles.card, accent ? styles.accent : ''].join(' ')}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      {delta !== undefined && (
        <p className={[styles.delta, isPositive ? styles.up : styles.down].join(' ')}>
          {isPositive ? '+' : ''}{delta}% {deltaLabel || 'vs last period'}
        </p>
      )}
    </div>
  );
}
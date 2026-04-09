import styles from './RiskDistributionChart.module.css';

const RISK_COLORS = {
  Critical: '#EF4444',
  High: '#F97316',
  Medium: '#F59E0B',
  Low: '#10B981',
};

export default function RiskDistributionChart({ data = [] }) {
  const total = data.reduce((s, d) => s + d.count, 0) || 1;

  return (
    <div className={styles.wrap}>
      {data.map((item) => (
        <div key={item.level} className={styles.row}>
          <div className={styles.rowLabel}>
            <span className={styles.dot} style={{ background: RISK_COLORS[item.level] || '#8A9BBF' }} />
            <span className={styles.level}>{item.level}</span>
          </div>
          <div className={styles.barWrap}>
            <div
              className={styles.bar}
              style={{
                width: `${(item.count / total) * 100}%`,
                background: RISK_COLORS[item.level] || '#8A9BBF',
              }}
            />
          </div>
          <span className={styles.count}>{item.count}</span>
        </div>
      ))}
    </div>
  );
}
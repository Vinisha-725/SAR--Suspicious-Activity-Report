import styles from './AuditTimeline.module.css';

export default function AuditTimeline({ events = [] }) {
  if (!events.length) return <p className={styles.empty}>No audit events recorded.</p>;

  return (
    <div className={styles.timeline}>
      {events.map((event, i) => (
        <div key={event.id || i} className={styles.event}>
          <div className={styles.connector}>
            <div className={styles.dot} />
            {i < events.length - 1 && <div className={styles.line} />}
          </div>
          <div className={styles.content}>
            <div className={styles.meta}>
              <span className={styles.actor}>{event.actor}</span>
              <span className={styles.timestamp}>{fmtDatetime(event.timestamp)}</span>
            </div>
            <p className={styles.action}>{event.action}</p>
            {event.detail && <p className={styles.detail}>{event.detail}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function fmtDatetime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}
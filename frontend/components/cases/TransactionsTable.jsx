import styles from './TransactionsTable.module.css';

export default function TransactionsTable({ transactions = [] }) {
  if (!transactions.length) return <p className={styles.empty}>No transactions linked to this case.</p>;

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Txn ID</th>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Counterparty</th>
            <th>Channel</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td className={styles.mono}>{t.transactionId}</td>
              <td className={styles.mono}>{fmtDate(t.date)}</td>
              <td>{t.type}</td>
              <td className={[styles.mono, t.direction === 'debit' ? styles.debit : styles.credit].join(' ')}>
                {t.direction === 'debit' ? '-' : '+'}{Number(t.amount).toLocaleString()}
              </td>
              <td className={styles.mono}>{t.currency}</td>
              <td className={styles.counterparty}>{t.counterparty || '—'}</td>
              <td>{t.channel}</td>
              <td>
                {t.flagged ? (
                  <span className={styles.flagged}>Flagged</span>
                ) : (
                  <span className={styles.clean}>Clear</span>
                )}
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
import Link from 'next/link';
import styles from './QuickActions.module.css';

const ACTIONS = [
  { label: 'File New SAR', href: '/sar-filing', variant: 'primary' },
  { label: 'Open New Case', href: '/cases?new=1', variant: 'secondary' },
  { label: 'View All Alerts', href: '/alerts', variant: 'secondary' },
  { label: 'Audit Log', href: '/audit-logs', variant: 'ghost' },
];

export default function QuickActions() {
  return (
    <div className={styles.wrap}>
      {ACTIONS.map((a) => (
        <Link key={a.href} href={a.href} className={[styles.action, styles[a.variant]].join(' ')}>
          {a.label}
        </Link>
      ))}
    </div>
  );
}
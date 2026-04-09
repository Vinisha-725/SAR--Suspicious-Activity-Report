'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const NAV = [
  {
    group: 'Overview',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: <GridIcon /> },
    ],
  },
  {
    group: 'Operations',
    items: [
      { href: '/alerts', label: 'Alerts', icon: <AlertIcon />, badge: 'live' },
      { href: '/cases', label: 'Cases', icon: <FolderIcon /> },
      { href: '/investigations', label: 'Investigations', icon: <SearchIcon /> },
    ],
  },
  {
    group: 'Compliance',
    items: [
      { href: '/sar-filing', label: 'SAR Filing', icon: <FileIcon /> },
      { href: '/audit-logs', label: 'Audit Logs', icon: <ClockIcon /> },
    ],
  },
  {
    group: 'System',
    items: [
      { href: '/settings', label: 'Settings', icon: <GearIcon /> },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandMark}>SAR</div>
        <div className={styles.brandText}>
          <span className={styles.brandName}>FinCEN Portal</span>
          <span className={styles.brandSub}>Suspicious Activity Reporting</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV.map((group) => (
          <div key={group.group} className={styles.group}>
            <p className={styles.groupLabel}>{group.group}</p>
            {group.items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[styles.navItem, active ? styles.active : ''].join(' ')}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                  {item.badge && <span className={styles.liveBadge}>{item.badge}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.statusDot} />
        <span className={styles.statusText}>System Operational</span>
      </div>
    </aside>
  );
}

// Inline SVG Icons
function GridIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/></svg>;
}
function AlertIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L14.5 13H1.5L8 1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M8 6V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="8" cy="11" r="0.75" fill="currentColor"/></svg>;
}
function FolderIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 4a1 1 0 011-1h4l2 2h6a1 1 0 011 1v7a1 1 0 01-1 1H2a1 1 0 01-1-1V4Z" stroke="currentColor" strokeWidth="1.4"/></svg>;
}
function SearchIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4"/><path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>;
}
function FileIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 1h6l4 4v10H2V1h2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M10 1v4h4" stroke="currentColor" strokeWidth="1.4"/><path d="M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>;
}
function ClockIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 5v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function GearIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>;
}
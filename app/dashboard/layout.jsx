import React from 'react';
import styles from './layout.module.css';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      {/* Sidebar inline for demo purposes */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.shieldIcon}>
            <div className={styles.innerShield}></div>
          </div>
          <div className={styles.brandName}>SAR System</div>
        </div>
        <nav className={styles.navMenu}>
          <Link href="/dashboard" className={`${styles.navItem} ${styles.navItemActive}`}>
            Dashboard
          </Link>
          <Link href="/alerts" className={styles.navItem}>
            Alerts & Triage
          </Link>
          <Link href="/cases" className={styles.navItem}>
            Case Management
          </Link>
          <Link href="/sar-filing" className={styles.navItem}>
            SAR Filings
          </Link>
          <Link href="/investigations" className={styles.navItem}>
            Investigations
          </Link>
          <Link href="/audit-logs" className={styles.navItem}>
            Audit Logs
          </Link>
          <Link href="/settings" className={styles.navItem}>
            Compliance Rules
          </Link>
        </nav>
      </aside>

      <div className={styles.mainArea}>
        {/* Topbar inline for demo purposes */}
        <header className={styles.topbar}>
          <div className={styles.searchBox}>
            <input type="text" placeholder="Search entity, ID, transaction..." className={styles.searchInput} />
          </div>
          <div className={styles.topbarRight}>
            <button className={styles.iconButton}>
              <span className={styles.badge}>3</span>
              🔔
            </button>
            <div className={styles.profileInfo}>
              <div className={styles.avatar}></div>
              <div>
                <div className={styles.userName}>J. Doe</div>
                <div className={styles.userRole}>Sr. Analyst</div>
              </div>
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}

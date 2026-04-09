'use client';
import { useState } from 'react';
import styles from './Topbar.module.css';

export default function Topbar({ user }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <input className={styles.search} placeholder="Search cases, alerts, entities..." type="search" />
          <span className={styles.searchShortcut}>⌘K</span>
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn} title="Notifications">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1a5 5 0 015 5v3l1.5 2H1.5L3 9V6a5 5 0 015-5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            <path d="M6.5 13a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.4"/>
          </svg>
          <span className={styles.notifDot} />
        </button>

        <div className={styles.divider} />

        <div className={styles.userMenu} onClick={() => setShowMenu(!showMenu)}>
          <div className={styles.avatar}>
            {(user?.name || 'A').charAt(0).toUpperCase()}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name || 'Analyst'}</span>
            <span className={styles.userRole}>{user?.role || 'Senior Analyst'}</span>
          </div>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          {showMenu && (
            <div className={styles.dropdown}>
              <a href="/settings" className={styles.dropdownItem}>Account Settings</a>
              <div className={styles.dropdownDivider} />
              <button className={styles.dropdownItem}>Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
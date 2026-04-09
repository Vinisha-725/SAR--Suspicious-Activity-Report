'use client';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import styles from './layout.module.css';

export default function AppLayout({ children }) {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.body}>
        <Topbar />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}
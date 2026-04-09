'use client';
import { useEffect, useState } from 'react';
import Sidebar from '../../../components/layout/Sidebar';
import Topbar from '../../../components/layout/Topbar';
import PageHeader from '../../../components/layout/PageHeader';
import { api } from '../../../lib/api';
import styles from './page.module.css';

export default function InvestigationsPage() {
  const [investigations, setInvestigations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getInvestigations().then(setInvestigations).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar />
        <div className={styles.content}>
          <PageHeader
            title="Investigations"
            subtitle="Active investigation threads"
          />
          {loading ? (
            <p className={styles.loading}>Loading investigations...</p>
          ) : (
            <div className={styles.grid}>
              {investigations.map((inv) => (
                <div key={inv.id} className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.invId}>{inv.investigationId}</span>
                    <span className={[styles.statusPill, styles[inv.status]].join(' ')}>{inv.status}</span>
                  </div>
                  <p className={styles.invTitle}>{inv.title}</p>
                  <p className={styles.invMeta}>Lead: {inv.lead} &middot; {fmtDate(inv.startedAt)}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.caseCount}>{inv.caseCount} cases linked</span>
                    <a href={`/investigations/${inv.id}`} className={styles.viewLink}>Open</a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
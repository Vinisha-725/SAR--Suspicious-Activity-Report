'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '../../../../components/layout/Sidebar';
import Topbar from '../../../../components/layout/Topbar';
import PageHeader from '../../../../components/layout/PageHeader';
import CaseSummaryCard from '../../../../components/cases/CaseSummaryCard';
import CustomerProfileCard from '../../../../components/cases/CustomerProfileCard';
import TransactionsTable from '../../../../components/cases/TransactionsTable';
import InvestigatorNotes from '../../../../components/cases/InvestigatorNotes';
import RiskSummaryPanel from '../../../../components/cases/RiskSummaryPanel';
import AuditTimeline from '../../../../components/cases/AuditTimeline';
import Button from '../../../../components/common/Button';
import { api } from '../../../../lib/api';
import styles from './page.module.css';

const TABS = ['Overview', 'Transactions', 'Notes', 'Audit Log'];

export default function CaseDetailPage() {
  const { caseId } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [notes, setNotes] = useState([]);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getCase(caseId),
      api.getCaseTransactions(caseId),
      api.getCaseNotes(caseId),
    ]).then(([c, t, n]) => {
      setCaseData(c);
      setTransactions(t);
      setNotes(n);
    }).finally(() => setLoading(false));
  }, [caseId]);

  async function handleAddNote(text) {
    const note = await api.addCaseNote(caseId, text);
    setNotes(prev => [note, ...prev]);
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar />
        <div className={styles.content}>
          <PageHeader
            title={caseData?.caseId || 'Case Detail'}
            subtitle={caseData?.title}
            breadcrumbs={[{ label: 'Cases', href: '/cases' }, { label: caseData?.caseId || '...' }]}
            actions={
              <>
                <Button variant="secondary">Escalate</Button>
                <Button variant="primary">File SAR</Button>
              </>
            }
          />

          {loading ? (
            <p className={styles.loading}>Loading case data...</p>
          ) : (
            <div className={styles.body}>
              <div className={styles.mainCol}>
                <CaseSummaryCard caseData={caseData} />

                <div className={styles.tabs}>
                  {TABS.map((t, i) => (
                    <button
                      key={t}
                      className={[styles.tabBtn, i === tab ? styles.tabActive : ''].join(' ')}
                      onClick={() => setTab(i)}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className={styles.tabContent}>
                  {tab === 0 && <TransactionsTable transactions={transactions.slice(0, 5)} />}
                  {tab === 1 && <TransactionsTable transactions={transactions} />}
                  {tab === 2 && <InvestigatorNotes notes={notes} onAdd={handleAddNote} />}
                  {tab === 3 && <AuditTimeline events={caseData?.auditLog || []} />}
                </div>
              </div>

              <div className={styles.sideCol}>
                <div className={styles.sideCard}>
                  <p className={styles.sideCardTitle}>Risk Assessment</p>
                  <RiskSummaryPanel riskData={caseData?.risk} />
                </div>
                <div className={styles.sideCard}>
                  <p className={styles.sideCardTitle}>Subject Profile</p>
                  <CustomerProfileCard customer={caseData?.customer} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '../../../components/layout/Sidebar';
import Topbar from '../../../components/layout/Topbar';
import PageHeader from '../../../components/layout/PageHeader';
import SarForm from '../../../components/sar/SarForm';
import { api } from '../../../lib/api';
import styles from './page.module.css';

export default function SarFilingPage() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get('caseId');
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    if (caseId) {
      api.getSarDraft(caseId).then(setDraft).catch(() => {});
    }
  }, [caseId]);

  async function handleSave(data) {
    if (caseId) await api.saveSarDraft(caseId, data);
  }

  async function handleSubmit(data) {
    if (caseId) await api.submitSar(caseId, data);
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar />
        <div className={styles.content}>
          <PageHeader
            title="File Suspicious Activity Report"
            subtitle={caseId ? `Linked to case ${caseId}` : 'New standalone SAR filing'}
            breadcrumbs={[
              { label: 'SAR Filing', href: '/sar-filing' },
              { label: caseId || 'New' },
            ]}
          />
          <SarForm
            caseId={caseId}
            initialData={draft}
            onSave={handleSave}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
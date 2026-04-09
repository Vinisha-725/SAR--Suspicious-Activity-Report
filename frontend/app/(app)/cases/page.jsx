'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '../../../components/layout/Sidebar';
import Topbar from '../../../components/layout/Topbar';
import PageHeader from '../../../components/layout/PageHeader';
import Button from '../../../components/common/Button';
import SelectField from '../../../components/common/SelectField';
import { api } from '../../../lib/api';
import styles from './page.module.css';

const STATUS_OPTIONS = [
  { value: 'open', label: 'Open' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'escalated', label: 'Escalated' },
  { value: 'closed', label: 'Closed' },
];

export default function CasesPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  async function load(status = '') {
    setLoading(true);
    try {
      const data = await api.getCases(status ? { status } : {});
      setCases(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function handleStatusChange(e) {
    setStatusFilter(e.target.value);
    load(e.target.value);
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar />
        <div className={styles.content}>
          <PageHeader
            title="Cases"
            subtitle={`${cases.length} cases`}
            actions={
              <>
                <SelectField
                  id="statusFilter"
                  options={STATUS_OPTIONS}
                  value={statusFilter}
                  onChange={handleStatusChange}
                />
                <Button variant="primary">New Case</Button>
              </>
            }
          />

          {loading ? (
            <p className={styles.loading}>Loading cases...</p>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Risk Score</th>
                    <th>Assigned To</th>
                    <th>Opened</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map(c => (
                    <tr key={c.id}>
                      <td className={styles.mono}>{c.caseId}</td>
                      <td className={styles.subject}>{c.title}</td>
                      <td><span className={[styles.statusBadge, styles[c.status]].join(' ')}>{c.status?.replace('_', ' ')}</span></td>
                      <td className={styles.mono}>{c.riskScore ?? '—'}</td>
                      <td>{c.assignedTo || '—'}</td>
                      <td className={styles.mono}>{fmtDate(c.createdAt)}</td>
                      <td><Link href={`/cases/${c.id}`} className={styles.viewLink}>View</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
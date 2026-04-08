'use client';
import { useState } from 'react';
import Button from '../common/Button';
import styles from './ApprovalPanel.module.css';

export default function ApprovalPanel({ formData, onSubmit }) {
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!confirmed) return;
    setSubmitting(true);
    try { await onSubmit?.(formData); } finally { setSubmitting(false); }
  }

  const checks = [
    { label: 'Subject details completed', done: !!formData.subject?.fullName },
    { label: 'Transaction details completed', done: !!formData.transactions?.totalAmount },
    { label: 'Narrative written (min 200 chars)', done: (formData.narrative?.length || 0) >= 200 },
    { label: 'Supporting documents attached', done: (formData.docs?.length || 0) > 0 },
  ];

  const allClear = checks.every(c => c.done);

  return (
    <div className={styles.wrap}>
      <h3 className={styles.sectionTitle}>Review and Submit SAR</h3>
      <div className={styles.checklist}>
        <p className={styles.checklistTitle}>Pre-Submission Checklist</p>
        {checks.map((c, i) => (
          <div key={i} className={[styles.checkItem, c.done ? styles.done : styles.missing].join(' ')}>
            <span className={styles.checkIcon}>{c.done ? '✓' : '○'}</span>
            {c.label}
          </div>
        ))}
      </div>

      <div className={styles.disclaimer}>
        <p className={styles.disclaimerText}>
          By submitting this Suspicious Activity Report, I certify that the information provided
          is accurate and complete to the best of my knowledge. I understand that filing a SAR
          does not constitute a finding of wrongdoing and that this report may be used by
          authorized agencies for law enforcement purposes. Intentional falsification of this
          report is a federal offense.
        </p>
        <label className={styles.confirmLabel}>
          <input
            type="checkbox"
            checked={confirmed}
            onChange={e => setConfirmed(e.target.checked)}
            className={styles.checkbox}
          />
          I acknowledge and confirm the above statement
        </label>
      </div>

      <Button
        variant="primary"
        size="lg"
        onClick={handleSubmit}
        loading={submitting}
        disabled={!confirmed || !allClear}
      >
        Submit SAR to FinCEN
      </Button>
    </div>
  );
}
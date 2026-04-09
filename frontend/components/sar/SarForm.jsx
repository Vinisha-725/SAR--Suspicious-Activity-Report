'use client';
import { useState } from 'react';
import SubjectDetailsForm from './SubjectDetailsForm';
import TransactionDetailsForm from './TransactionDetailsForm';
import NarrativeEditor from './NarrativeEditor';
import SupportingDocsUpload from './SupportingDocsUpload';
import ApprovalPanel from './ApprovalPanel';
import Button from '../common/Button';
import styles from './SarForm.module.css';

const STEPS = [
  { id: 'subject', label: 'Subject Details' },
  { id: 'transactions', label: 'Transaction Details' },
  { id: 'narrative', label: 'Narrative' },
  { id: 'documents', label: 'Supporting Documents' },
  { id: 'approval', label: 'Review & Submit' },
];

export default function SarForm({ caseId, initialData, onSave, onSubmit }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialData || {});
  const [saving, setSaving] = useState(false);

  function updateSection(section, data) {
    setFormData(prev => ({ ...prev, [section]: data }));
  }

  async function handleSave() {
    setSaving(true);
    try { await onSave?.(formData); } finally { setSaving(false); }
  }

  return (
    <div className={styles.wrap}>
      {/* Step nav */}
      <div className={styles.stepNav}>
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            className={[styles.stepBtn, i === step ? styles.stepActive : i < step ? styles.stepDone : ''].join(' ')}
            onClick={() => setStep(i)}
          >
            <span className={styles.stepNum}>{i + 1}</span>
            <span className={styles.stepLabel}>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Step content */}
      <div className={styles.stepContent}>
        {step === 0 && (
          <SubjectDetailsForm
            data={formData.subject || {}}
            onChange={d => updateSection('subject', d)}
          />
        )}
        {step === 1 && (
          <TransactionDetailsForm
            data={formData.transactions || {}}
            onChange={d => updateSection('transactions', d)}
          />
        )}
        {step === 2 && (
          <NarrativeEditor
            value={formData.narrative || ''}
            onChange={v => updateSection('narrative', v)}
          />
        )}
        {step === 3 && (
          <SupportingDocsUpload
            docs={formData.docs || []}
            onChange={d => updateSection('docs', d)}
          />
        )}
        {step === 4 && (
          <ApprovalPanel
            formData={formData}
            onSubmit={onSubmit}
          />
        )}
      </div>

      {/* Navigation */}
      <div className={styles.stepActions}>
        <Button variant="secondary" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>
          Previous
        </Button>
        <Button variant="ghost" onClick={handleSave} loading={saving}>
          Save Draft
        </Button>
        {step < STEPS.length - 1 ? (
          <Button variant="primary" onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}>
            Continue
          </Button>
        ) : null}
      </div>
    </div>
  );
}
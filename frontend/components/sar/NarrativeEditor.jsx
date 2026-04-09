'use client';
import { useState } from 'react';
import styles from './NarrativeEditor.module.css';

const MIN_CHARS = 200;

export default function NarrativeEditor({ value = '', onChange }) {
  const charCount = value.length;
  const meetsMin = charCount >= MIN_CHARS;

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h3 className={styles.sectionTitle}>Suspicious Activity Narrative</h3>
        <span className={[styles.charCount, meetsMin ? styles.ok : styles.warn].join(' ')}>
          {charCount} characters {!meetsMin && `(minimum ${MIN_CHARS})`}
        </span>
      </div>
      <p className={styles.guidance}>
        Describe why the activity is suspicious. Include: what was observed, who is involved,
        where and when it occurred, how the activity was conducted, and why you believe it is suspicious.
        Do not include law enforcement sensitive information.
      </p>
      <textarea
        className={styles.editor}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Begin narrative here..."
        rows={14}
        spellCheck
      />
      <div className={styles.tips}>
        <p className={styles.tipsTitle}>Writing Tips</p>
        <ul className={styles.tipsList}>
          <li>Use clear, factual language. Avoid conclusions and speculation.</li>
          <li>Describe transactions chronologically where possible.</li>
          <li>Identify all subjects by name and account number.</li>
          <li>Reference attached supporting documents where applicable.</li>
        </ul>
      </div>
    </div>
  );
}
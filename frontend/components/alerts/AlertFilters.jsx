'use client';
import { useState } from 'react';
import SelectField from '../common/SelectField';
import Button from '../common/Button';
import styles from './AlertFilters.module.css';

const SEVERITY_OPTIONS = [
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const STATUS_OPTIONS = [
  { value: 'open', label: 'Open' },
  { value: 'assigned', label: 'Assigned' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'dismissed', label: 'Dismissed' },
];

const TYPE_OPTIONS = [
  { value: 'aml', label: 'AML' },
  { value: 'fraud', label: 'Fraud' },
  { value: 'sanctions', label: 'Sanctions' },
  { value: 'structuring', label: 'Structuring' },
];

export default function AlertFilters({ onFilter }) {
  const [filters, setFilters] = useState({
    severity: '', status: '', type: '', dateFrom: '', dateTo: '',
  });

  function handleChange(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }));
  }

  function handleApply() {
    onFilter?.(filters);
  }

  function handleReset() {
    const cleared = { severity: '', status: '', type: '', dateFrom: '', dateTo: '' };
    setFilters(cleared);
    onFilter?.(cleared);
  }

  return (
    <div className={styles.filters}>
      <SelectField
        label="Severity"
        id="severity"
        options={SEVERITY_OPTIONS}
        value={filters.severity}
        onChange={e => handleChange('severity', e.target.value)}
        className={styles.field}
      />
      <SelectField
        label="Status"
        id="status"
        options={STATUS_OPTIONS}
        value={filters.status}
        onChange={e => handleChange('status', e.target.value)}
        className={styles.field}
      />
      <SelectField
        label="Alert Type"
        id="type"
        options={TYPE_OPTIONS}
        value={filters.type}
        onChange={e => handleChange('type', e.target.value)}
        className={styles.field}
      />
      <div className={styles.dateRange}>
        <div className={styles.dateField}>
          <label className={styles.dateLabel}>From</label>
          <input
            type="date"
            className={styles.dateInput}
            value={filters.dateFrom}
            onChange={e => handleChange('dateFrom', e.target.value)}
          />
        </div>
        <div className={styles.dateField}>
          <label className={styles.dateLabel}>To</label>
          <input
            type="date"
            className={styles.dateInput}
            value={filters.dateTo}
            onChange={e => handleChange('dateTo', e.target.value)}
          />
        </div>
      </div>
      <div className={styles.actions}>
        <Button variant="primary" size="sm" onClick={handleApply}>Apply</Button>
        <Button variant="ghost" size="sm" onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
}
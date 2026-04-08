import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import TextAreaField from '../common/TextAreaField';
import styles from './TransactionDetailsForm.module.css';

const ACTIVITY_TYPES = [
  { value: 'structuring', label: 'Structuring' },
  { value: 'money_laundering', label: 'Money Laundering' },
  { value: 'fraud', label: 'Fraud' },
  { value: 'terrorist_financing', label: 'Terrorist Financing' },
  { value: 'sanctions_evasion', label: 'Sanctions Evasion' },
  { value: 'other', label: 'Other' },
];

export default function TransactionDetailsForm({ data, onChange }) {
  function set(key, val) { onChange({ ...data, [key]: val }); }

  return (
    <div className={styles.form}>
      <h3 className={styles.sectionTitle}>Suspicious Transaction Details</h3>
      <div className={styles.grid}>
        <InputField
          label="Date of First Suspicious Activity"
          id="dateFrom"
          type="date"
          value={data.dateFrom || ''}
          onChange={e => set('dateFrom', e.target.value)}
          required
        />
        <InputField
          label="Date of Last Suspicious Activity"
          id="dateTo"
          type="date"
          value={data.dateTo || ''}
          onChange={e => set('dateTo', e.target.value)}
          required
        />
        <InputField
          label="Total Amount Involved"
          id="totalAmount"
          type="number"
          value={data.totalAmount || ''}
          onChange={e => set('totalAmount', e.target.value)}
          placeholder="USD"
          required
        />
        <InputField
          label="Number of Transactions"
          id="txnCount"
          type="number"
          value={data.txnCount || ''}
          onChange={e => set('txnCount', e.target.value)}
        />
        <SelectField
          label="Suspicious Activity Type"
          id="activityType"
          options={ACTIVITY_TYPES}
          value={data.activityType || ''}
          onChange={e => set('activityType', e.target.value)}
          required
          className={styles.spanTwo}
        />
        <InputField
          label="Transaction ID(s)"
          id="txnIds"
          value={data.txnIds || ''}
          onChange={e => set('txnIds', e.target.value)}
          hint="Comma-separated"
          className={styles.spanTwo}
        />
        <TextAreaField
          label="Description of Transactions"
          id="txnDescription"
          rows={4}
          value={data.txnDescription || ''}
          onChange={e => set('txnDescription', e.target.value)}
          placeholder="Describe the nature and pattern of the transactions..."
          className={styles.spanTwo}
          required
        />
      </div>
    </div>
  );
}
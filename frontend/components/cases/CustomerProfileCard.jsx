import styles from './CustomerProfileCard.module.css';

export default function CustomerProfileCard({ customer }) {
  if (!customer) return null;
  return (
    <div className={styles.card}>
      <p className={styles.cardTitle}>Subject Profile</p>
      <div className={styles.profile}>
        <div className={styles.avatar}>{(customer.name || '?').charAt(0)}</div>
        <div>
          <p className={styles.name}>{customer.name}</p>
          <p className={styles.id}>{customer.customerId}</p>
        </div>
      </div>
      <div className={styles.fields}>
        <Field label="Entity Type" value={customer.entityType} />
        <Field label="Account No." value={customer.accountNumber} mono />
        <Field label="Date of Birth" value={customer.dob || '—'} />
        <Field label="Nationality" value={customer.nationality} />
        <Field label="Risk Rating" value={customer.riskRating} highlight />
        <Field label="KYC Status" value={customer.kycStatus} />
        <Field label="Onboarded" value={fmtDate(customer.onboardedAt)} />
        <Field label="Relationship Manager" value={customer.rm || '—'} />
      </div>
    </div>
  );
}

function Field({ label, value, mono, highlight }) {
  return (
    <div className={styles.field}>
      <p className={styles.fieldLabel}>{label}</p>
      <p className={[styles.fieldValue, mono ? styles.mono : '', highlight ? styles.highlight : ''].join(' ')}>
        {value || '—'}
      </p>
    </div>
  );
}

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import styles from './SubjectDetailsForm.module.css';

const ENTITY_TYPES = [
  { value: 'individual', label: 'Individual' },
  { value: 'corporation', label: 'Corporation' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'trust', label: 'Trust' },
  { value: 'other', label: 'Other' },
];

const ID_TYPES = [
  { value: 'passport', label: 'Passport' },
  { value: 'drivers_license', label: "Driver's License" },
  { value: 'national_id', label: 'National ID' },
  { value: 'tin', label: 'Tax Identification Number' },
  { value: 'ein', label: 'EIN (Business)' },
];

export default function SubjectDetailsForm({ data, onChange }) {
  function set(key, val) { onChange({ ...data, [key]: val }); }

  return (
    <div className={styles.form}>
      <h3 className={styles.sectionTitle}>Subject / Suspect Information</h3>
      <div className={styles.grid}>
        <SelectField
          label="Entity Type"
          id="entityType"
          options={ENTITY_TYPES}
          value={data.entityType || ''}
          onChange={e => set('entityType', e.target.value)}
          required
        />
        <InputField
          label="Full Legal Name"
          id="fullName"
          value={data.fullName || ''}
          onChange={e => set('fullName', e.target.value)}
          placeholder="As registered or on ID"
          required
        />
        <InputField
          label="Date of Birth / Incorporation"
          id="dob"
          type="date"
          value={data.dob || ''}
          onChange={e => set('dob', e.target.value)}
        />
        <InputField
          label="Nationality / Country of Incorporation"
          id="nationality"
          value={data.nationality || ''}
          onChange={e => set('nationality', e.target.value)}
        />
        <SelectField
          label="Identification Type"
          id="idType"
          options={ID_TYPES}
          value={data.idType || ''}
          onChange={e => set('idType', e.target.value)}
        />
        <InputField
          label="Identification Number"
          id="idNumber"
          value={data.idNumber || ''}
          onChange={e => set('idNumber', e.target.value)}
          placeholder="Document or registration number"
        />
        <InputField
          label="Account Number(s)"
          id="accountNumbers"
          value={data.accountNumbers || ''}
          onChange={e => set('accountNumbers', e.target.value)}
          hint="Comma-separated if multiple"
          className={styles.spanTwo}
        />
        <InputField
          label="Address"
          id="address"
          value={data.address || ''}
          onChange={e => set('address', e.target.value)}
          placeholder="Street, City, State, ZIP"
          className={styles.spanTwo}
        />
        <InputField
          label="Phone Number"
          id="phone"
          type="tel"
          value={data.phone || ''}
          onChange={e => set('phone', e.target.value)}
        />
        <InputField
          label="Email Address"
          id="email"
          type="email"
          value={data.email || ''}
          onChange={e => set('email', e.target.value)}
        />
      </div>
    </div>
  );
}
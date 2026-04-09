import styles from './SelectField.module.css';

export default function SelectField({
  label,
  id,
  options = [],
  error,
  required,
  className = '',
  ...props
}) {
  return (
    <div className={[styles.wrapper, className].join(' ')}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.selectWrap}>
        <select id={id} className={[styles.select, error ? styles.hasError : ''].join(' ')} {...props}>
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className={styles.chevron}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
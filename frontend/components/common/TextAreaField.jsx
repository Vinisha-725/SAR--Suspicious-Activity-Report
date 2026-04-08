import styles from './TextAreaField.module.css';

export default function TextAreaField({
  label,
  id,
  error,
  hint,
  required,
  rows = 4,
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
      <textarea
        id={id}
        rows={rows}
        className={[styles.textarea, error ? styles.hasError : ''].join(' ')}
        {...props}
      />
      {error && <p className={styles.error}>{error}</p>}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
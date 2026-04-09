import styles from './InputField.module.css';

export default function InputField({
  label,
  id,
  error,
  hint,
  icon,
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
      <div className={styles.inputWrap}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          id={id}
          className={[styles.input, icon ? styles.hasIcon : '', error ? styles.hasError : ''].join(' ')}
          {...props}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
import styles from './PageHeader.module.css';

export default function PageHeader({ title, subtitle, actions, breadcrumbs }) {
  return (
    <div className={styles.header}>
      {breadcrumbs && (
        <nav className={styles.breadcrumbs}>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className={styles.crumbWrap}>
              {i > 0 && <span className={styles.separator}>/</span>}
              {crumb.href ? (
                <a href={crumb.href} className={styles.crumbLink}>{crumb.label}</a>
              ) : (
                <span className={styles.crumb}>{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className={styles.row}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>
  );
}
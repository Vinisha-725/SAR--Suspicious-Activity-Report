import styles from './RiskSummaryPanel.module.css';

const RISK_FACTORS = [
  { key: 'transactionVolume', label: 'Transaction Volume' },
  { key: 'geographicRisk', label: 'Geographic Risk' },
  { key: 'customerProfile', label: 'Customer Profile' },
  { key: 'behavioralPattern', label: 'Behavioral Pattern' },
  { key: 'networkRisk', label: 'Network Risk' },
];

export default function RiskSummaryPanel({ riskData }) {
  if (!riskData) return null;
  const { overallScore, factors = {}, indicators = [] } = riskData;

  return (
    <div className={styles.panel}>
      <div className={styles.scoreWrap}>
        <div className={[styles.scoreDial, getScoreCls(overallScore)].join(' ')}>
          <span className={styles.scoreNum}>{overallScore}</span>
          <span className={styles.scoreMax}>/100</span>
        </div>
        <div>
          <p className={styles.scoreLabel}>Overall Risk Score</p>
          <p className={[styles.scoreLevel, getScoreCls(overallScore)].join(' ')}>
            {getRiskLevel(overallScore)}
          </p>
        </div>
      </div>

      <div className={styles.factors}>
        {RISK_FACTORS.map((f) => {
          const val = factors[f.key] ?? 0;
          return (
            <div key={f.key} className={styles.factorRow}>
              <span className={styles.factorLabel}>{f.label}</span>
              <div className={styles.factorBar}>
                <div
                  className={[styles.factorFill, getBarCls(val)].join(' ')}
                  style={{ width: `${val}%` }}
                />
              </div>
              <span className={styles.factorVal}>{val}</span>
            </div>
          );
        })}
      </div>

      {indicators.length > 0 && (
        <div className={styles.indicators}>
          <p className={styles.indicatorsTitle}>Risk Indicators</p>
          {indicators.map((ind, i) => (
            <div key={i} className={styles.indicator}>
              <span className={styles.indicatorDot} />
              {ind}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getScoreCls(score) {
  if (score >= 80) return styles.critical;
  if (score >= 60) return styles.high;
  if (score >= 40) return styles.medium;
  return styles.low;
}
function getBarCls(val) {
  if (val >= 80) return styles.barCritical;
  if (val >= 60) return styles.barHigh;
  if (val >= 40) return styles.barMedium;
  return styles.barLow;
}
function getRiskLevel(score) {
  if (score >= 80) return 'Critical Risk';
  if (score >= 60) return 'High Risk';
  if (score >= 40) return 'Medium Risk';
  return 'Low Risk';
}
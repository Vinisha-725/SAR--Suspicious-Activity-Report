export default function FinalReport({ formData, generatedReport }) {
  const reportId = React.useMemo(() => `SAR-${Math.floor(10000000 + Math.random() * 90000000)}`, []);
  const reportDate = React.useMemo(() => new Date().toLocaleDateString('en-GB'), []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <div style={styles.logos}>
            <div style={styles.logoBlock}>National Crime Agency</div>
            <div style={styles.logoBlock}>UK Financial Intelligence Unit</div>
          </div>
          <div style={styles.formMeta}>
            <div><strong>Version:</strong> 2.1 (NCA-SAR-2026)</div>
            <div><strong>Report ID:</strong> {reportId}</div>
            <div><strong>Date of Report:</strong> {reportDate}</div>
          </div>
        </div>
        <h2 style={styles.documentTitle}>SUSPICIOUS ACTIVITY REPORT (SAR)</h2>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionHeader}><span>1.</span> Reporting Institution Details</h3>
        <div style={styles.grid2}>
          <div style={styles.field}><span style={styles.label}>Institution Name:</span> Default Bank Plc</div>
          <div style={styles.field}><span style={styles.label}>Registered Address:</span> 123 Financial District, London</div>
          <div style={styles.field}><span style={styles.label}>FCA/PRA Number:</span> 102938</div>
          <div style={styles.field}><span style={styles.label}>MLRO Name:</span> Admin User</div>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionHeader}><span>2.</span> Subject / Customer Info</h3>
        <div style={styles.grid2}>
          <div style={styles.field}>
            <span style={styles.label}>Name / Business:</span>
            {formData.subjectType === 'individual' ? `${formData.firstName} ${formData.lastName}` : formData.businessName || 'N/A'}
          </div>
          <div style={styles.field}><span style={styles.label}>Customer ID:</span> {formData.customerId || 'N/A'}</div>
          <div style={styles.field}><span style={styles.label}>Subject Type:</span> <span style={{ textTransform: 'capitalize' }}>{formData.subjectType}</span></div>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionHeader}><span>3.</span> Account Details</h3>
        <div style={styles.grid2}>
          <div style={styles.field}><span style={styles.label}>Account Number:</span> {formData.accountNumber || 'N/A'}</div>
          <div style={styles.field}><span style={styles.label}>Currency:</span> {formData.currency || 'USD'}</div>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionHeader}><span>4.</span> Suspicious Activity Indicators</h3>
        <div style={styles.indicatorsGrid}>
          {formData.suspiciousActivityType.length > 0 ? (
            formData.suspiciousActivityType.map(ind => (
              <div key={ind} style={styles.indicatorBadge}>✓ {ind}</div>
            ))
          ) : (
            <div>No specific indicators selected.</div>
          )}
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionHeader}><span>5.</span> Transaction Summary</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Transaction ID</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>{formData.transactionId || 'N/A'}</td>
              <td style={styles.td}>{formData.transactionDate || 'N/A'}</td>
              <td style={styles.td}><span style={{ textTransform: 'capitalize' }}>{formData.transactionType || 'N/A'}</span></td>
              <td style={styles.td}>{formData.amount ? `${formData.amount} ${formData.currency}` : 'N/A'}</td>
              <td style={styles.td}>{formData.location || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionHeader}><span>6.</span> Reason for Suspicion</h3>
        <div style={styles.narrativeBox}>
          <strong>Summary of Suspicion:</strong>
          <p style={{ marginTop: '8px', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
            {formData.narrative || 'No description provided.'}
          </p>
        </div>
        {generatedReport && generatedReport.report && (
          <div style={{ ...styles.narrativeBox, marginTop: '16px', backgroundColor: '#f8fafc' }}>
            <strong>AI Generated Report Narrative:</strong>
            <p style={{ marginTop: '8px', whiteSpace: 'pre-wrap', lineHeight: '1.5', fontSize: '13px' }}>
              {generatedReport.report}
            </p>
          </div>
        )}
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionHeader}><span>7.</span> Risk Assessment</h3>
        <div style={styles.grid3}>
          <div style={styles.field}>
            <span style={styles.label}>Risk Level:</span>
            <span style={{
              fontWeight: 'bold',
              color: formData.aiAnalysis?.risk_level === 'High' ? '#ef4444' :
                formData.aiAnalysis?.risk_level === 'Medium' ? '#f59e0b' : '#10b981'
            }}>
              {formData.aiAnalysis?.risk_level || 'N/A'}
            </span>
          </div>
          <div style={styles.field}><span style={styles.label}>Is Suspicious:</span> {formData.aiAnalysis?.is_suspicious ? 'Yes' : 'No'}</div>
          <div style={styles.field}><span style={styles.label}>Incident Type:</span> {formData.aiAnalysis?.incident_type || 'N/A'}</div>
          <div style={{ ...styles.field, gridColumn: 'span 3', marginTop: '12px' }}>
            <span style={styles.label}>Recommended Action:</span>
            <span>{formData.aiAnalysis?.recommended_action || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionHeader}><span>8.</span> Declaration</h3>
        <div style={styles.declarationText}>
          I confirm that the information provided in this report is accurate and complete to the best of my knowledge. I understand that submitting a false report is an offense.
        </div>
        <div style={{ ...styles.grid2, marginTop: '20px' }}>
          <div style={styles.signatureLine}>
            <div style={styles.signatureText}>Admin User</div>
            <div style={styles.signatureLabel}>Declarer Name</div>
          </div>
          <div style={styles.signatureLine}>
            <div style={styles.signatureText}>{reportDate}</div>
            <div style={styles.signatureLabel}>Date</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1e293b',
    border: '1px solid #e2e8f0',
    maxWidth: '850px',
    margin: '0 auto'
  },
  header: {
    borderBottom: '3px solid #1e293b',
    paddingBottom: '24px',
    marginBottom: '32px'
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px'
  },
  logos: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  logoBlock: {
    backgroundColor: '#1e293b',
    color: 'white',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    borderRadius: '4px'
  },
  formMeta: {
    textAlign: 'right',
    fontSize: '12px',
    color: '#475569',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  documentTitle: {
    fontSize: '24px',
    fontWeight: '800',
    textAlign: 'center',
    margin: '0',
    letterSpacing: '0.05em'
  },
  section: {
    marginBottom: '32px'
  },
  sectionHeader: {
    backgroundColor: '#334155',
    color: 'white',
    padding: '8px 12px',
    margin: '0 0 16px 0',
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '4px'
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    padding: '0 12px'
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '16px',
    padding: '0 12px'
  },
  field: {
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  label: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase'
  },
  indicatorsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    padding: '0 12px'
  },
  indicatorBadge: {
    backgroundColor: '#f1f5f9',
    border: '1px solid #cbd5e1',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#334155'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px'
  },
  th: {
    textAlign: 'left',
    padding: '10px 12px',
    backgroundColor: '#f8fafc',
    borderBottom: '2px solid #e2e8f0',
    color: '#475569',
    fontWeight: '600'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #e2e8f0'
  },
  narrativeBox: {
    border: '1px solid #e2e8f0',
    padding: '16px',
    borderRadius: '6px',
    fontSize: '14px'
  },
  declarationText: {
    fontSize: '13px',
    color: '#475569',
    fontStyle: 'italic',
    padding: '0 12px'
  },
  signatureLine: {
    borderTop: '1px solid #94a3b8',
    paddingTop: '8px',
    marginTop: '24px'
  },
  signatureText: {
    fontFamily: '"Caveat", "Brush Script MT", cursive',
    fontSize: '20px',
    padding: '0 12px'
  },
  signatureLabel: {
    fontSize: '11px',
    color: '#64748b',
    textTransform: 'uppercase',
    padding: '0 12px'
  }
};

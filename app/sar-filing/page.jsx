"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FinalReport from "./FinalReport";

export default function SARFiling() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  
  // Form data
  const [formData, setFormData] = useState({
    // Subject Information
    subjectType: "individual",
    firstName: "",
    lastName: "",
    businessName: "",
    accountNumber: "",
    customerId: "",
    
    // Transaction Details
    transactionId: "",
    amount: "",
    transactionType: "",
    transactionDate: "",
    location: "",
    currency: "USD",
    
    // Suspicious Activity
    suspiciousActivityType: [],
    amountThreshold: "",
    frequencyPattern: "",
    geographicConcern: "",
    timePattern: "",
    
    // Additional Information
    narrative: "",
    supportingDocuments: [],
    urgencyLevel: "normal",
    
    // AI Analysis Results
    aiAnalysis: null
  });

  const suspiciousActivityTypes = [
    "Structuring",
    "Money Laundering", 
    "Terrorist Financing",
    "Fraud",
    "Identity Theft",
    "Unusual Transaction Pattern",
    "High-Risk Geographic Location",
    "Shell Company Activity",
    "Trade-Based Money Laundering",
    "Virtual Currency Activity"
  ];

  const updateFormData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateFormField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleSuspiciousActivity = (activity) => {
    setFormData(prev => ({
      ...prev,
      suspiciousActivityType: prev.suspiciousActivityType.includes(activity)
        ? prev.suspiciousActivityType.filter(a => a !== activity)
        : [...prev.suspiciousActivityType, activity]
    }));
  };

  const generateSAR = async () => {
    setLoading(true);
    
    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customer_id: formData.customerId,
          account_number: formData.accountNumber,
          transaction_id: formData.transactionId,
          amount: Number(formData.amount),
          transaction_type: formData.transactionType,
          location: formData.location,
          flag: formData.suspiciousActivityType.join(", "),
          raw_notes: formData.narrative
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setGeneratedReport(data);
        setFormData(prev => ({
          ...prev,
          aiAnalysis: data.structured
        }));
        setCurrentStep(4);
      } else {
        alert("Error generating SAR: " + data.error);
      }
    } catch (error) {
      alert("Network error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitSAR = async () => {
    setLoading(true);
    
    try {
      console.log("Submitting SAR with data:", formData);
      console.log("Generated report:", generatedReport);
      
      // The SAR was already saved when generated, now just show success and redirect
      alert("SAR Report submitted successfully! Case created in case management.");
      router.push("/cases");
    } catch (error) {
      console.error("Error submitting SAR:", error);
      alert("Error submitting SAR: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  function validateStep(step) {
    switch (step) {
      case 1:
        return formData.customerId && formData.accountNumber && 
               (formData.subjectType === "individual" ? 
                (formData.firstName && formData.lastName) : 
                formData.businessName);
      case 2:
        return formData.transactionId && formData.amount && 
               formData.transactionType && formData.location;
      case 3:
        return formData.suspiciousActivityType.length > 0 || formData.narrative;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }
    
    if (currentStep === 3) {
      generateSAR();
    } else if (currentStep === 5) {
      submitSAR();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Subject Information</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Subject Type</label>
              <select 
                style={styles.select}
                value={formData.subjectType}
                onChange={(e) => updateFormField("subjectType", e.target.value)}
              >
                <option value="individual">Individual</option>
                <option value="business">Business Entity</option>
              </select>
            </div>

            {formData.subjectType === "individual" ? (
              <>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>First Name</label>
                    <input 
                      style={styles.input}
                      value={formData.firstName}
                      onChange={(e) => updateFormField("firstName", e.target.value)}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Last Name</label>
                    <input 
                      style={styles.input}
                      value={formData.lastName}
                      onChange={(e) => updateFormField("lastName", e.target.value)}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div style={styles.formGroup}>
                <label style={styles.label}>Business Name</label>
                <input 
                  style={styles.input}
                  value={formData.businessName}
                  onChange={(e) => updateFormField("businessName", e.target.value)}
                  placeholder="Enter business name"
                />
              </div>
            )}

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Account Number</label>
                <input 
                  style={styles.input}
                  value={formData.accountNumber}
                  onChange={(e) => updateFormField("accountNumber", e.target.value)}
                  placeholder="Enter account number"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Customer ID</label>
                <input 
                  style={styles.input}
                  value={formData.customerId}
                  onChange={(e) => updateFormField("customerId", e.target.value)}
                  placeholder="Enter customer ID"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Transaction Details</h3>
            
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Transaction ID</label>
                <input 
                  style={styles.input}
                  value={formData.transactionId}
                  onChange={(e) => updateFormField("transactionId", e.target.value)}
                  placeholder="Enter transaction ID"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Amount</label>
                <input 
                  style={styles.input}
                  type="number"
                  value={formData.amount}
                  onChange={(e) => updateFormField("amount", e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Transaction Type</label>
                <select 
                  style={styles.select}
                  value={formData.transactionType}
                  onChange={(e) => updateFormField("transactionType", e.target.value)}
                >
                  <option value="">Select type</option>
                  <option value="deposit">Deposit</option>
                  <option value="withdrawal">Withdrawal</option>
                  <option value="transfer">Transfer</option>
                  <option value="payment">Payment</option>
                  <option value="wire">Wire Transfer</option>
                  <option value="check">Check</option>
                  <option value="ach">ACH Transfer</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Transaction Date</label>
                <input 
                  style={styles.input}
                  type="date"
                  value={formData.transactionDate}
                  onChange={(e) => updateFormField("transactionDate", e.target.value)}
                />
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Location</label>
                <input 
                  style={styles.input}
                  value={formData.location}
                  onChange={(e) => updateFormField("location", e.target.value)}
                  placeholder="Enter location"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Currency</label>
                <select 
                  style={styles.select}
                  value={formData.currency}
                  onChange={(e) => updateFormField("currency", e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                  <option value="INR">INR</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Suspicious Activity Details</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Types of Suspicious Activity</label>
              <div style={styles.checkboxGrid}>
                {suspiciousActivityTypes.map(activity => (
                  <label key={activity} style={styles.checkboxLabel}>
                    <input 
                      type="checkbox"
                      checked={formData.suspiciousActivityType.includes(activity)}
                      onChange={() => toggleSuspiciousActivity(activity)}
                      style={styles.checkbox}
                    />
                    {activity}
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Narrative Description</label>
              <textarea 
                style={styles.textarea}
                value={formData.narrative}
                onChange={(e) => updateFormField("narrative", e.target.value)}
                placeholder="Provide detailed description of the suspicious activity..."
                rows={6}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Urgency Level</label>
              <select 
                style={styles.select}
                value={formData.urgencyLevel}
                onChange={(e) => updateFormField("urgencyLevel", e.target.value)}
              >
                <option value="normal">Normal</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent - Immediate Review Required</option>
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>AI Analysis & Review</h3>
            
            {generatedReport && (
              <div style={styles.analysisContainer}>
                <div style={styles.aiAnalysis}>
                  <h4 style={styles.analysisTitle}>Risk Assessment</h4>
                  <div style={styles.riskGrid}>
                    <div style={styles.riskItem}>
                      <span style={styles.riskLabel}>Risk Level:</span>
                      <span style={{
                        ...styles.riskValue,
                        color: formData.aiAnalysis?.risk_level === "High" ? "#ef4444" :
                               formData.aiAnalysis?.risk_level === "Medium" ? "#f59e0b" : "#10b981"
                      }}>
                        {formData.aiAnalysis?.risk_level || "N/A"}
                      </span>
                    </div>
                    <div style={styles.riskItem}>
                      <span style={styles.riskLabel}>Is Suspicious:</span>
                      <span style={styles.riskValue}>
                        {formData.aiAnalysis?.is_suspicious ? "Yes" : "No"}
                      </span>
                    </div>
                    <div style={styles.riskItem}>
                      <span style={styles.riskLabel}>Incident Type:</span>
                      <span style={styles.riskValue}>
                        {formData.aiAnalysis?.incident_type || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div style={styles.analysisSection}>
                    <h5 style={styles.analysisSubtitle}>Summary</h5>
                    <p style={styles.analysisText}>
                      {formData.aiAnalysis?.summary || "No summary available"}
                    </p>
                  </div>

                  <div style={styles.analysisSection}>
                    <h5 style={styles.analysisSubtitle}>Recommended Action</h5>
                    <p style={styles.analysisText}>
                      {formData.aiAnalysis?.recommended_action || "No recommendation available"}
                    </p>
                  </div>
                </div>

                  <div style={styles.reportPreview}>
                  <h4 style={styles.analysisTitle}>Original Unformatted Generated Output</h4>
                  <pre style={styles.reportText}>
                    {generatedReport.report}
                  </pre>
                </div>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div style={{ ...styles.stepContent, padding: '16px', backgroundColor: '#f1f5f9' }}>
            <h3 style={{ ...styles.stepTitle, textAlign: 'center' }}>Final Official Report Preview</h3>
            <FinalReport formData={formData} generatedReport={generatedReport} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <button 
            style={styles.backButton}
            onClick={() => router.push("/dashboard")}
          >
            {"\u2190"} Back to Dashboard
          </button>
          <h1 style={styles.title}>File SAR Report</h1>
        </div>
      </header>

      <div style={styles.progressContainer}>
        <div style={styles.progressSteps}>
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} style={styles.progressStep}>
              <div 
                style={{
                  ...styles.progressCircle,
                  backgroundColor: step <= currentStep ? "#3b82f6" : "#e2e8f0",
                  color: step <= currentStep ? "white" : "#64748b"
                }}
              >
                {step}
              </div>
              <span style={styles.progressLabel}>
                {step === 1 && "Subject"}
                {step === 2 && "Transaction"}
                {step === 3 && "Activity"}
                {step === 4 && "Review"}
                {step === 5 && "Final"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.formContainer}>
        {renderStepContent()}

        <div style={styles.buttonContainer}>
          {currentStep > 1 && (
            <button 
              style={styles.secondaryButton}
              onClick={prevStep}
              disabled={loading}
            >
              Previous
            </button>
          )}
          
          <button 
            style={styles.primaryButton}
            onClick={nextStep}
            disabled={loading}
          >
            {loading ? (
              <>
                <div style={styles.spinner}></div>
                Processing...
              </>
            ) : currentStep === 5 ? (
              "Submit SAR"
            ) : (
              "Next"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  header: {
    backgroundColor: "white",
    borderBottom: "1px solid #e2e8f0",
    padding: "16px 24px"
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  backButton: {
    backgroundColor: "transparent",
    border: "1px solid #d1d5db",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#6b7280"
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    margin: "0",
    color: "#1e293b"
  },
  progressContainer: {
    backgroundColor: "white",
    padding: "24px",
    borderBottom: "1px solid #e2e8f0"
  },
  progressSteps: {
    maxWidth: "600px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  progressStep: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px"
  },
  progressCircle: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s"
  },
  progressLabel: {
    fontSize: "12px",
    color: "#64748b",
    fontWeight: "500"
  },
  formContainer: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "32px 24px"
  },
  stepContent: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
  },
  stepTitle: {
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 24px 0",
    color: "#1e293b"
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "16px"
  },
  formGroup: {
    marginBottom: "16px"
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "6px"
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    transition: "border-color 0.2s"
  },
  select: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    backgroundColor: "white",
    cursor: "pointer"
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    resize: "vertical",
    fontFamily: "inherit"
  },
  checkboxGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "8px"
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#374151",
    cursor: "pointer"
  },
  checkbox: {
    margin: 0
  },
  analysisContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px"
  },
  aiAnalysis: {
    backgroundColor: "#f8fafc",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0"
  },
  reportPreview: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "8px",
    color: "white"
  },
  analysisTitle: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "0 0 16px 0",
    color: "#1e293b"
  },
  riskGrid: {
    display: "grid",
    gap: "12px",
    marginBottom: "20px"
  },
  riskItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #e2e8f0"
  },
  riskLabel: {
    fontSize: "14px",
    color: "#64748b"
  },
  riskValue: {
    fontSize: "14px",
    fontWeight: "600"
  },
  analysisSection: {
    marginBottom: "20px"
  },
  analysisSubtitle: {
    fontSize: "14px",
    fontWeight: "600",
    margin: "0 0 8px 0",
    color: "#374151"
  },
  analysisText: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
    lineHeight: "1.5"
  },
  reportText: {
    fontSize: "12px",
    color: "#94a3b8",
    margin: 0,
    whiteSpace: "pre-wrap",
    lineHeight: "1.4"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "24px",
    gap: "16px"
  },
  primaryButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "background-color 0.2s"
  },
  secondaryButton: {
    backgroundColor: "white",
    color: "#6b7280",
    border: "1px solid #d1d5db",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  }
};

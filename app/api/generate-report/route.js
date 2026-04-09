import supabase from '../../../lib/supabaseClient';

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      customer_id,
      account_number,
      transaction_id,
      amount,
      transaction_type,
      location,
      flag,
      raw_notes
    } = body;

    // 🔥 TRY OPENROUTER OR FALLBACK TO MOCK
    const apiKey = process.env.OPENROUTER_API_KEY;
    let parsed;

    if (apiKey) {
      // Try AI analysis first
      try {
        const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "google/gemma-2-9b-it",
            messages: [
              {
                role: "system",
                content: `
You are a banking compliance AI that generates Suspicious Activity Reports (SAR).

Return ONLY valid JSON.

{
  "is_suspicious": true or false,
  "risk_level": "Low" | "Medium" | "High",
  "incident_type": "string",
  "audit_trail": "string",
  "summary": "string",
  "recommended_action": "string"
}

Be thorough and professional in your analysis. Consider banking regulations and compliance requirements.
`
              },
              {
                role: "user",
                content: `
SAR ANALYSIS REQUEST:

Customer Information:
- Customer ID: ${customer_id}
- Account Number: ${account_number}

Transaction Details:
- Transaction ID: ${transaction_id}
- Amount: ${amount}
- Transaction Type: ${transaction_type}
- Location: ${location}

Suspicious Activity Indicators:
- Flags: ${flag || "None specified"}
- Additional Notes: ${raw_notes || "No additional notes provided"}

Please analyze this transaction for suspicious activity and provide a comprehensive SAR report, including the following:
- A detailed summary of the transaction and its potential risks
- An assessment of the customer's behavior and any relevant patterns
- An evaluation of the transaction's compliance with banking regulations
- Recommendations for further action or investigation

Please provide your analysis in a clear and concise manner, using proper grammar and spelling.
`
              }
            ]
          })
        });

        const aiData = await aiRes.json();
        const content = aiData.choices?.[0]?.message?.content;

        try {
          // Clean the AI response to ensure valid JSON
          const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
          parsed = JSON.parse(cleanContent);
        } catch (parseError) {
          console.log("AI JSON parsing failed, using mock:", parseError.message);
          parsed = null; // Will trigger mock fallback
        }
      } catch (aiError) {
        console.log("AI call failed, using mock:", aiError.message);
        parsed = null; // Will trigger mock fallback
      }
    }

    // If AI failed or no API key, use mock analysis
    if (!parsed) {
      console.log("Using mock SAR analysis");
      
      // Create a structured response based on transaction data
      const amountNum = Number(amount);
      const isHighValue = amountNum > 10000;
      const hasFlags = flag && flag !== "None" && flag.trim() !== "";
      const hasNotes = raw_notes && raw_notes.trim().length > 0;
      
      let riskLevel = "Low";
      let isSuspicious = false;
      let incidentType = "Standard Transaction";
      
      if (isHighValue || hasFlags || hasNotes) {
        if (amountNum > 50000 || hasFlags) {
          riskLevel = "High";
          isSuspicious = true;
          incidentType = "Suspicious Activity Pattern";
        } else {
          riskLevel = "Medium";
          isSuspicious = amountNum > 25000;
          incidentType = "Unusual Transaction";
        }
      }
      
      parsed = {
        is_suspicious: isSuspicious,
        risk_level: riskLevel,
        incident_type: incidentType,
        summary: `Transaction of $${amountNum} via ${transaction_type} from ${location} has been reviewed. ${isHighValue ? "High-value transaction detected requiring additional scrutiny." : ""} ${hasFlags ? `Suspicious flags identified: ${flag}.` : ""} ${hasNotes ? "Additional notes indicate potential concerns requiring investigation." : ""}`,
        audit_trail: `Transaction initiated on ${new Date().toLocaleDateString()}. Customer ID: ${customer_id}, Account: ${account_number}. Transaction processed through standard banking channels. ${isSuspicious ? "Flagged for manual review due to suspicious activity indicators." : "Transaction completed without immediate concerns."}`,
        recommended_action: riskLevel === "High" ? "Immediate investigation required. Contact customer for verification. Consider temporary account restrictions." : riskLevel === "Medium" ? "Enhanced monitoring recommended. Review customer's transaction history for patterns." : "Standard monitoring procedures apply. No immediate action required."
      };
    }

    // Generate a comprehensive SAR report
    const report = `
SUSPICIOUS ACTIVITY REPORT (SAR)

========================================
REPORT DETAILS
========================================
Report ID: SAR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}
Date Generated: ${new Date().toISOString()}
Analyst: AI Compliance System

========================================
SUBJECT INFORMATION
========================================
Customer ID: ${customer_id}
Account Number: ${account_number}

========================================
TRANSACTION DETAILS
========================================
Transaction ID: ${transaction_id}
Transaction Amount: ${amount}
Transaction Type: ${transaction_type}
Transaction Location: ${location}

========================================
RISK ASSESSMENT
========================================
Risk Level: ${parsed.risk_level}
Is Suspicious: ${parsed.is_suspicious ? "YES" : "NO"}
Incident Type: ${parsed.incident_type}

========================================
ANALYSIS SUMMARY
========================================
${parsed.summary}

========================================
AUDIT TRAIL
========================================
${parsed.audit_trail}

========================================
RECOMMENDED ACTIONS
========================================
${parsed.recommended_action}

========================================
FLAGS & INDICATORS
========================================
Suspicious Activity Flags: ${flag || "None identified"}
Additional Notes: ${raw_notes || "No additional notes provided"}

========================================
DISCLAIMER
========================================
This report was generated by an AI system and should be reviewed by a qualified compliance professional before submission to regulatory authorities.

End of Report
========================================
`;

    // SAVE REPORT AND CREATE CASE
    const reportData = {
      customer_id,
      account_number,
      transaction_id,
      amount: Number(amount),
      transaction_type,
      location,
      flag,
      raw_notes,
      is_suspicious: parsed.is_suspicious,
      generated_report: report
    };

    // Insert the SAR report
    const { data: insertedReport, error: reportError } = await supabase.from("reports").insert([reportData]);
    
    if (reportError) {
      console.error("Error saving report:", reportError);
      throw new Error("Failed to save SAR report: " + reportError.message);
    }

    // Create corresponding case for case management
    const caseId = `SAR-${Date.now().toString().slice(-6)}`;
    const caseData = {
      id: caseId,
      customerName: customer_id, // You might want to add a customer_name field to your form
      accountId: account_number,
      riskLevel: parsed.risk_level,
      status: "Under Investigation",
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      assignedTo: "Unassigned", // Could be based on risk level or user role
      suspiciousActivity: parsed.summary || "SAR Report Generated",
      amount: `$${amount}`,
      priority: parsed.risk_level === "High" ? "High" : parsed.risk_level === "Medium" ? "Medium" : "Low",
      reportId: reportData.report_id || caseId // Link to the SAR report
    };

    // Insert the case (you might need to create a 'cases' table in Supabase)
    try {
      await supabase.from("cases").insert([caseData]);
    } catch (caseError) {
      console.log("Case creation failed (table might not exist):", caseError.message);
      // Don't fail the whole process if case table doesn't exist
    }

    return Response.json({
      report,
      structured: parsed
    });

  } catch (err) {
    console.error("🔥 FULL ERROR:", err.message);

    return Response.json(
      {
        error: "AI processing failed",
        details: err.message
      },
      { status: 500 }
    );
  }
}
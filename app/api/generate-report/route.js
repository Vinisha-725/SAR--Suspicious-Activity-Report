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

    // Use environment variable only
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      throw new Error("Missing OPENROUTER_API_KEY in environment variables");
    }

    // CALL OPENROUTER
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
You are a banking compliance AI.

Return ONLY valid JSON.

{
  "is_suspicious": true or false,
  "risk_level": "Low" | "Medium" | "High",
  "incident_type": "string",
  "audit_trail": "string",
  "summary": "string",
  "recommended_action": "string"
}
`
          },
          {
            role: "user",
            content: `
Customer ID: ${customer_id}
Account: ${account_number}
Transaction ID: ${transaction_id}
Amount: INR ${amount}
Type: ${transaction_type}
Location: ${location}
Flag: ${flag}
Notes: ${raw_notes}
`
          }
        ]
      })
    });

    const aiData = await aiRes.json();

    // 🧪 DEBUG LOG (check this in terminal if error happens)
    console.log("AI RAW RESPONSE:", JSON.stringify(aiData, null, 2));

    let content = aiData?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Empty AI response");
    }

    // 🧠 CLEAN RESPONSE (remove accidental text wrapping)
    content = content.trim();

    // Remove ```json or ``` if present
    if (content.startsWith("```")) {
      content = content.replace(/```json|```/g, "").trim();
    }

    let parsed;

    try {
      parsed = JSON.parse(content);
    } catch (parseError) {
      console.error("❌ JSON PARSE FAILED:", content);

      // 🛟 FALLBACK
      parsed = {
        is_suspicious: false,
        risk_level: "Unknown",
        incident_type: "Parsing Error",
        audit_trail: "AI response could not be parsed properly.",
        summary: content,
        recommended_action: "Manual review required."
      };
    }

    // 🧾 FINAL REPORT
    const report = `
SAR REPORT

Customer ID: ${customer_id}
Account Number: ${account_number}
Transaction ID: ${transaction_id}

Risk Level: ${parsed.risk_level}
Incident Type: ${parsed.incident_type}

Summary:
${parsed.summary}

Audit Trail:
${parsed.audit_trail}

Recommended Action:
${parsed.recommended_action}
`;

    // 💾 SAVE TO SUPABASE
    const { error } = await supabase.from("reports").insert([
      {
        customer_id,
        account_number,
        transaction_id,
        amount,
        transaction_type,
        location,
        flag,
        raw_notes,
        is_suspicious: parsed.is_suspicious,
        generated_report: report
      }
    ]);

    if (error) {
      console.error("❌ DB ERROR:", error);
      throw error;
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
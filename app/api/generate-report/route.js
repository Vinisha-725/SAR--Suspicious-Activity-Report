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

    // 🔥 CALL OPENAI
    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a banking compliance AI that generates Suspicious Activity Reports (SAR).

Analyze transaction data and return ONLY JSON in this format:

{
  "is_suspicious": boolean,
  "risk_level": "Low" | "Medium" | "High",
  "incident_type": string,
  "audit_trail": string,
  "summary": string,
  "recommended_action": string
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
    const content = aiData.choices?.[0]?.message?.content;

    const parsed = JSON.parse(content);

    // 🧾 FINAL REPORT (matches your Figma idea)
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

    // 💾 SAVE
    await supabase.from("reports").insert([
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

    return Response.json({
      report,
      structured: parsed
    });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "AI processing failed" }, { status: 500 });
  }
}
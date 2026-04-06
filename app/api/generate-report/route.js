import supabase from '../../../../lib/supabaseClient';

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

    // 🧠 Basic suspicion logic (no AI yet)
    let is_suspicious = false;

    if (amount > 100000 || flag) {
      is_suspicious = true;
    }

    // 🧾 Generate SAR report (template)
    const report = `
SAR REPORT

Customer ID: ${customer_id}
Account Number: ${account_number}
Transaction ID: ${transaction_id}

Transaction Type: ${transaction_type}
Amount: INR ${amount}
Location: ${location}

Suspicious: ${is_suspicious ? "YES" : "NO"}

Description:
${raw_notes}

Conclusion:
${is_suspicious 
  ? "This transaction shows suspicious characteristics and requires further investigation." 
  : "No major suspicious activity detected."}
`;

    // 💾 Store in DB
    const { error } = await supabase.from('reports').insert([
      {
        customer_id,
        account_number,
        transaction_id,
        amount,
        transaction_type,
        location,
        flag,
        raw_notes,
        is_suspicious,
        generated_report: report
      }
    ]);

    if (error) throw error;

    return Response.json({ report, is_suspicious });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
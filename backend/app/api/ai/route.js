import { logEvent } from '@/lib/logger';

export async function POST(req) {
  try {
    const body = await req.json();
    const { prompt, user_id } = body;

    // Call OpenAI
    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await aiRes.json();
    const response = data.choices?.[0]?.message?.content || 'No response';

    // Log event
    await logEvent({
      user_id,
      prompt,
      response,
      status: 'success'
    });

    return Response.json({ response });

  } catch (err) {
    console.error(err);

    // Log failure
    await logEvent({
      user_id: null,
      prompt: 'unknown',
      response: 'error',
      status: 'failed'
    });

    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
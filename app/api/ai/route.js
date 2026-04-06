import { logEvent } from '../../../lib/logger';

export async function POST(req) {
  try {
    const body = await req.json();
    const { prompt, user_id } = body;

    // 🔥 Fake AI response (for now)
    const response = "This is a dummy AI response for testing";

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

    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
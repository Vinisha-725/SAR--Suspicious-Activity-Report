import supabase from './supabaseClient';

export async function logEvent({
  user_id,
  prompt,
  response,
  status
}) {
  const { error } = await supabase.from('logs').insert([
    {
      user_id,
      prompt,
      response,
      status
    }
  ]);

  if (error) {
    console.error('Logging failed:', error);
  }
}
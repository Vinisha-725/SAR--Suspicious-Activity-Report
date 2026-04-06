import supabase from '@/lib/supabaseClient';

export async function GET() {
  const { data, error } = await supabase
    .from('logs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}
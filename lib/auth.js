import supabase from './supabaseClient';

export async function getUser(token) {
  const { data, error } = await supabase.auth.getUser(token);
  if (error) return null;
  return data.user;
}
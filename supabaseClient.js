// Initialize Supabase Client
const SUPABASE_URL = "https://zhzmgoiklwkdgrtsxkrs.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_foxWawuBjXtL5d71CGFiYg_HJCDiUKi";

// Supabase will be available via window.supabase from the CDN script
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

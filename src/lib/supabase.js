import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// supabase will be null if env vars are missing/placeholder — app gracefully
// falls back to localStorage in that case (see DataContext.js).
export const supabase =
  url && key && !url.includes('your-project-id')
    ? createClient(url, key)
    : null;

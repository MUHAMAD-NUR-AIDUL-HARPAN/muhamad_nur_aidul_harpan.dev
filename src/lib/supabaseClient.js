import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ugbwpgalnyazmbmntxhi.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnYndwZ2Fsbnlhem1ibW50eGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2NDg5MjEsImV4cCI6MjEwODIyNDkyMX0.TlBAoAK1Ka0kMD961_zOHvCHuOW-QkFujxXui9f0Tv0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

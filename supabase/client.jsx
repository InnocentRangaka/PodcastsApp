import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iatgsghpjpthesnrrzcv.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhdGdzZ2hwanB0aGVzbnJyemN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5NzUwOTgsImV4cCI6MjAzNDU1MTA5OH0.XoxElnyrKQrYwgnfxYBULVDuUF87FOKaALDdKy3CF0c';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

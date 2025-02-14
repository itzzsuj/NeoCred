import { createClient } from "@supabase/supabase-js";

// ✅ Use Your Supabase Details
const SUPABASE_URL = "https://aadppgosrznaztzuxtns.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhZHBwZ29zcnpuYXp0enV4dG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NDk1MzMsImV4cCI6MjA1NTAyNTUzM30.hR1G4fqDhsz6DthdddzeGQ5vPdV3zMeGhl830DRBVAQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export { SUPABASE_URL }; 
export default supabase;

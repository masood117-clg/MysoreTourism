// supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    'https://efwpupiqcfiacharxpae.supabase.co', // Replace with your Supabase project URL
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmd3B1cGlxY2ZpYWNoYXJ4cGFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NzE2NTgsImV4cCI6MjA1OTE0NzY1OH0.cVtyA_cMDtP4MIykC5RVZnCYLMTVD4ICUA3XzNit938' // Replace with your Anon Public Key
);
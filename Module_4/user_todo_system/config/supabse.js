import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vebwgshojfugwjbeexwk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlYndnc2hvamZ1Z3dqYmVleHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNzM1NDcsImV4cCI6MjA4NDY0OTU0N30.Sdns2BmuABWcmI6q0wjtqa-SHy32AVihTTWMPZ4d5U0";

export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://cobnjzyurexawuadiozm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvYm5qenl1cmV4YXd1YWRpb3ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU4NzgxNzUsImV4cCI6MTk5MTQ1NDE3NX0.ETH_xIMZdJlZSFz9DQz-VWNjoumNgybwMJzE6SaNhWc",
);

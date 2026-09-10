import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const isConfigured =
  supabaseUrl.startsWith("https://") &&
  supabaseUrl.includes("supabase.co") &&
  supabaseAnonKey.length > 10;

export const supabase: SupabaseClient = createClient(
  isConfigured ? supabaseUrl : "https://placeholder.supabase.co",
  isConfigured ? supabaseAnonKey : "placeholder-key"
);

export { isConfigured as isSupabaseConfigured };

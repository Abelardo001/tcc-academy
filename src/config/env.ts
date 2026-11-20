const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() ?? ""
const configuredSupabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? ""
const configuredSupabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ?? ""

export const apiBaseUrl = configuredApiBaseUrl.replace(/\/+$/, "")
export const supabaseUrl = configuredSupabaseUrl.replace(/\/+$/, "")
export const supabasePublishableKey = configuredSupabaseKey

import { isSupabaseConfigured, supabase } from "@/lib/supabase"
import type { AuthChangeEvent, Session } from "@supabase/supabase-js"

export const authService = {
  signUp: async (email: string, password: string, fullName: string) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error("O Supabase ainda não está configurado.")
    }

    return supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })
  },
  signIn: async (email: string, password: string) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error("O Supabase ainda não está configurado.")
    }

    return supabase.auth.signInWithPassword({ email, password })
  },
  signOut: async () => {
    if (!isSupabaseConfigured || !supabase) return
    return supabase.auth.signOut()
  },
  getSession: async () => {
    if (!isSupabaseConfigured || !supabase) return null
    const { data } = await supabase.auth.getSession()
    return data.session
  },
  getProfile: async () => {
    if (!isSupabaseConfigured || !supabase) return null
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user.id
    if (!userId) return null
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, role")
      .eq("id", userId)
      .maybeSingle()
    return data
  },
  setRole: async (role: "reader" | "finalist") => {
    if (!isSupabaseConfigured || !supabase) return
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user.id
    if (!userId) return
    await supabase.from("profiles").update({ role }).eq("id", userId)
  },
  resetPassword: async (email: string) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error("O Supabase ainda não está configurado.")
    }
    return supabase.auth.resetPasswordForEmail(email)
  },
  onAuthStateChange: (
    callback: (event: AuthChangeEvent, session: Session | null) => void,
  ) => {
    if (!isSupabaseConfigured || !supabase) {
      return { data: { subscription: { unsubscribe: () => undefined } } }
    }
    return supabase.auth.onAuthStateChange(callback)
  },
}

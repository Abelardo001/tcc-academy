import { supabase, isSupabaseConfigured } from "@/lib/supabase"

export type ChatMessage = {
  id: number
  sender_id: string
  recipient_id: string
  content: string
  read_at: string | null
  created_at: string
}

export const chatService = {
  getAdminRecipient: async (): Promise<string | null> => {
    if (!isSupabaseConfigured || !supabase) return null
    const { data } = await supabase
      .from("profiles")
      .select("id")
      .eq("role", "admin")
      .limit(1)
      .maybeSingle()
    return data?.id ?? null
  },
  listConversation: async (otherUserId: string): Promise<ChatMessage[]> => {
    if (!isSupabaseConfigured || !supabase) return []
    const { data: sessionData } = await supabase.auth.getSession()
    const currentUserId = sessionData.session?.user.id
    if (!currentUserId) return []

    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .or(
        `and(sender_id.eq.${currentUserId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${currentUserId})`,
      )
      .order("created_at", { ascending: true })

    if (error) throw new Error(error.message)
    return data ?? []
  },

  send: async (recipientId: string, content: string) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error("O Supabase ainda não está configurado.")
    }
    const { data: sessionData } = await supabase.auth.getSession()
    const senderId = sessionData.session?.user.id
    if (!senderId) throw new Error("É necessário iniciar sessão.")

    const { data, error } = await supabase
      .from("chat_messages")
      .insert({
        sender_id: senderId,
        recipient_id: recipientId,
        content: content.trim(),
      })
      .select("*")
      .single()

    if (error) throw new Error(error.message)
    return data as ChatMessage
  },
}

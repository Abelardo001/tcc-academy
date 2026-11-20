import { mockCourses, mockWorks } from "@/data/mock-data"
import { isSupabaseConfigured, supabase } from "@/lib/supabase"
import type { Course, Tcc } from "@/types"

export const libraryService = {
  listCourses: (): Course[] => mockCourses,
  listWorks: (): Tcc[] => mockWorks,
  fetchCourses: async (): Promise<Course[]> => {
    if (!isSupabaseConfigured || !supabase) return mockCourses

    const { data, error } = await supabase
      .from("courses")
      .select("name, count, icon")
      .order("name")

    if (error) {
      console.error("Não foi possível carregar os cursos:", error.message)
      return mockCourses
    }
    return data?.length ? data : mockCourses
  },
  fetchWorks: async (): Promise<Tcc[]> => {
    if (!isSupabaseConfigured || !supabase) return mockWorks

    const { data, error } = await supabase
      .from("works")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Não foi possível carregar os trabalhos:", error.message)
      return mockWorks
    }
    return data?.length ? data : mockWorks
  },
}

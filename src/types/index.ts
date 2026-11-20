export type Role = "reader" | "finalist" | "admin"
export type Page = "landing" | "auth" | "dashboard" | "library" | "detail" | "reader" | "favorites" | "history" | "courses" | "contact" | "profile" | "submit" | "works" | "admin"

export type Course = {
  name: string
  count: number
  icon: string
}

export type Tcc = {
  id: number
  title: string
  author: string
  course: string
  year: number
  advisor: string
  views: number
  pages: number
  color: string
  abstract: string
  keywords: string[]
  contact: boolean
}

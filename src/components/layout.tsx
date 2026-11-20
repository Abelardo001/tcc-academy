import { useState, type ReactNode } from "react"
import type { Role, Page } from "@/types"
import { AppHeader, AppSidebar } from "@/components/site-chrome"

export function AppShell({
  page,
  role,
  setPage,
  searchQuery,
  onSearchChange,
  logout,
  children,
}: {
  page: Page
  role: Role
  setPage: (p: Page) => void
  searchQuery: string
  onSearchChange: (value: string) => void
  logout: () => void
  children: ReactNode
}) {
  const [mobileMenu, setMobileMenu] = useState(false)
  return (
    <div className="app-shell">
      <AppSidebar
        page={page}
        role={role}
        open={mobileMenu}
        setPage={setPage}
        onClose={() => setMobileMenu(false)}
        logout={logout}
      />
      <div className="app-main">
        <AppHeader
          role={role}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onMenuOpen={() => setMobileMenu(true)}
          setPage={setPage}
        />
        <main className="content">{children}</main>
      </div>
    </div>
  )
}

import {
  Bell,
  BookMarked,
  Bookmark,
  ChevronDown,
  FileText,
  GraduationCap,
  History,
  Home,
  Library,
  LogOut,
  Menu,
  MessageCircle,
  PanelLeftClose,
  Search,
  ShieldCheck,
  UploadCloud,
  UserRound,
} from "lucide-react"
import type { Page, Role } from "@/types"
import { Button, Logo } from "@/components/common"

const primaryNavigation = [
  ["dashboard", Home, "Visão geral"],
  ["library", Library, "Biblioteca"],
  ["courses", GraduationCap, "Explorar cursos"],
  ["favorites", Bookmark, "Favoritos"],
  ["history", History, "Histórico de leitura"],
  ["contact", MessageCircle, "Contactar autores"],
  ["profile", UserRound, "Meu perfil"],
] as const

export function PublicNavbar({
  goAuth,
}: {
  goAuth: (mode: "login" | "register") => void
}) {
  return (
    <header className="public-header">
      <Logo />
      <nav>
        <a href="#sobre">Sobre</a>
        <a href="#contactos">Contactos</a>
        <Button variant="ghost" onClick={() => goAuth("login")}>
          Entrar
        </Button>
        <Button onClick={() => goAuth("register")}>Criar conta</Button>
      </nav>
    </header>
  )
}

export function PublicFooter() {
  return (
    <footer id="contactos">
      <div>
        <Logo />
        <p>Preservar o conhecimento. Inspirar o futuro.</p>
      </div>
      <div>
        <b>Contactos institucionais</b>
        <a href="mailto:biblioteca@wiliete.co.ao">biblioteca@wiliete.co.ao</a>
        <span>Luanda, Angola</span>
      </div>
      <div>
        <b>Biblioteca Digital</b>
        <span>© 2025 Colégio Wiliete</span>
        <span>Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}

export function AppSidebar({
  page,
  role,
  open,
  setPage,
  onClose,
  logout,
}: {
  page: Page
  role: Role
  open: boolean
  setPage: (page: Page) => void
  onClose: () => void
  logout: () => void
}) {
  const navigation =
    role === "finalist"
      ? [
          ...primaryNavigation,
          ["submit", UploadCloud, "Submeter TCC"] as const,
          ["works", FileText, "Meus trabalhos"] as const,
        ]
      : primaryNavigation

  return (
    <>
      <aside className={open ? "sidebar open" : "sidebar"}>
        <div className="side-logo">
          <Logo />
          <button onClick={onClose}>
            <PanelLeftClose size={20} />
          </button>
        </div>
        <nav>
          <small>MENU PRINCIPAL</small>
          {navigation.map(([key, Icon, label]) => (
            <button
              className={page === key ? "active" : ""}
              key={key}
              onClick={() => {
                setPage(key)
                onClose()
              }}
            >
              <Icon size={19} />
              {label}
            </button>
          ))}
          {role === "admin" && (
            <button
              className={page === "admin" ? "active" : ""}
              onClick={() => {
                setPage("admin")
                onClose()
              }}
            >
              <ShieldCheck size={19} />
              Painel administrativo
            </button>
          )}
        </nav>
        <div className="sidebar-help">
          <span>
            <BookMarked size={22} />
          </span>
          <b>Precisa de ajuda?</b>
          <p>Consulte o guia da biblioteca.</p>
          <button>Ver guia</button>
        </div>
        <button className="logout" onClick={logout}>
          <LogOut size={18} />
          Terminar sessão
        </button>
      </aside>
      {open && <div className="scrim" onClick={onClose} />}
    </>
  )
}

export function AppHeader({
  role,
  searchQuery,
  onSearchChange,
  onMenuOpen,
  setPage,
}: {
  role: Role
  searchQuery: string
  onSearchChange: (value: string) => void
  onMenuOpen: () => void
  setPage: (page: Page) => void
}) {
  return (
    <header className="app-header">
      <button className="menu-trigger" onClick={onMenuOpen}>
        <Menu size={22} />
      </button>
      <div className="top-search">
        <Search size={18} />
        <input
          value={searchQuery}
          placeholder="Pesquisar título, autor ou curso..."
          onChange={(event) => onSearchChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") setPage("library")
          }}
        />
      </div>
      <div className="header-actions">
        <button className="notification">
          <Bell size={20} />
          <i />
        </button>
        <div className="user-chip">
          <span>AM</span>
          <div>
            <b>Ana Manuel</b>
            <small>
              {role === "admin"
                ? "Administradora"
                : role === "finalist"
                  ? "Finalista"
                  : "Leitora"}
            </small>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  )
}

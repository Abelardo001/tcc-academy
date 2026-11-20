import { FormEvent, ReactNode, useMemo, useState } from "react"
import { useEffect } from "react"
import { authService } from "@/services/auth.service"
import { chatService, type ChatMessage } from "@/services/chat.service"
import {
  ArrowLeft,
  Bell,
  BookMarked,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Expand,
  Eye,
  FileCheck2,
  FileText,
  GraduationCap,
  Heart,
  History,
  Home,
  Library,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  MoreHorizontal,
  PanelLeftClose,
  Phone,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  User,
  UserRound,
  Users,
  X,
  XCircle,
} from "lucide-react"

type Role = "reader" | "finalist" | "admin"
type Page = "landing" | "auth" | "dashboard" | "library" | "detail" | "reader" | "favorites" | "history" | "courses" | "contact" | "profile" | "submit" | "works" | "admin"

type Tcc = {
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

const heroPhoto =
  "https://images.unsplash.com/photo-1655720348590-c739c860beed?auto=format&fit=crop&w=1800&q=88"

const works: Tcc[] = [
  {
    id: 1,
    title: "Sistema de Gestão Escolar para Instituições de Ensino Médio",
    author: "Marta Domingos",
    course: "Informática",
    year: 2024,
    advisor: "Eng. Paulo André",
    views: 1248,
    pages: 78,
    color: "#087B48",
    abstract:
      "Este trabalho apresenta o desenvolvimento de uma plataforma integrada para melhorar a gestão de dados académicos, processos administrativos e comunicação numa instituição de ensino médio.",
    keywords: ["Gestão escolar", "Sistemas de informação", "Educação"],
    contact: true,
  },
  {
    id: 2,
    title: "Plano de Marketing Digital para Pequenas Empresas Angolanas",
    author: "Edson Manuel",
    course: "Gestão Empresarial",
    year: 2024,
    advisor: "Dra. Helena Costa",
    views: 980,
    pages: 64,
    color: "#B58925",
    abstract:
      "Uma análise aplicada sobre estratégias digitais acessíveis e o seu impacto no crescimento sustentável de pequenas empresas no contexto angolano.",
    keywords: ["Marketing digital", "Empreendedorismo", "Estratégia"],
    contact: true,
  },
  {
    id: 3,
    title: "Cuidados de Enfermagem na Prevenção da Hipertensão Arterial",
    author: "Lúcia Mateus",
    course: "Enfermagem",
    year: 2023,
    advisor: "Enf. Carla José",
    views: 1524,
    pages: 82,
    color: "#2E7784",
    abstract:
      "O estudo identifica práticas de enfermagem eficazes para prevenção, educação e acompanhamento de pacientes em risco de hipertensão arterial.",
    keywords: ["Enfermagem", "Prevenção", "Hipertensão"],
    contact: false,
  },
  {
    id: 4,
    title: "Automação de Processos Contabilísticos com Ferramentas Digitais",
    author: "Isaías Pedro",
    course: "Contabilidade",
    year: 2023,
    advisor: "Msc. Tomás Bunga",
    views: 745,
    pages: 71,
    color: "#73597A",
    abstract:
      "Investigação sobre o contributo de ferramentas digitais para reduzir erros, melhorar relatórios e tornar os processos contabilísticos mais eficientes.",
    keywords: ["Contabilidade", "Automação", "Tecnologia"],
    contact: true,
  },
  {
    id: 5,
    title: "Redes de Computadores Seguras em Ambientes Académicos",
    author: "Daniel António",
    course: "Informática",
    year: 2022,
    advisor: "Eng. Paulo André",
    views: 669,
    pages: 89,
    color: "#345F79",
    abstract:
      "Proposta de uma arquitetura de rede segura, escalável e de baixo custo para instituições académicas de média dimensão.",
    keywords: ["Redes", "Cibersegurança", "Infraestrutura"],
    contact: true,
  },
  {
    id: 6,
    title: "Humanização no Atendimento em Unidades Hospitalares",
    author: "Rosa Joaquim",
    course: "Enfermagem",
    year: 2024,
    advisor: "Enf. Carla José",
    views: 1102,
    pages: 58,
    color: "#A45A5A",
    abstract:
      "Uma abordagem qualitativa sobre práticas de acolhimento e humanização no atendimento prestado por equipas de enfermagem.",
    keywords: ["Humanização", "Saúde", "Atendimento"],
    contact: true,
  },
]

const courses = [
  { name: "Informática", count: 48, icon: "01" },
  { name: "Enfermagem", count: 36, icon: "02" },
  { name: "Gestão Empresarial", count: 31, icon: "03" },
  { name: "Contabilidade", count: 27, icon: "04" },
]

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <button
      className="logo"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Biblioteca Digital Wiliete"
    >
      <img src="/wiliete-logo.jpg" alt="Emblema do Colégio Wiliete" />
      {!compact && (
        <span>
          <b>Biblioteca Digital</b>
          <small>Colégio Wiliete</small>
        </span>
      )}
    </button>
  )
}

function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  type = "button",
  className = "",
}: {
  children: ReactNode
  variant?: "primary" | "outline" | "soft" | "ghost" | "danger"
  icon?: ReactNode
  onClick?: () => void
  type?: "button" | "submit"
  className?: string
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  )
}

function Landing({ goAuth }: { goAuth: (mode: "login" | "register") => void }) {
  const tips = [
    [
      BookOpen,
      "Explore conhecimentos",
      "Descubra trabalhos académicos de diferentes cursos.",
    ],
    [
      Search,
      "Pesquise facilmente",
      "Encontre TCC através do curso, título ou autor.",
    ],
    [
      Sparkles,
      "Partilhe conhecimento",
      "Consulte trabalhos e inspire-se em novas pesquisas.",
    ],
    [
      Heart,
      "Valorize os autores",
      "Conheça projetos dos nossos antigos finalistas.",
    ],
  ] as const
  return (
    <div className="landing">
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

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">
              <GraduationCap size={16} /> Conhecimento que permanece
            </span>
            <h1>
              Conhecimento que inspira <em>novas descobertas.</em>
            </h1>
            <p>
              Uma biblioteca digital criada para preservar, partilhar e
              valorizar o conhecimento académico produzido pelos estudantes do
              Colégio Wiliete.
            </p>
            <div className="hero-actions">
              <Button
                onClick={() => goAuth("login")}
                icon={<BookOpen size={18} />}
              >
                Entrar na plataforma
              </Button>
              <Button variant="outline" onClick={() => goAuth("register")}>
                Criar minha conta
              </Button>
            </div>
            <div className="trust-line">
              <span className="mini-avatars">
                <i>MD</i>
                <i>EM</i>
                <i>LJ</i>
              </span>
              <span>
                <b>Conhecimento partilhado</b>
                <small>por estudantes, para estudantes</small>
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src={heroPhoto}
              alt="Estudantes universitários a estudar em conjunto"
            />
            <div className="hero-float">
              <span>
                <FileCheck2 size={19} />
              </span>
              <div>
                <b>Trabalhos académicos</b>
                <small>preservados num só lugar</small>
              </div>
            </div>
          </div>
        </section>

        <section className="tips-section">
          <div className="section-intro">
            <span className="overline">Tudo começa com uma pesquisa</span>
            <h2>Um espaço criado para o seu percurso académico</h2>
            <p>
              Descubra, consulte e inspire-se no trabalho de quem passou pelas
              mesmas salas.
            </p>
          </div>
          <div className="tips-grid">
            {tips.map(([Icon, title, text], index) => (
              <article className="tip-card" key={title}>
                <div className="tip-top">
                  <span className="tip-icon">
                    <Icon size={22} />
                  </span>
                  <small>0{index + 1}</small>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="sobre">
          <div className="about-mark">
            <Library size={42} />
            <span>W</span>
          </div>
          <div>
            <span className="overline">A nossa missão</span>
            <h2>Sobre a Biblioteca Digital</h2>
          </div>
          <p>
            A Biblioteca Digital do Colégio Wiliete é um espaço dedicado à
            organização e preservação dos trabalhos académicos dos seus
            finalistas, facilitando o acesso ao conhecimento e incentivando a
            investigação científica.
          </p>
        </section>
      </main>

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
    </div>
  )
}

function Auth({
  initialMode,
  onBack,
  onLogin,
}: {
  initialMode: "login" | "register"
  onBack: () => void
  onLogin: (role: Role) => void
}) {
  const [mode, setMode] = useState(initialMode)
  const [role, setRole] = useState<"reader" | "finalist" | null>(null)
  const [forgot, setForgot] = useState(false)
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setMessage("")
    if (forgot) {
      setLoading(true)
      try {
        const { error } = await authService.resetPassword(email)
        setMessage(error
          ? error.message
          : "Enviámos as instruções de recuperação para o seu e-mail.")
      } finally {
        setLoading(false)
      }
      return
    }
    if (mode === "register" && !role) return
    if (mode === "register" && password !== confirmPassword) {
      setMessage("As palavras-passe não coincidem.")
      return
    }
    setLoading(true)
    try {
      if (mode === "register") {
        const { data, error } = await authService.signUp(email, password, fullName)
        if (error) {
          setMessage(error.message)
          return
        }
        if (!data.session) {
          setMessage("Conta criada. Confirme o e-mail antes de iniciar sessão.")
          return
        }
        await authService.setRole(role || "reader")
        const profile = await authService.getProfile()
        onLogin((profile?.role as Role) || role || "reader")
      } else {
        const { error } = await authService.signIn(email, password)
        if (error) {
          setMessage(error.message)
          return
        }
        const profile = await authService.getProfile()
        onLogin((profile?.role as Role) || "reader")
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="auth-page">
      <div className="auth-art">
        <button className="back-link" onClick={onBack}>
          <ArrowLeft size={18} /> Voltar ao início
        </button>
        <Logo />
        <div className="auth-quote">
          <GraduationCap size={38} />
          <h2>O conhecimento cresce quando é partilhado.</h2>
          <p>
            Aceda a trabalhos académicos que representam dedicação, pesquisa e
            futuro.
          </p>
        </div>
        <small>Biblioteca Digital · Colégio Wiliete</small>
      </div>
      <div className="auth-panel">
        <div className="auth-box">
          <span className="mobile-back" onClick={onBack}>
            <ArrowLeft size={18} /> Início
          </span>
          <h1>
            {forgot
              ? "Recuperar palavra-passe"
              : mode === "login"
                ? "Bem-vindo de volta"
                : role
                  ? "Crie a sua conta"
                  : "Como deseja participar?"}
          </h1>
          <p className="auth-lead">
            {forgot
              ? "Indique o e-mail associado à sua conta."
              : mode === "login"
                ? "Entre para continuar a sua jornada de conhecimento."
                : role
                  ? `Registo como ${
                      role === "reader" ? "Leitor" : "Finalista"
                    }.`
                  : "Escolha o perfil que melhor corresponde ao que procura."}
          </p>

          {mode === "register" && !role ? (
            <div className="role-grid">
              <button onClick={() => setRole("reader")}>
                <span>
                  <BookOpen size={25} />
                </span>
                <b>Leitor</b>
                <p>
                  Para estudantes que desejam pesquisar, ler e guardar
                  trabalhos.
                </p>
                <em>
                  Escolher perfil <ChevronRight size={16} />
                </em>
              </button>
              <button onClick={() => setRole("finalist")}>
                <span>
                  <GraduationCap size={25} />
                </span>
                <b>Finalista</b>
                <p>
                  Para finalistas que desejam também submeter e acompanhar os
                  seus TCC.
                </p>
                <em>
                  Escolher perfil <ChevronRight size={16} />
                </em>
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              {mode === "register" && (
                <>
                  <div className="form-row">
                    <Field
                      label="Nome completo"
                      placeholder="O seu nome completo"
                      value={fullName}
                      onChange={setFullName}
                    />
                    <Field label="Telefone" placeholder="+244 9XX XXX XXX" />
                  </div>
                  <Field
                    label="Número de matrícula"
                    placeholder="Insira o seu número de matrícula"
                  />
                </>
              )}
              <Field
                label="E-mail"
                type="email"
                placeholder="nome@exemplo.com"
                value={email}
                onChange={setEmail}
              />
              {mode === "register" && (
                <div className="form-row">
                  <label>
                    Curso
                    <select required defaultValue="">
                      <option value="" disabled>
                        Selecione o curso
                      </option>
                      {courses.map((c) => (
                        <option key={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </label>
                  {role === "finalist" && (
                    <Field
                      label="Ano de conclusão"
                      type="number"
                      placeholder="2025"
                    />
                  )}
                </div>
              )}
              {!forgot && (
                <Field
                  label="Palavra-passe"
                  type="password"
                  placeholder="Mínimo de 8 caracteres"
                  value={password}
                  onChange={setPassword}
                />
              )}
              {mode === "register" && (
                <Field
                  label="Confirmar palavra-passe"
                  type="password"
                  placeholder="Repita a palavra-passe"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                />
              )}
              {mode === "login" && !forgot && (
                <button
                  type="button"
                  className="forgot"
                  onClick={() => setForgot(true)}
                >
                  Esqueceu a palavra-passe?
                </button>
              )}
              {message && (
                <div className="success-message">
                  <CheckCircle2 size={18} />
                  {message}
                </div>
              )}
              <Button type="submit" className="full">
                {loading
                  ? "A processar..."
                  : forgot
                  ? "Enviar instruções"
                  : mode === "login"
                    ? "Entrar na plataforma"
                    : "Criar conta"}
              </Button>
              {mode === "login" && !forgot && (
                <div className="demo-logins">
                  <span>Acesso demonstrativo</span>
                  <button type="button" onClick={() => onLogin("reader")}>
                    Leitor
                  </button>
                  <button type="button" onClick={() => onLogin("finalist")}>
                    Finalista
                  </button>
                  <button type="button" onClick={() => onLogin("admin")}>
                    Admin
                  </button>
                </div>
              )}
            </form>
          )}
          <div className="auth-switch">
            {forgot ? (
              <button onClick={() => setForgot(false)}>
                Voltar ao início de sessão
              </button>
            ) : mode === "login" ? (
              <>
                Ainda não tem uma conta?{" "}
                <button
                  onClick={() => {
                    setMode("register")
                    setRole(null)
                  }}
                >
                  Criar conta
                </button>
              </>
            ) : (
              <>
                Já tem uma conta?{" "}
                <button onClick={() => setMode("login")}>Entrar</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string
  placeholder: string
  type?: string
  value?: string
  onChange?: (value: string) => void
}) {
  return (
    <label>
      {label}
      <input
        required
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </label>
  )
}

const navBase = [
  ["dashboard", Home, "Visão geral"],
  ["library", Library, "Biblioteca"],
  ["courses", GraduationCap, "Explorar cursos"],
  ["favorites", Bookmark, "Favoritos"],
  ["history", History, "Histórico de leitura"],
  ["contact", MessageCircle, "Contactar autores"],
  ["profile", UserRound, "Meu perfil"],
] as const

function AppShell({
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
  const nav =
    role === "finalist"
      ? [
          ...navBase,
          ["submit", UploadCloud, "Submeter TCC"] as const,
          ["works", FileText, "Meus trabalhos"] as const,
        ]
      : navBase
  return (
    <div className="app-shell">
      <aside className={mobileMenu ? "sidebar open" : "sidebar"}>
        <div className="side-logo">
          <Logo />
          <button onClick={() => setMobileMenu(false)}>
            <PanelLeftClose size={20} />
          </button>
        </div>
        <nav>
          <small>MENU PRINCIPAL</small>
          {nav.map(([key, Icon, label]) => (
            <button
              className={page === key ? "active" : ""}
              key={key}
              onClick={() => {
                setPage(key)
                setMobileMenu(false)
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
                setMobileMenu(false)
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
      {mobileMenu && (
        <div className="scrim" onClick={() => setMobileMenu(false)} />
      )}
      <div className="app-main">
        <header className="app-header">
          <button className="menu-trigger" onClick={() => setMobileMenu(true)}>
            <Menu size={22} />
          </button>
          <div className="top-search">
            <Search size={18} />
            <input
              value={searchQuery}
              placeholder="Pesquisar título, autor ou curso..."
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setPage("library")
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
        <main className="content">{children}</main>
      </div>
    </div>
  )
}

function Dashboard({
  role,
  setPage,
  searchQuery,
  onSearchChange,
  openWork,
}: {
  role: Role
  setPage: (p: Page) => void
  searchQuery: string
  onSearchChange: (value: string) => void
  openWork: (w: Tcc) => void
}) {
  return (
    <>
      <div className="page-heading welcome">
        <div>
          <span>SEGUNDA-FEIRA, 20 DE OUTUBRO</span>
          <h1>
            Olá, Ana. <em>Continue a descobrir.</em>
          </h1>
          <p>Encontre conhecimento que o ajude a ir mais longe.</p>
        </div>
        {role === "finalist" && (
          <Button
            onClick={() => setPage("submit")}
            icon={<UploadCloud size={18} />}
          >
            Submeter meu TCC
          </Button>
        )}
      </div>
      <section className="search-banner">
        <div>
          <span>
            <Search size={24} />
          </span>
          <div>
            <h2>O que deseja aprender hoje?</h2>
            <p>Pesquise entre centenas de trabalhos académicos.</p>
          </div>
        </div>
        <div className="banner-search">
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setPage("library")
            }}
            placeholder="Pesquise por título, autor ou palavra-chave"
          />
          <Button onClick={() => setPage("library")}>Pesquisar</Button>
        </div>
      </section>
      <SectionHead
        title="Trabalhos recentes"
        sub="Novos conhecimentos adicionados à biblioteca"
        action="Ver biblioteca"
        onClick={() => setPage("library")}
      />
      <div className="works-grid">
        {works.slice(0, 3).map((w) => (
          <WorkCard work={w} key={w.id} onClick={() => openWork(w)} />
        ))}
      </div>
      <div className="dashboard-columns">
        <section>
          <SectionHead
            title="Explore por curso"
            sub="Encontre trabalhos na sua área"
            action="Ver todos"
            onClick={() => setPage("courses")}
          />
          <div className="course-list">
            {courses.map((c, i) => (
              <button key={c.name} onClick={() => setPage("library")}>
                <span className={`course-icon c${i}`}>
                  <GraduationCap size={21} />
                </span>
                <div>
                  <b>{c.name}</b>
                  <small>{c.count} trabalhos</small>
                </div>
                <ChevronRight size={18} />
              </button>
            ))}
          </div>
        </section>
        <section>
          <SectionHead title="Mais consultados" sub="Em destaque esta semana" />
          <div className="popular-list">
            {[works[2], works[0], works[5]].map((w, i) => (
              <button key={w.id} onClick={() => openWork(w)}>
                <em>0{i + 1}</em>
                <div>
                  <b>{w.title}</b>
                  <small>
                    {w.author} · {w.views.toLocaleString("pt-PT")} leituras
                  </small>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

function SectionHead({
  title,
  sub,
  action,
  onClick,
}: {
  title: string
  sub?: string
  action?: string
  onClick?: () => void
}) {
  return (
    <div className="section-head">
      <div>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {action && (
        <button onClick={onClick}>
          {action}
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  )
}

function Cover({ work, small = false }: { work: Tcc; small?: boolean }) {
  return (
    <div
      className={small ? "book-cover small" : "book-cover"}
      style={{ "--cover": work.color } as React.CSSProperties}
    >
      <span>COLÉGIO WILIETE</span>
      <FileText size={small ? 25 : 33} />
      <b>{work.course}</b>
      <small>Trabalho de conclusão de curso</small>
      <i>{work.year}</i>
    </div>
  )
}

function WorkCard({
  work,
  onClick,
  favorite,
  toggleFavorite,
}: {
  work: Tcc
  onClick: () => void
  favorite?: boolean
  toggleFavorite?: () => void
}) {
  return (
    <article className="work-card">
      <div className="cover-wrap">
        <Cover work={work} />
        <button
          aria-label="Adicionar aos favoritos"
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite?.()
          }}
        >
          {favorite ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
        <span>{work.year}</span>
      </div>
      <div className="work-card-body">
        <small>{work.course}</small>
        <h3>{work.title}</h3>
        <p>{work.author}</p>
        <div>
          <span>
            <Eye size={15} />
            {work.views.toLocaleString("pt-PT")}
          </span>
          <button onClick={onClick}>
            Ver detalhes <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </article>
  )
}

function LibraryPage({
  query,
  onQueryChange,
  openWork,
  favorites,
  toggleFavorite,
}: {
  query: string
  onQueryChange: (value: string) => void
  openWork: (w: Tcc) => void
  favorites: number[]
  toggleFavorite: (id: number) => void
}) {
  const [course, setCourse] = useState("Todos os cursos")
  const [year, setYear] = useState("Todos os anos")
  const [sort, setSort] = useState("Mais recentes")
  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return works
      .filter(
        (w) =>
          (!q ||
            `${w.title} ${w.author} ${w.course}`.toLowerCase().includes(q)) &&
          (course === "Todos os cursos" || w.course === course) &&
          (year === "Todos os anos" || String(w.year) === year),
      )
      .sort((a, b) =>
        sort === "Mais consultados" ? b.views - a.views : b.year - a.year,
      )
  }, [query, course, year, sort])
  return (
    <>
      <div className="page-heading">
        <div>
          <span>BIBLIOTECA</span>
          <h1>Explore o conhecimento</h1>
          <p>
            Pesquise e descubra trabalhos académicos produzidos pelos nossos
            finalistas.
          </p>
        </div>
      </div>
      <div className="library-tools">
        <div className="large-search">
          <Search size={20} />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Pesquisar por título, autor ou palavra-chave..."
          />
        </div>
        <select value={course} onChange={(e) => setCourse(e.target.value)}>
          <option>Todos os cursos</option>
          {courses.map((c) => (
            <option key={c.name}>{c.name}</option>
          ))}
        </select>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option>Todos os anos</option>
          <option>2024</option>
          <option>2023</option>
          <option>2022</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option>Mais recentes</option>
          <option>Mais consultados</option>
        </select>
      </div>
      <div className="results-row">
        <b>{filtered.length} trabalhos encontrados</b>
        <button
          onClick={() => {
            onQueryChange("")
            setCourse("Todos os cursos")
            setYear("Todos os anos")
          }}
        >
          Limpar filtros
        </button>
      </div>
      <div className="works-grid library-grid">
        {filtered.map((w) => (
          <WorkCard
            work={w}
            key={w.id}
            onClick={() => openWork(w)}
            favorite={favorites.includes(w.id)}
            toggleFavorite={() => toggleFavorite(w.id)}
          />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty">
          <Search size={32} />
          <h3>Nenhum trabalho encontrado</h3>
          <p>Tente ajustar os termos ou filtros da pesquisa.</p>
        </div>
      )}
    </>
  )
}

function DetailPage({
  work,
  back,
  read,
  favorite,
  toggleFavorite,
  contact,
}: {
  work: Tcc
  back: () => void
  read: () => void
  favorite: boolean
  toggleFavorite: () => void
  contact: () => void
}) {
  return (
    <>
      <button className="back-page" onClick={back}>
        <ArrowLeft size={18} />
        Voltar à biblioteca
      </button>
      <div className="detail-layout">
        <aside className="detail-cover">
          <Cover work={work} />
          <Button icon={<BookOpen size={18} />} onClick={read} className="full">
            Ler PDF
          </Button>
          <Button
            variant="outline"
            icon={<Download size={18} />}
            className="full"
          >
            Descarregar
          </Button>
        </aside>
        <div className="detail-content">
          <div className="detail-meta">
            <span>{work.course}</span>
            <span>{work.year}</span>
          </div>
          <h1>{work.title}</h1>
          <p className="detail-author">
            Por <b>{work.author}</b>
          </p>
          <div className="detail-stats">
            <span>
              <FileText size={18} />
              {work.pages} páginas
            </span>
            <span>
              <Eye size={18} />
              {work.views.toLocaleString("pt-PT")} visualizações
            </span>
            <span>
              <Clock3 size={18} />
              Publicado em 18/03/{work.year}
            </span>
          </div>
          <div className="detail-actions">
            <Button
              variant={favorite ? "soft" : "outline"}
              icon={
                favorite ? <BookmarkCheck size={18} /> : <Bookmark size={18} />
              }
              onClick={toggleFavorite}
            >
              {favorite ? "Guardado nos favoritos" : "Adicionar aos favoritos"}
            </Button>
            {work.contact && (
              <Button
                variant="outline"
                icon={<MessageCircle size={18} />}
                onClick={contact}
              >
                Contactar autor
              </Button>
            )}
          </div>
          <hr />
          <section>
            <h2>Resumo</h2>
            <p>
              {work.abstract} O projeto apresenta ainda os resultados da
              investigação, a metodologia utilizada e recomendações para futuros
              estudos na área.
            </p>
          </section>
          <section>
            <h2>Informações académicas</h2>
            <div className="info-grid">
              <div>
                <small>AUTOR</small>
                <b>{work.author}</b>
              </div>
              <div>
                <small>ORIENTADOR</small>
                <b>{work.advisor}</b>
              </div>
              <div>
                <small>CURSO</small>
                <b>{work.course}</b>
              </div>
              <div>
                <small>ANO DE CONCLUSÃO</small>
                <b>{work.year}</b>
              </div>
            </div>
          </section>
          <section>
            <h2>Palavras-chave</h2>
            <div className="keyword-list">
              {work.keywords.map((k) => (
                <span key={k}>{k}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

function PdfReader({ work, close }: { work: Tcc; close: () => void }) {
  const [page, setPage] = useState(1)
  const [zoom, setZoom] = useState(90)
  return (
    <div className="pdf-reader">
      <div className="pdf-top">
        <button onClick={close}>
          <ArrowLeft size={19} />
        </button>
        <FileText size={21} />
        <div>
          <b>{work.title}</b>
          <small>{work.author}</small>
        </div>
        <button>
          <Download size={19} />
        </button>
        <button>
          <Expand size={19} />
        </button>
        <button onClick={close}>
          <X size={20} />
        </button>
      </div>
      <div className="pdf-tools">
        <button onClick={() => setPage(Math.max(1, page - 1))}>
          <ChevronLeft size={19} />
        </button>
        <span>
          Página <b>{page}</b> de {work.pages}
        </span>
        <button onClick={() => setPage(Math.min(work.pages, page + 1))}>
          <ChevronRight size={19} />
        </button>
        <i />
        <button onClick={() => setZoom(Math.max(50, zoom - 10))}>
          <Minus size={18} />
        </button>
        <span>{zoom}%</span>
        <button onClick={() => setZoom(Math.min(140, zoom + 10))}>
          <Plus size={18} />
        </button>
        <div className="pdf-search">
          <Search size={16} />
          <input placeholder="Pesquisar no documento" />
        </div>
      </div>
      <div className="pdf-canvas">
        <div
          className="pdf-paper"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          <div className="paper-header">
            <img src="/wiliete-logo.jpg" />
            <span>
              INSTITUTO POLITÉCNICO PRIVADO WILIETE
              <br />
              DEPARTAMENTO DE {work.course.toUpperCase()}
            </span>
          </div>
          <h2>{work.title}</h2>
          <h3>{work.author}</h3>
          <div className="paper-spacer" />
          <p>
            Trabalho de Conclusão de Curso apresentado ao Colégio Wiliete como
            requisito parcial para conclusão do curso de {work.course}.
          </p>
          <b>Orientador: {work.advisor}</b>
          <div className="paper-footer">
            Luanda · {work.year}
            <small>{page}</small>
          </div>
        </div>
      </div>
    </div>
  )
}

function GenericPage({
  type,
  openWork,
}: {
  type: Page
  openWork: (w: Tcc) => void
}) {
  if (type === "courses")
    return (
      <>
        <div className="page-heading">
          <div>
            <span>ÁREAS DE ESTUDO</span>
            <h1>Explore por curso</h1>
            <p>
              Conhecimento organizado para encontrar rapidamente o que procura.
            </p>
          </div>
        </div>
        <div className="big-courses">
          {courses.map((c, i) => (
            <button key={c.name}>
              <span className={`course-icon c${i}`}>
                <GraduationCap size={28} />
              </span>
              <div>
                <h2>{c.name}</h2>
                <p>{c.count} trabalhos disponíveis</p>
              </div>
              <ChevronRight />
            </button>
          ))}
        </div>
      </>
    )
  if (type === "favorites")
    return (
      <>
        <div className="page-heading">
          <div>
            <span>SUA COLEÇÃO</span>
            <h1>Favoritos</h1>
            <p>Os trabalhos que guardou para consultar mais tarde.</p>
          </div>
        </div>
        <div className="works-grid">
          {works.slice(0, 2).map((w) => (
            <WorkCard
              work={w}
              key={w.id}
              onClick={() => openWork(w)}
              favorite
            />
          ))}
        </div>
      </>
    )
  if (type === "history")
    return (
      <>
        <div className="page-heading">
          <div>
            <span>ATIVIDADE</span>
            <h1>Histórico de leitura</h1>
            <p>
              Continue de onde parou nos documentos consultados recentemente.
            </p>
          </div>
        </div>
        <div className="history-list">
          {works.slice(0, 4).map((w, i) => (
            <button key={w.id} onClick={() => openWork(w)}>
              <Cover work={w} small />
              <div>
                <small>
                  LIDO HÁ {i + 1} DIA{i ? "S" : ""}
                </small>
                <h3>{w.title}</h3>
                <p>
                  {w.author} · Página {12 + i * 4} de {w.pages}
                </p>
                <span>
                  <i style={{ width: `${30 + i * 12}%` }} />
                </span>
              </div>
              <ChevronRight />
            </button>
          ))}
        </div>
      </>
    )
  if (type === "profile")
    return (
      <>
        <div className="page-heading">
          <div>
            <span>CONTA</span>
            <h1>Meu perfil</h1>
            <p>Consulte e atualize as suas informações pessoais.</p>
          </div>
        </div>
        <div className="profile-card">
          <div className="profile-hero">
            <span>AM</span>
            <div>
              <h2>Ana Manuel</h2>
              <p>Estudante · Informática</p>
            </div>
            <Button variant="outline">Editar perfil</Button>
          </div>
          <div className="info-grid">
            <div>
              <small>NOME COMPLETO</small>
              <b>Ana Manuel</b>
            </div>
            <div>
              <small>E-MAIL</small>
              <b>ana.manuel@estudante.co.ao</b>
            </div>
            <div>
              <small>TELEFONE</small>
              <b>+244 923 000 000</b>
            </div>
            <div>
              <small>CURSO</small>
              <b>Informática</b>
            </div>
          </div>
        </div>
      </>
    )
  return <ContactPage />
}

function ContactPage() {
  const [recipientId, setRecipientId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState("")
  const [chatError, setChatError] = useState("")

  useEffect(() => {
    let active = true
    const load = async () => {
      const recipient = await chatService.getAdminRecipient()
      if (!active) return
      setRecipientId(recipient)
      if (recipient) {
        try {
          setMessages(await chatService.listConversation(recipient))
        } catch (error) {
          setChatError(error instanceof Error ? error.message : "Não foi possível carregar as mensagens.")
        }
      }
    }
    void load()
    return () => {
      active = false
    }
  }, [])

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault()
    if (!recipientId || !draft.trim()) return
    setChatError("")
    try {
      await chatService.send(recipientId, draft)
      setDraft("")
      setMessages(await chatService.listConversation(recipientId))
    } catch (error) {
      setChatError(error instanceof Error ? error.message : "Não foi possível enviar a mensagem.")
    }
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <span>MENSAGENS</span>
          <h1>Contactar autores</h1>
          <p>
            Converse com autores que autorizaram a divulgação dos seus
            contactos.
          </p>
        </div>
      </div>
      <div className="messages">
        <aside>
          {works
            .filter((w) => w.contact)
            .slice(0, 4)
            .map((w, i) => (
              <button className={i === 0 ? "active" : ""} key={w.id}>
                <span>
                  {w.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div>
                  <b>{w.author}</b>
                  <small>
                    {i
                      ? "Disponível para contacto"
                      : "Obrigado pelo interesse!"}
                  </small>
                </div>
              </button>
            ))}
        </aside>
        <section>
          <header>
            <span>MD</span>
            <div>
              <b>Marta Domingos</b>
              <small>
                <i /> Disponível para contacto
              </small>
            </div>
            <MoreHorizontal />
          </header>
          <div className="chat-body">
            <small>HOJE</small>
            {chatError && <p className="received">{chatError}</p>}
            {!recipientId && !chatError && (
              <p className="received">Nenhum administrador disponível para conversa.</p>
            )}
            {messages.map((message) => (
              <p
                key={message.id}
                className={message.sender_id === recipientId ? "received" : "sent"}
              >
                {message.content}
              </p>
            ))}
          </div>
          <form onSubmit={sendMessage}>
            <input
              placeholder="Escreva uma mensagem..."
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
            <button>
              <Send size={19} />
            </button>
          </form>
        </section>
      </div>
    </>
  )
}

function SubmitPage({ setPage }: { setPage: (p: Page) => void }) {
  const [file, setFile] = useState("")
  const [success, setSuccess] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSuccess(true)
  }
  if (success)
    return (
      <div className="submission-success">
        <span>
          <Check size={34} />
        </span>
        <h1>Trabalho submetido com sucesso</h1>
        <p>
          O seu TCC foi enviado para análise. Poderá acompanhar o estado da
          submissão em “Meus trabalhos”.
        </p>
        <Button onClick={() => setPage("works")}>Acompanhar submissão</Button>
      </div>
    )
  return (
    <>
      <div className="page-heading">
        <div>
          <span>ÁREA DO FINALISTA</span>
          <h1>Submeter meu TCC</h1>
          <p>
            Partilhe o seu trabalho e contribua para o conhecimento da nossa
            comunidade.
          </p>
        </div>
      </div>
      <form className="submit-form" onSubmit={submit}>
        <section>
          <h2>
            <span>01</span>Informações do trabalho
          </h2>
          <Field
            label="Título do TCC"
            placeholder="Insira o título completo do trabalho"
          />
          <div className="form-row">
            <Field label="Nome do autor" placeholder="Nome completo" />
            <label>
              Curso
              <select required>
                <option>Informática</option>
                {courses.slice(1).map((c) => (
                  <option key={c.name}>{c.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-row">
            <Field label="Ano de conclusão" placeholder="2025" type="number" />
            <Field label="Orientador" placeholder="Nome do orientador" />
          </div>
          <label>
            Resumo
            <textarea
              required
              placeholder="Apresente brevemente o tema, objetivos e principais conclusões..."
              rows={6}
            />
          </label>
          <Field
            label="Palavras-chave"
            placeholder="Ex.: tecnologia, educação, gestão"
          />
        </section>
        <section>
          <h2>
            <span>02</span>Contactos e ficheiros
          </h2>
          <div className="form-row">
            <Field label="E-mail" placeholder="seu@email.com" type="email" />
            <Field label="WhatsApp" placeholder="+244 9XX XXX XXX" />
          </div>
          <label className="check">
            <input type="checkbox" /> Autorizo a divulgação destes contactos aos
            leitores.
          </label>
          <div className="upload-box">
            <UploadCloud size={30} />
            <h3>{file || "Carregue o documento PDF"}</h3>
            <p>Formato PDF, tamanho máximo 20 MB</p>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0]?.name || "")}
              required
            />
          </div>
          <div className="upload-box compact">
            <FileText size={26} />
            <div>
              <h3>Capa do trabalho</h3>
              <p>PNG ou JPG, recomendado 800 × 1200 px</p>
            </div>
            <input type="file" accept="image/*" />
          </div>
        </section>
        <div className="form-submit">
          <p>
            <ShieldCheck size={18} />O trabalho será revisto antes de ficar
            disponível.
          </p>
          <Button type="submit" icon={<UploadCloud size={18} />}>
            Submeter trabalho
          </Button>
        </div>
      </form>
    </>
  )
}

function MyWorks() {
  return (
    <>
      <div className="page-heading">
        <div>
          <span>ÁREA DO FINALISTA</span>
          <h1>Meus trabalhos</h1>
          <p>Acompanhe o estado dos trabalhos submetidos.</p>
        </div>
      </div>
      <div className="submission-list">
        {[
          [
            "Aplicação móvel para apoio ao estudo de programação",
            "Pendente",
            "pending",
          ],
          [
            "Proposta de website para gestão de biblioteca escolar",
            "Aprovado",
            "approved",
          ],
        ].map(([title, status, cls], i) => (
          <article key={title}>
            <Cover work={works[i]} small />
            <div>
              <span className={`status ${cls}`}>{status}</span>
              <h3>{title}</h3>
              <p>
                Submetido em {i ? "14/05/2024" : "18/10/2025"} · Informática
              </p>
            </div>
            <button>
              <MoreHorizontal />
            </button>
          </article>
        ))}
      </div>
    </>
  )
}

function AdminPage() {
  const [pending, setPending] = useState([
    ["Aplicação móvel para apoio ao estudo", "João Pedro", "Informática"],
    ["Práticas de enfermagem materno-infantil", "Sara Paulo", "Enfermagem"],
    ["Gestão financeira em microempresas", "Mateus Silva", "Contabilidade"],
  ])
  const remove = (i: number) => setPending(pending.filter((_, n) => n !== i))
  return (
    <>
      <div className="page-heading welcome">
        <div>
          <span>PAINEL ADMINISTRATIVO</span>
          <h1>Visão geral da plataforma</h1>
          <p>Acompanhe os dados e faça a gestão da biblioteca.</p>
        </div>
        <Button variant="outline" icon={<Settings size={18} />}>
          Configurações
        </Button>
      </div>
      <div className="admin-stats">
        {[
          [Users, "2 840", "Estudantes"],
          [GraduationCap, "684", "Finalistas"],
          [FileText, "142", "TCC publicados"],
          [Clock3, String(pending.length), "Submissões pendentes"],
        ].map(([Icon, value, label]) => {
          const I = Icon as typeof Users
          return (
            <article key={String(label)}>
              <span>
                <I size={22} />
              </span>
              <div>
                <b>{String(value)}</b>
                <small>{String(label)}</small>
              </div>
            </article>
          )
        })}
      </div>
      <div className="admin-grid">
        <section>
          <SectionHead
            title="Submissões pendentes"
            sub="Trabalhos que aguardam revisão"
          />
          <div className="admin-table">
            {pending.map((p, i) => (
              <div key={p[0]}>
                <span>
                  <FileText size={20} />
                </span>
                <div>
                  <b>{p[0]}</b>
                  <small>
                    {p[1]} · {p[2]}
                  </small>
                </div>
                <button
                  className="approve"
                  onClick={() => remove(i)}
                  title="Aprovar"
                >
                  <Check size={17} />
                </button>
                <button
                  className="reject"
                  onClick={() => remove(i)}
                  title="Rejeitar"
                >
                  <X size={17} />
                </button>
              </div>
            ))}
          </div>
          {!pending.length && (
            <div className="empty compact">
              <CheckCircle2 size={26} />
              <p>Todas as submissões foram revistas.</p>
            </div>
          )}
        </section>
        <section>
          <SectionHead title="Gestão rápida" />
          <div className="quick-actions">
            <button>
              <Users />
              <span>
                <b>Gerir estudantes</b>
                <small>Perfis e permissões</small>
              </span>
            </button>
            <button>
              <BriefcaseBusiness />
              <span>
                <b>Gerir cursos</b>
                <small>4 cursos ativos</small>
              </span>
            </button>
            <button>
              <FileText />
              <span>
                <b>Gerir trabalhos</b>
                <small>Editar ou eliminar</small>
              </span>
            </button>
          </div>
        </section>
      </div>
    </>
  )
}

function App() {
  const [page, setPage] = useState<Page>("landing")
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [role, setRole] = useState<Role | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selected, setSelected] = useState<Tcc>(works[0])
  const [favorites, setFavorites] = useState<number[]>([2])
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    let active = true
    const restoreSession = async () => {
      const session = await authService.getSession()
      if (!active || !session) return
      const profile = await authService.getProfile()
      const restoredRole = (profile?.role as Role) || "reader"
      setRole(restoredRole)
      setPage(restoredRole === "admin" ? "admin" : "dashboard")
    }
    void restoreSession()
    return () => {
      active = false
    }
  }, [])

  const goAuth = (mode: "login" | "register") => {
    setAuthMode(mode)
    setPage("auth")
  }
  const login = (r: Role) => {
    setRole(r)
    setPage(r === "admin" ? "admin" : "dashboard")
  }
  const logout = async () => {
    await authService.signOut()
    setRole(null)
    setPage("landing")
  }
  const openWork = (w: Tcc) => {
    setSelected(w)
    setPage("detail")
  }
  const toggleFavorite = (id: number) =>
    setFavorites((f) =>
      f.includes(id) ? f.filter((x) => x !== id) : [...f, id],
    )

  if (page === "landing") return <Landing goAuth={goAuth} />
  if (page === "auth")
    return (
      <Auth
        initialMode={authMode}
        onBack={() => setPage("landing")}
        onLogin={login}
      />
    )
  if (!role) return <Landing goAuth={goAuth} />
  if (page === "reader")
    return <PdfReader work={selected} close={() => setPage("detail")} />

  let content: ReactNode
  if (page === "dashboard")
    content = (
      <Dashboard
        role={role}
        setPage={setPage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        openWork={openWork}
      />
    )
  else if (page === "library")
    content = (
      <LibraryPage
        query={searchQuery}
        onQueryChange={setSearchQuery}
        openWork={openWork}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    )
  else if (page === "detail")
    content = (
      <DetailPage
        work={selected}
        back={() => setPage("library")}
        read={() => setPage("reader")}
        favorite={favorites.includes(selected.id)}
        toggleFavorite={() => toggleFavorite(selected.id)}
        contact={() => setContactOpen(true)}
      />
    )
  else if (page === "submit" && role === "finalist")
    content = <SubmitPage setPage={setPage} />
  else if (page === "works" && role === "finalist") content = <MyWorks />
  else if (page === "admin" && role === "admin") content = <AdminPage />
  else content = <GenericPage type={page} openWork={openWork} />

  return (
    <AppShell
      page={page}
      role={role}
      setPage={setPage}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      logout={logout}
    >
      {content}
      {contactOpen && (
        <div className="modal-backdrop" onClick={() => setContactOpen(false)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setContactOpen(false)}
            >
              <X />
            </button>
            <span className="contact-avatar">
              {selected.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
            <h2>{selected.author}</h2>
            <p>Autor do trabalho · {selected.course}</p>
            <div>
              <a
                href={`mailto:${selected.author.toLowerCase().replace(" ", ".")}@email.com`}
              >
                <Mail />
                {selected.author.toLowerCase().replace(" ", ".")}@email.com
              </a>
              <a href="#">
                <Phone />
                +244 923 456 780
              </a>
            </div>
            <Button
              icon={<MessageCircle size={18} />}
              onClick={() => {
                setContactOpen(false)
                setPage("contact")
              }}
              className="full"
            >
              Iniciar conversa
            </Button>
            <small>O autor autorizou a divulgação destes contactos.</small>
          </div>
        </div>
      )}
    </AppShell>
  )
}

export default App

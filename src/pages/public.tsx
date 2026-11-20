import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  GraduationCap,
  Heart,
  Library,
  Search,
  Sparkles,
} from "lucide-react"
import { useState, type FormEvent } from "react"
import type { Role } from "@/types"
import { heroPhoto } from "@/data/mock-data"
import { libraryService } from "@/services/library.service"
import { Logo, Button, Field } from "@/components/common"
import { PublicFooter, PublicNavbar } from "@/components/site-chrome"

const courses = libraryService.listCourses()

export function Landing({
  goAuth,
}: {
  goAuth: (mode: "login" | "register") => void
}) {
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
      <PublicNavbar goAuth={goAuth} />
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
      <PublicFooter />
    </div>
  )
}

export function Auth({
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
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (forgot) {
      setMessage("Enviámos as instruções de recuperação para o seu e-mail.")
      return
    }
    if (mode === "register" && !role) return
    onLogin(role || "reader")
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
                />
              )}
              {mode === "register" && (
                <Field
                  label="Confirmar palavra-passe"
                  type="password"
                  placeholder="Repita a palavra-passe"
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
                {forgot
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

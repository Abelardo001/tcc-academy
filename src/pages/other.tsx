import {
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  MoreHorizontal,
  Send,
  Settings,
  ShieldCheck,
  UploadCloud,
  Users,
  X,
} from "lucide-react"
import { useState, type FormEvent } from "react"
import type { Page, Tcc } from "@/types"
import { libraryService } from "@/services/library.service"
import { Button, Field } from "@/components/common"
import { SectionHead, Cover, WorkCard } from "@/components/work"

const works = libraryService.listWorks()
const courses = libraryService.listCourses()

export function GenericPage({
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

export function ContactPage() {
  const [sent, setSent] = useState(false)
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
            <p className="received">
              Olá, Ana! Obrigada pelo interesse no meu trabalho. Em que posso
              ajudar?
            </p>
            {sent && (
              <p className="sent">
                Olá Marta, gostaria de conhecer melhor a metodologia utilizada
                no seu TCC.
              </p>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <input placeholder="Escreva uma mensagem..." />
            <button>
              <Send size={19} />
            </button>
          </form>
        </section>
      </div>
    </>
  )
}

export function SubmitPage({ setPage }: { setPage: (p: Page) => void }) {
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

export function MyWorks() {
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

export function AdminPage() {
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

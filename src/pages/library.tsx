import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Expand,
  Eye,
  FileText,
  MessageCircle,
  Minus,
  Plus,
  Search,
  X,
} from "lucide-react"
import { useState, useMemo } from "react"
import type { Tcc } from "@/types"
import { libraryService } from "@/services/library.service"
import { Button } from "@/components/common"
import { Cover, WorkCard } from "@/components/work"

const works = libraryService.listWorks()
const courses = libraryService.listCourses()

export function LibraryPage({
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

export function DetailPage({
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

type PdfReaderProps = {
  work: Tcc
  close: () => void
}

export function PdfReader({ work, close }: PdfReaderProps) {
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

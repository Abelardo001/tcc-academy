import { ChevronRight, GraduationCap, Search, UploadCloud } from "lucide-react"
import type { Role, Page, Tcc } from "@/types"
import { libraryService } from "@/services/library.service"
import { Button } from "@/components/common"
import { SectionHead, WorkCard } from "@/components/work"

const works = libraryService.listWorks()
const courses = libraryService.listCourses()

export function Dashboard({
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

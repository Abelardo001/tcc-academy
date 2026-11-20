import {
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  Eye,
  FileText,
} from "lucide-react"
import type { Tcc } from "@/types"
import type { CSSProperties } from "react"

export function SectionHead({
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

type CoverProps = {
  work: Tcc
  small?: boolean
}

export function Cover({ work, small = false }: CoverProps) {
  return (
    <div
      className={small ? "book-cover small" : "book-cover"}
      style={{ "--cover": work.color } as CSSProperties}
    >
      <span>COLÉGIO WILIETE</span>
      <FileText size={small ? 25 : 33} />
      <b>{work.course}</b>
      <small>Trabalho de conclusão de curso</small>
      <i>{work.year}</i>
    </div>
  )
}

export function WorkCard({
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

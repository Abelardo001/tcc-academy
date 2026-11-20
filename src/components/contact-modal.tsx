import { Mail, MessageCircle, Phone, X } from "lucide-react"
import type { Tcc } from "@/types"
import { Button } from "@/components/common"

export function ContactModal({
  work,
  onClose,
  onStartConversation,
}: {
  work: Tcc
  onClose: () => void
  onStartConversation: () => void
}) {
  const email = `${work.author.toLowerCase().replace(" ", ".")}@email.com`

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="contact-modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X />
        </button>
        <span className="contact-avatar">
          {work.author
            .split(" ")
            .map((name) => name[0])
            .join("")}
        </span>
        <h2>{work.author}</h2>
        <p>Autor do trabalho · {work.course}</p>
        <div>
          <a href={`mailto:${email}`}>
            <Mail />
            {email}
          </a>
          <a href="#">
            <Phone />
            +244 923 456 780
          </a>
        </div>
        <Button
          icon={<MessageCircle size={18} />}
          onClick={onStartConversation}
          className="full"
        >
          Iniciar conversa
        </Button>
        <small>O autor autorizou a divulgação destes contactos.</small>
      </div>
    </div>
  )
}

import type { ReactNode } from "react"

export function Logo({ compact = false }: { compact?: boolean }) {
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

export function Button({
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

export function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string
  placeholder: string
  type?: string
}) {
  return (
    <label>
      {label}
      <input required type={type} placeholder={placeholder} />
    </label>
  )
}

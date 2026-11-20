import { apiBaseUrl } from "@/config/env"
import { getAuthToken } from "@/services/auth/token-storage"

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly responseBody: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

type RequestOptions = Omit<RequestInit, "headers"> & {
  headers?: HeadersInit
  authenticated?: boolean
}
export async function httpRequest<T>(
  path: string,
  { authenticated = true, ...options }: RequestOptions = {},
): Promise<T> {
  const headers = new Headers(options.headers)
  const token = authenticated ? getAuthToken() : null
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`)
  }
  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json")
  }
  const response = await fetch(
    `${apiBaseUrl}/${path.replace(/^\/+/, "")}`,
    { ...options, headers },
  )
  if (!response.ok) {
    const responseBody = await response.text()
    throw new ApiError(
      response.statusText || "O pedido à API não foi concluído.",
      response.status,
      responseBody,
    )
  }
  if (response.status === 204) return undefined as T
  const contentType = response.headers.get("content-type") ?? ""
  if (!contentType.includes("application/json")) {
    return (await response.text()) as T
  }
  return (await response.json()) as T
}

import { useCallback, useState } from "react"

export type ApiRequestState<T> = {
  data: T | null
  isLoading: boolean
  error: Error | null
}

export function useApiRequest<T>() {
  const [state, setState] = useState<ApiRequestState<T>>({
    data: null,
    isLoading: false,
    error: null,
  })

  const execute = useCallback(async (request: () => Promise<T>) => {
    setState((current) => ({ ...current, isLoading: true, error: null }))
    try {
      const data = await request()
      setState({ data, isLoading: false, error: null })
      return data
    } catch (error) {
      const requestError =
        error instanceof Error ? error : new Error(String(error))
      setState((current) => ({
        ...current,
        isLoading: false,
        error: requestError,
      }))
      throw requestError
    }
  }, [])

  return { ...state, execute }
}

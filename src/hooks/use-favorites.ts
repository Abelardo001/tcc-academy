import { useState } from "react"

export function useFavorites(initialFavorites: number[] = [2]) {
  const [favorites, setFavorites] = useState(initialFavorites)
  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    )
  }
  return { favorites, toggleFavorite }
}

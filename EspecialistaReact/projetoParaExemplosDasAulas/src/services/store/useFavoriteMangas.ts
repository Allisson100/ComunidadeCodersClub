import { create } from "zustand";
import { persist } from 'zustand/middleware'

type State = {
    favorites: number[];
    favoritedManga: (id: number) => void;
}


export const useFavoriteMangas = create(
    persist<State>(
      (set , get) => ({
        favorites: [],
        favoritedManga: (id: number) => {

          const favorites: number[] = get().favorites
          const shouldFavorite = !favorites.includes(id)

          if(shouldFavorite) {
            useFavoriteMangas.setState({ favorites: [...favorites, id] })
          } else {
            useFavoriteMangas.setState({ favorites: favorites.filter((mangaId) => mangaId !== id) })
          }
        }
      } as State),
      {
        name: 'useFavoriteMangas',
      }
    )
)
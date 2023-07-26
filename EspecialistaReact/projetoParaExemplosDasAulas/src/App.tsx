import './App.css'
import useFetchTopMangas from './services/requests/useFetchTopMangas'
import { useFavoriteMangas } from './services/store/useFavoriteMangas';

import { useCallback, useState } from 'react'


function App() {

  const [showOnlyFavorites , setShowOnlyFavorites] = useState(false)

  const { data } = useFetchTopMangas()
  const { favorites , favoritedManga } = useFavoriteMangas()

  

  const toggleShowOnlyFavorites = useCallback(() => {
   
    setShowOnlyFavorites((prevShowOnlyFavorites) => !prevShowOnlyFavorites)
  }, [])

  // useFavoriteMangas.setState()
  // console.log(useFavoriteMangas.getState());
  
  return (
    <>
    <button onClick={() => toggleShowOnlyFavorites()}>Show Favorites</button>
      {
        data?.data.filter((manga) => !showOnlyFavorites || favorites.includes(manga.mal_id)).map((manga) => {
          return (
            <div key={`Manga${manga.mal_id}`} style={{ display: 'grid' }}>
              <img src={manga.images.jpg.image_url} alt="" />
              {manga.title}
              <button onClick={() => favoritedManga(manga.mal_id)}>
                {favorites.includes(manga.mal_id)? '*' : ''}
                Favoritar
              </button>
            </div>
          )
        })
      }
    </>
  )
}

export default App

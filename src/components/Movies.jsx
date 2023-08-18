import { useState } from "react"

function MostrarPeliculas ({movies}) {
  const [hover,setHover] = useState(false)

  const handleHover = () => {
    setHover(!hover)
  } 
  
  return (
    <ul className="movies">
      {
        movies.map((movie) => {
          return (  
            <li className="movie" key={movie.id}>
              <img src={movie.image} alt={movie.Title} />
              <h3>{movie.title}</h3>
              <p>Año: {movie.year}</p>
            </li>
          )
        })
      }
    </ul>
    )
  }

function NoPeliculas () {
    return (
      <h3>No se encontraron peliculas</h3>
    )
}

export function MoviesVerify ({movies}) {
    const hasMovies = movies?.length > 0

    return (
        hasMovies 
            ?  <MostrarPeliculas movies={movies}/>
            :  <NoPeliculas/>
        )
}

export function Movies({movies,loading}){
  return(
    loading ? <p>Cargando...</p> : <MoviesVerify movies={movies} />
  )
}
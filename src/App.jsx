import './App.css'
import debounce from 'just-debounce-it'
import { useMovies } from './hook/useMovies'
import { Movies } from './components/Movies'
import { useState, useEffect, useRef, useCallback } from 'react'
//import noResponse from './results/no-response.json'

function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (search === '') {
      return
    }
    if (search === "") {
      setError("No se puede buscar la pelicula vacía")
      return
    }
    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una pelicula con un número")
      return
    }
    if (search.length < 3) {
      setError("La busqueda debe tener al menos 3 caracteres")
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error }
}

function App() {
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search })
  const firstRender = useRef(false)

  const debounceGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search })
    }, 500)
    , [getMovies])

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({ search })
  }

  const handleChange = (e) => {
    firstRender.current = true
    const newSearch = e.target.value
    setSearch(newSearch)
    debounceGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input style={{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'transparent'
          }} onChange={handleChange} value={search} name='query' placeholder='Avengers, etc.' />
          <button>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main className='main'>
        {
          firstRender.current && <Movies movies={movies} loading={loading} />
        }
      </main>
    </div>
  )
}

export default App

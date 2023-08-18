import { useState,useRef, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search}) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [, setError] = useState(null)
    const busquedaAnterior = useRef(search)

    const getMovies = useCallback(async ({search}) => {
        if(search === busquedaAnterior.current) return

        try {
            setLoading(true)
            setError(null)
            busquedaAnterior.current = search
            const newMovies = await searchMovies({ search })
            setMovies(newMovies)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    },[])

    return { movies: movies, getMovies, loading }
}
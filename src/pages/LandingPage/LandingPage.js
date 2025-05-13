import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../api/movie'
import Navbar from '../../componets/Navbar/Navbar'
import { Link } from 'react-router-dom'

const LandingPage = () => {
    const [movieList, setMovieList] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])
    const [pageLoading, setPageLoading] = useState(true)

    const init = async () => {
        const result = await getAllMovies()
        setMovieList(result.data)
        setFilteredMovies(result.data)
        setPageLoading(false)
    }

    const selectedMovie = (searchText) => {
        if (searchText.trim() === '') {
            setFilteredMovies(movieList)
        } else {
            const filtered = movieList.filter((movie) =>
                movie.name.toLowerCase().includes(searchText.toLowerCase())
            )
            setFilteredMovies(filtered)
        }
    }

    useEffect(() => { init() }, [])

    return (
        !pageLoading ? (
            <div className="bg-dark text-white min-vh-100">
                <Navbar onSearchChange={selectedMovie} />
                <div className='container py-4'>
                    <h3 className='text-danger mb-4'>🔥 Recommended Movies</h3>
                    <div className='row'>
                        {
                            filteredMovies.length > 0 ? (
                                filteredMovies.map((movie) => (
                                    <div className="col-md-3 col-sm-6 col-12 mb-4" key={movie._id}>
                                        <Link to={`/movie/${movie._id}/details`} className='text-decoration-none'>
                                            <div className="card bg-black border border-danger h-100 shadow-sm">
                                                <img src={movie.posterUrl} className="card-img-top" alt={movie.name} style={{ height: '18rem', objectFit: 'cover' }} />
                                                <div className="card-body text-white">
                                                    <h6 className="card-title">{movie.name}</h6>
                                                    <p className="card-text">
                                                        <i className="bi bi-hand-thumbs-up-fill text-success me-2"></i>58k Likes
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="text-white px-2">No movies found.</div>
                            )
                        }
                    </div>
                </div>
            </div>
        ) : <div className="text-center text-white py-5">🎥 Fetching movies from backend...</div>
    )
}

export default LandingPage

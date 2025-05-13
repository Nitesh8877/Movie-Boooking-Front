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
            // If search input is cleared, show all movies
            setFilteredMovies(movieList)
        } else {
            // Filter matching movies
            const filtered = movieList.filter((movie) =>
                movie.name.toLowerCase().includes(searchText.toLowerCase())
            )
            setFilteredMovies(filtered)
        }
    }

    useEffect(() => { init() }, [])

    return (
        !pageLoading ? (
            <div>
                <Navbar movies={movieList.map((movie) => movie.name)} onMovieSelect={selectedMovie} />
                <div className='container mx-5 my-2'>
                    <p className='fw-bloder'>Recommended Movies</p>
                    <div className='row'>
                        {
                            filteredMovies.length > 0 ? (
                                filteredMovies.map((movie) => (
                                    <div className="col-lg-3 col-xs-6 my-2" key={movie._id}>
                                        <Link to={`/movie/${movie._id}/details`}>
                                            <div className="d-flex align-items-stretch" style={{ height: '28rem' }}>
                                                <div className="card bg-dark shadow-lg" style={{ width: '14rem' }}>
                                                    <img src={movie.posterUrl} className="card-img-top" alt="..." style={{ height: '100%' }} />
                                                    <i className="bi bi-hand-thumbs-up-fill text-success px-2">58k</i>
                                                    <p className="text-white fw-bolder px-2">{movie.name}</p>
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
        ) : <div>Fetching Movies from backend ...</div>
    )
}

export default LandingPage

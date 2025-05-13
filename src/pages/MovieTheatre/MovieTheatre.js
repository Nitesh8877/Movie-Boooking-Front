import React, { useEffect, useState } from 'react'
import { getAllTheaters } from '../../api/theatre/index'
import { getMoviesById } from '../../api/movie/index'
import Navbar from '../../componets/Navbar/Navbar'
import { Link, useParams } from 'react-router-dom'

const MovieTheatre = () => {
    const { movieid: movieId } = useParams()
    const [selectedMovieId, setSelectedMovieId] = useState(movieId)
    const [movieDetail, setMoviesDetail] = useState({})
    const [theatreDetail, setTheatreDetail] = useState([])
    const [pageLoaded, setPageLoaded] = useState(false)

    const init = async () => {
        let response = await getAllTheaters()
        setTheatreDetail(
            response.data.filter((data) => {
                return data.movies.includes(selectedMovieId)
            })
        )
        response = await getMoviesById(selectedMovieId)
        setMoviesDetail(response.data[0])
        setPageLoaded(true)
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <div>
            <Navbar />
            <div className="bg-light">
                <div className="bg-dark text-center py-4">
                    <h2 className="fw-bolder text-light">{movieDetail.name}</h2>
                    <span className="badge rounded-pill text-bg-danger m-1">
                        {movieDetail.description}
                    </span>
                    <span className="dot my-auto"></span>
                    <span className="badge rounded-pill text-bg-secondary m-1">
                        {movieDetail.language}
                    </span>
                    <span className="dot my-auto"></span>
                    <span className="badge rounded-pill text-bg-secondary m-1">
                        {movieDetail.releaseStatus}
                    </span>
                    <hr className="bg-light" />
                    <h6 className="text-muted">Director: {movieDetail.director}</h6>
                    <h6 className="text-muted">Release Date: {movieDetail.releaseDate}</h6>
                </div>
                <hr />
                <div className="container my-5 vh-100">
                    <h2 className="fw-bold text-dark text-center">Select Theatre</h2>
                    <hr />
                    <div className="row">
                        {pageLoaded ? (
                            theatreDetail.map((theatre) => (
                                <div key={theatre._id} className="col-md-6 col-lg-4 mb-4">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title fw-bold text-dark">
                                                <Link
                                                    to={`/movie/${selectedMovieId}/${theatre._id}`}
                                                    className="text-decoration-none text-dark"
                                                >
                                                    {theatre.name}, {theatre.city}
                                                </Link>
                                            </h5>
                                            <p className="card-text text-muted">
                                                <i className="bi bi-phone-fill text-success"></i> m-Ticket <br />
                                                <i className="bi bi-cup-straw text-danger"></i> Food & Beverages
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>Loading theatres...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieTheatre

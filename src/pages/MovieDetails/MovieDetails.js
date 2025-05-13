import React, { useEffect, useState } from 'react'
import Navbar from '../../componets/Navbar/Navbar'
import ReactPlayer from 'react-player'
import { useParams, Link } from 'react-router-dom'
import { getMoviesById } from '../../api/movie/index'
import { getAllTheaters } from '../../api/theatre/index'

const MovieDetails = () => {

    const { movieid: id } = useParams()
    const [selectedMovie, setSelectedMovie] = useState(id)
    const [movieDetails, setMovieDetails] = useState({})
    const [releaseStatus, setMovieReleaseStatus] = useState(false)
    const [movieCast, setMovieCast] = useState([])
    const [isLoggedin, setLoggedin] = useState(false)

    const init = async () => {
        try {
            const results = await getAllTheaters()
            if (results) {
                setLoggedin(true)
            }
        } catch (error) {
            setLoggedin(false)
        }
        const response = await getMoviesById(selectedMovie)
        setMovieDetails(response.data[0])
        setMovieReleaseStatus(response.data[0].releaseStatus === 'RELEASED')
        setMovieCast(response.data[0].casts)
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <>
            <Navbar />
            <div className="bg-dark text-white">
                <div className="container py-4">
                    {/* Trailer Section */}
                    <div className="mb-4">
                        <ReactPlayer
                            url={movieDetails.trailerUrl}
                            controls={true}
                            width="100%"
                            height="350px"
                            className="shadow-lg rounded"
                        />
                    </div>

                    <div className="row">
                        {/* Movie Poster */}
                        <div className="col-lg-4 col-md-6 mb-4 text-center">
                            <img
                                src={movieDetails.posterUrl}
                                alt={movieDetails.name}
                                className="img-fluid rounded shadow-lg"
                                style={{ maxHeight: '450px', objectFit: 'cover' }}
                            />
                        </div>

                        {/* Movie Information */}
                        <div className="col-lg-8 col-md-6">
                            <h2 className="fw-bold">{movieDetails.name}</h2>
                            <p className="text-muted">{movieDetails.description}</p>
                            <div className="d-flex flex-wrap mb-3">
                                <span className="badge bg-danger m-1">{movieDetails.language}</span>
                                <span className="badge bg-secondary m-1">{movieDetails.releaseStatus}</span>
                            </div>

                            <div>
                                <h5 className="fw-semibold">Director: {movieDetails.director}</h5>
                                <h5 className="fw-semibold">Release Date: {movieDetails.releaseDate}</h5>
                            </div>

                            {/* Cast List */}
                            <div className="my-3">
                                <h5 className="fw-semibold">Cast:</h5>
                                <ul className="list-group">
                                    {movieCast.map((name, index) => (
                                        <li key={index} className="list-group-item bg-dark text-white border-0">
                                            {name}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Booking Button */}
                            <div className="text-center my-4">
                                {isLoggedin ? (
                                    <Link
                                        to={releaseStatus ? `/buytickets/${movieDetails.name}/${selectedMovie}` : '#'}
                                        className={`btn btn-lg ${releaseStatus ? 'btn-success' : 'btn-secondary'} text-white`}
                                    >
                                        {releaseStatus ? 'BOOK TICKET' : 'COMING SOON'}
                                    </Link>
                                ) : (
                                    <p className="text-warning">Please login to book tickets.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetails

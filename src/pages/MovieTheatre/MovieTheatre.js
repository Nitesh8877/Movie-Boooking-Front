import React, { useEffect, useState } from 'react'
import {getAllTheaters} from '../../api/theatre/index'
import {getMoviesById} from '../../api/movie/index'
import Navbar from '../../componets/Navbar/Navbar'
import {Link, useParams} from 'react-router-dom'
 const  MovieTheatre=()=> {
    const {movieid:movieId}=useParams();
    const [selectedMovieId,setSelectedMovieId]=useState(movieId);
    const [movieDetail,setMoviesDetail]=useState({});
    const [theatreDetail, setTheatreDetail]=useState({});
    const [pageLoaded,setPageLoaded]=useState(false);

    const init=async()=>{
        let resposnse=await getAllTheaters();
        setTheatreDetail(resposnse.data.filter((data)=>{
            return data.movies.includes(selectedMovieId)
        }))
        resposnse=await getMoviesById(selectedMovieId);
        setMoviesDetail(resposnse.data[0]);
        setPageLoaded(true)
    }

    useEffect(()=>{
        init();
    },[])
console.log(movieDetail)
  return (
    <div>
        <Navbar/><br/>
        <div className='bg-light'>
        <div className="bg-black text-center py-3 backg">
                    <h2 className="fw-bolder text-light">{movieDetail.name}</h2>

                    <span className="badge rounded-pill text-bg-danger m-1"> {movieDetail.description}</span>
                    <span className="dot my-auto"></span>
                    <span className="badge rounded-pill text-bg-secondary m-1">{movieDetail.language}</span>
                    <span className="dot my-auto"></span>
                    <span className="badge rounded-pill text-bg-secondary m-1">{movieDetail.releaseStatus}</span>

                    <hr className='bg-light' />

                    <h6 className='text-muted '>Director : {movieDetail.director}</h6>
                    <h6 className='text-muted'>Realease Date : {movieDetail.releaseDate}</h6>

                </div><hr/>

                <div className='container my-3 vh-100'>
                    <h2 className='fw-bold text-dark text-center'>Select Theatre</h2><hr/><br/>
                    { pageLoaded ?(
                        theatreDetail.map(
                            theatre=><li key={theatre.name} className="list-group-item">
                                <div className='row'>
                                    <div className='col'>
                                        <Link key={theatre._id} to={`/movie/${selectedMovieId}/${theatre._id}`} className='fw-bold text-dark text-decoration-none p-2'>

                                        {theatre.name}, {theatre.city}
                                        </Link>
                                    </div>

                                    <div className="col">
                                        <div className="p-2 text-success fw-bold">
                                            <i class="bi bi-phone-fill text-success"></i>
                                            m-Ticket
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="p-2 text-danger fw-bold">
                                            <i className="bi bi-cup-straw text-danger"></i>
                                            Food and Beverages
                                        </div>
                                    </div>

                                </div>
                            </li>
                        )
                    ):""}
                </div>
        </div>
    </div>
  )
}

export default MovieTheatre